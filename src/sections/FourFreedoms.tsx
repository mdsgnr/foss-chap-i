import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, BookOpen, Share2, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const freedoms = [
  {
    number: '0',
    title: 'Run',
    fullTitle: 'Freedom 0 — Run the Program',
    description:
      'You can run the program for any purpose (home, school, business, research). No restrictions on who can use it or how.',
    example: 'LibreOffice Writer can be used for essays, business documents, or anything else.',
    icon: Play,
    gradient: 'from-coral to-rose-500',
  },
  {
    number: '1',
    title: 'Study',
    fullTitle: 'Freedom 1 — Study and Modify',
    description:
      'You can study how the program works and change it. This requires access to the source code (the instructions programmers write).',
    example:
      'A university can adapt free accounting software to Algerian tax laws by hiring a programmer.',
    icon: BookOpen,
    gradient: 'from-electric to-blue-500',
  },
  {
    number: '2',
    title: 'Share',
    fullTitle: 'Freedom 2 — Share Copies',
    description:
      'You can give copies to friends, post it online, or install it on multiple computers without paying extra.',
    example: 'You can share useful engineering software with your entire class.',
    icon: Share2,
    gradient: 'from-violet to-purple-500',
  },
  {
    number: '3',
    title: 'Improve',
    fullTitle: 'Freedom 3 — Share Modified Versions',
    description:
      'You can improve the software and share your improvements with others so the whole community benefits.',
    example:
      'A student can modify an engineering program and share the improved version with other universities.',
    icon: RefreshCw,
    gradient: 'from-teal to-emerald-500',
  },
];

export default function FourFreedoms() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const intro = introRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !title || !intro || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=140%',
          pin: false,
          scrub: 0.6,
          id: 'freedoms',
        },
      });

      // Title entrance (0% - 20%)
      scrollTl.fromTo(
        title,
        { y: '-6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Intro entrance
      scrollTl.fromTo(
        intro,
        { y: '-4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Cards entrance (staggered, 10% - 30%)
      cards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { y: '60vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.1 + i * 0.06
        );
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        title,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        intro,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      cards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7 + i * 0.06
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="freedoms"
      className="section-container relative min-h-screen bg-dark overflow-hidden z-40"
    >
      {/* Background blobs */}
      <div
        className="gradient-blob w-[45vw] h-[45vw] bg-electric/20"
        style={{ right: '-15%', top: '-10%' }}
      />
      <div
        className="gradient-blob w-[40vw] h-[40vw] bg-violet/20"
        style={{ left: '-10%', bottom: '-15%' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4"
          >
            The Four{' '}
            <span className="text-gradient">Essential Freedoms</span>
          </h2>
          <p ref={introRef} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A program is free software if the users have these four freedoms. 
            All four work together—if any is missing, the software is not truly free.
          </p>
        </div>

        {/* Freedom cards grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {freedoms.map((freedom, index) => {
            const Icon = freedom.icon;
            return (
              <div
                key={freedom.number}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group"
              >
                <div className="glass-card h-full p-6 lg:p-8 rounded-[32px] hover:border-coral/30 transition-all duration-300 hover:-translate-y-1">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${freedom.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-glow transition-shadow duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="mono-label text-coral mb-1">
                        Freedom {freedom.number}
                      </div>
                      <h3 className="font-heading text-xl lg:text-2xl text-foreground">
                        {freedom.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-foreground leading-relaxed mb-4">
                    {freedom.description}
                  </p>

                  {/* Example */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-coral font-medium">Example:</span>{' '}
                      {freedom.example}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            These freedoms are numbered 0 to 3 according to computer science tradition 
            (starting from zero). They were first defined by Richard Stallman and the Free Software Foundation.
          </p>
        </div>
      </div>
    </section>
  );
}
