import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, Bug, EyeOff, ShieldAlert, XCircle, HelpCircle, CheckCircle2, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const dangers = [
  {
    icon: Bug,
    title: 'Malware & Viruses',
    description:
      'Cracked software often contains hidden malware, keyloggers, ransomware, and spyware that steal your data.',
  },
  {
    icon: EyeOff,
    title: 'Privacy Violations',
    description:
      'Your personal files, photos, and data can be sent to criminals. Your private information is no longer private.',
  },
  {
    icon: ShieldAlert,
    title: 'No Security Updates',
    description:
      'Legitimate software receives regular security patches. Cracked software never gets updates, leaving you vulnerable.',
  },
  {
    icon: XCircle,
    title: 'System Instability',
    description:
      'Cracked software often causes crashes, data corruption, and conflicts with other programs.',
  },
];

const comparisonData = [
  { aspect: 'Legal Status', cracked: 'Illegal (piracy)', foss: '100% Legal', fossGood: true },
  { aspect: 'Security', cracked: 'Often contains malware', foss: 'Safe and audited', fossGood: true },
  { aspect: 'Privacy', cracked: 'Data may be stolen', foss: 'Your data stays private', fossGood: true },
  { aspect: 'Updates', cracked: 'No security updates', foss: 'Regular updates', fossGood: true },
  { aspect: 'Support', cracked: 'None available', foss: 'Community support', fossGood: true },
  { aspect: 'Stability', cracked: 'Often crashes', foss: 'Reliable and stable', fossGood: true },
  { aspect: 'Cost', cracked: 'Free but risky', foss: 'Free and safe', fossGood: true },
  { aspect: 'Ethics', cracked: 'Unethical (stealing)', foss: 'Ethical and legal', fossGood: true },
];

export default function CrackedSoftware() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const warningCardRef = useRef<HTMLDivElement>(null);
  const tableCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const warningCard = warningCardRef.current;
    const tableCard = tableCardRef.current;

    if (!section || !title || !warningCard || !tableCard) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '+=130%',
          pin: false,
          scrub: 0.6,
          id: 'cracked',
        },
      });

      // Title entrance (0% - 20%)
      scrollTl.fromTo(
        title,
        { y: '-6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Warning card entrance (5% - 30%)
      scrollTl.fromTo(
        warningCard,
        { x: '-50vw', rotateZ: -2, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Table card entrance (10% - 30%)
      scrollTl.fromTo(
        tableCard,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        title,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        warningCard,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        tableCard,
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
      className="section-container relative min-h-screen flex items-center bg-dark overflow-hidden z-[80]"
    >
      {/* Background blob */}
      <div
        className="gradient-blob w-[50vw] h-[50vw] bg-coral/15"
        style={{ left: '25%', top: '0%' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-12"
        >
          Why FOSS Instead of{' '}
          <span className="text-coral">Cracked Software?</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Warning card */}
          <div ref={warningCardRef}>
            <div className="glass-card p-6 lg:p-8 rounded-[32px] border-l-4 border-l-coral h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-foreground">
                    The Dangers of Cracked Software
                  </h3>
                  <p className="text-coral text-sm">
                    In Algeria, many use pirated software
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {dangers.map((danger) => {
                  const Icon = danger.icon;
                  return (
                    <div
                      key={danger.title}
                      className="flex items-start gap-3 p-3 bg-coral/10 rounded-xl"
                    >
                      <Icon className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-foreground font-medium text-sm mb-1">
                          {danger.title}
                        </h4>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {danger.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-coral/20 rounded-xl border border-coral/30">
                <p className="text-foreground text-sm">
                  <span className="font-semibold">Real example:</span> A student downloads 
                  cracked Adobe software. Unknown to them, it contains a keylogger. Later, 
                  their email and social media accounts are hacked.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison table card */}
          <div ref={tableCardRef}>
            <div className="glass-card p-6 lg:p-8 rounded-[32px] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-teal" />
                </div>
                <h3 className="font-heading text-xl text-foreground">
                  Cracked vs FOSS
                </h3>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left p-3 text-muted-foreground text-xs font-medium">
                        Aspect
                      </th>
                      <th className="text-left p-3 text-coral text-xs font-medium">
                        Cracked
                      </th>
                      <th className="text-left p-3 text-teal text-xs font-medium">
                        FOSS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr
                        key={row.aspect}
                        className={index % 2 === 0 ? 'bg-white/[0.02]' : ''}
                      >
                        <td className="p-3 text-foreground text-sm">{row.aspect}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-coral flex-shrink-0" />
                            <span className="text-muted-foreground text-xs">
                              {row.cracked}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0" />
                            <span className="text-foreground text-xs">{row.foss}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-teal/20 rounded-xl border border-teal/30">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium text-sm mb-1">
                      FOSS: The Safe and Legal Alternative
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      FOSS provides the same functionality as paid software without any 
                      risks. It's 100% legal, safe, regularly updated, and comes with 
                      community support.
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
