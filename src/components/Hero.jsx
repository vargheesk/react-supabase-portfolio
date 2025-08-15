import React from 'react';

const Hero = ({ onOpenLoginModal, title, subtitle, imageUrl }) => {
  const defaultImageUrl = "https://i.postimg.cc/PxzpRWV0/Adobe-Express-file123.png";
  return (
    <section id="home" className="pt-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl floating-text mb-6">
              {title || 'Vargheeskutty Eldhose'}
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-xl mx-auto md:mx-0 mb-8">
              {subtitle || 'A Data Scientist passionate about building intelligent solutions with Machine Learning and a strong foundation in full-stack development.'}
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#projects" className="neumorphic-button text-lg font-semibold px-8 py-4 text-gray-800">View My Work</a>
              <a href="#" id="hero-cv-button" className="neumorphic-button text-lg font-semibold px-8 py-4 text-gray-800">Download CV</a>
            </div>
          </div>
          {/* Right Column: Image */}
          <div className="flex justify-center" onDoubleClick={onOpenLoginModal} style={{ cursor: 'pointer' }}>
            <img src={imageUrl || defaultImageUrl} alt={title || 'Vargheeskutty Eldhose'} className="max-w-md w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
