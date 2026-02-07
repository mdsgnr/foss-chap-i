import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Download, BookOpen, Code2, Share2, Box } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const image = imageRef.current;
    const blob = blobRef.current;

    if (!section || !title || !subtitle || !cta || !image || !blob) return;

    const ctx = gsap.context(() => {
      // Load animation (auto-play on mount)
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Blob drift animation
      gsap.to(blob, {
        x: '2vw',
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Title animation - split by words
      const words = title.querySelectorAll('.word');
      loadTl.fromTo(
        words,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 },
        0.2
      );

      // Subtitle
      loadTl.fromTo(
        subtitle,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.6
      );

      // CTAs
      loadTl.fromTo(
        cta.children,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.8
      );

      // Image card
      loadTl.fromTo(
        image,
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        0.4
      );

      // Scroll-driven EXIT animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: false,
          scrub: 0.6,
          id: 'hero',
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        title,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subtitle,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        cta,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        image,
        { x: 0, rotateZ: 0, opacity: 1 },
        { x: '10vw', rotateZ: 2, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const titleWords = 'Foundations of Free Software'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="section-container relative min-h-screen flex items-center bg-dark overflow-hidden z-10"
    >
      {/* Background gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(255, 77, 109, 0.25) 0%, transparent 55%)',
        }}
      />

      {/* Animated blob */}
      <div
        ref={blobRef}
        className="gradient-blob w-[42vw] h-[42vw] bg-electric/30"
        style={{ left: '58%', top: '14%' }}
      />

      {/* Decorative floating icons */}
      <div className="absolute left-[15%] top-[25%] opacity-20 animate-float">
        <Code2 className="w-8 h-8 text-coral" />
      </div>
      <div className="absolute left-[12%] top-[60%] opacity-15 animate-float-delayed">
        <Box className="w-6 h-6 text-electric" />
      </div>
      <div className="absolute right-[20%] top-[15%] opacity-15 animate-float">
        <Share2 className="w-7 h-7 text-teal" />
      </div>
      <div className="absolute right-[15%] bottom-[25%] opacity-10 animate-float-delayed">
        <BookOpen className="w-8 h-8 text-violet" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen">
          {/* Left content */}
          <div className="pt-16 lg:pt-0">
            {/* Label */}
            <div className="mono-label text-coral mb-6">
              Free & Open Source Software Course
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[0.95] mb-6"
            >
              {titleWords.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.25em]">
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg lg:text-xl text-muted-foreground max-w-md mb-8 leading-relaxed"
            >
              Chapter 1 — University of Tipaza, Faculty of Science  
              <br />
              <span className="text-coral">Department of Process Engineering</span>
              <br />
              <span className="text-sm">Academic Year: 2025/2026</span>
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a
                href="#what-is-free-software"
                className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white font-semibold rounded-2xl hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
              >
                <BookOpen className="w-5 h-5" />
                Start Reading
              </a>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-foreground font-semibold rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="hidden lg:flex items-center gap-2 mt-16 text-muted-foreground/60">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span className="text-sm">Scroll to explore</span>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div ref={imageRef} className="relative hidden lg:block">
            <div className="relative rounded-[32px] overflow-hidden shadow-card">
              <img
                src="/images/hero_team_collab.jpg"
                alt="Team collaboration"
                className="w-full h-[64vh] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              
              {/* Info badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-violet flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Mr. Mirad Moussa</p>
                      <p className="text-xs text-muted-foreground">Lecturer - FOSS Course</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-coral/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-electric/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
