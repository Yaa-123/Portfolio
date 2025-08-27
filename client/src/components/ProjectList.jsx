import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/public/projects');
        setProjects(response.data.projects);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div style={loadingStyle}>Loading projects...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>My Projects</h2>
      <div style={gridStyle}>
        {projects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '2rem',
  color: '#2c3e50'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '2rem'
};

const loadingStyle = {
  textAlign: 'center',
  padding: '2rem',
  fontSize: '1.2rem'
};

const errorStyle = {
  textAlign: 'center',
  padding: '2rem',
  color: '#e74c3c',
  fontSize: '1.2rem'
};

export default ProjectList;