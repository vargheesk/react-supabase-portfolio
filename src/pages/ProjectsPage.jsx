import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data);
      } catch (error) {
        setError('Could not fetch projects.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="antialiased bg-[#E0E5EC]">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800 floating-text">All Projects</h1>

        {loading && <p className="text-center">Loading projects...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div key={project.id} className="floating-card p-6 flex flex-col">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.title}</h3>
                <p className="flex-grow mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags && project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-semibold bg-gray-300 text-gray-700 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex space-x-4 mt-auto">
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-button w-full text-center py-2 font-semibold">GitHub</a>
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="project-button w-full text-center py-2 font-semibold">Live Demo</a>
                </div>
              </div>
            ))}
          </div>
        )}
         <div className="text-center mt-12">
            <Link to="/" className="neumorphic-button text-lg font-semibold px-8 py-4 text-gray-800">
                &larr; Back to Home
            </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
