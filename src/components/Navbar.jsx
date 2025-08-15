import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 p-4 bg-[#E0E5EC]">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-black">VE.</a>
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
      </div>
    </nav>
  );
};

export default Navbar;
