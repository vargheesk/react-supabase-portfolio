import React from 'react';

const Skills = ({ skills }) => {
  return (
    <section id="skills" className="py-10">
      <div className="skills-bar-dark">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-center items-center space-x-8">
            {skills && skills.map((skill) => (
              <span key={skill.id}>{skill.name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
