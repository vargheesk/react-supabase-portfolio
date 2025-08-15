import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 p-4 bg-[#E0E5EC] shadow-md">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-black">VE.</a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <a href="#home" className="hover:text-black transition-colors">Home</a>
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#skills" className="hover:text-black transition-colors">Skills</a>
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>
        <a href="#contact" className="btn-hire hidden md:inline-block px-6 py-3 font-semibold">
          Hire Me
        </a>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="neumorphic-button p-3">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-[#E0E5EC] rounded-lg shadow-inner p-4">
          <a href="#home" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Home</a>
          <a href="#about" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">About</a>
          <a href="#skills" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Skills</a>
          <a href="#projects" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Projects</a>
          <a href="#contact" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Contact</a>
          <a href="#contact" className="block w-full text-center mt-4 btn-hire px-6 py-3 font-semibold">
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
