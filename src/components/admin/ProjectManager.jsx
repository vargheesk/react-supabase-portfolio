import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ProjectForm from './ProjectForm';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data);
      setError('');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAddNew = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const { error } = await supabase.from('projects').delete().match({ id: projectId });
      if (error) {
        setError(error.message);
      } else {
        fetchProjects(); // Refresh the list
      }
    }
  };

  const handleSave = async (projectData) => {
    const dataToSave = { ...projectData };
    let error;

    if (editingProject) {
      // Update
      const { error: updateError } = await supabase.from('projects').update(dataToSave).match({ id: editingProject.id });
      error = updateError;
    } else {
      // Create
      const { error: insertError } = await supabase.from('projects').insert(dataToSave);
      error = insertError;
    }

    if (error) {
      setError(error.message);
    } else {
      setIsFormOpen(false);
      fetchProjects(); // Refresh the list
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <button onClick={handleAddNew} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          + Add New Project
        </button>
      </div>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(project)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
                Edit
              </button>
              <button onClick={() => handleDelete(project.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isFormOpen && (
        <ProjectForm
          project={editingProject}
          onSave={handleSave}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectManager;
