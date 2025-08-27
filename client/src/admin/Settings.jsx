import React, { useState } from 'react';

const Settings = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [theme, setTheme] = useState('light');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle settings update logic here
        alert('Settings updated!');
    };

    return (
        <div className="settings-container" style={{ maxWidth: 400, margin: '2rem auto' }}>
            <h2>Admin Settings</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Theme:
                        <select
                            value={theme}
                            onChange={e => setTheme(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </label>
                </div>
                <button type="submit" style={{ padding: '8px 16px' }}>Save Changes</button>
            </form>
        </div>
    );
};

export default Settings;