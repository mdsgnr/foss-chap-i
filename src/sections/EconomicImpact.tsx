import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DollarSign, Briefcase, Zap, TrendingUp, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: DollarSign,
    title: 'Save on Licenses',
    description: 'No licensing fees. Redirect budget to hardware, training, and support.',
    highlight: '$0',
    subtext: ' licensing cost',
  },
  {
    icon: Briefcase,
    title: 'Create Local Jobs',
    description: 'Support, customization, and consulting grow local ecosystems.',
    highlight: '100%',
    subtext: 'local investment',
  },
  {
    icon: Zap,
    title: 'Faster Innovation',
    description: 'Reuse, remix, and build without legal friction or waiting.',
    highlight: '∞',
    subtext: 'possibilities',
  },
];

const companies = ['Google', 'Facebook', 'Amazon', 'Netflix', 'Twitter'];

export default function EconomicImpact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const statsCards = statsRef.current.filter(Boolean);
    const body = bodyRef.current;

    if (!section || !title || statsCards.length === 0 || !body) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=130%',
          pin: false,
          scrub: 0.6,
          id: 'impact',
        },
      });

      // Title entrance (0% - 20%)
      scrollTl.fromTo(
        title,
        { x: '-30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Stats cards entrance (staggered, 10% - 30%)
      statsCards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { y: '40vh', scale: 0.9, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.1 + i * 0.08
        );
      });

      // Body entrance (15% - 30%)
      scrollTl.fromTo(
        body,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        title,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      statsCards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.7 + i * 0.06
        );
      });

      scrollTl.fromTo(
        body,
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
      id="impact"
      className="section-container relative min-h-screen flex items-center bg-dark-light overflow-hidden z-[60]"
    >
      {/* Background blobs */}
      <div
        className="gradient-blob w-[45vw] h-[45vw] bg-electric/20"
        style={{ left: '-15%', top: '10%' }}
      />
      <div
        className="gradient-blob w-[40vw] h-[40vw] bg-coral/15"
        style={{ right: '-10%', bottom: '10%' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-12"
        >
          Economic{' '}
          <span className="text-gradient">Impact</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Stats cards */}
          <div className="space-y-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  ref={(el) => { statsRef.current[index] = el; }}
                >
                  <div className="glass-card p-6 rounded-2xl hover:border-coral/30 transition-colors duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center flex-shrink-0 group-hover:bg-coral/30 transition-colors">
                        <Icon className="w-6 h-6 text-coral" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg text-foreground mb-1">
                          {stat.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {stat.description}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading text-3xl text-coral">
                            {stat.highlight}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {stat.subtext}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right side - Body content */}
          <div ref={bodyRef}>
            <div className="glass-card p-8 rounded-[32px]">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-electric" />
                <h3 className="font-heading text-xl text-foreground">
                  Economic Benefits
                </h3>
              </div>

              <p className="text-foreground leading-relaxed mb-6">
                Free software saves money in multiple ways. Organizations can invest 
                savings in training and hardware instead of expensive licenses. 
                Startups can build products without costly software licenses, 
                enabling innovation at any scale.
              </p>

              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Compare proprietary costs:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground text-sm">Microsoft Office</span>
                    <span className="text-coral font-medium">$100-150/user</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground text-sm">Adobe Creative Suite</span>
                    <span className="text-coral font-medium">$50-80/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground text-sm">MATLAB</span>
                    <span className="text-coral font-medium">$800+ / license</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-5 h-5 text-violet" />
                  <span className="text-foreground font-medium">
                    Major companies using FOSS:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {companies.map((company) => (
                    <span
                      key={company}
                      className="px-3 py-1 bg-violet/20 text-violet text-sm rounded-full"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
