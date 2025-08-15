import React from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import ProjectManager from '../components/admin/ProjectManager';
import ExperienceManager from '../components/admin/ExperienceManager';
import CertificateManager from '../components/admin/CertificateManager';
import SkillManager from '../components/admin/SkillManager';
import FaqManager from '../components/admin/FaqManager';
import SiteConfigManager from '../components/admin/SiteConfigManager';

const AdminPage = ({ session }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      // The onAuthStateChange listener in App.jsx will handle the redirect
      // but we can also navigate manually as a fallback.
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">CMS Admin Panel</h1>
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">Logged in as: <strong>{session.user.email}</strong></span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="space-y-8">
          <SiteConfigManager />
          <ProjectManager />
          <ExperienceManager />
          <CertificateManager />
          <SkillManager />
          <FaqManager />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
