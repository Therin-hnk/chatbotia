import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import TechnologySection from './components/TechnologySection';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import ScrollVideo from './components/ScrollVideo';

interface TextElement {
  text: string;
  startProgress: number;
  endProgress: number;
  className?: string;
}

export default function Home() {
  const textElements = [
    {
      text: "Transformez vos visiteurs en clients",
      startProgress: 0,
      endProgress: 0.16,
    },
    {
      text: "Votre assistant IA disponible 24h/24",
      startProgress: 0.17,
      endProgress: 0.33,
    },
    {
      text: "Design et comportement sur mesure",
      startProgress: 0.34,
      endProgress: 0.50,
    },
    {
      text: "Une expérience client qui fait la différence",
      startProgress: 0.51,
      endProgress: 0.66,
    },
    {
      text: "Personnalisable, sans aucune ligne de code",
      startProgress: 0.67,
      endProgress: 0.83,
    },
    {
      text: "Intégrez-le instantanément sur votre site",
      startProgress: 0.84,
      endProgress: 1.0,
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root">
      <main className="flex-1 flex flex-col">
        <Hero />
        <WhyChoose />
        <ScrollVideo
          videoUrl="/videos/video4.mp4"
          textElements={textElements}
          scrollSpeed={1}
        />
        <TechnologySection />
        <Testimonials />
        <CTASection />
      </main>
    </div>
  );
}