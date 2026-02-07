import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import HeroSection from './sections/HeroSection';
import WhatIsFreeSoftware from './sections/WhatIsFreeSoftware';
import HistorySection from './sections/HistorySection';
import FourFreedoms from './sections/FourFreedoms';
import FreeVsOpenSource from './sections/FreeVsOpenSource';
import EconomicImpact from './sections/EconomicImpact';
import EducationalImpact from './sections/EducationalImpact';
import CrackedSoftware from './sections/CrackedSoftware';
import FOSSInAlgeria from './sections/FOSSInAlgeria';
import GNUGPL from './sections/GNUGPL';
import AndroidVsIOS from './sections/AndroidVsIOS';
import Conclusion from './sections/Conclusion';
import Discussion from './sections/Discussion';
import Navigation from './sections/Navigation';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global scroll snap for smooth section transitions
    const setupGlobalSnap = () => {
      const sections = gsap.utils.toArray<HTMLElement>('.section-container');
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll) return;

      const sectionRanges = sections.map((section) => {
        const trigger = ScrollTrigger.getById(section.id);
        if (trigger) {
          return {
            start: trigger.start / maxScroll,
            end: trigger.end / maxScroll,
            center: (trigger.start + (trigger.end - trigger.start) * 0.5) / maxScroll,
          };
        }
        return null;
      }).filter(Boolean);

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inSection = sectionRanges.some(
              (range) => value >= (range?.start || 0) && value <= (range?.end || 0)
            );
            if (!inSection) return value;

            const target = sectionRanges.reduce(
              (closest, range) =>
                Math.abs((range?.center || 0) - value) < Math.abs(closest - value)
                  ? (range?.center || 0)
                  : closest,
              sectionRanges[0]?.center || 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-dark text-foreground">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        <HeroSection />
        <WhatIsFreeSoftware />
        <HistorySection />
        <FourFreedoms />
        <FreeVsOpenSource />
        <EconomicImpact />
        <EducationalImpact />
        <CrackedSoftware />
        <FOSSInAlgeria />
        <GNUGPL />
        <AndroidVsIOS />
        <Conclusion />
        <Discussion />
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-8 bg-dark text-center border-t border-white/5">
        <p className="text-muted-foreground text-sm">
          FOSS Course - Chapter 1 | University of Tipaza | Lecturer: Mr. Mirad Moussa
        </p>
        <p className="text-muted-foreground/60 text-xs mt-2">
          Student Platform: mirad.rf.gd (Classia) | Academic Year: 2025/2026
        </p>
      </footer>
    </div>
  );
}

export default App;
