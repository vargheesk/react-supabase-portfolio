import React, { useState, useEffect } from 'react';

const FaqForm = ({ faq, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  useEffect(() => {
    if (faq) {
      setFormData({
        question: faq.question || '',
        answer: faq.answer || '',
      });
    }
  }, [faq]);

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
        <h2 className="text-2xl font-bold mb-6">{faq ? 'Edit FAQ' : 'Add New FAQ'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">Question</label>
            <input type="text" name="question" id="question" value={formData.question} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">Answer</label>
            <textarea name="answer" id="answer" value={formData.answer} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" rows="4"></textarea>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FaqForm;
