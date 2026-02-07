import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Laptop, BookOpen, Users, Download, GraduationCap, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Download,
    title: 'Install Everywhere',
    description:
      'Students can install professional tools at home legally. No license restrictions.',
  },
  {
    icon: BookOpen,
    title: 'Learn from Real Code',
    description:
      'Study source code to understand how software works. Learn by reading and modifying.',
  },
  {
    icon: Users,
    title: 'Equal Access',
    description:
      'No paywalls means a level playing field for all learners, regardless of background.',
  },
];

const tools = [
  { name: 'Python', category: 'Programming' },
  { name: 'LibreOffice', category: 'Productivity' },
  { name: 'GIMP', category: 'Design' },
  { name: 'Blender', category: '3D' },
  { name: 'VS Code', category: 'Development' },
  { name: 'Scilab', category: 'Engineering' },
];

export default function EducationalImpact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const featureItems = featuresRef.current.filter(Boolean);
    const image = imageRef.current;

    if (!section || !title || featureItems.length === 0 || !image) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=120%',
          pin: false,
          scrub: 0.6,
          id: 'educational',
        },
      });

      // Title entrance (0% - 20%)
      scrollTl.fromTo(
        title,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Feature items entrance (staggered, 10% - 30%)
      featureItems.forEach((item, i) => {
        scrollTl.fromTo(
          item,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1 + i * 0.08
        );
      });

      // Image entrance (5% - 30%)
      scrollTl.fromTo(
        image,
        { x: '50vw', rotateZ: 3, opacity: 0 },
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

      featureItems.forEach((item) => {
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
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container relative min-h-screen flex items-center bg-dark overflow-hidden z-[70]"
    >
      {/* Background blobs */}
      <div
        className="gradient-blob w-[45vw] h-[45vw] bg-violet/20"
        style={{ right: '-15%', top: '5%' }}
      />
      <div
        className="gradient-blob w-[35vw] h-[35vw] bg-teal/15"
        style={{ left: '-10%', bottom: '10%' }}
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
              Educational{' '}
              <span className="text-gradient">Impact</span>
            </h2>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    ref={(el) => { featuresRef.current[index] = el; }}
                  >
                    <div className="glass-card p-5 rounded-2xl hover:border-coral/30 transition-colors duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-coral/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-coral" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg text-foreground mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tools section */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Laptop className="w-5 h-5 text-electric" />
                <span className="text-foreground font-medium">
                  Free tools available now:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
                    <span className="text-foreground text-sm">{tool.name}</span>
                    <span className="text-muted-foreground text-xs">
                      ({tool.category})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Caption */}
            <div className="mt-6 flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-violet" />
              <p className="text-muted-foreground text-sm">
                A student anywhere in Algeria can download the same free tools that 
                professionals use in major companies.
              </p>
            </div>
          </div>

          {/* Right content - Image */}
          <div ref={imageRef}>
            <div className="relative rounded-[32px] overflow-hidden shadow-card">
              <img
                src="/images/education_student_laptop.jpg"
                alt="Student learning"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card p-5 rounded-2xl">
                  <p className="text-foreground font-medium mb-2">
                    Tipaza students can install and practice
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Every student can have the same professional tools on their own 
                    computers—legally and for free.
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
