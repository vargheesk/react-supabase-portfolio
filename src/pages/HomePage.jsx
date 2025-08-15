import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LoginModal from '../components/LoginModal';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Faq from '../components/Faq';
import Footer from '../components/Footer';
import Experience from '../components/Experience';
import Certificates from '../components/Certificates';
import { supabase } from '../lib/supabaseClient';

const HomePage = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [siteData, setSiteData] = useState({
    projects: [],
    skills: [],
    experiences: [],
    certificates: [],
    siteConfig: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteData = async () => {
      setLoading(true);
      try {
        const [
          projectsRes,
          skillsRes,
          experiencesRes,
          certificatesRes,
          faqRes,
          siteConfigRes
        ] = await Promise.all([
          supabase.from('projects').select('*').order('created_at', { ascending: false }),
          supabase.from('skills').select('*').order('created_at'),
          supabase.from('experience').select('*').order('created_at', { ascending: false }),
          supabase.from('certificates').select('*').order('issue_date', { ascending: false }),
          supabase.from('faq').select('*').order('created_at'),
          supabase.from('site_config').select('*')
        ]);

        if (projectsRes.error) throw projectsRes.error;
        if (skillsRes.error) throw skillsRes.error;
        if (experiencesRes.error) throw experiencesRes.error;
        if (certificatesRes.error) throw certificatesRes.error;
        if (faqRes.error) throw faqRes.error;
        if (siteConfigRes.error) throw siteConfigRes.error;

        const siteConfigObject = siteConfigRes.data.reduce((acc, curr) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {});

        setSiteData({
          projects: projectsRes.data || [],
          skills: skillsRes.data || [],
          experiences: experienceRes.data || [],
          certificates: certificatesRes.data || [],
          faq: faqRes.data || [],
          siteConfig: siteConfigObject,
        });

      } catch (error) {
        console.error("Error fetching site data:", error);
        // Optionally set an error state here to show an error message in the UI
      } finally {
        setLoading(false);
      }
    };

    fetchSiteData();
  }, []);


  const handleOpenLoginModal = () => setLoginModalOpen(true);
  const handleCloseLoginModal = () => setLoginModalOpen(false);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="antialiased">
      <Navbar />
      <main>
        <Hero
          onOpenLoginModal={handleOpenLoginModal}
          title={siteData.siteConfig.hero_title}
          subtitle={siteData.siteConfig.hero_subtitle}
          imageUrl={siteData.siteConfig.profile_picture_url}
        />
        <About aboutMeText={siteData.siteConfig.about_me} />
        <Experience experiences={siteData.experiences} />
        <Projects projects={siteData.projects.slice(0, 3)} />
        <Skills skills={siteData.skills} />
        <Certificates certificates={siteData.certificates.slice(0, 3)} />
        <Faq faqs={siteData.faqs} />
      </main>
      <Footer
        introText={siteData.siteConfig.footer_intro_text}
        linkedinUrl={siteData.siteConfig.linkedin_url}
        githubUrl={siteData.siteConfig.github_url}
        instagramUrl={siteData.siteConfig.instagram_url}
        cvUrl={siteData.siteConfig.cv_download_url}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </div>
  );
};

export default HomePage;
