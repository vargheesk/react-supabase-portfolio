import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ExperienceForm from './ExperienceForm';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setExperiences(data);
      setError('');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleAddNew = () => {
    setEditingExperience(null);
    setIsFormOpen(true);
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setIsFormOpen(true);
  };

  const handleDelete = async (experienceId) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      const { error } = await supabase.from('experience').delete().match({ id: experienceId });
      if (error) {
        setError(error.message);
      } else {
        fetchExperiences();
      }
    }
  };

  const handleSave = async (experienceData) => {
    let error;
    if (editingExperience) {
      const { error: updateError } = await supabase.from('experience').update(experienceData).match({ id: editingExperience.id });
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('experience').insert(experienceData);
      error = insertError;
    }

    if (error) {
      setError(error.message);
    } else {
      setIsFormOpen(false);
      fetchExperiences();
    }
  };


  if (loading) return <p>Loading experiences...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Experience</h2>
        <button onClick={handleAddNew} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          + Add New Experience
        </button>
      </div>
      <ul className="space-y-4">
        {experiences.map((exp) => (
          <li key={exp.id} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{exp.job_title} at {exp.company}</h3>
              <p className="text-sm text-gray-600">{exp.date_range}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(exp)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
                Edit
              </button>
              <button onClick={() => handleDelete(exp.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isFormOpen && (
        <ExperienceForm
          experience={editingExperience}
          onSave={handleSave}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default ExperienceManager;
