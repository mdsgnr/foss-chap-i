import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Copyright, RotateCcw, Shield, CheckCircle, Code2, FileKey } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const gplRules = [
  'Anyone can use the software for any purpose',
  'Source code must be available',
  'Anyone can modify and share',
  'Modified versions must also be GPL',
  'No additional restrictions allowed',
];

export default function GNUGPL() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const symbolCardRef = useRef<HTMLDivElement>(null);
  const explanationCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const symbolCard = symbolCardRef.current;
    const explanationCard = explanationCardRef.current;

    if (!section || !title || !symbolCard || !explanationCard) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=120%',
          pin: false,
          scrub: 0.6,
          id: 'license',
        },
      });

      // Title entrance (0% - 20%)
      scrollTl.fromTo(
        title,
        { y: '-8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Symbol card entrance (5% - 30%)
      scrollTl.fromTo(
        symbolCard,
        { scale: 0.7, rotateZ: -8, opacity: 0 },
        { scale: 1, rotateZ: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Explanation card entrance (10% - 30%)
      scrollTl.fromTo(
        explanationCard,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Ambient rotation for symbol card during settle
      gsap.to(symbolCard, {
        rotateZ: 4,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        title,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        symbolCard,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        explanationCard,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container relative min-h-screen flex items-center bg-dark overflow-hidden z-[100]"
    >
      {/* Background blobs */}
      <div
        className="gradient-blob w-[45vw] h-[45vw] bg-electric/20"
        style={{ right: '-10%', top: '5%' }}
      />
      <div
        className="gradient-blob w-[40vw] h-[40vw] bg-coral/15"
        style={{ left: '-5%', bottom: '10%' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground text-center mb-16"
        >
          The GNU GPL:{' '}
          <span className="text-gradient">Protecting Freedom</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Copyleft symbol card */}
          <div ref={symbolCardRef}>
            <div className="glass-card p-8 lg:p-12 rounded-[32px] text-center">
              <div className="relative inline-block mb-8">
                {/* Copyleft symbol */}
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-coral flex items-center justify-center mx-auto">
                  <div className="relative">
                    <Copyright className="w-16 h-16 lg:w-20 lg:h-20 text-coral" />
                    <RotateCcw className="w-8 h-8 lg:w-10 lg:h-10 text-coral absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-coral/30 blur-2xl -z-10 mx-auto" />
              </div>

              <h3 className="font-heading text-2xl text-foreground mb-4">
                What is Copyleft?
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Copyleft is a clever idea invented by Richard Stallman. While copyright 
                restricts what people can do, copyleft{' '}
                <span className="text-coral font-medium">ensures software stays free</span>.
              </p>

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center text-coral text-xs font-bold">1</span>
                  <span className="text-foreground text-sm">The author copyrights the work</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center text-coral text-xs font-bold">2</span>
                  <span className="text-foreground text-sm">The license grants all four freedoms</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center text-coral text-xs font-bold">3</span>
                  <span className="text-foreground text-sm">Anyone distributing must pass on the same freedoms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Explanation card */}
          <div ref={explanationCardRef}>
            <div className="glass-card p-8 rounded-[32px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-electric/20 flex items-center justify-center">
                  <FileKey className="w-6 h-6 text-electric" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-foreground">
                    The GNU GPL
                  </h3>
                  <p className="text-electric text-sm">
                    General Public License
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                The GPL is the most widely used copyleft license. First released in 1989, 
                current version is GPL v3 (2007). It protects software freedom through 
                legal enforcement.
              </p>

              <div className="mb-6">
                <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal" />
                  Key Rules:
                </h4>
                <div className="space-y-2">
                  {gplRules.map((rule, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-white/5 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
                      <span className="text-foreground text-sm">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-electric/20 rounded-xl border border-electric/30">
                <div className="flex items-start gap-3">
                  <Code2 className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium text-sm mb-1">
                      Why it matters:
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Without the GPL, someone could take free software, modify it, and 
                      make it proprietary. The GPL prevents this. Linux uses the GPL—
                      companies like Google and Samsung must release any modifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
