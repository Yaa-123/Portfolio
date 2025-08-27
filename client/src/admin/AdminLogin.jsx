import { useState, useEffect } from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import api from '../services/api';

// Define your styles
const styles = {
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee'
  },
  title: {
    color: '#2c3e50',
    margin: 0
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  error: {
    backgroundColor: '#ffecec',
    color: '#e74c3c',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
    border: '1px solid #fadbd8'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '10px 0'
  },
  statText: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    margin: '10px 0'
  },
  recentActivity: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  activityList: {
    marginTop: '15px'
  },
  activityItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #eee'
  },
  activityText: {
    color: '#2c3e50'
  },
  activityTime: {
    color: '#7f8c8d',
    fontSize: '0.9rem'
  }
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { admin, logout } = useAdminAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        setDashboardData(response.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={styles.loading}>
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <div style={styles.userInfo}>
          <span>Welcome, {admin?.username}</span>
          <button onClick={logout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {dashboardData && (
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3>Total Projects</h3>
            <div style={styles.statNumber}>{dashboardData.totalProjects}</div>
          </div>
          
          <div style={styles.statCard}>
            <h3>Featured Projects</h3>
            <div style={styles.statNumber}>{dashboardData.featuredProjects}</div>
          </div>
          
          <div style={styles.statCard}>
            <h3>Last Login</h3>
            <div style={styles.statText}>
              {new Date(dashboardData.lastLogin).toLocaleDateString()}
            </div>
          </div>
          
          <div style={styles.statCard}>
            <h3>Account Created</h3>
            <div style={styles.statText}>
              {new Date(dashboardData.accountCreated).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}

      <div style={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <div style={styles.activityList}>
          <div style={styles.activityItem}>
            <span style={styles.activityText}>You logged in</span>
            <span style={styles.activityTime}>Just now</span>
          </div>
          <div style={styles.activityItem}>
            <span style={styles.activityText}>Project "E-commerce Site" updated</span>
            <span style={styles.activityTime}>2 hours ago</span>
          </div>
          <div style={styles.activityItem}>
            <span style={styles.activityText}>New project added</span>
            <span style={styles.activityTime}>1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;