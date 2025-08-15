import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newSkillName, setNewSkillName] = useState('');

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) setError(error.message);
    else setSkills(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const { error } = await supabase.from('skills').insert({ name: newSkillName.trim() });
    if (error) {
      setError(error.message);
    } else {
      setNewSkillName('');
      fetchSkills();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      const { error } = await supabase.from('skills').delete().match({ id });
      if (error) setError(error.message);
      else fetchSkills();
    }
  };

  if (loading) return <p>Loading skills...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Skills</h2>
      <form onSubmit={handleAddSkill} className="flex gap-4 mb-4">
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          placeholder="Enter new skill name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          + Add
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li key={skill.id} className="p-2 border rounded-lg flex justify-between items-center">
            <span>{skill.name}</span>
            <button onClick={() => handleDelete(skill.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillManager;
