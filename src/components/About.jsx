import React, { useEffect } from 'react';

const About = ({ aboutMeText }) => {
  useEffect(() => {
    const scrollBar1 = document.getElementById('scroll-bar-1');
    const scrollBar2 = document.getElementById('scroll-bar-2');
    const scrollBar3 = document.getElementById('scroll-bar-3');
    const scrollBar4 = document.getElementById('scroll-bar-4');

    const handleScroll = () => {
      const scrollValue = window.scrollY;
      if (scrollBar1) scrollBar1.style.transform = `translateX(${scrollValue * -0.1}px)`;
      if (scrollBar2) scrollBar2.style.transform = `translateX(${scrollValue * 0.1}px)`;
      if (scrollBar3) scrollBar3.style.transform = `translateX(${scrollValue * -0.1}px)`;
      if (scrollBar4) scrollBar4.style.transform = `translateX(${scrollValue * 0.1}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll-driven Text Section (Full-bleed) */}
      <section className="scroll-text-container">
        <div className="scroll-text-bar" id="scroll-bar-1">
          <span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span>
        </div>
        <div className="scroll-text-bar" id="scroll-bar-2">
          <span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span>
        </div>
        <div className="scroll-text-bar" id="scroll-bar-3">
          <span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span>
        </div>
        <div className="scroll-text-bar" id="scroll-bar-4">
          <span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span><span>ABOUT ME</span>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Left Column: Skills/Services */}
            <div className="space-y-8">
              {/* Service 1 */}
              <div className="flex items-center space-x-4">
                <div className="icon-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a2 2 0 100-4 2 2 0 000 4zm0 14a2 2 0 100-4 2 2 0 000 4zm6-8a2 2 0 100-4 2 2 0 000 4zm-12 0a2 2 0 100-4 2 2 0 000 4z" /></svg>
                </div>
                <h3 className="font-semibold text-lg">Machine Learning Models</h3>
              </div>
              {/* Service 2 */}
              <div className="flex items-center space-x-4">
                <div className="icon-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                </div>
                <h3 className="font-semibold text-lg">Data Visualization</h3>
              </div>
              {/* Service 3 */}
              <div className="flex items-center space-x-4">
                <div className="icon-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
                <h3 className="font-semibold text-lg">Cloud Deployment</h3>
              </div>
            </div>
            {/* Right Column: Text */}
            <div className="md:col-span-2">
              <h2 className="text-4xl font-bold mb-4 text-center md:text-left">About Me</h2>
              <p className="text-lg leading-relaxed">
                            {aboutMeText}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
