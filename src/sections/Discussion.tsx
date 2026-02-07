import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, ExternalLink, GraduationCap, Lightbulb, Globe, TrendingUp, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const questions = [
  {
    icon: GraduationCap,
    question: 'How would your education be different if all software at the university required expensive licenses?',
  },
  {
    icon: Shield,
    question: 'Where is access to source code important for safety? Think about medical devices, voting machines, and banking systems.',
  },
  {
    icon: Lightbulb,
    question: 'Is software freedom an ethical issue or a practical matter? Why?',
  },
  {
    icon: Globe,
    question: 'What challenges might Algeria face in adopting free software? How can we address these challenges?',
  },
  {
    icon: TrendingUp,
    question: 'How can free software help Algeria become a leading African economy in technology?',
  },
];

export default function Discussion() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;

    if (!section || !title || !leftCard || !rightCard) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=120%',
          pin: false,
          scrub: 0.6,
          id: 'discuss',
        },
      });

      // Title entrance (0% - 20%)
      scrollTl.fromTo(
        title,
        { y: '-6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Left card entrance (5% - 30%)
      scrollTl.fromTo(
        leftCard,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Right card entrance (5% - 30%)
      scrollTl.fromTo(
        rightCard,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
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
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightCard,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="discuss"
      className="section-container relative min-h-screen flex items-center bg-dark overflow-hidden z-[130]"
    >
      {/* Background gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(255, 77, 109, 0.2) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground text-center mb-16"
        >
          Discussion &{' '}
          <span className="text-gradient">Next Steps</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left card - Discussion questions */}
          <div ref={leftCardRef}>
            <div className="glass-card p-8 rounded-[32px] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-foreground">
                    Discussion Questions
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Think about these topics
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {questions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/[0.08] transition-colors duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-coral" />
                      </div>
                      <p className="text-foreground text-sm leading-relaxed">
                        {item.question}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right card - Contact & next steps */}
          <div ref={rightCardRef}>
            <div className="glass-card p-8 rounded-[32px] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-electric/20 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-electric" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-foreground">
                    Next Steps
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Continue your learning journey
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Chapter 2 preview */}
                <div className="p-5 bg-gradient-to-r from-electric/10 to-violet/10 rounded-2xl border border-electric/30">
                  <h4 className="text-foreground font-medium mb-2">
                    Chapter 2 Preview
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Software Licenses and their relevance to Algeria
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-electric/20 text-electric text-xs rounded-full">
                      GPL
                    </span>
                    <span className="px-3 py-1 bg-electric/20 text-electric text-xs rounded-full">
                      MIT
                    </span>
                    <span className="px-3 py-1 bg-electric/20 text-electric text-xs rounded-full">
                      Apache
                    </span>
                    <span className="px-3 py-1 bg-electric/20 text-electric text-xs rounded-full">
                      BSD
                    </span>
                  </div>
                </div>

                {/* Contact info */}
                <div className="p-5 bg-white/5 rounded-2xl">
                  <h4 className="text-foreground font-medium mb-3">
                    Connect & Learn More
                  </h4>
                  <a
                    href="https://mirad.rf.gd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-coral/10 rounded-xl hover:bg-coral/20 transition-colors duration-300 group"
                  >
                    <div>
                      <p className="text-foreground font-medium">mirad.rf.gd</p>
                      <p className="text-muted-foreground text-sm">Classia Platform</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-coral group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Course info */}
                <div className="p-5 bg-white/5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <GraduationCap className="w-5 h-5 text-violet" />
                    <span className="text-foreground font-medium">Course Details</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">University:</span>
                      <span className="text-foreground">University of Tipaza</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Faculty:</span>
                      <span className="text-foreground">Faculty of Science</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <span className="text-foreground">Process Engineering</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="text-foreground">1st Year Engineer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lecturer:</span>
                      <span className="text-coral">Mr. Mirad Moussa</span>
                    </div>
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
