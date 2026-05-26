import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Search, Filter, ArrowLeftRight, BookOpen, Eye, X, ChevronRight, TrendingDown, TrendingUp } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface Props { lang: 'id' | 'en' }

const AERIAL_BG = 'https://images.unsplash.com/photo-1672384946806-cd7f2fa4b543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80';
const VILLAGE_IMG = 'https://images.unsplash.com/photo-1771766995256-1618791109d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';
const TEXTILE_IMG = 'https://images.unsplash.com/photo-1774679840947-f73b5275393c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';
const WEAVING_IMG = 'https://images.unsplash.com/photo-1593671186131-d58817e7dee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';
const FOREST_IMG = 'https://images.unsplash.com/photo-1606585808259-420ce50f1917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';

interface CulturePoint {
  id: string;
  name: string;
  nameEn: string;
  location: string;
  region: string;
  type: 'tradisi' | 'ritual' | 'lingkungan';
  sustainability: number;
  desc: string;
  descEn: string;
  image: string;
  x: string; y: string;
  radarData: { subject: string; value: number }[];
}

const cultures: CulturePoint[] = [
  {
    id: 'baduy', name: 'Suku Baduy', nameEn: 'Baduy Tribe',
    location: 'Lebak, Banten', region: 'Jawa Barat',
    type: 'lingkungan', sustainability: 95,
    desc: 'Suku yang hidup harmonis dengan alam, menolak teknologi modern untuk menjaga keseimbangan ekosistem hutan.',
    descEn: 'A tribe living in harmony with nature, rejecting modern technology to preserve forest ecosystem balance.',
    image: VILLAGE_IMG, x: '58%', y: '62%',
    radarData: [
      { subject: 'Lingkungan', value: 98 }, { subject: 'Tradisi', value: 92 }, { subject: 'Sosial', value: 85 },
      { subject: 'Spiritual', value: 97 }, { subject: 'Ekonomi', value: 65 },
    ],
  },
  {
    id: 'toraja', name: 'Toraja', nameEn: 'Toraja',
    location: 'Tana Toraja', region: 'Sulawesi Selatan',
    type: 'ritual', sustainability: 80,
    desc: 'Budaya upacara kematian Rambu Solo yang unik, menghubungkan dunia manusia dengan leluhur melalui ritual sakral.',
    descEn: 'The unique Rambu Solo funeral ceremony culture, connecting the human world with ancestors through sacred rituals.',
    image: TEXTILE_IMG, x: '72%', y: '55%',
    radarData: [
      { subject: 'Lingkungan', value: 70 }, { subject: 'Tradisi', value: 95 }, { subject: 'Sosial', value: 90 },
      { subject: 'Spiritual', value: 98 }, { subject: 'Ekonomi', value: 75 },
    ],
  },
  {
    id: 'dayak', name: 'Suku Dayak', nameEn: 'Dayak Tribe',
    location: 'Kalimantan Tengah', region: 'Kalimantan',
    type: 'tradisi', sustainability: 72,
    desc: 'Penjaga hutan hujan tropis Borneo dengan sistem pengelolaan hutan tradisional yang disebut Tana\'Ulen.',
    descEn: 'Guardian of Borneo\'s tropical rainforest with a traditional forest management system called Tana\'Ulen.',
    image: FOREST_IMG, x: '65%', y: '48%',
    radarData: [
      { subject: 'Lingkungan', value: 90 }, { subject: 'Tradisi', value: 88 }, { subject: 'Sosial', value: 78 },
      { subject: 'Spiritual', value: 85 }, { subject: 'Ekonomi', value: 60 },
    ],
  },
  {
    id: 'minang', name: 'Minangkabau', nameEn: 'Minangkabau',
    location: 'Padang', region: 'Sumatera Barat',
    type: 'tradisi', sustainability: 78,
    desc: 'Sistem matrilineal unik yang menempatkan perempuan sebagai pewaris harta dan pemimpin keluarga.',
    descEn: 'A unique matrilineal system that places women as heirs and family leaders.',
    image: WEAVING_IMG, x: '42%', y: '45%',
    radarData: [
      { subject: 'Lingkungan', value: 75 }, { subject: 'Tradisi', value: 95 }, { subject: 'Sosial', value: 92 },
      { subject: 'Spiritual', value: 80 }, { subject: 'Ekonomi', value: 85 },
    ],
  },
];

const preservationData = [
  { year: '2000', baduy: 98, toraja: 90, dayak: 85 },
  { year: '2005', baduy: 97, toraja: 87, dayak: 80 },
  { year: '2010', baduy: 96, toraja: 85, dayak: 74 },
  { year: '2015', baduy: 95, toraja: 83, dayak: 73 },
  { year: '2020', baduy: 95, toraja: 81, dayak: 72 },
  { year: '2025', baduy: 95, toraja: 80, dayak: 72 },
];

const typeColors: Record<string, string> = {
  tradisi: 'bg-amber-500',
  ritual: 'bg-purple-500',
  lingkungan: 'bg-emerald-500',
};

const t = {
  id: {
    title: 'Jelajahi Budaya Indonesia',
    sub: 'Sistem pemetaan interaktif budaya Nusantara berbasis Web GIS',
    search: 'Cari budaya...',
    filter: 'Filter',
    compare: 'Mode Perbandingan',
    all: 'Semua',
    tradisi: 'Tradisi',
    ritual: 'Ritual',
    lingkungan: 'Lingkungan',
    detail: 'Pelajari Lebih Dalam',
    vr: 'Lihat dalam AR/VR',
    close: 'Tutup',
    chart: 'Tingkat Pelestarian Budaya',
    compareTitle: 'Perbandingan Budaya',
    selectLeft: 'Pilih Budaya 1',
    selectRight: 'Pilih Budaya 2',
    sustainability: 'Keberlanjutan',
    region: 'Wilayah',
  },
  en: {
    title: 'Explore Indonesian Culture',
    sub: 'Interactive Web GIS-based cultural mapping of the Nusantara',
    search: 'Search cultures...',
    filter: 'Filter',
    compare: 'Comparison Mode',
    all: 'All',
    tradisi: 'Tradition',
    ritual: 'Ritual',
    lingkungan: 'Environment',
    detail: 'Learn More',
    vr: 'View in AR/VR',
    close: 'Close',
    chart: 'Cultural Preservation Rate',
    compareTitle: 'Culture Comparison',
    selectLeft: 'Select Culture 1',
    selectRight: 'Select Culture 2',
    sustainability: 'Sustainability',
    region: 'Region',
  },
};

export function JelajahSection({ lang }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CulturePoint | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareLeft, setCompareLeft] = useState<string>('baduy');
  const [compareRight, setCompareRight] = useState<string>('toraja');
  const tx = t[lang];

  const filtered = cultures.filter(c => {
    const matchFilter = activeFilter === 'all' || c.type === activeFilter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.nameEn.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const leftCulture = cultures.find(c => c.id === compareLeft)!;
  const rightCulture = cultures.find(c => c.id === compareRight)!;

  return (
    <section id="jelajah" className="py-20 relative">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4">
            <MapPin className="w-4 h-4" />
            Web GIS System
          </div>
          <h2 className="text-foreground mb-3">{tx.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{tx.sub}</p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={tx.search}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {['all', 'tradisi', 'ritual', 'lingkungan'].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === f
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-primary'
                }`}
              >
                {tx[f as keyof typeof tx] || f}
              </button>
            ))}
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                compareMode
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:border-accent/40'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              {tx.compare}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl" style={{ height: 500 }}>
          {/* Map background */}
          <img src={AERIAL_BG} alt="Map background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-black/50" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)' }} />

          {/* Map label */}
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur rounded-xl px-3 py-2 text-white/80 text-xs font-medium border border-white/15">
            🗺️ Peta Budaya Indonesia
          </div>

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur rounded-xl px-3 py-2 border border-white/15">
            {Object.entries({ tradisi: tx.tradisi, ritual: tx.ritual, lingkungan: tx.lingkungan }).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2 text-xs text-white/80 py-0.5">
                <div className={`w-2.5 h-2.5 rounded-full ${typeColors[key]}`} />
                {label}
              </div>
            ))}
          </div>

          {/* Markers */}
          {filtered.map((culture) => (
            <motion.button
              key={culture.id}
              style={{ left: culture.x, top: culture.y, transform: 'translate(-50%, -50%)' }}
              className="absolute group"
              onClick={() => setSelected(culture)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Ping animation */}
              <div className={`absolute inset-0 rounded-full ${typeColors[culture.type]} opacity-40 animate-ping`} style={{ width: 32, height: 32, top: -4, left: -4 }} />
              {/* Marker */}
              <div className={`w-6 h-6 rounded-full ${typeColors[culture.type]} border-2 border-white shadow-lg flex items-center justify-center`}>
                <MapPin className="w-3 h-3 text-white fill-current" />
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/15">
                <div className="font-semibold">{culture.name}</div>
                <div className="text-white/70">{culture.location}</div>
              </div>
            </motion.button>
          ))}

          {/* Indonesia SVG simplified outline hint */}
          <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur rounded-xl px-3 py-1.5 text-white/60 text-xs border border-white/15">
            {filtered.length} budaya ditemukan
          </div>
        </div>
      </motion.div>

      {/* Popup Card */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-48">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-white text-xs font-semibold ${typeColors[selected.type]}`}>
                  {tx[selected.type as keyof typeof tx]}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-foreground mb-1">{selected.name}</h3>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {selected.location}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-muted-foreground">{tx.sustainability}:</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selected.sustainability}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                  <span className="text-xs font-semibold text-primary">{selected.sustainability}%</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {lang === 'id' ? selected.desc : selected.descEn}
                </p>

                {/* Radar chart */}
                <div className="h-40 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={selected.radarData}>
                      <PolarGrid stroke="var(--border)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
                      <Radar dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                    <BookOpen className="w-4 h-4" /> {tx.detail}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors">
                    <Eye className="w-4 h-4" /> {tx.vr}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Visualization */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingDown className="w-5 h-5 text-accent" />
            <h3 className="text-foreground text-lg">{tx.chart}</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={preservationData}>
                <defs>
                  <linearGradient id="colorBaduy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorToraja" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F4A261" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F4A261" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDayak" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5E3C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5E3C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--foreground)' }}
                />
                <Area type="monotone" dataKey="baduy" name="Baduy" stroke="#2D6A4F" strokeWidth={2} fill="url(#colorBaduy)" />
                <Area type="monotone" dataKey="toraja" name="Toraja" stroke="#F4A261" strokeWidth={2} fill="url(#colorToraja)" />
                <Area type="monotone" dataKey="dayak" name="Dayak" stroke="#8B5E3C" strokeWidth={2} fill="url(#colorDayak)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Comparison Mode */}
      <AnimatePresence>
        {compareMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-foreground text-lg mb-6 flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-accent" />
                {tx.compareTitle}
              </h3>

              {/* Selectors */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: compareLeft, setter: setCompareLeft, label: tx.selectLeft },
                  { value: compareRight, setter: setCompareRight, label: tx.selectRight },
                ].map(({ value, setter, label }) => (
                  <div key={label}>
                    <label className="text-xs text-muted-foreground mb-2 block">{label}</label>
                    <select
                      value={value}
                      onChange={e => setter(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      {cultures.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              {/* Split screen comparison */}
              <div className="grid grid-cols-2 gap-6">
                {[leftCulture, rightCulture].map((culture, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden border-2 ${i === 0 ? 'border-primary' : 'border-accent'}`}>
                    <div className="relative h-32">
                      <img src={culture.image} alt={culture.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className="text-white font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>{culture.name}</div>
                        <div className="text-white/70 text-xs">{culture.location}</div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/30">
                      {culture.radarData.map(d => (
                        <div key={d.subject} className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-muted-foreground w-20">{d.subject}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${d.value}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full rounded-full"
                              style={{ background: i === 0 ? 'var(--primary)' : 'var(--accent)' }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-foreground w-8 text-right">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
