import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Rocket, Cpu, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: '1960s–70s',
    title: 'Cooperation & Sharing',
    description:
      'Researchers at MIT and Stanford shared code freely. If someone wrote a useful program, they would give it to others. Everyone benefited from this cooperation.',
    icon: Users,
    image: '/images/history_early_sharing.jpg',
    side: 'left',
  },
  {
    year: '1983',
    title: 'The GNU Project',
    description:
      'Frustrated by proprietary software, Richard Stallman announces the GNU Project on September 27, 1983, to create a complete free software operating system.',
    icon: Rocket,
    image: '/images/history_stallman_gnu.jpg',
    side: 'right',
  },
  {
    year: '1991',
    title: 'Linux & GNU/Linux',
    description:
      'Linus Torvalds creates the Linux kernel and releases it under the GPL. Combined with GNU tools, this creates a complete free operating system.',
    icon: Cpu,
    image: '/images/history_linux_kernel.jpg',
    side: 'left',
  },
];

export default function HistorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const track = trackRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const nodes = nodesRef.current.filter(Boolean);

    if (!section || !title || !track || cards.length === 0 || nodes.length === 0) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=130%',
          pin: false,
          scrub: 0.6,
          id: 'history',
        },
      });

      // Title entrance
      scrollTl.fromTo(
        title,
        { y: '-8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Track draw-on animation
      scrollTl.fromTo(
        track,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', transformOrigin: 'top center' },
        0
      );

      // Nodes entrance (staggered)
      nodes.forEach((node, i) => {
        scrollTl.fromTo(
          node,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
          0.1 + i * 0.08
        );
      });

      // Cards entrance (alternating)
      cards.forEach((card, i) => {
        const isLeft = timelineEvents[i].side === 'left';
        scrollTl.fromTo(
          card,
          { x: isLeft ? '-40vw' : '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05 + i * 0.1
        );
      });

      // EXIT phase
      scrollTl.fromTo(
        title,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        track,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      nodes.forEach((node) => {
        scrollTl.fromTo(
          node,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.72
        );
      });

      cards.forEach((card, i) => {
        const isLeft = timelineEvents[i].side === 'left';
        scrollTl.fromTo(
          card,
          { x: 0, opacity: 1 },
          { x: isLeft ? '-10vw' : '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="history"
      className="section-container relative min-h-screen bg-dark-light overflow-hidden z-30"
    >
      {/* Background blob */}
      <div
        className="gradient-blob w-[60vw] h-[60vw] bg-coral/15"
        style={{ left: '20%', top: '10%' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground text-center mb-16"
        >
          History of the{' '}
          <span className="text-gradient">Free Software Movement</span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical track - hidden on mobile */}
          <div
            ref={trackRef}
            className="hidden lg:block absolute left-1/2 top-0 w-1 h-full -translate-x-1/2 rounded-full bg-gradient-to-b from-coral via-violet to-electric opacity-30"
          />

          {/* Events */}
          <div className="space-y-12 lg:space-y-0">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLeft = event.side === 'left';

              return (
                <div
                  key={event.year}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                    index > 0 ? 'lg:mt-16' : ''
                  }`}
                >
                  {/* Node - hidden on mobile */}
                  <div
                    ref={(el) => { nodesRef.current[index] = el; }}
                    className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-20"
                  >
                    <div className="w-12 h-12 rounded-full bg-dark border-2 border-coral flex items-center justify-center shadow-glow">
                      <Calendar className="w-5 h-5 text-coral" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    ref={(el) => { cardsRef.current[index] = el; }}
                    className={`${isLeft ? 'lg:pr-20' : 'lg:col-start-2 lg:pl-20'}`}
                  >
                    <div className="glass-card rounded-[32px] overflow-hidden group hover:border-coral/30 transition-colors duration-300">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-light to-transparent" />
                        
                        {/* Year badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-coral text-white text-sm font-bold rounded-full">
                            <Icon className="w-4 h-4" />
                            {event.year}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-heading text-xl lg:text-2xl text-foreground mb-3">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
