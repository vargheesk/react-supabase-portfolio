import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import CertificateForm from './CertificateForm'; // To be created

const CertificateManager = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('issue_date', { ascending: false });

    if (error) setError(error.message);
    else setCertificates(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const handleSave = async (certificateData) => {
    let error;
    if (editingCertificate) {
      const { error: updateError } = await supabase.from('certificates').update(certificateData).match({ id: editingCertificate.id });
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('certificates').insert(certificateData);
      error = insertError;
    }

    if (error) setError(error.message);
    else {
      setIsFormOpen(false);
      fetchCertificates();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      const { error } = await supabase.from('certificates').delete().match({ id });
      if (error) setError(error.message);
      else fetchCertificates();
    }
  };

  if (loading) return <p>Loading certificates...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Certificates</h2>
        <button onClick={() => { setEditingCertificate(null); setIsFormOpen(true); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          + Add New Certificate
        </button>
      </div>
      <ul className="space-y-4">
        {certificates.map((cert) => (
          <li key={cert.id} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{cert.title}</h3>
              <p className="text-sm text-gray-600">{cert.issuing_organization}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => { setEditingCertificate(cert); setIsFormOpen(true); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">Edit</button>
              <button onClick={() => handleDelete(cert.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {isFormOpen && (
        <CertificateForm
          certificate={editingCertificate}
          onSave={handleSave}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default CertificateManager;
