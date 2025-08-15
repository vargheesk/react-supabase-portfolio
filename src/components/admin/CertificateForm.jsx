import React, { useState, useEffect } from 'react';

const CertificateForm = ({ certificate, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    issuing_organization: '',
    issue_date: '',
    credential_url: '',
    image_url: '',
  });

  useEffect(() => {
    if (certificate) {
      // Format date for input type="date"
      const date = certificate.issue_date ? new Date(certificate.issue_date).toISOString().split('T')[0] : '';
      setFormData({
        title: certificate.title || '',
        issuing_organization: certificate.issuing_organization || '',
        issue_date: date,
        credential_url: certificate.credential_url || '',
        image_url: certificate.image_url || '',
      });
    }
  }, [certificate]);

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
        <h2 className="text-2xl font-bold mb-6">{certificate ? 'Edit Certificate' : 'Add New Certificate'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issuing_organization">Issuing Organization</label>
            <input type="text" name="issuing_organization" id="issuing_organization" value={formData.issuing_organization} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issue_date">Issue Date</label>
            <input type="date" name="issue_date" id="issue_date" value={formData.issue_date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="credential_url">Credential URL</label>
            <input type="url" name="credential_url" id="credential_url" value={formData.credential_url} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_url">Image URL</label>
            <input type="url" name="image_url" id="image_url" value={formData.image_url} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificateForm;
