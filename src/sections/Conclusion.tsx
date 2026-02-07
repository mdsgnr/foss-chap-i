import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, BookOpen, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const takeaways = [
  {
    title: 'Free Software = Freedom',
    description: 'Freedom to run, study, modify, and share software.',
  },
  {
    title: 'GNU + Linux',
    description: 'Created a complete free operating system that powers millions of devices.',
  },
  {
    title: 'Copyleft Protection',
    description: 'The GPL keeps improvements free for everyone through legal enforcement.',
  },
  {
    title: 'Major Benefits',
    description: 'Cost savings, better education, job creation, and technological independence.',
  },
];

export default function Conclusion() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const takeawaysRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const takeawayItems = takeawaysRef.current.filter(Boolean);
    const image = imageRef.current;

    if (!section || !title || takeawayItems.length === 0 || !image) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=120%',
          pin: false,
          scrub: 0.6,
          id: 'conclusion',
        },
      });

      // Title entrance (0% - 20%)
      scrollTl.fromTo(
        title,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Takeaways entrance (staggered, 10% - 30%)
      takeawayItems.forEach((item, i) => {
        scrollTl.fromTo(
          item,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1 + i * 0.07
        );
      });

      // Image entrance (5% - 30%)
      scrollTl.fromTo(
        image,
        { x: '40vw', rotateZ: 2, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        title,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      takeawayItems.forEach((item) => {
        scrollTl.fromTo(
          item,
          { x: 0, opacity: 1 },
          { x: '-6vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      });

      scrollTl.fromTo(
        image,
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
      className="section-container relative min-h-screen flex items-center bg-dark overflow-hidden z-[120]"
    >
      {/* Background blobs */}
      <div
        className="gradient-blob w-[45vw] h-[45vw] bg-coral/20"
        style={{ left: '-10%', top: '10%' }}
      />
      <div
        className="gradient-blob w-[40vw] h-[40vw] bg-electric/15"
        style={{ right: '-5%', bottom: '10%' }}
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
              <span className="text-gradient">Conclusion</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The free software movement started in the early 1980s when Richard Stallman 
              was frustrated with proprietary software. Today, it powers much of our digital world.
            </p>

            {/* Key takeaways */}
            <div className="space-y-4 mb-8">
              {takeaways.map((takeaway, index) => (
                <div
                  key={takeaway.title}
                  ref={(el) => { takeawaysRef.current[index] = el; }}
                >
                  <div className="flex items-start gap-4 p-4 glass-card rounded-xl hover:border-coral/30 transition-colors duration-300">
                    <div className="w-8 h-8 rounded-lg bg-coral/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-coral" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-1">
                        {takeaway.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {takeaway.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next chapter preview */}
            <div className="glass-card p-5 rounded-2xl bg-gradient-to-r from-electric/10 to-violet/10 border-electric/30">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-electric" />
                <span className="text-foreground font-medium">Coming Up Next:</span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Chapter 2 will explore different types of licenses and their relevance to Algeria.
              </p>
              <div className="flex items-center gap-2 text-electric text-sm">
                <span>Software Licenses & Algeria</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Right content - Image */}
          <div ref={imageRef}>
            <div className="relative rounded-[32px] overflow-hidden shadow-card">
              <img
                src="/images/conclusion_next_chapter.jpg"
                alt="Next chapter"
                className="w-full h-[450px] lg:h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

              {/* Overlay quote */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card p-5 rounded-2xl">
                  <p className="text-foreground italic leading-relaxed">
                    "As future engineers, understanding free software helps you make good 
                    choices about the tools you use. The free software movement shows that 
                    technology can serve users' freedom."
                  </p>
                  <p className="text-coral text-sm mt-3">
                    — Mr. Mirad Moussa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
