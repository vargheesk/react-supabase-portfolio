import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import FaqForm from './FaqForm'; // To be created

const FaqManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) setError(error.message);
    else setFaqs(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const handleSave = async (faqData) => {
    let error;
    if (editingFaq) {
      const { error: updateError } = await supabase.from('faq').update(faqData).match({ id: editingFaq.id });
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('faq').insert(faqData);
      error = insertError;
    }

    if (error) setError(error.message);
    else {
      setIsFormOpen(false);
      fetchFaqs();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      const { error } = await supabase.from('faq').delete().match({ id });
      if (error) setError(error.message);
      else fetchFaqs();
    }
  };

  if (loading) return <p>Loading FAQs...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage FAQs</h2>
        <button onClick={() => { setEditingFaq(null); setIsFormOpen(true); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          + Add New FAQ
        </button>
      </div>
      <ul className="space-y-4">
        {faqs.map((faq) => (
          <li key={faq.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{faq.question}</h3>
                <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
              </div>
              <div className="space-x-2 flex-shrink-0 ml-4">
                <button onClick={() => { setEditingFaq(faq); setIsFormOpen(true); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">Edit</button>
                <button onClick={() => handleDelete(faq.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isFormOpen && (
        <FaqForm
          faq={editingFaq}
          onSave={handleSave}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default FaqManager;
