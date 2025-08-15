import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Footer = ({ introText, linkedinUrl, githubUrl, instagramUrl, cvUrl }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [formState, setFormState] = useState({ loading: false, error: null, success: null });

  const downloadCV = () => {
    if (!cvUrl) return;
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Vargheeskutty_Eldhose_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCvButtonClick = (e) => {
    const button = e.currentTarget;
    button.classList.toggle('neumorphic-dark-pressed');
    button.classList.toggle('neumorphic-dark-raised');
    downloadCV();
    setTimeout(() => {
      button.classList.add('neumorphic-dark-pressed');
      button.classList.remove('neumorphic-dark-raised');
    }, 300);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormState({ loading: true, error: null, success: null });

    const { data, error } = await supabase.functions.invoke('contact-form', {
      body: { subject, body },
    });

    if (error) {
      setFormState({ loading: false, error: 'Failed to send message. Please try again later.', success: null });
    } else {
      setFormState({ loading: false, error: null, success: 'Message sent successfully!' });
      setSubject('');
      setBody('');
    }
  };

  return (
    <footer id="contact" className="footer-dark pt-20 pb-10">
      <div className="container mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-16 items-center">

        {/* Left Side: CV and Socials */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="mb-6">{introText || "I'm currently open to new opportunities and collaborations. Feel free to reach out if you have a project in mind or just want to connect!"}</p>
          <div className="flex items-center space-x-8">
            <button id="footer-cv-button" onClick={handleCvButtonClick} className="neumorphic-dark-pressed font-semibold px-6 py-3">
              Download CV
            </button>
            <div className="flex space-x-6">
              <a href={linkedinUrl || '#'} aria-label="LinkedIn Profile" className="social-icon" target="_blank" rel="noopener noreferrer">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href={githubUrl || '#'} aria-label="GitHub Profile" className="social-icon" target="_blank" rel="noopener noreferrer">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href={instagramUrl || '#'} aria-label="Instagram Profile" className="social-icon" target="_blank" rel="noopener noreferrer">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-[#262626] p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6 text-white text-center md:text-left">Get In Touch</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-400 text-sm font-bold mb-2">Subject</label>
              <input type="text" id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="body" className="block text-gray-400 text-sm font-bold mb-2">Message</label>
              <textarea id="body" name="body" rows="4" value={body} onChange={(e) => setBody(e.target.value)} required className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            {formState.success && <p className="text-green-500 text-sm mb-4">{formState.success}</p>}
            {formState.error && <p className="text-red-500 text-sm mb-4">{formState.error}</p>}
            <button type="submit" disabled={formState.loading} className="w-full bg-gray-800 hover:bg-black text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-500">
              {formState.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-16 pt-6 text-center">
        <p className="text-sm text-gray-500">&copy; {year} Vargheeskutty Eldhose. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
