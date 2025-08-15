import React from 'react';

const Experience = ({ experiences }) => {
  // This component will be hidden if the 'experiences' prop is null or empty.
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">My Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="floating-card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{exp.job_title}</h3>
                  <p className="text-lg font-semibold text-gray-600">{exp.company}</p>
                </div>
                <span className="text-md text-gray-500 font-medium">{exp.date_range}</span>
              </div>
              <p className="mt-4 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
