import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';

const SiteConfigManager = () => {
  const [config, setConfig] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_config').select('*');
    if (error) {
      setError(error.message);
    } else {
      // Define a default set of keys to ensure they are present in the form
      const defaultKeys = [
        'hero_title', 'hero_subtitle', 'profile_picture_url', 'about_me',
        'cv_download_url', 'footer_intro_text', 'linkedin_url', 'github_url', 'instagram_url',
        'contact_email', 'password_reset_email'
      ];
      const existingKeys = data.map(item => item.key);
      const missingKeys = defaultKeys.filter(k => !existingKeys.includes(k));
      const newConfigItems = missingKeys.map(key => ({ key, value: '' }));

      setConfig([...data, ...newConfigItems]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleChange = (key, value) => {
    setConfig(currentConfig =>
      currentConfig.map(item => (item.key === key ? { ...item, value } : item))
    );
  };

  const handleSave = async () => {
    setSuccess(false);
    setError('');

    // Use upsert to update existing keys and insert new ones if necessary
    const { error } = await supabase.from('site_config').upsert(config);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3s
    }
  };

  if (loading) return <p>Loading site configuration...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Site Settings</h2>
        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save All Settings
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {success && <p className="text-green-500 mb-4">Settings saved successfully!</p>}
      <div className="space-y-4">
        {config.map(item => (
          <div key={item.key}>
            <label className="block text-gray-700 text-sm font-bold mb-1 capitalize" htmlFor={item.key}>
              {item.key.replace(/_/g, ' ')}
            </label>
            {item.key.includes('about_me') || item.key.includes('footer_intro') ? (
              <textarea
                id={item.key}
                value={item.value || ''}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="5"
              />
            ) : (
              <input
                type="text"
                id={item.key}
                value={item.value || ''}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteConfigManager;
