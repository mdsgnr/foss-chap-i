import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Code2, Check, Users, Briefcase, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const freeSoftwarePoints = [
  { icon: Heart, text: 'Ethical imperative' },
  { icon: Users, text: 'Community control' },
  { icon: Globe, text: 'Transparency as justice' },
];

const openSourcePoints = [
  { icon: Code2, text: 'Better code through review' },
  { icon: Check, text: 'Flexible licensing' },
  { icon: Briefcase, text: 'Business-friendly' },
];

export default function FreeVsOpenSource() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const vsBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    const vsBadge = vsBadgeRef.current;

    if (!section || !title || !leftCard || !rightCard || !vsBadge) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=120%',
          pin: false,
          scrub: 0.6,
          id: 'free-vs-open',
        },
      });

      // Title entrance (0% - 20%)
      scrollTl.fromTo(
        title,
        { y: '-8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Left card entrance (5% - 30%)
      scrollTl.fromTo(
        leftCard,
        { x: '-50vw', rotateZ: -3, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Right card entrance (5% - 30%)
      scrollTl.fromTo(
        rightCard,
        { x: '50vw', rotateZ: 3, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // VS badge entrance (15% - 30%)
      scrollTl.fromTo(
        vsBadge,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
        0.15
      );

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        title,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        leftCard,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightCard,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        vsBadge,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Ambient rotation for VS badge during settle
      gsap.to(vsBadge, {
        rotateZ: 8,
        duration: 7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container relative min-h-screen flex items-center bg-dark overflow-hidden z-50"
    >
      {/* Background blobs */}
      <div
        className="gradient-blob w-[40vw] h-[40vw] bg-coral/20"
        style={{ left: '-10%', top: '20%' }}
      />
      <div
        className="gradient-blob w-[35vw] h-[35vw] bg-teal/20"
        style={{ right: '-5%', bottom: '15%' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground text-center mb-16"
        >
          Free Software{' '}
          <span className="text-coral">vs</span>{' '}
          Open Source
        </h2>

        {/* Comparison cards */}
        <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* VS Badge - centered on desktop */}
          <div
            ref={vsBadgeRef}
            className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-20"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral to-violet flex items-center justify-center shadow-glow">
              <span className="font-heading font-bold text-white text-lg">VS</span>
            </div>
          </div>

          {/* Free Software Card */}
          <div ref={leftCardRef}>
            <div className="glass-card h-full p-8 rounded-[32px] border-l-4 border-l-coral">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-coral/20 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-coral" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-foreground">
                    Free Software
                  </h3>
                  <p className="text-coral text-sm">A social movement</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Focuses on <span className="text-foreground font-medium">user rights and freedom</span>. 
                Views software freedom as an ethical issue. The goal is a freer society where users 
                control their computing.
              </p>

              <div className="space-y-3">
                {freeSoftwarePoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={point.text}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                    >
                      <Icon className="w-5 h-5 text-coral flex-shrink-0" />
                      <span className="text-foreground text-sm">{point.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-muted-foreground">
                  Championed by the Free Software Foundation (FSF) and Richard Stallman
                </p>
              </div>
            </div>
          </div>

          {/* Open Source Card */}
          <div ref={rightCardRef}>
            <div className="glass-card h-full p-8 rounded-[32px] border-l-4 border-l-electric">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-electric/20 flex items-center justify-center">
                  <Code2 className="w-7 h-7 text-electric" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-foreground">
                    Open Source
                  </h3>
                  <p className="text-electric text-sm">A development methodology</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Focuses on <span className="text-foreground font-medium">practical benefits</span>. 
                Views open source as a way to build better software through collaboration. 
                The goal is better quality and efficiency.
              </p>

              <div className="space-y-3">
                {openSourcePoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={point.text}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                    >
                      <Icon className="w-5 h-5 text-electric flex-shrink-0" />
                      <span className="text-foreground text-sm">{point.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-muted-foreground">
                  Championed by the Open Source Initiative (OSI), created in 1998
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full">
            <span className="text-muted-foreground text-sm">
              <span className="text-foreground font-medium">Which term to use?</span>
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-coral text-sm">"Free software"</span>
            <span className="text-muted-foreground text-xs">for rights</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-electric text-sm">"Open source"</span>
            <span className="text-muted-foreground text-xs">for business</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-violet text-sm">"FOSS"</span>
            <span className="text-muted-foreground text-xs">to be neutral</span>
          </div>
        </div>
      </div>
    </section>
  );
}
