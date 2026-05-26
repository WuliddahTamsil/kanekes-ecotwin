import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Trophy, Star, CheckCircle, XCircle, ChevronRight, Award, Target, Flame, Leaf, Droplets, Wind, Sun } from 'lucide-react';

interface Props { lang: 'id' | 'en' }

const WEAVING = 'https://images.unsplash.com/photo-1661144050353-1d2566cbdf03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80';

const philosophies = [
  {
    icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    title: 'Hidup Sederhana', titleEn: 'Simple Living',
    desc: 'Baduy hidup tanpa listrik, teknologi modern, dan kemewahan. Mereka percaya bahwa kebahagiaan sejati ada pada kesederhanaan dan kedekatan dengan alam.',
    descEn: 'Baduy live without electricity, modern technology, or luxury. They believe true happiness lies in simplicity and closeness to nature.',
    quote: '"Lain ti kahayang, tapi ti kaperluan"',
    quoteEn: '"Not from desire, but from necessity"',
  },
  {
    icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30',
    title: 'Harmoni dengan Alam', titleEn: 'Harmony with Nature',
    desc: 'Setiap pohon, sungai, dan hewan dianggap memiliki roh yang harus dihormati. Sistem pertanian mereka mengandalkan rotasi alami tanpa pupuk kimia.',
    descEn: 'Every tree, river, and animal is considered to have a spirit that must be respected. Their farming system relies on natural rotation without chemical fertilizers.',
    quote: '"Gunung ulah dilebur, lebak ulah dirusak"',
    quoteEn: '"Mountains must not be destroyed, valleys must not be damaged"',
  },
  {
    icon: Wind, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30',
    title: 'Pikukuh (Hukum Adat)', titleEn: 'Pikukuh (Customary Law)',
    desc: 'Seperangkat aturan tak tertulis yang mengatur seluruh aspek kehidupan. Pikukuh melarang pembukaan lahan hutan, penggunaan alat modern, dan bepergian dengan kendaraan.',
    descEn: 'A set of unwritten rules governing all aspects of life. Pikukuh prohibits clearing forestland, using modern tools, and traveling by vehicle.',
    quote: '"Buyut teu meunang dirobah"',
    quoteEn: '"Ancestral heritage must not be changed"',
  },
  {
    icon: Sun, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30',
    title: 'Rawatan Hidup', titleEn: 'Life Stewardship',
    desc: 'Konsep merawat kehidupan yang mencakup menjaga hubungan antara manusia, alam, dan roh leluhur. Setiap tindakan harus mempertimbangkan dampaknya pada generasi mendatang.',
    descEn: 'The concept of caring for life, encompassing maintaining the relationship between humans, nature, and ancestral spirits. Every action must consider its impact on future generations.',
    quote: '"Hirup kudu sing bener, lain sing pinter"',
    quoteEn: '"Life must be righteous, not just clever"',
  },
];

interface QuizQuestion {
  id: number;
  q: string; qEn: string;
  opts: string[]; optsEn: string[];
  correct: number;
  explanation: string; explanationEn: string;
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: 'Apa nama hukum adat utama Suku Baduy yang mengatur kehidupan mereka?',
    qEn: 'What is the name of the main customary law of the Baduy Tribe that governs their lives?',
    opts: ['Pikukuh', 'Pancasila', 'Sasi', 'Awig-awig'],
    optsEn: ['Pikukuh', 'Pancasila', 'Sasi', 'Awig-awig'],
    correct: 0,
    explanation: 'Pikukuh adalah hukum adat Baduy yang melarang penggunaan teknologi modern, pembukaan lahan hutan, dan bepergian dengan kendaraan.',
    explanationEn: 'Pikukuh is the Baduy customary law that prohibits the use of modern technology, clearing forestland, and traveling by vehicle.',
  },
  {
    id: 2,
    q: 'Baduy Dalam terletak di kabupaten mana?',
    qEn: 'Baduy Dalam is located in which regency?',
    opts: ['Serang', 'Lebak', 'Pandeglang', 'Sukabumi'],
    optsEn: ['Serang', 'Lebak', 'Pandeglang', 'Sukabumi'],
    correct: 1,
    explanation: 'Baduy Dalam terletak di Kabupaten Lebak, Banten. Area ini adalah wilayah paling sakral yang hanya bisa dimasuki tamu dengan izin khusus.',
    explanationEn: 'Baduy Dalam is located in Lebak Regency, Banten. This area is the most sacred zone accessible only to guests with special permission.',
  },
  {
    id: 3,
    q: 'Apa yang dimaksud dengan "leuweung kolot" dalam tradisi Baduy?',
    qEn: 'What does "leuweung kolot" mean in Baduy tradition?',
    opts: ['Hutan produksi', 'Hutan larangan/sakral', 'Hutan pertanian', 'Hutan bambu'],
    optsEn: ['Production forest', 'Forbidden/sacred forest', 'Agricultural forest', 'Bamboo forest'],
    correct: 1,
    explanation: '"Leuweung kolot" adalah hutan tua yang dilarang untuk ditebang atau dimasuki. Ini merupakan praktik konservasi lingkungan tradisional Baduy.',
    explanationEn: '"Leuweung kolot" is an old forest that is forbidden from being cut down or entered. This is a traditional Baduy environmental conservation practice.',
  },
  {
    id: 4,
    q: 'Warna pakaian yang dikenakan oleh masyarakat Baduy Dalam adalah?',
    qEn: 'What color clothing is worn by the Baduy Dalam community?',
    opts: ['Putih', 'Hitam', 'Biru', 'Coklat'],
    optsEn: ['White', 'Black', 'Blue', 'Brown'],
    correct: 0,
    explanation: 'Masyarakat Baduy Dalam mengenakan pakaian serba putih sebagai simbol kesucian dan kedekatan mereka dengan dunia spiritual.',
    explanationEn: 'The Baduy Dalam community wears all-white clothing as a symbol of purity and their closeness to the spiritual world.',
  },
];

const badges = [
  { id: 'pemula', icon: '🌱', name: 'Penjelajah Pemula', nameEn: 'Beginner Explorer', desc: 'Mulai belajar budaya', descEn: 'Start learning culture', earned: true, color: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' },
  { id: 'penjaga', icon: '🌿', name: 'Penjaga Hutan', nameEn: 'Forest Guardian', desc: 'Selesaikan 5 quiz', descEn: 'Complete 5 quizzes', earned: true, color: 'border-green-500 bg-green-50 dark:bg-green-950/30' },
  { id: 'budayawan', icon: '🏺', name: 'Budayawan Muda', nameEn: 'Young Culturalist', desc: 'Pelajari 3 budaya', descEn: 'Learn 3 cultures', earned: false, color: 'border-amber-400 bg-amber-50 dark:bg-amber-950/30' },
  { id: 'master', icon: '🌟', name: 'Master Baduy', nameEn: 'Baduy Master', desc: 'Skor sempurna quiz', descEn: 'Perfect quiz score', earned: false, color: 'border-purple-400 bg-purple-50 dark:bg-purple-950/30' },
  { id: 'duta', icon: '🏆', name: 'Duta Budaya', nameEn: 'Culture Ambassador', desc: 'Selesaikan semua misi', descEn: 'Complete all missions', earned: false, color: 'border-yellow-400 bg-yellow-50 dark:bg-yellow-950/30' },
];

const t = {
  id: {
    title: 'Edukasi Pelestarian',
    sub: 'Pelajari kearifan Baduy melalui konten interaktif yang menyenangkan',
    philTitle: 'Filosofi Hidup Baduy',
    quizTitle: 'Uji Pengetahuanmu',
    quizSub: 'Tes seberapa dalam kamu mengenal budaya Baduy',
    start: 'Mulai Quiz',
    next: 'Lanjut',
    result: 'Hasil Quiz',
    score: 'Skor kamu',
    restart: 'Ulangi Quiz',
    badgeTitle: 'Koleksi Badge',
    badgeSub: 'Kumpulkan badge dengan menyelesaikan misi belajar',
    challenge: 'Challenge: 7 Hari Hidup Ramah Lingkungan',
    challengeDesc: 'Ikuti tantangan selama 7 hari untuk menerapkan prinsip Baduy dalam kehidupan sehari-hari',
    join: 'Ikuti Tantangan',
    days: ['Hari 1: No Plastik', 'Hari 2: Jalan Kaki', 'Hari 3: Hemat Air', 'Hari 4: Tanam Pohon', 'Hari 5: Makan Lokal', 'Hari 6: Zero Waste', 'Hari 7: Berbagi'],
    earned: 'Diperoleh',
    locked: 'Terkunci',
  },
  en: {
    title: 'Conservation Education',
    sub: 'Learn Baduy wisdom through fun interactive content',
    philTitle: 'Baduy Life Philosophy',
    quizTitle: 'Test Your Knowledge',
    quizSub: 'Test how deeply you know Baduy culture',
    start: 'Start Quiz',
    next: 'Next',
    result: 'Quiz Result',
    score: 'Your score',
    restart: 'Retry Quiz',
    badgeTitle: 'Badge Collection',
    badgeSub: 'Collect badges by completing learning missions',
    challenge: 'Challenge: 7 Days Eco-Friendly Living',
    challengeDesc: 'Take a 7-day challenge to apply Baduy principles in your daily life',
    join: 'Join Challenge',
    days: ['Day 1: No Plastic', 'Day 2: Walk More', 'Day 3: Save Water', 'Day 4: Plant Trees', 'Day 5: Eat Local', 'Day 6: Zero Waste', 'Day 7: Share'],
    earned: 'Earned',
    locked: 'Locked',
  },
};

export function EdukasiSection({ lang }: Props) {
  const [quizState, setQuizState] = useState<'idle' | 'active' | 'done'>('idle');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [challengeJoined, setChallengeJoined] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const tx = t[lang];

  const q = questions[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setQuizState('done');
    }
  };

  const restartQuiz = () => {
    setQuizState('idle');
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
  };

  const getScoreEmoji = () => {
    if (score >= 4) return '🏆';
    if (score >= 3) return '🌟';
    if (score >= 2) return '✨';
    return '🌱';
  };

  return (
    <section id="edukasi" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4">
            <BookOpen className="w-4 h-4" />
            Edukasi Interaktif
          </div>
          <h2 className="text-foreground mb-3">{tx.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{tx.sub}</p>
        </motion.div>

        {/* Philosophy Cards */}
        <div className="mb-16">
          <h3 className="text-foreground text-center mb-8">{tx.philTitle}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {philosophies.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl p-5 border border-border ${p.bg} transition-shadow hover:shadow-lg`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-background flex items-center justify-center mb-4 shadow-sm`}>
                    <Icon className={`w-5 h-5 ${p.color}`} />
                  </div>
                  <h4 className="text-foreground text-sm mb-2">{lang === 'id' ? p.title : p.titleEn}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">{lang === 'id' ? p.desc : p.descEn}</p>
                  <blockquote className={`text-xs italic ${p.color} border-l-2 pl-2 leading-relaxed`} style={{ borderColor: 'currentColor' }}>
                    {lang === 'id' ? p.quote : p.quoteEn}
                  </blockquote>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quiz + Challenge + Badges */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quiz */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-foreground text-base">{tx.quizTitle}</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">{tx.quizSub}</p>

            {quizState === 'idle' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                <div className="text-5xl mb-4">🧠</div>
                <div className="text-foreground font-semibold mb-2">{questions.length} {lang === 'id' ? 'Pertanyaan tentang Baduy' : 'Questions about Baduy'}</div>
                <div className="text-muted-foreground text-sm mb-6">{lang === 'id' ? 'Uji pemahamanmu tentang kearifan lokal Suku Baduy' : 'Test your understanding of Baduy Tribe local wisdom'}</div>
                <button
                  onClick={() => setQuizState('active')}
                  className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                >
                  {tx.start} →
                </button>
              </motion.div>
            )}

            {quizState === 'active' && (
              <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                {/* Progress */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{currentQ + 1}/{questions.length}</span>
                </div>

                <div className="mb-5 p-4 rounded-2xl bg-primary/5 border border-primary/15">
                  <p className="text-foreground text-sm font-semibold leading-relaxed">{lang === 'id' ? q.q : q.qEn}</p>
                </div>

                <div className="grid gap-2.5 mb-5">
                  {(lang === 'id' ? q.opts : q.optsEn).map((opt, idx) => {
                    let style = 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5';
                    if (answered) {
                      if (idx === q.correct) style = 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300';
                      else if (idx === selected) style = 'border-red-400 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400';
                      else style = 'border-border bg-card text-muted-foreground opacity-60';
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left text-sm transition-all ${style} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          answered && idx === q.correct ? 'border-green-500 bg-green-500 text-white' :
                          answered && idx === selected ? 'border-red-400 bg-red-400 text-white' :
                          'border-current'
                        }`}>
                          {answered && idx === q.correct ? <CheckCircle className="w-3.5 h-3.5" /> :
                           answered && idx === selected && idx !== q.correct ? <XCircle className="w-3.5 h-3.5" /> :
                           String.fromCharCode(65 + idx)}
                        </div>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-4 p-4 rounded-xl bg-muted border border-border text-sm text-muted-foreground leading-relaxed"
                    >
                      💡 {lang === 'id' ? q.explanation : q.explanationEn}
                    </motion.div>
                  )}
                </AnimatePresence>

                {answered && (
                  <button
                    onClick={handleNext}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    {currentQ < questions.length - 1 ? tx.next : (lang === 'id' ? 'Lihat Hasil' : 'See Results')} →
                  </button>
                )}
              </motion.div>
            )}

            {quizState === 'done' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-5xl mb-4">{getScoreEmoji()}</div>
                <h3 className="text-foreground mb-2">{tx.result}</h3>
                <div className="text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{score}/{questions.length}</div>
                <p className="text-muted-foreground text-sm mb-2">{tx.score}: {Math.round((score / questions.length) * 100)}%</p>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden mx-auto max-w-xs mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / questions.length) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                {score >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-sm mb-4"
                  >
                    <Award className="w-4 h-4" />
                    {lang === 'id' ? 'Badge "Penjaga Hutan" diperoleh!' : '"Forest Guardian" badge earned!'}
                  </motion.div>
                )}
                <button onClick={restartQuiz} className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground text-sm hover:border-primary hover:text-primary transition-all">
                  {tx.restart}
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-card border border-border rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="text-foreground text-base">{tx.badgeTitle}</h3>
            </div>
            <p className="text-muted-foreground text-xs mb-5">{tx.badgeSub}</p>
            <div className="space-y-3">
              {badges.map(badge => (
                <motion.div
                  key={badge.id}
                  whileHover={{ x: 3 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${badge.earned ? badge.color : 'border-border bg-muted/30 opacity-60'}`}
                >
                  <div className="text-2xl">{badge.icon}</div>
                  <div className="flex-1">
                    <div className={`text-xs font-semibold ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {lang === 'id' ? badge.name : badge.nameEn}
                    </div>
                    <div className="text-xs text-muted-foreground">{lang === 'id' ? badge.desc : badge.descEn}</div>
                  </div>
                  {badge.earned ? (
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 7 Day Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-card border border-border rounded-3xl p-6 shadow-sm overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 bg-primary" style={{ transform: 'translate(30%, -30%)' }} />
          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-5 h-5 text-accent" />
                  <h3 className="text-foreground text-base">{tx.challenge}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{tx.challengeDesc}</p>
              </div>
              <button
                onClick={() => setChallengeJoined(true)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  challengeJoined
                    ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700'
                    : 'bg-accent text-accent-foreground hover:opacity-90 shadow-lg shadow-accent/25'
                }`}
              >
                {challengeJoined ? (lang === 'id' ? '✅ Terdaftar!' : '✅ Joined!') : tx.join}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {tx.days.map((day, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setExpandedDay(expandedDay === i ? null : i)}
                  className={`p-3 rounded-xl text-center border text-xs transition-all ${
                    challengeJoined && i === 0
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  <div className="text-lg mb-1">
                    {['🚫', '🚶', '💧', '🌳', '🍚', '♻️', '🤝'][i]}
                  </div>
                  <div className="leading-tight">{day}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
