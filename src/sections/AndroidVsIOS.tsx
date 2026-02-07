import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Lock, Globe, DollarSign, CheckCircle2, XCircle, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const androidPoints = [
  { icon: Cpu, text: 'Based on Linux kernel and open source components' },
  { icon: Globe, text: 'Developed by Google but open to everyone' },
  { icon: CheckCircle2, text: 'Manufacturers can customize it freely' },
  { icon: DollarSign, text: 'Affordable phones for every budget' },
  { icon: Smartphone, text: 'Over 70% global smartphone market share' },
];

const iosPoints = [
  { icon: Lock, text: 'Closed source, owned by Apple' },
  { icon: DollarSign, text: 'Only available on expensive Apple devices' },
  { icon: XCircle, text: 'Cannot be modified or customized by users' },
  { icon: Smartphone, text: 'Less than 30% global market share' },
  { icon: Lock, text: 'Restricted ecosystem controlled by one company' },
];

export default function AndroidVsIOS() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const androidCardRef = useRef<HTMLDivElement>(null);
  const iosCardRef = useRef<HTMLDivElement>(null);
  const vsBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const androidCard = androidCardRef.current;
    const iosCard = iosCardRef.current;
    const vsBadge = vsBadgeRef.current;

    if (!section || !title || !androidCard || !iosCard || !vsBadge) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=120%',
          pin: false,
          scrub: 0.6,
          id: 'android-ios',
        },
      });

      // Title entrance (0% - 20%)
      scrollTl.fromTo(
        title,
        { y: '-6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Android card entrance (0% - 30%)
      scrollTl.fromTo(
        androidCard,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // iOS card entrance (0% - 30%)
      scrollTl.fromTo(
        iosCard,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // VS badge entrance (15% - 30%)
      scrollTl.fromTo(
        vsBadge,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
        0.15
      );

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        title,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        androidCard,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        iosCard,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        vsBadge,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container relative min-h-screen flex items-center bg-dark-light overflow-hidden z-[110]"
    >
      {/* Background blobs */}
      <div
        className="gradient-blob w-[40vw] h-[40vw] bg-teal/20"
        style={{ left: '5%', top: '15%' }}
      />
      <div
        className="gradient-blob w-[35vw] h-[35vw] bg-violet/15"
        style={{ right: '5%', bottom: '15%' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground text-center mb-16"
        >
          Real-World Example:{' '}
          <span className="text-gradient">Android vs iOS</span>
        </h2>

        {/* Comparison cards */}
        <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* VS Badge - centered on desktop */}
          <div
            ref={vsBadgeRef}
            className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-20"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal to-electric flex items-center justify-center shadow-glow">
              <span className="font-heading font-bold text-white">VS</span>
            </div>
          </div>

          {/* Android Card */}
          <div ref={androidCardRef}>
            <div className="glass-card h-full p-8 rounded-[32px] border-l-4 border-l-teal">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-teal/20 flex items-center justify-center">
                  <Smartphone className="w-7 h-7 text-teal" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-foreground">
                    Android
                  </h3>
                  <p className="text-teal text-sm">Open Source</p>
                </div>
              </div>

              <div className="relative mb-6 rounded-2xl overflow-hidden">
                <img
                  src="/images/android_open_source.jpg"
                  alt="Android open source"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-light to-transparent" />
              </div>

              <div className="space-y-3">
                {androidPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={point.text}
                      className="flex items-start gap-3 p-3 bg-teal/10 rounded-xl"
                    >
                      <Icon className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{point.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-muted-foreground text-sm">
                  <span className="text-teal font-medium">Most Algerian students</span> use 
                  Android phones because they are affordable and flexible. This is FOSS in action!
                </p>
              </div>
            </div>
          </div>

          {/* iOS Card */}
          <div ref={iosCardRef}>
            <div className="glass-card h-full p-8 rounded-[32px] border-l-4 border-l-muted">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-muted/20 flex items-center justify-center">
                  <Lock className="w-7 h-7 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-foreground">
                    iOS
                  </h3>
                  <p className="text-muted-foreground text-sm">Proprietary</p>
                </div>
              </div>

              <div className="relative mb-6 rounded-2xl overflow-hidden bg-dark">
                <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center">
                    <Lock className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground/50 text-sm">Closed Source</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {iosPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={point.text}
                      className="flex items-start gap-3 p-3 bg-white/5 rounded-xl"
                    >
                      <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{point.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-muted-foreground text-sm">
                  Users must follow <span className="text-foreground font-medium">Apple's rules</span> 
                  and limitations. The ecosystem is controlled by a single company.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom lesson */}
        <div className="mt-12 text-center">
          <div className="inline-block glass-card px-8 py-4 rounded-2xl">
            <p className="text-foreground">
              <span className="text-teal font-semibold">The lesson:</span> Just as Android 
              provides legal, safe, and powerful mobile computing, FOSS provides legal, safe, 
              and powerful desktop computing.{' '}
              <span className="text-coral font-semibold">
                No need to risk your security with cracked software!
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
