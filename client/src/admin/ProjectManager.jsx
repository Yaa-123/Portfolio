import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/admin/projects');
      setProjects(response.data.projects);
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await api.delete(`/admin/projects/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      setError('Failed to delete project');
      console.error('Error deleting project:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectData = Object.fromEntries(formData.entries());
    
    // Convert technologies from string to array
    projectData.technologies = projectData.technologies.split(',').map(tech => tech.trim());
    projectData.featured = projectData.featured === 'true';
    
    try {
      if (editingProject) {
        await api.put(`/admin/projects/${editingProject._id}`, projectData);
      } else {
        await api.post('/admin/projects', projectData);
      }
      
      setShowForm(false);
      setEditingProject(null);
      fetchProjects(); // Refresh the list
    } catch (err) {
      setError(editingProject ? 'Failed to update project' : 'Failed to create project');
      console.error('Error saving project:', err);
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <div style={headerStyle}>
        <h2>Project Management</h2>
        <button 
          onClick={() => setShowForm(true)} 
          style={addButtonStyle}
        >
          Add New Project
        </button>
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      {showForm && (
        <ProjectForm 
          project={editingProject} 
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      )}

      <div style={tableContainer}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>{project.category}</td>
                <td>{project.featured ? 'Yes' : 'No'}</td>
                <td>
                  <button 
                    onClick={() => {
                      setEditingProject(project);
                      setShowForm(true);
                    }}
                    style={editButtonStyle}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(project._id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  return (
    <div style={formOverlayStyle}>
      <div style={formStyle}>
        <h3>{project ? 'Edit Project' : 'Add New Project'}</h3>
        <form onSubmit={onSubmit}>
          <div style={formGroupStyle}>
            <label>Title:</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={project?.title} 
              required 
            />
          </div>
          
          <div style={formGroupStyle}>
            <label>Description:</label>
            <textarea 
              name="description" 
              defaultValue={project?.description} 
              required 
            />
          </div>
          
          <div style={formGroupStyle}>
            <label>Technologies (comma separated):</label>
            <input 
              type="text" 
              name="technologies" 
              defaultValue={project?.technologies.join(', ')} 
              required 
            />
          </div>
          
          <div style={formGroupStyle}>
            <label>Image URL:</label>
            <input 
              type="url" 
              name="imageUrl" 
              defaultValue={project?.imageUrl} 
              required 
            />
          </div>
          
          <div style={formGroupStyle}>
            <label>Project URL:</label>
            <input 
              type="url" 
              name="projectUrl" 
              defaultValue={project?.projectUrl} 
            />
          </div>
          
          <div style={formGroupStyle}>
            <label>GitHub URL:</label>
            <input 
              type="url" 
              name="githubUrl" 
              defaultValue={project?.githubUrl} 
            />
          </div>
          
          <div style={formGroupStyle}>
            <label>Category:</label>
            <select name="category" defaultValue={project?.category || 'web'}>
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div style={formGroupStyle}>
            <label>Featured:</label>
            <select name="featured" defaultValue={project?.featured ? 'true' : 'false'}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
          <div style={buttonGroupStyle}>
            <button type="submit" style={saveButtonStyle}>
              {project ? 'Update' : 'Create'} Project
            </button>
            <button type="button" onClick={onCancel} style={cancelButtonStyle}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles for the component
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px'
};

const addButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const errorStyle = {
  backgroundColor: '#ffecec',
  color: '#e74c3c',
  padding: '10px',
  borderRadius: '4px',
  marginBottom: '20px'
};

const tableContainer = {
  backgroundColor: 'white',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const editButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '5px'
};

const deleteButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const formOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const formStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflowY: 'auto'
};

const formGroupStyle = {
  marginBottom: '15px'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '20px'
};

const saveButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const cancelButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#95a5a6',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default ProjectManager;