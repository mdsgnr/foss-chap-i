import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Lock, Unlock, Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhatIsFreeSoftware() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const quoteCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const body = bodyRef.current;
    const quoteCard = quoteCardRef.current;

    if (!section || !title || !body || !quoteCard) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=120%',
          pin: false,
          scrub: 0.6,
          id: 'what-is-free-software',
        },
      });

      // Title entrance (0% - 30%)
      scrollTl.fromTo(
        title,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Body entrance (5% - 30%)
      scrollTl.fromTo(
        body,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Quote card entrance (0% - 30%)
      scrollTl.fromTo(
        quoteCard,
        { x: '50vw', rotateZ: 4, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'none' },
        0
      );

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        title,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        body,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        quoteCard,
        { x: 0, rotateZ: 0, opacity: 1 },
        { x: '14vw', rotateZ: -3, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Ambient animation for quote card during settle
      gsap.to(quoteCard, {
        scale: 1.01,
        duration: 6,
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
      id="what-is-free-software"
      className="section-container relative min-h-screen flex items-center bg-dark overflow-hidden z-20"
    >
      {/* Background blobs */}
      <div
        className="gradient-blob w-[50vw] h-[50vw] bg-violet/25"
        style={{ left: '-15%', top: '-20%' }}
      />
      <div
        className="gradient-blob w-[40vw] h-[40vw] bg-teal/20"
        style={{ right: '-10%', bottom: '-15%' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <h2
              ref={titleRef}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-8"
            >
              What is{' '}
              <span className="text-gradient">Free Software?</span>
            </h2>

            <div ref={bodyRef} className="space-y-6">
              <p className="text-lg lg:text-xl text-foreground leading-relaxed">
                When we talk about "free software," many students think of software 
                that costs nothing. While this is sometimes true, the word{' '}
                <span className="text-coral font-semibold">"free"</span> in 
                "free software" means{' '}
                <span className="text-coral font-semibold">freedom</span>, not price.
              </p>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-coral" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold mb-2">
                      Think of it this way:
                    </p>
                    <p className="text-muted-foreground">
                      When we say <span className="text-coral">"free speech,"</span> we 
                      mean the freedom to express yourself, not that speaking costs nothing. 
                      Similarly, <span className="text-coral">"free software"</span> means 
                      software that respects your freedom to use, study, modify, and share it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-electric/20 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-electric" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold mb-2">
                      The Car Analogy:
                    </p>
                    <p className="text-muted-foreground">
                      Imagine buying a car but being told you cannot open the hood, 
                      cannot take it to any mechanic except the official dealer, and 
                      cannot modify it. You own the car, but you do not have{' '}
                      <span className="text-coral">freedom</span> over it. This is 
                      what happens with most proprietary software today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Quote card */}
          <div ref={quoteCardRef} className="relative">
            <div className="gradient-card p-8 lg:p-10 rounded-[32px] relative overflow-hidden">
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="w-16 h-16 text-coral" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coral to-violet flex items-center justify-center mb-6">
                  <Unlock className="w-8 h-8 text-white" />
                </div>

                <blockquote className="font-heading text-2xl lg:text-3xl text-foreground leading-tight mb-6">
                  "A program is free software if the{' '}
                  <span className="text-coral">users control the program</span>— 
                  not the other way around."
                </blockquote>

                <div className="border-t border-white/10 pt-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Free software gives users the freedom to{' '}
                    <span className="text-foreground font-medium">run</span>,{' '}
                    <span className="text-foreground font-medium">copy</span>,{' '}
                    <span className="text-foreground font-medium">distribute</span>,{' '}
                    <span className="text-foreground font-medium">study</span>,{' '}
                    <span className="text-foreground font-medium">change</span>, and{' '}
                    <span className="text-foreground font-medium">improve</span> the 
                    software. These freedoms are fundamental rights that users should have.
                  </p>
                </div>
              </div>

              {/* Decorative gradient */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-coral/30 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
