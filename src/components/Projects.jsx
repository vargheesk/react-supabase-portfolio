import React from 'react';
import { Link } from 'react-router-dom';

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects && projects.map((project) => (
            <div key={project.id} className="floating-card p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.title}</h3>
              <p className="flex-grow mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-semibold bg-gray-300 text-gray-700 px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex space-x-4 mt-auto">
                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-button w-full text-center py-2 font-semibold">GitHub</a>
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="project-button w-full text-center py-2 font-semibold">Live Demo</a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/projects" className="btn-hire inline-block px-8 py-4 font-semibold">
            See More Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
