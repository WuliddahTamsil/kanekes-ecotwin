import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { JelajahSection } from './components/JelajahSection';
import { HistoryCultureSection } from './components/HistoryCultureSection';
import { TheLabSection } from './components/TheLabSection';
import { EdukasiSection } from './components/EdukasiSection';
import { DonasiSection } from './components/DonasiSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<'id' | 'en'>('id');

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar isDark={isDark} setIsDark={setIsDark} lang={lang} setLang={setLang} />
        <main>
          <HeroSection lang={lang} />
          <JelajahSection lang={lang} isDark={isDark} />
          <HistoryCultureSection lang={lang} />
          <TheLabSection lang={lang} />
          <EdukasiSection lang={lang} />
          <DonasiSection lang={lang} />
        </main>
        <Footer lang={lang} />
      </div>
    </div>
  );
}
