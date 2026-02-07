import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flag, GraduationCap, BookOpen, Globe, Database, FileText, Landmark } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const initiatives = [
  {
    icon: Flag,
    title: 'Digital Sovereignty',
    description:
      'Adopting FOSS prevents vendor lock-in. Algerian institutions gain control over their digital infrastructure. Source code can be audited by local engineers.',
  },
  {
    icon: GraduationCap,
    title: 'Higher Education',
    description:
      'MESRS platforms (PNST, ASJP, SNDL) rely on open standards to enhance visibility of national research and serve the university network.',
  },
  {
    icon: BookOpen,
    title: 'National Research Programs',
    description:
      'PNR projects target open solutions for VoIP, e-learning platforms, and digital heritage preservation—shifting from consumers to producers.',
  },
];

const platforms = [
  { name: 'CERIST', description: 'Research center promoting open technologies', icon: Database },
  { name: 'PNST', description: 'National thesis portal using open standards', icon: FileText },
  { name: 'ASJP', description: 'Scientific journal platform', icon: BookOpen },
  { name: 'SNDL', description: 'National documentation system', icon: Globe },
];

export default function FOSSInAlgeria() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const body = bodyRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !title || !body || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=120%',
          pin: false,
          scrub: 0.6,
          id: 'algeria',
        },
      });

      // Title + body entrance (0% - 20%)
      scrollTl.fromTo(
        title,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        body,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Cards entrance (staggered, 10% - 30%)
      cards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1 + i * 0.08
        );
      });

      // Ambient float for cards during settle
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: '6px',
          duration: 5 + i * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        title,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        body,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      cards.forEach((card) => {
        scrollTl.fromTo(
          card,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container relative min-h-screen flex items-center bg-dark-light overflow-hidden z-[90]"
    >
      {/* Background blobs */}
      <div
        className="gradient-blob w-[45vw] h-[45vw] bg-teal/20"
        style={{ left: '-10%', top: '10%' }}
      />
      <div
        className="gradient-blob w-[40vw] h-[40vw] bg-violet/15"
        style={{ right: '-5%', bottom: '10%' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left content */}
          <div>
            <h2
              ref={titleRef}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6"
            >
              Impact of FOSS in{' '}
              <span className="text-gradient">Algeria</span>
            </h2>

            <div ref={bodyRef}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                For a developing nation like Algeria, FOSS is not just a technical choice. 
                It is a <span className="text-foreground font-medium">strategic economic 
                and sovereign imperative</span>.
              </p>

              {/* Platforms */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Landmark className="w-5 h-5 text-electric" />
                  <span className="text-foreground font-medium">
                    Key Algerian platforms using FOSS:
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <div
                        key={platform.name}
                        className="flex items-start gap-2 p-3 bg-white/5 rounded-xl"
                      >
                        <Icon className="w-4 h-4 text-violet flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-foreground text-sm font-medium">
                            {platform.name}
                          </span>
                          <p className="text-muted-foreground text-xs">
                            {platform.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Initiative cards */}
          <div className="space-y-4">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <div
                  key={initiative.title}
                  ref={(el) => { cardsRef.current[index] = el; }}
                >
                  <div className="glass-card p-6 rounded-2xl hover:border-coral/30 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coral to-violet flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg text-foreground mb-2">
                          {initiative.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {initiative.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Note card */}
            <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-coral/10 to-violet/10 border-coral/30">
              <p className="text-foreground text-sm leading-relaxed">
                <span className="font-semibold">At the University of Tipaza,</span> using 
                free software means every student can install and practice with the same 
                tools on their own computers—no expensive licenses required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
