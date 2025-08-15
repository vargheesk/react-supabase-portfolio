import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('issue_date', { ascending: false });

        if (error) throw error;
        setCertificates(data);
      } catch (error) {
        setError('Could not fetch certificates.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="antialiased bg-[#E0E5EC]">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800 floating-text">All Certificates</h1>

        {loading && <p className="text-center">Loading certificates...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {certificates.map((cert) => (
              <div key={cert.id} className="floating-card p-6 flex flex-col">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{cert.title}</h3>
                <p className="text-lg font-semibold text-gray-600 mb-2">{cert.issuing_organization}</p>
                <p className="text-sm text-gray-500 mb-4">Issued: {new Date(cert.issue_date).toLocaleDateString()}</p>
                <div className="mt-auto">
                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="project-button w-full text-center py-2 font-semibold">
                    View Credential
                    </a>
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

export default CertificatesPage;
