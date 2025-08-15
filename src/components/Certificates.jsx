import React from 'react';
import { Link } from 'react-router-dom';

const Certificates = ({ certificates }) => {
  // This component will be hidden if the 'certificates' prop is null or empty.
  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <section id="certificates" className="py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">My Certificates</h2>
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
        <div className="text-center mt-12">
          <Link to="/certificates" className="btn-hire inline-block px-8 py-4 font-semibold">
            See More Certificates
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
