// app/page.tsx

import Header from './components/Header';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import TechnologySection from './components/TechnologySection';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root">
      <main className="flex-1 flex flex-col">
        <Hero />
        <WhyChoose />
        <TechnologySection />
        <Testimonials />
        <CTASection />
      </main>
    </div>
  );
}