import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Profiles from './components/Profiles';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Premium Utilities
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ParticlesBackground from './components/ParticlesBackground';
import ScrollToTop from './components/ScrollToTop';
import PortfolioAssistant from './components/PortfolioAssistant';

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-blue-500/30 selection:text-blue-200">
      {/* Top scroll bar */}
      <ScrollProgress />

      {/* Global Interactive Elements */}
      <LoadingScreen />
      <CustomCursor />
      <ParticlesBackground />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Main Pages */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <Profiles />
        <Contact />
      </main>

      {/* Floating AI Portfolio Assistant */}
      <PortfolioAssistant />

      {/* Back to top floating indicator */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
