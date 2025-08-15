import React, { useState, useEffect } from 'react';

const ExperienceForm = ({ experience, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    job_title: '',
    company: '',
    date_range: '',
    description: '',
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        job_title: experience.job_title || '',
        company: experience.company || '',
        date_range: experience.date_range || '',
        description: experience.description || '',
      });
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{experience ? 'Edit Experience' : 'Add New Experience'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="job_title">Job Title</label>
              <input type="text" name="job_title" id="job_title" value={formData.job_title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">Company</label>
              <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_range">Date Range</label>
            <input type="text" name="date_range" id="date_range" value={formData.date_range} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder="e.g., 2022 - Present" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" rows="4"></textarea>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
