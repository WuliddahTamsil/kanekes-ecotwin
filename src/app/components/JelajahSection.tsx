import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Search, Filter, ArrowLeftRight, BookOpen, Eye, X, 
  ChevronRight, TrendingDown, Sparkles, Compass, AlertCircle, 
  RotateCcw, Sliders, CheckCircle2, Award, Info
} from 'lucide-react';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, 
  AreaChart, Area, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import * as L from 'leaflet';

interface Props { 
  lang: 'id' | 'en';
  isDark?: boolean;
}

const VILLAGE_IMG = 'https://images.unsplash.com/photo-1771766995256-1618791109d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';
const TEXTILE_IMG = 'https://images.unsplash.com/photo-1774679840947-f73b5275393c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';
const WEAVING_IMG = 'https://images.unsplash.com/photo-1593671186131-d58817e7dee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';
const FOREST_IMG = 'https://images.unsplash.com/photo-1606585808259-420ce50f1917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';
const BALI_IMG = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';
const PAPUA_IMG = 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';
const NAGA_IMG = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';
const SASAK_IMG = 'https://images.unsplash.com/photo-1626028986575-f7eb42dfd8ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80';

interface CulturePoint {
  id: string;
  name: string;
  nameEn: string;
  location: string;
  region: 'jawa' | 'sulawesi' | 'kalimantan' | 'sumatera' | 'bali' | 'papua' | 'nusatenggara';
  regionLabel: string;
  regionLabelEn: string;
  type: 'tradisi' | 'ritual' | 'lingkungan';
  sustainability: number;
  desc: string;
  descEn: string;
  image: string;
  lat: number;
  lng: number;
  radarData: { subject: string; value: number }[];
  envPractice: string;
  envPracticeEn: string;
  wayOfLife: string;
  wayOfLifeEn: string;
  philosophy: string;
  philosophyEn: string;
}

const cultures: CulturePoint[] = [
  {
    id: 'baduy',
    name: 'Suku Baduy',
    nameEn: 'Baduy Tribe',
    location: 'Lebak, Banten',
    region: 'jawa',
    regionLabel: 'Jawa',
    regionLabelEn: 'Java',
    type: 'lingkungan',
    sustainability: 95,
    desc: 'Suku yang hidup harmonis dengan alam, menolak teknologi modern dan listrik untuk menjaga keseimbangan ekosistem hutan leluhur mereka.',
    descEn: 'A tribe living in harmony with nature, rejecting modern technology and electricity to preserve the balance of their ancestral forest ecosystem.',
    image: VILLAGE_IMG,
    lat: -6.6119,
    lng: 106.2625,
    radarData: [
      { subject: 'Lingkungan', value: 98 }, { subject: 'Tradisi', value: 92 }, { subject: 'Sosial', value: 85 },
      { subject: 'Spiritual', value: 97 }, { subject: 'Ekonomi', value: 65 },
    ],
    envPractice: 'Pikukuh adat melarang penggunaan bahan kimia, semen, kendaraan, dan sabun komersial untuk menjaga kemurnian tanah dan air sungai.',
    envPracticeEn: 'Customary law prohibits chemical use, cement, vehicles, and commercial soap to preserve the purity of soil and river water.',
    wayOfLife: 'Tinggal di rumah panggung kayu/bambu tanpa paku, bertani padi huma secara tradisional, dan bepergian dengan berjalan kaki tanpa alas kaki.',
    wayOfLifeEn: 'Living in wooden/bamboo stilt houses without nails, farming dry-field rice traditionally, and traveling on foot barefoot.',
    philosophy: '"Lojor teu meunang dipotong, pondok teu meunang disambung" (Panjang tidak boleh dipotong, pendek tidak boleh disambung) — menerima apa adanya pemberian alam.',
    philosophyEn: '"Lojor teu meunang dipotong, pondok teu meunang disambung" (Long must not be cut, short must not be joined) — accepting nature\'s gifts as they are.',
  },
  {
    id: 'toraja',
    name: 'Masyarakat Toraja',
    nameEn: 'Toraja People',
    location: 'Tana Toraja, Sulawesi Selatan',
    region: 'sulawesi',
    regionLabel: 'Sulawesi',
    regionLabelEn: 'Sulawesi',
    type: 'ritual',
    sustainability: 80,
    desc: 'Budaya upacara kematian Rambu Solo yang sangat megah dan sakral, menghubungkan dunia manusia dengan leluhur (Puya) melalui pengorbanan suci.',
    descEn: 'The grand and sacred funeral ceremony of Rambu Solo, connecting the human world with ancestors (Puya) through sacred sacrifices.',
    image: TEXTILE_IMG,
    lat: -2.9896,
    lng: 119.8972,
    radarData: [
      { subject: 'Lingkungan', value: 70 }, { subject: 'Tradisi', value: 95 }, { subject: 'Sosial', value: 90 },
      { subject: 'Spiritual', value: 98 }, { subject: 'Ekonomi', value: 75 },
    ],
    envPractice: 'Pelestarian pohon bambu adat untuk kebutuhan upacara adat dan pengelolaan tata ruang bukit melalui zonasi kompleks rumah Tongkonan.',
    envPracticeEn: 'Conservation of customary bamboo trees for ritual needs and hillside land management through the zoning of Tongkonan house complexes.',
    wayOfLife: 'Sistem kemasyarakatan berbasis strata sosial adat yang kuat, pertanian padi terasering pegunungan, dan ukiran kayu bermakna filosofis tinggi.',
    wayOfLifeEn: 'Strong custom-based social stratification, mountainous terraced rice farming, and wood carvings loaded with philosophical meanings.',
    philosophy: '"Misa\' kada dipotuo, pantan kada dipomate" (Bersatu kita hidup, bercerai kita mati) — menekankan solidaritas komunal luar biasa.',
    philosophyEn: '"Misa\' kada dipotuo, pantan kada dipomate" (United we live, divided we die) — emphasizing extraordinary communal solidarity.',
  },
  {
    id: 'dayak',
    name: 'Suku Dayak Kenyah',
    nameEn: 'Dayak Kenyah Tribe',
    location: 'Apo Kayan, Kalimantan Utara',
    region: 'kalimantan',
    regionLabel: 'Kalimantan',
    regionLabelEn: 'Borneo',
    type: 'tradisi',
    sustainability: 92,
    desc: 'Penjaga paru-paru dunia di hutan Kalimantan yang menerapkan sistem hukum adat Tana\' Ulen untuk menjaga kawasan hutan lindung tradisional.',
    descEn: 'Guardians of the lungs of the world in Borneo forests, implementing the Tana\' Ulen customary law to preserve traditional protected forest zones.',
    image: FOREST_IMG,
    lat: 1.6212,
    lng: 114.9315,
    radarData: [
      { subject: 'Lingkungan', value: 95 }, { subject: 'Tradisi', value: 88 }, { subject: 'Sosial', value: 78 },
      { subject: 'Spiritual', value: 85 }, { subject: 'Ekonomi', value: 60 },
    ],
    envPractice: 'Sistem Tana\' Ulen yang menetapkan hutan larangan komunal di mana penebangan pohon dan perburuan diatur ketat dengan denda adat berat.',
    envPracticeEn: 'The Tana\' Ulen system designating communal forbidden forests where logging and hunting are strictly regulated under heavy customary fines.',
    wayOfLife: 'Hidup guyub di dalam Rumah Betang (Rumah Panjang), bertani padi gunung, menyumpit, dan menggunakan sungai sebagai nadi transportasi utama.',
    wayOfLifeEn: 'Living communally in a Rumah Betang (Longhouse), upland rice farming, blowpipe hunting, and using rivers as primary transport arteries.',
    philosophy: '"Belom Bahadat" (Hidup Beradat) — tuntunan hidup untuk menghormati alam, sesama manusia, makhluk gaib, dan Sang Pencipta.',
    philosophyEn: '"Belom Bahadat" (Living with Custom) — guidance for respecting nature, fellow humans, spirits, and the Creator.',
  },
  {
    id: 'minang',
    name: 'Minangkabau',
    nameEn: 'Minangkabau People',
    location: 'Padang, Sumatera Barat',
    region: 'sumatera',
    regionLabel: 'Sumatera',
    regionLabelEn: 'Sumatra',
    type: 'tradisi',
    sustainability: 78,
    desc: 'Masyarakat penganut sistem kekerabatan matrilineal terbesar di dunia, memadukan hukum adat yang demokratis dengan nilai spiritual Islam.',
    descEn: 'The largest matrilineal society in the world, harmoniously integrating democratic customary law with Islamic spiritual values.',
    image: WEAVING_IMG,
    lat: -0.9471,
    lng: 100.4172,
    radarData: [
      { subject: 'Lingkungan', value: 75 }, { subject: 'Tradisi', value: 95 }, { subject: 'Sosial', value: 92 },
      { subject: 'Spiritual', value: 80 }, { subject: 'Ekonomi', value: 85 },
    ],
    envPractice: 'Konsep kepemilikan komunal "Tanah Ulayat" yang mencegah penjualan tanah waris ke pihak luar untuk menjamin keberlanjutan pertanian keluarga.',
    envPracticeEn: 'The communal ownership concept of "Tanah Ulayat" preventing sale of inherited land to outsiders to guarantee agricultural sustainability.',
    wayOfLife: 'Musyawarah mufakat di Balai Adat / Rumah Gadang, kewajiban pemuda untuk merantau mencari ilmu/pengalaman, serta kerajinan tenun Songket.',
    wayOfLifeEn: 'Consensus decision making in Balai Adat / Rumah Gadang, custom of young men migration (merantau), and traditional Songket weaving.',
    philosophy: '"Alam takambang jadi guru" (Alam yang terbentang dijadikan sebagai guru) — belajar kearifan hidup dari hukum dan keindahan alam.',
    philosophyEn: '"Alam takambang jadi guru" (The wide open nature is our teacher) — learning life wisdom from natural laws and beauty.',
  },
  {
    id: 'bali',
    name: 'Subak Ubud Bali',
    nameEn: 'Subak Ubud Bali',
    location: 'Ubud, Gianyar, Bali',
    region: 'bali',
    regionLabel: 'Bali',
    regionLabelEn: 'Bali',
    type: 'lingkungan',
    sustainability: 90,
    desc: 'Sistem tata kelola air dan pertanian padi tradisional Bali yang menggabungkan kemitraan tani, teknologi hidrolik sederhana, dan ritual keagamaan pura.',
    descEn: 'Traditional Balinese water management and rice farming system combining agricultural cooperation, simple hydraulics, and temple rituals.',
    image: BALI_IMG,
    lat: -8.5069,
    lng: 115.2625,
    radarData: [
      { subject: 'Lingkungan', value: 92 }, { subject: 'Tradisi', value: 96 }, { subject: 'Sosial', value: 94 },
      { subject: 'Spiritual', value: 95 }, { subject: 'Ekonomi', value: 70 },
    ],
    envPractice: 'Pembagian air irigasi yang adil secara berkala demi mencegah perebutan sumber daya, dikontrol secara spiritual melalui Pura Subak.',
    envPracticeEn: 'Fair and periodic distribution of irrigation water to prevent resource conflicts, spiritually managed through Subak Temples.',
    wayOfLife: 'Gotong royong membangun terasering sawah, pelaksanaan upacara sesaji di sawah pada setiap siklus pertumbuhan padi, dan seni musik gamelan tani.',
    wayOfLifeEn: 'Cooperative construction of rice terraces, offering rituals in fields during growth cycles, and agricultural gamelan music.',
    philosophy: '"Tri Hita Karana" (Tiga Hubungan Penyebab Keharmonisan) — keharmonisan hubungan manusia dengan Tuhan, sesama manusia, dan alam sekitar.',
    philosophyEn: '"Tri Hita Karana" (Three Causes of Harmony) — harmonious relationships of humans with God, fellow humans, and nature.',
  },
  {
    id: 'asmat',
    name: 'Suku Asmat',
    nameEn: 'Asmat Tribe',
    location: 'Agats, Papua Selatan',
    region: 'papua',
    regionLabel: 'Papua',
    regionLabelEn: 'Papua',
    type: 'ritual',
    sustainability: 88,
    desc: 'Suku penjaga rawa dan hutan bakau tropis terluas di Papua, terkenal di dunia karena seni ukir kayu spiritualnya yang sakral.',
    descEn: 'Guardians of the largest tropical swamps and mangrove forests in Papua, globally renowned for their sacred spiritual wood carvings.',
    image: PAPUA_IMG,
    lat: -5.5126,
    lng: 138.1254,
    radarData: [
      { subject: 'Lingkungan', value: 90 }, { subject: 'Tradisi', value: 94 }, { subject: 'Sosial', value: 85 },
      { subject: 'Spiritual', value: 95 }, { subject: 'Ekonomi', value: 50 },
    ],
    envPractice: 'Pelestarian pohon sagu adat dan ekosistem mangrove sebagai filter pesisir pantai alami secara turun-temurun melalui tabu adat.',
    envPracticeEn: 'Generational preservation of customary sago trees and mangrove ecosystems as natural coastal filters through customary taboos.',
    wayOfLife: 'Tinggal di Rumah Jew (Rumah Bujang), mendayung perahu kayu tanpa alas kaki menyusuri sungai berlumpur, serta mengukir patung leluhur Bisj.',
    wayOfLifeEn: 'Living in Rumah Jew (Bachelor House), paddling wooden boats barefoot along muddy rivers, and carving Bisj ancestor poles.',
    philosophy: 'Kepercayaan bahwa manusia adalah bagian tak terpisahkan dari roh hutan dan leluhur; merusak alam berarti merusak jiwa leluhur.',
    philosophyEn: 'The belief that humans are inseparable from forest and ancestral spirits; destroying nature means destroying ancestral souls.',
  },
  {
    id: 'naga',
    name: 'Kampung Naga',
    nameEn: 'Kampung Naga',
    location: 'Tasikmalaya, Jawa Barat',
    region: 'jawa',
    regionLabel: 'Jawa',
    regionLabelEn: 'Java',
    type: 'lingkungan',
    sustainability: 94,
    desc: 'Komunitas adat Sunda yang menolak modernisasi dan listrik, memelihara hutan larangan di sepanjang sungai Ciwulan secara murni.',
    descEn: 'A Sundanese customary community rejecting modernization and electricity, purely preserving the forbidden forest along the Ciwulan river.',
    image: NAGA_IMG,
    lat: -7.3622,
    lng: 107.9942,
    radarData: [
      { subject: 'Lingkungan', value: 96 }, { subject: 'Tradisi', value: 94 }, { subject: 'Sosial', value: 90 },
      { subject: 'Spiritual', value: 92 }, { subject: 'Ekonomi', value: 60 },
    ],
    envPractice: 'Zonasi ketat "Leuweung Larangan" (hutan yang tidak boleh disentuh manusia) dan "Leuweung Titipan" (hutan yang dimanfaatkan secara terbatas).',
    envPracticeEn: 'Strict zoning of "Leuweung Larangan" (untouched forest) and "Leuweung Titipan" (forest for limited communal use).',
    wayOfLife: 'Membangun rumah panggung seragam berbahan bambu/ijuk yang tahan gempa, memasak dengan kayu bakar, dan bertani padi organik.',
    wayOfLifeEn: 'Building uniform earthquake-resistant stilt houses of bamboo and thatch, cooking with firewood, and organic rice farming.',
    philosophy: '"Kudu sa-uyunan, ulah pagirang-girang tampian" (Harus hidup rukun berdampingan, jangan saling berebut/iri hati dalam hidup).',
    philosophyEn: '"Kudu sa-uyunan, ulah pagirang-girang tampian" (Must live in harmony together, do not compete or envy each other).',
  },
  {
    id: 'sasak',
    name: 'Suku Sasak Sade',
    nameEn: 'Sasak Sade Tribe',
    location: 'Pujut, Lombok Tengah',
    region: 'nusatenggara',
    regionLabel: 'Nusa Tenggara',
    regionLabelEn: 'Lesser Sunda',
    type: 'tradisi',
    sustainability: 82,
    desc: 'Masyarakat adat Sasak yang mempertahankan gaya hidup tradisional di tengah pariwisata modern Lombok, menjaga tenun khas Sade.',
    descEn: 'Sasak customary community maintaining their traditional lifestyle amidst modern Lombok tourism, preserving unique Sade weaving.',
    image: SASAK_IMG,
    lat: -8.7072,
    lng: 116.2736,
    radarData: [
      { subject: 'Lingkungan', value: 80 }, { subject: 'Tradisi', value: 92 }, { subject: 'Sosial', value: 88 },
      { subject: 'Spiritual', value: 85 }, { subject: 'Ekonomi', value: 72 },
    ],
    envPractice: 'Pembangunan rumah menggunakan material organik lokal (tanah liat, kotoran kerbau untuk perekat lantai, bambu, jerami) yang biodegradable.',
    envPracticeEn: 'House construction using local organic biodegradable materials (clay, buffalo dung floor plaster, bamboo, thatch).',
    wayOfLife: 'Menyusun benang tenun songket khas Sade secara manual, ritual Tari Peresean (pertarungan persaudaraan), dan arsitektur rumah Bale Tani.',
    wayOfLifeEn: 'Weaving Sade songket fabrics manually, performing the Peresean dance (brotherhood duel), and building Bale Tani architecture.',
    philosophy: '"Belomba-lomba membaik" — menjaga keharmonisan bertetangga serta kepatuhan penuh pada tetua adat (Krama Desa).',
    philosophyEn: '"Belomba-lomba membaik" (Strive to improve) — maintaining neighborhood harmony and complete obedience to customary elders.',
  },
];

const preservationData = [
  { year: '2000', baduy: 98, toraja: 90, dayak: 85, minang: 82, bali: 93, asmat: 90, naga: 96, sasak: 84 },
  { year: '2005', baduy: 97, toraja: 87, dayak: 80, minang: 81, bali: 92, asmat: 90, naga: 95, sasak: 83 },
  { year: '2010', baduy: 96, toraja: 85, dayak: 82, minang: 79, bali: 91, asmat: 89, naga: 95, sasak: 82 },
  { year: '2015', baduy: 95, toraja: 83, dayak: 84, minang: 78, bali: 90, asmat: 88, naga: 94, sasak: 82 },
  { year: '2020', baduy: 95, toraja: 81, dayak: 85, minang: 78, bali: 90, asmat: 88, naga: 94, sasak: 82 },
  { year: '2025', baduy: 95, toraja: 80, dayak: 92, minang: 78, bali: 90, asmat: 88, naga: 94, sasak: 82 },
];

const typeColors: Record<string, string> = {
  tradisi: '#F4A261', // Amber
  ritual: '#A855F7',  // Purple
  lingkungan: '#10B981', // Emerald
};

const mapStyles = {
  light: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
};

const t = {
  id: {
    title: 'Jelajah Budaya Nusantara',
    sub: 'Sistem pemetaan interaktif budaya Nusantara berbasis Web GIS. Terinspirasi dari Google Arts & Culture dan National Geographic.',
    search: 'Cari budaya atau daerah...',
    filter: 'Filter Kategori',
    compare: 'Mode Perbandingan',
    story: 'Petualangan Baduy',
    all: 'Semua',
    tradisi: 'Tradisi',
    ritual: 'Ritual',
    lingkungan: 'Lingkungan',
    detail: 'Pelajari Lebih Dalam',
    vr: 'Lihat Imersif VR 360°',
    close: 'Tutup',
    chart: 'Tren Indeks Pelestarian Budaya (2000-2025)',
    compareTitle: 'Perbandingan Kebudayaan',
    selectLeft: 'Pilih Budaya Kiri',
    selectRight: 'Pilih Budaya Kanan',
    sustainability: 'Tingkat Keberlanjutan',
    region: 'Filter Wilayah',
    allRegions: 'Semua Pulau',
    layers: 'Lapisan Peta',
    qualitative: 'Analisis Aspek Kualitatif',
    envPracticeTitle: 'Praktik Konservasi Lingkungan',
    wayOfLifeTitle: 'Sistem Kehidupan Sosial',
    philosophyTitle: 'Filosofi Adat Utama',
    backToMap: 'Kembali ke Peta',
    suggestionTitle: 'Coba tanya AI:',
    storyTitle: 'Simulasi Kehidupan Baduy',
    storySub: 'Hadapi tantangan hidup ramah lingkungan berdasarkan hukum adat Pikukuh Suku Baduy.',
    ecoScore: 'Skor Ekologi',
    tradScore: 'Ketaatan Adat',
    sprScore: 'Nilai Spiritual',
    storyStart: 'Mulai Petualangan',
    storyRestart: 'Ulangi Petualangan',
    congratulations: 'Selamat! Kamu telah menyelesaikan simulasi sehari bersama Suku Baduy.',
  },
  en: {
    title: 'Nusantara Cultural Explorer',
    sub: 'Interactive Web GIS cultural mapping of the Indonesian archipelago. Inspired by Google Arts & Culture and National Geographic.',
    search: 'Search culture or region...',
    filter: 'Category Filter',
    compare: 'Comparison Mode',
    story: 'Baduy Adventure',
    all: 'All',
    tradisi: 'Tradition',
    ritual: 'Ritual',
    lingkungan: 'Environment',
    detail: 'Learn More',
    vr: 'View Immersive VR 360°',
    close: 'Close',
    chart: 'Cultural Preservation Index Trend (2000-2025)',
    compareTitle: 'Cultural Comparison',
    selectLeft: 'Select Left Culture',
    selectRight: 'Select Right Culture',
    sustainability: 'Sustainability Level',
    region: 'Filter Region',
    allRegions: 'All Islands',
    layers: 'Map Layers',
    qualitative: 'Qualitative Aspect Analysis',
    envPracticeTitle: 'Environmental Conservation Practices',
    wayOfLifeTitle: 'Social Living Systems',
    philosophyTitle: 'Core Customary Philosophy',
    backToMap: 'Back to Map',
    suggestionTitle: 'Ask AI:',
    storyTitle: 'Baduy Life Simulation',
    storySub: 'Face the challenges of eco-friendly living based on the Pikukuh custom of the Baduy Tribe.',
    ecoScore: 'Ecological Score',
    tradScore: 'Custom Compliance',
    sprScore: 'Spiritual Value',
    storyStart: 'Start Adventure',
    storyRestart: 'Restart Adventure',
    congratulations: 'Congratulations! You have completed the one-day simulation with the Baduy.',
  },
};

// Map controller to handle dynamic flying
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

// Custom Zoom Controls
function ZoomControls() {
  const map = useMap();
  return (
    <div className="absolute bottom-4 right-4 z-[999] flex flex-col gap-1.5">
      <button
        onClick={() => map.zoomIn()}
        className="w-9 h-9 bg-card border border-border text-foreground hover:bg-muted flex items-center justify-center rounded-xl shadow-lg font-bold text-lg transition-transform active:scale-95 cursor-pointer"
        title="Zoom In"
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="w-9 h-9 bg-card border border-border text-foreground hover:bg-muted flex items-center justify-center rounded-xl shadow-lg font-bold text-lg transition-transform active:scale-95 cursor-pointer"
        title="Zoom Out"
      >
        −
      </button>
    </div>
  );
}

// Custom Marker Creator helper
const createCustomIcon = (type: 'tradisi' | 'ritual' | 'lingkungan', active: boolean) => {
  const color = typeColors[type];
  const activeClass = active ? 'scale-125 ring-4 ring-white/40 shadow-2xl' : 'hover:scale-110';
  const html = `
    <div class="relative flex items-center justify-center transition-all duration-300 ${activeClass}" style="width: 32px; height: 32px;">
      <div class="absolute inset-0 rounded-full animate-ping opacity-30" style="background-color: ${color};"></div>
      <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center relative z-10 transition-transform duration-300" style="background-color: ${color};">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

// Story Mode Scenarios
interface ScenarioStep {
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  image: string;
  lat: number;
  lng: number;
  zoom: number;
  choices: {
    textId: string;
    textEn: string;
    ecoEffect: number;
    tradEffect: number;
    sprEffect: number;
    feedbackId: string;
    feedbackEn: string;
  }[];
}

const storyScenarios: ScenarioStep[] = [
  {
    titleId: 'Pos Pintu Masuk Ciboleger (Pagi)',
    titleEn: 'Ciboleger Entrance Checkpoint (Morning)',
    descId: 'Kamu baru saja tiba di perbatasan desa Baduy. Pemandu mengingatkan tentang aturan Pikukuh adat. Kamu sedang memegang botol air plastik sekali pakai yang baru saja kamu beli di kota.',
    descEn: 'You have just arrived at the border of the Baduy village. The guide reminds you of the Pikukuh customary rule. You are holding a single-use plastic water bottle you recently bought in the city.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    lat: -6.5684,
    lng: 106.2628,
    zoom: 13,
    choices: [
      {
        textId: 'Buang botol plastik di luar desa, lalu sewa kojong bambu tradisional.',
        textEn: 'Discard the plastic bottle outside, then rent a traditional bamboo container.',
        ecoEffect: 20,
        tradEffect: 15,
        sprEffect: 10,
        feedbackId: 'Bagus! Mengurangi limbah anorganik di kawasan adat sangat dihargai dan menjaga kesucian tanah.',
        feedbackEn: 'Great! Reducing inorganic waste in the customary area is highly appreciated and keeps the soil sacred.',
      },
      {
        textId: 'Simpan botol plastik di ransel dan janji membawanya pulang nanti.',
        textEn: 'Keep the plastic bottle inside your backpack and promise to bring it home later.',
        ecoEffect: 10,
        tradEffect: 5,
        sprEffect: 5,
        feedbackId: 'Cukup bijaksana, tapi pastikan botol tersebut tidak terjatuh atau tertinggal di area dalam.',
        feedbackEn: 'Wise enough, but ensure the bottle does not fall or get left behind in the inner area.',
      }
    ]
  },
  {
    titleId: 'Makan Siang di Kampung Kaduketug (Siang)',
    titleEn: 'Lunch at Kaduketug Village (Noon)',
    descId: 'Kamu diundang makan siang di rumah panggung milik seorang warga Baduy Luar. Mereka menyajikan hidangan nasi huma lokal. Tidak ada kompor gas atau peralatan listrik, memasak menggunakan kayu bakar kering.',
    descEn: 'You are invited to have lunch inside a stilt house of a Baduy Luar resident. They serve local huma hill rice. There are no gas stoves or electrical appliances; cooking is done using dry firewood.',
    image: VILLAGE_IMG,
    lat: -6.6080,
    lng: 106.2678,
    zoom: 15,
    choices: [
      {
        textId: 'Menikmati sajian tradisional dan ikut membantu merapikan kayu bakar.',
        textEn: 'Enjoy the traditional meal and help arrange the dry firewood.',
        ecoEffect: 15,
        tradEffect: 20,
        sprEffect: 15,
        feedbackId: 'Luar biasa! Belajar menghargai proses memasak menggunakan energi terbarukan kayu ranting kering tanpa merusak pohon hidup.',
        feedbackEn: 'Wonderful! Learning to appreciate cooking with renewable energy from dry twigs without damaging live trees.',
      },
      {
        textId: 'Mengeluarkan kompor gas portabel kustom milikmu agar memasak lebih cepat.',
        textEn: 'Pull out your custom portable gas stove to speed up the process.',
        ecoEffect: -15,
        tradEffect: -25,
        sprEffect: -15,
        feedbackId: 'Warga adat merasa kurang nyaman karena melanggar larangan membawa alat pembakaran modern ke dalam permukiman.',
        feedbackEn: 'Customary residents feel uncomfortable as bringing modern combustion devices into settlements violates custom.',
      }
    ]
  },
  {
    titleId: 'Membersihkan Diri di Sungai Ciujung (Sore)',
    titleEn: 'Refreshing at Ciujung River (Afternoon)',
    descId: 'Sore hari terasa gerah, kamu ingin membersihkan diri di sungai jernih di dekat kampung. Namun, hukum adat Pikukuh melarang pemakaian sabun, sampo, dan pasta gigi kimia karena limbahnya mencemari air sungai.',
    descEn: 'The afternoon feels hot, and you want to clean up in the crystal clear river near the village. However, the Pikukuh law forbids the use of chemical soap, shampoo, and toothpaste to prevent polluting the water.',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    lat: -6.6150,
    lng: 106.2580,
    zoom: 16,
    choices: [
      {
        textId: 'Mandi menyegarkan diri hanya menggunakan aliran air sungai murni.',
        textEn: 'Bathe and refresh yourself using only the pure flowing river water.',
        ecoEffect: 25,
        tradEffect: 25,
        sprEffect: 20,
        feedbackId: 'Hebat! Kamu merangkul gaya hidup murni Suku Baduy dan menjaga sungai tetap bersih bagi ribuan makhluk hidup di hilir.',
        feedbackEn: 'Great! You embrace the pure lifestyle of the Baduy and keep the river clean for thousands of living organisms downstream.',
      },
      {
        textId: 'Menggunakan sedikit sabun cair berlabel "Biodegradable/Organik" secara diam-diam.',
        textEn: 'Secretly use a small amount of soap labeled "Biodegradable/Organic".',
        ecoEffect: -5,
        tradEffect: -15,
        sprEffect: -10,
        feedbackId: 'Meskipun organik, hukum adat melarang segala zat asing komersial. Kejujuran adalah kunci kelestarian alam Baduy.',
        feedbackEn: 'Even if organic, customary law bans all commercial foreign substances. Honesty is key to preserving Baduy nature.',
      }
    ]
  },
  {
    titleId: 'Menginap di Rumah Panggung Adat (Malam)',
    titleEn: 'Staying in a Customary Stilt House (Night)',
    descId: 'Malam hari telah tiba, desa menjadi sangat gelap karena tidak menggunakan tiang listrik jalanan. Beberapa warga berkumpul di beranda rumah panggung kayu sambil menyalakan pelita bambu minyak kelapa. Mereka berbincang santai.',
    descEn: 'Night has fallen, and the village is completely pitch dark as there is no electricity. Several residents gather on the wooden veranda under coconut oil torches. They talk and share stories.',
    image: NAGA_IMG,
    lat: -6.6119,
    lng: 106.2625,
    zoom: 16,
    choices: [
      {
        textId: 'Ikut berkumpul dan mengobrol dengan warga di bawah pelita minyak kelapa.',
        textEn: 'Join the gathering and chat with residents under the warm oil torch light.',
        ecoEffect: 15,
        tradEffect: 20,
        sprEffect: 25,
        feedbackId: 'Luar biasa! Interaksi sosial langsung tanpa terganggu gawai membuatmu benar-benar memahami kehangatan komunal dan ketenangan batin Baduy.',
        feedbackEn: 'Wonderful! Direct social interaction without gadget distractions helps you truly understand the communal warmth and inner peace of the Baduy.',
      },
      {
        textId: 'Menyalakan senter LED baterai berdaya tinggi milikmu untuk membaca buku di sudut kamar.',
        textEn: 'Turn on your high-power LED battery flashlight to read a book in your room corner.',
        ecoEffect: -5,
        tradEffect: -10,
        sprEffect: -5,
        feedbackId: 'Cahaya buatan yang terlalu terang dinilai merusak ketenangan malam alami permukiman adat Baduy. Hargailah suasana hening malam.',
        feedbackEn: 'Artificial light that is too bright is considered disruptive to the natural night peace of the Baduy village. Respect the silent night.',
      }
    ]
  }
];

export function JelajahSection({ lang, isDark }: Props) {
  // Filters & State
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sustainabilityMin, setSustainabilityMin] = useState<number>(50);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CulturePoint | null>(null);
  
  // Custom interactive panels state
  const [compareMode, setCompareMode] = useState(false);
  const [compareLeft, setCompareLeft] = useState<string>('baduy');
  const [compareRight, setCompareRight] = useState<string>('toraja');
  
  const leftCulture = cultures.find(c => c.id === compareLeft)!;
  const rightCulture = cultures.find(c => c.id === compareRight)!;

  // Layer toggles
  const [showLayerBudaya, setShowLayerBudaya] = useState(true);
  const [showLayerLingkungan, setShowLayerLingkungan] = useState(true);
  const [showLayerKearifan, setShowLayerKearifan] = useState(true);

  // Story Mode State
  const [storyActive, setStoryActive] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const [ecoScore, setEcoScore] = useState(50);
  const [tradScore, setTradScore] = useState(50);
  const [sprScore, setSprScore] = useState(50);
  const [storyFeedback, setStoryFeedback] = useState<string | null>(null);
  const [storyFeedbackEn, setStoryFeedbackEn] = useState<string | null>(null);

  // Map view positioning states
  const [mapCenter, setMapCenter] = useState<[number, number]>([-2.5489, 118.0149]);
  const [mapZoom, setMapZoom] = useState(5);

  // Live GIS Ticker Index
  const [tickerIndex, setTickerIndex] = useState(0);

  const tx = t[lang];

  // Rotate GIS log tickers
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % tickers.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const tickers = [
    lang === 'id' ? "[AI] Suku Baduy mempertahankan 100% zonasi Hutan Larangan (Leuweung Kolot)." : "[AI] Baduy Tribe preserves 100% of the Sacred Forest (Leuweung Kolot) zone.",
    lang === 'id' ? "[GIS] Subak Bali mendeteksi efisiensi konservasi air pertanian sawah: 94%." : "[GIS] Subak Bali detects rice field water conservation efficiency: 94%.",
    lang === 'id' ? "[AI] Rekomendasi kemiripan Kampung Naga & Baduy berhasil disinkronkan: 94%." : "[AI] Similarity recommendations for Kampung Naga & Baduy synced: 94%.",
    lang === 'id' ? "[GIS] Ancaman urbanisasi Tana Toraja terpantau stabil rendah." : "[GIS] Urbanization threat level in Tana Toraja monitored stable low.",
    lang === 'id' ? "[AI] Pola pelestarian Tana Ulen Suku Dayak dianalisis: 92% Sangat Lestari." : "[AI] Dayak Tana Ulen preservation pattern analyzed: 92% Highly Sustainable.",
    lang === 'id' ? "[GIS] Satelit memantau kerapatan Hutan Mangrove Suku Asmat: Terjaga Baik." : "[GIS] Satellite monitors Asmat mangrove forest density: Well Preserved.",
    lang === 'id' ? "[AI] Nilai kearifan Sasak Sade terintegrasi dalam pemetaan." : "[AI] Sasak Sade wisdom values integrated in mapping.",
    lang === 'id' ? "[GIS] Indeks Kelestarian Budaya Indonesia diperbarui: 84.5% (Optimal)." : "[GIS] Indonesia Cultural Preservation Index updated: 84.5% (Optimal)."
  ];

  // AI query handler
  const handleAISuggestion = (queryText: string) => {
    setSearch(queryText);
    if (queryText.toLowerCase().includes('hutan') || queryText.toLowerCase().includes('lestari')) {
      setActiveFilter('lingkungan');
      setRegionFilter('all');
      setSustainabilityMin(85);
      setMapCenter([1.6212, 114.9315]);
      setMapZoom(6);
    } else if (queryText.toLowerCase().includes('matrilineal') || queryText.toLowerCase().includes('minang')) {
      setSearch('Minangkabau');
      setActiveFilter('all');
      setRegionFilter('sumatera');
      const minangData = cultures.find(c => c.id === 'minang');
      if (minangData) {
        setSelected(minangData);
        setMapCenter([minangData.lat, minangData.lng]);
        setMapZoom(8);
      }
    } else if (queryText.toLowerCase().includes('air') || queryText.toLowerCase().includes('baduy')) {
      setSearch('Baduy');
      setActiveFilter('lingkungan');
      setRegionFilter('jawa');
      const baduyData = cultures.find(c => c.id === 'baduy');
      if (baduyData) {
        setSelected(baduyData);
        setMapCenter([baduyData.lat, baduyData.lng]);
        setMapZoom(10);
      }
    }
  };

  // Filter application
  const filtered = cultures.filter(c => {
    const matchCategory = activeFilter === 'all' || c.type === activeFilter;
    const matchRegion = regionFilter === 'all' || c.region === regionFilter;
    const matchSustain = c.sustainability >= sustainabilityMin;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    
    // Layer filters
    let matchLayer = false;
    if (c.type === 'tradisi' && showLayerBudaya) matchLayer = true;
    if (c.type === 'ritual' && showLayerKearifan) matchLayer = true;
    if (c.type === 'lingkungan' && showLayerLingkungan) matchLayer = true;

    return matchCategory && matchRegion && matchSustain && matchSearch && matchLayer;
  });

  // Dynamic AI similarity recommendation calculations
  const getAIRecommendation = (currentId: string) => {
    if (currentId === 'baduy') {
      return {
        targetId: 'naga',
        targetName: 'Kampung Naga',
        score: 94,
        reasonId: 'Memiliki kesamaan adat Sunda yang ketat dalam menolak listrik, melarang eksploitasi semen, dan memiliki kawasan Hutan Larangan suci.',
        reasonEn: 'Shares strict Sundanese custom of rejecting electricity, banning cement, and protecting a sacred Forbidden Forest.'
      };
    } else if (currentId === 'naga') {
      return {
        targetId: 'baduy',
        targetName: 'Suku Baduy',
        score: 94,
        reasonId: 'Sama-sama memegang adat Sunda Wiwitan/Kuno, melarang aliran listrik di permukiman adat, dan memelihara ekosistem sungai secara alami.',
        reasonEn: 'Both hold ancient Sundanese beliefs, prohibit electricity in customary zones, and naturally preserve river ecosystems.'
      };
    } else if (currentId === 'bali') {
      return {
        targetId: 'minang',
        targetName: 'Minangkabau',
        score: 80,
        reasonId: 'Menerapkan tata kelola sumber daya komunal yang dikontrol ketat oleh tetua adat (Subak vs Tanah Ulayat) demi melestarikan lahan tani keluarga.',
        reasonEn: 'Implements communal resource management strictly controlled by custom (Subak vs Tanah Ulayat) to preserve family farmland.'
      };
    } else if (currentId === 'dayak') {
      return {
        targetId: 'asmat',
        targetName: 'Suku Asmat',
        score: 88,
        reasonId: 'Sama-sama memiliki sistem perlindungan hutan komunal berskala besar (Tana\' Ulen vs Mangrove Adat) serta ketergantungan spiritual pada roh hutan.',
        reasonEn: 'Both feature large-scale communal forest protection (Tana\' Ulen vs Adat Mangrove) and share spiritual dependency on forest spirits.'
      };
    } else if (currentId === 'asmat') {
      return {
        targetId: 'dayak',
        targetName: 'Suku Dayak Kenyah',
        score: 88,
        reasonId: 'Berbagi ikatan spiritual mendalam pada pohon pelindung dan hutan rimba Kalimantan/Papua sebagai penyangga utama kehidupan komunal mereka.',
        reasonEn: 'Shares deep spiritual bonds with protective forest canopies in Borneo/Papua as primary pillars of their communal life.'
      };
    } else if (currentId === 'toraja') {
      return {
        targetId: 'sasak',
        targetName: 'Suku Sasak Sade',
        score: 82,
        reasonId: 'Memiliki kesamaan dalam pelestarian arsitektur rumah adat berbahan serat organik alami serta ritual perkumpulan komunal leluhur.',
        reasonEn: 'Shares similarities in preserving customary house architectures built from natural organic fibers and ancestral communal ceremonies.'
      };
    } else if (currentId === 'sasak') {
      return {
        targetId: 'toraja',
        targetName: 'Masyarakat Toraja',
        score: 82,
        reasonId: 'Kemiripan tinggi dalam pelestarian anyaman adat serta arsitektur tahan gempa berbahan bambu/jerami tradisional.',
        reasonEn: 'High similarity in custom weaving preservation and earthquake-resistant bamboo/thatch customary architectures.'
      };
    } else {
      return {
        targetId: 'bali',
        targetName: 'Subak Ubud Bali',
        score: 80,
        reasonId: 'Konsep pemanfaatan alam yang terorganisir tanpa merusak ekosistem (Subak) mirip dengan prinsip belajar dari alam Minangkabau.',
        reasonEn: 'The concept of organized utilization of nature without ruining ecosystems (Subak) is similar to the Minangkabau principle of learning from nature.'
      };
    }
  };

  // Story step action execution
  const handleStoryChoice = (eco: number, trad: number, spr: number, feedback: string, feedbackEn: string) => {
    setEcoScore(prev => Math.min(100, Math.max(0, prev + eco)));
    setTradScore(prev => Math.min(100, Math.max(0, prev + trad)));
    setSprScore(prev => Math.min(100, Math.max(0, prev + spr)));
    setStoryFeedback(feedback);
    setStoryFeedbackEn(feedbackEn);
  };

  // Transition to next story step
  const handleNextStory = () => {
    setStoryFeedback(null);
    setStoryFeedbackEn(null);
    const nextStep = storyStep + 1;
    setStoryStep(nextStep);
    
    if (nextStep < storyScenarios.length) {
      setMapCenter([storyScenarios[nextStep].lat, storyScenarios[nextStep].lng]);
      setMapZoom(storyScenarios[nextStep].zoom);
    } else {
      // Game over/ending step
      setMapCenter([-6.6119, 106.2625]);
      setMapZoom(12);
    }
  };

  // Reset Story Game
  const resetStory = () => {
    setStoryStep(0);
    setEcoScore(50);
    setTradScore(50);
    setSprScore(50);
    setStoryFeedback(null);
    setStoryFeedbackEn(null);
    setMapCenter([storyScenarios[0].lat, storyScenarios[0].lng]);
    setMapZoom(storyScenarios[0].zoom);
  };

  // Trigger Story Mode activation
  const toggleStoryMode = () => {
    if (!storyActive) {
      setStoryActive(true);
      setCompareMode(false);
      setSelected(null);
      // Set to first story coordinates
      setMapCenter([storyScenarios[0].lat, storyScenarios[0].lng]);
      setMapZoom(storyScenarios[0].zoom);
    } else {
      setStoryActive(false);
      setMapCenter([-2.5489, 118.0149]);
      setMapZoom(5);
    }
  };

  // Scroll and highlight VR/AR
  const handleVRClick = () => {
    setSelected(null);
    const labSection = document.getElementById('lab');
    if (labSection) {
      labSection.scrollIntoView({ behavior: 'smooth' });
      // Trigger temporary glowing outline or focus on VR cards
      const vrButton = document.querySelector('[href="#lab"]');
      if (vrButton) {
        (vrButton as HTMLElement).click();
      }
    }
  };

  // Calculate story ending medal
  const getStoryMedal = () => {
    const finalScore = Math.round((ecoScore + tradScore + sprScore) / 3);
    if (finalScore >= 80) {
      return {
        medalId: 'Medali Emas 🥇',
        medalEn: 'Gold Medal 🥇',
        titleId: 'Penjaga Hutan Sejati (True Guardian)',
        titleEn: 'True Guardian of the Forest',
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/30'
      };
    } else if (finalScore >= 60) {
      return {
        medalId: 'Medali Perak 🥈',
        medalEn: 'Silver Medal 🥈',
        titleId: 'Sahabat Alam (Eco Ally)',
        titleEn: 'Eco Ally',
        color: 'text-slate-400 bg-slate-400/10 border-slate-400/30'
      };
    } else {
      return {
        medalId: 'Medali Perunggu 🥉',
        medalEn: 'Bronze Medal 🥉',
        titleId: 'Wisatawan Pemula (Eco Tourist)',
        titleEn: 'Eco Tourist',
        color: 'text-amber-800 bg-amber-800/10 border-amber-800/30'
      };
    }
  };

  // Radar overlapping data processing
  const combinedRadarData = leftCulture.radarData.map((leftVal, index) => {
    const rightVal = rightCulture.radarData[index];
    return {
      subject: leftVal.subject,
      leftValue: leftVal.value,
      rightValue: rightVal.value,
    };
  });

  // Calculate dynamic similarity match score
  const diffs = leftCulture.radarData.map((d, idx) => Math.abs(d.value - rightCulture.radarData[idx].value));
  const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  const matchScore = Math.round(100 - avgDiff);

  return (
    <section id="jelajah" className="py-20 relative bg-background overflow-hidden border-b border-border">
      
      {/* Custom Green Thematic map styles injected dynamically */}
      <style>{`
        .custom-map-filter .leaflet-tile-container {
          filter: ${isDark 
            ? 'grayscale(80%) invert(100%) hue-rotate(110deg) saturate(95%) brightness(90%) contrast(95%)' 
            : 'sepia(18%) saturate(125%) hue-rotate(75deg) contrast(95%) brightness(98%)'};
        }
        .leaflet-container {
          background-color: ${isDark ? '#0D1B14' : '#F7F3EE'} !important;
        }
      `}</style>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4 font-semibold tracking-wide">
            <Compass className="w-4 h-4 animate-spin-slow" />
            Interactive Web GIS Dashboard
          </div>
          <h2 className="text-foreground text-4xl mb-3">{tx.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">{tx.sub}</p>
        </motion.div>

        {/* AI Suggestion Chips */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {tx.suggestionTitle}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { labelId: '🌿 Budaya Kelestarian Hutan', labelEn: '🌿 Forest Conservation Cultures', query: 'Tampilkan budaya pelestari hutan' },
              { labelId: '👩‍👧 Hubungan Matrilineal Minang', labelEn: '👩‍👧 Matrilineal Kinship Minang', query: 'Budaya matrilineal seperti Minang' },
              { labelId: '💧 Cara Baduy Menjaga Air', labelEn: '💧 How Baduy Protects Water', query: 'Bagaimana Suku Baduy menjaga air?' }
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleAISuggestion(chip.query)}
                className="px-3.5 py-1.5 rounded-full text-xs bg-muted hover:bg-primary/10 border border-border hover:border-primary/30 text-foreground transition-all duration-300 shadow-sm active:scale-95 cursor-pointer font-medium"
              >
                {lang === 'id' ? chip.labelId : chip.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-card/50 backdrop-blur-md border border-border rounded-3xl p-5 mt-8 shadow-xl flex flex-col gap-4">
          <div className="grid md:grid-cols-3 gap-4 items-center">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={tx.search}
                className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">{lang === 'id' ? 'Pulau:' : 'Island:'}</span>
              <select
                value={regionFilter}
                onChange={e => setRegionFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
              >
                <option value="all">{tx.allRegions}</option>
                <option value="jawa">Jawa / Java</option>
                <option value="sumatera">Sumatera / Sumatra</option>
                <option value="kalimantan">Kalimantan / Borneo</option>
                <option value="sulawesi">Sulawesi</option>
                <option value="bali">Bali</option>
                <option value="papua">Papua</option>
                <option value="nusatenggara">Nusa Tenggara</option>
              </select>
            </div>

            {/* Sustainability Slider */}
            <div className="flex flex-col gap-1.5 px-1">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>{tx.sustainability}</span>
                <span className="text-primary font-bold">{sustainabilityMin}% +</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={sustainabilityMin}
                onChange={e => setSustainabilityMin(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary border border-border"
              />
            </div>
          </div>

          {/* Categories Toggle & Mode Switchers */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-border pt-4 mt-1">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs font-semibold text-muted-foreground mr-1">{tx.filter}:</span>
              {['all', 'tradisi', 'ritual', 'lingkungan'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeFilter === f
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                      : 'bg-background border border-border text-muted-foreground hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {tx[f as keyof typeof tx] || f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              {/* Compare Mode Toggle */}
              <button
                onClick={() => {
                  setCompareMode(!compareMode);
                  setStoryActive(false);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
                  compareMode
                    ? 'bg-accent text-accent-foreground border border-accent/25'
                    : 'bg-background border border-border text-muted-foreground hover:border-accent/40'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                {tx.compare}
              </button>

              {/* Story Mode Toggle */}
              <button
                onClick={toggleStoryMode}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
                  storyActive
                    ? 'bg-emerald-600 text-white border border-emerald-500/20'
                    : 'bg-background border border-border text-muted-foreground hover:border-emerald-500/40'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                {tx.story}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-muted" style={{ height: 520 }}>
          
          {/* Leaflet Map with class applying our Custom CSS hue filter */}
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            zoomControl={false}
            style={{ height: '100%', width: '100%' }}
            className="z-0 custom-map-filter"
          >
            {/* Tile Layer loaded dynamically based on app theme */}
            <TileLayer
              url={isDark ? mapStyles.dark : mapStyles.light}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

            {/* Custom Zoom Controls */}
            <ZoomControls />

            {/* Dynamic Map Fly-to Controller */}
            <MapController center={mapCenter} zoom={mapZoom} />

            {/* Render Markers for filtered cultures (Only if Story Mode is INACTIVE) */}
            {!storyActive && filtered.map((c) => (
              <Marker
                key={c.id}
                position={[c.lat, c.lng]}
                icon={createCustomIcon(c.type, selected?.id === c.id)}
                eventHandlers={{
                  click: () => {
                    setSelected(c);
                    setMapCenter([c.lat, c.lng]);
                    setMapZoom(7);
                  }
                }}
              />
            ))}

            {/* Render Marker for Active Story Scenario */}
            {storyActive && storyStep < storyScenarios.length && (
              <Marker
                position={[storyScenarios[storyStep].lat, storyScenarios[storyStep].lng]}
                icon={createCustomIcon('lingkungan', true)}
              />
            )}
          </MapContainer>

          {/* Layer Control Panel Overlay (Only if Story Mode is INACTIVE) */}
          {!storyActive && (
            <div className="absolute top-4 left-4 z-[999] bg-card/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl max-w-xs flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground border-b border-border pb-2 mb-0.5">
                <Sliders className="w-3.5 h-3.5 text-primary" />
                {tx.layers}
              </div>
              <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer font-medium select-none">
                <input
                  type="checkbox"
                  checked={showLayerBudaya}
                  onChange={e => setShowLayerBudaya(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4 bg-muted border-border cursor-pointer"
                />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: typeColors.tradisi }} />
                {tx.tradisi}
              </label>
              <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer font-medium select-none">
                <input
                  type="checkbox"
                  checked={showLayerKearifan}
                  onChange={e => setShowLayerKearifan(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4 bg-muted border-border cursor-pointer"
                />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: typeColors.ritual }} />
                {tx.ritual}
              </label>
              <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer font-medium select-none">
                <input
                  type="checkbox"
                  checked={showLayerLingkungan}
                  onChange={e => setShowLayerLingkungan(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4 bg-muted border-border cursor-pointer"
                />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: typeColors.lingkungan }} />
                {tx.lingkungan}
              </label>
            </div>
          )}

          {/* GIS Real-time Monitor dashboard overlay (Left side overlay) */}
          {!storyActive && (
            <div className="absolute bottom-14 left-4 z-[999] bg-card/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl w-64 flex flex-col gap-2 tracking-tight">
              <div className="flex items-center justify-between text-xs font-bold text-foreground border-b border-border pb-2 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  🌍 GIS Real-Time Monitor
                </span>
                <span className="text-[10px] text-muted-foreground uppercase font-mono">v1.2</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground">{lang === 'id' ? 'Pelestarian Nasional:' : 'Nat. Preservation:'}</span>
                <span className="text-primary font-bold">84.5%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-1">
                <div className="h-full bg-primary" style={{ width: '84.5%' }} />
              </div>
              
              {/* Rotating GIS Live log ticker */}
              <div className="mt-1 pt-2 border-t border-border/50">
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Live Satellite Stream
                </div>
                <div className="h-9 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tickerIndex}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-[10px] text-muted-foreground leading-normal flex items-start gap-1 font-mono font-medium"
                    >
                      <Info className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{tickers[tickerIndex]}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Story Panel (Overlaying Map on Left) */}
          <AnimatePresence>
            {storyActive && (
              <motion.div
                initial={{ x: -350, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -350, opacity: 0 }}
                className="absolute left-4 top-4 bottom-4 z-[999] w-[350px] bg-card/95 backdrop-blur-md border border-border rounded-3xl p-5 shadow-2xl flex flex-col justify-between overflow-y-auto"
              >
                {/* Story Header */}
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <Compass className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-foreground text-sm font-bold tracking-tight">{tx.storyTitle}</h3>
                    </div>
                    <button
                      onClick={() => setStoryActive(false)}
                      className="w-7 h-7 rounded-full hover:bg-muted text-muted-foreground flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Baduy Custom Gauges */}
                  <div className="space-y-2 mb-4 bg-primary/5 border border-primary/10 rounded-2xl p-3">
                    {/* Eco Score */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
                        <span>🌿 {tx.ecoScore}</span>
                        <span className="text-emerald-500 font-bold">{ecoScore}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${ecoScore}%` }} />
                      </div>
                    </div>
                    {/* Custom Score */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
                        <span>📜 {tx.tradScore}</span>
                        <span className="text-amber-500 font-bold">{tradScore}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${tradScore}%` }} />
                      </div>
                    </div>
                    {/* Spiritual Score */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
                        <span>✨ {tx.sprScore}</span>
                        <span className="text-purple-500 font-bold">{sprScore}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${sprScore}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Active Step Scenario Content */}
                  {storyStep < storyScenarios.length ? (
                    <div className="space-y-4">
                      <div className="relative h-28 rounded-xl overflow-hidden border border-border shadow-inner">
                        <img 
                          src={storyScenarios[storyStep].image} 
                          alt="Scenario Scene" 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-black/60 rounded px-2 py-0.5 border border-emerald-500/30">
                          {lang === 'id' ? `TANTANGAN ${storyStep + 1} / 4` : `CHALLENGE ${storyStep + 1} / 4`}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-foreground text-sm font-bold mb-1.5">
                          {lang === 'id' ? storyScenarios[storyStep].titleId : storyScenarios[storyStep].titleEn}
                        </h4>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {lang === 'id' ? storyScenarios[storyStep].descId : storyScenarios[storyStep].descEn}
                        </p>
                      </div>

                      {/* Decision choices */}
                      {!storyFeedback ? (
                        <div className="space-y-2 pt-2">
                          {storyScenarios[storyStep].choices.map((c, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => handleStoryChoice(c.ecoEffect, c.tradEffect, c.sprEffect, c.feedbackId, c.feedbackEn)}
                              className="w-full text-left p-3 text-xs bg-muted/60 hover:bg-primary/10 border border-border hover:border-primary/30 rounded-xl transition-all duration-300 flex items-start gap-2 active:scale-98 cursor-pointer text-foreground leading-relaxed"
                            >
                              <span className="font-semibold text-primary">{String.fromCharCode(65 + cIdx)}.</span>
                              <span>{lang === 'id' ? c.textId : c.textEn}</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        /* Choice feedback panel */
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col gap-3"
                        >
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <div className="text-xs text-foreground leading-relaxed">
                              {lang === 'id' ? storyFeedback : storyFeedbackEn}
                            </div>
                          </div>
                          <button
                            onClick={handleNextStory}
                            className="w-full py-2 bg-primary hover:opacity-90 text-primary-foreground text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-opacity cursor-pointer shadow-md"
                          >
                            <span>{lang === 'id' ? 'Lanjutkan Perjalanan' : 'Continue Journey'}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    /* Final Story Result / Ending with Medals */
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center space-y-4 py-4"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Award className="w-12 h-12 text-amber-500 animate-bounce" />
                        <div className={`px-4 py-1.5 rounded-full text-xs font-extrabold border ${getStoryMedal().color}`}>
                          {lang === 'id' ? getStoryMedal().medalId : getStoryMedal().medalEn}
                        </div>
                        <div className="text-xs font-bold text-muted-foreground mt-1">
                          {lang === 'id' ? getStoryMedal().titleId : getStoryMedal().titleEn}
                        </div>
                      </div>
                      <h4 className="text-foreground text-sm font-bold">{tx.congratulations}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {lang === 'id' 
                          ? 'Kamu berhasil menyesuaikan diri dan menghormati adat lokal. Pikirkan bagaimana nilai kelestarian Baduy bisa kamu bawa pulang ke perkotaan modern!'
                          : 'You successfully adapted and respected local customs. Think about how you can carry Baduy preservation values back to modern urban environments!'}
                      </p>
                      
                      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 text-left space-y-2">
                        <div className="text-xs font-semibold text-center border-b border-border pb-1.5 mb-1.5 text-foreground">
                          {lang === 'id' ? 'RINGKASAN SKOR AKHIR' : 'FINAL SCORE SUMMARY'}
                        </div>
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-emerald-500">🌿 {tx.ecoScore}:</span>
                          <span className="text-foreground">{ecoScore}/100</span>
                        </div>
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-amber-500">📜 {tx.tradScore}:</span>
                          <span className="text-foreground">{tradScore}/100</span>
                        </div>
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-purple-500">✨ {tx.sprScore}:</span>
                          <span className="text-foreground">{sprScore}/100</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Reset button at the bottom */}
                <button
                  onClick={resetStory}
                  className="mt-4 w-full py-2 bg-muted hover:bg-muted-foreground/10 text-foreground text-xs font-bold rounded-xl border border-border flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {tx.storyRestart}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Slide-in Detail Sidebar (Google Arts & Culture style) */}
          <AnimatePresence>
            {selected && !storyActive && (
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 z-[1000] w-full sm:w-[420px] bg-card/95 backdrop-blur-md border-l border-border shadow-2xl flex flex-col h-full"
              >
                {/* Cover Image */}
                <div className="relative h-48 flex-shrink-0">
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  
                  {/* Close button */}
                  <button 
                    onClick={() => setSelected(null)} 
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-[11px] font-bold uppercase tracking-wider bg-primary">
                    {tx[selected.type as keyof typeof tx]}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div>
                    <h3 className="text-foreground text-2xl font-bold mb-1">{selected.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {selected.location} ({lang === 'id' ? selected.regionLabel : selected.regionLabelEn})
                    </p>
                  </div>

                  {/* Sustainability Metric */}
                  <div className="flex items-center gap-2 bg-muted/50 border border-border/50 rounded-2xl p-3">
                    <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">{tx.sustainability}:</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selected.sustainability}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                    <span className="text-xs font-extrabold text-primary">{selected.sustainability}%</span>
                  </div>

                  {/* Cultural Description */}
                  <div>
                    <h4 className="text-xs uppercase font-extrabold text-muted-foreground tracking-wider mb-2">Deskripsi</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lang === 'id' ? selected.desc : selected.descEn}
                    </p>
                  </div>

                  {/* Quantitative Radar Analysis */}
                  <div className="h-44 bg-muted/30 border border-border/50 rounded-3xl p-2 flex flex-col justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={selected.radarData}>
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: '600' }} />
                        <Radar dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* AI Recommendation Card panel */}
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                      <Sparkles className="w-4 h-4" />
                      {lang === 'id' ? 'Rekomendasi Cerdas AI Asisten' : 'Smart AI Recommendations'}
                    </div>
                    <div className="text-[10px] text-muted-foreground leading-normal">
                      {lang === 'id' ? 'Budaya serupa yang terdeteksi satelit:' : 'Satellite-detected similar culture:'}{' '}
                      <span className="font-extrabold text-foreground">{getAIRecommendation(selected.id).targetName}</span>{' '}
                      (Kemiripan: <span className="font-extrabold text-primary">{getAIRecommendation(selected.id).score}%</span>)
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed italic bg-background border border-border/40 p-2.5 rounded-xl">
                      {lang === 'id' ? getAIRecommendation(selected.id).reasonId : getAIRecommendation(selected.id).reasonEn}
                    </p>
                  </div>

                  {/* Qualitative Aspects */}
                  <div className="space-y-4 pt-2 border-t border-border">
                    <div className="flex items-center gap-1 text-xs font-bold text-foreground">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {tx.qualitative}
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/40 rounded-xl border border-border/50">
                        <div className="text-[10px] font-bold uppercase text-primary tracking-wider mb-1">
                          🌿 {tx.envPracticeTitle}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                          {lang === 'id' ? selected.envPractice : selected.envPracticeEn}
                        </p>
                      </div>
                      <div className="p-3 bg-muted/40 rounded-xl border border-border/50">
                        <div className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider mb-1">
                          🏡 {tx.wayOfLifeTitle}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                          {lang === 'id' ? selected.wayOfLife : selected.wayOfLifeEn}
                        </p>
                      </div>
                      <div className="p-3 bg-muted/40 rounded-xl border border-border/50">
                        <div className="text-[10px] font-bold uppercase text-amber-500 tracking-wider mb-1">
                          📜 {tx.philosophyTitle}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed italic font-medium">
                          {lang === 'id' ? selected.philosophy : selected.philosophyEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar CTA Footer */}
                <div className="p-4 border-t border-border bg-muted/20 flex gap-3 flex-shrink-0">
                  <button 
                    onClick={handleVRClick}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-95 transition-all shadow-md cursor-pointer active:scale-98"
                  >
                    <Eye className="w-4 h-4" /> {tx.vr}
                  </button>
                  <button 
                    onClick={() => setSelected(null)}
                    className="py-3 px-4 rounded-xl border border-border text-foreground text-xs font-bold hover:bg-muted transition-colors cursor-pointer"
                  >
                    {tx.close}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simple Bottom Bar Status */}
          <div className="absolute bottom-4 left-4 z-[999] bg-black/60 backdrop-blur rounded-xl px-3 py-1.5 text-white/80 text-[10px] font-semibold border border-white/10 tracking-wide select-none">
            {filtered.length} {lang === 'id' ? 'kebudayaan terpetakan' : 'cultures mapped'}
          </div>
        </div>
      </div>

      {/* Comparison Mode Visualizer */}
      <AnimatePresence>
        {compareMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10"
          >
            <div className="bg-card border border-border rounded-3xl p-6 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 gap-3">
                <h3 className="text-foreground text-xl flex items-center gap-2 font-bold">
                  <ArrowLeftRight className="w-5 h-5 text-accent" />
                  {tx.compareTitle}
                </h3>
                {/* Advanced dynamic comparison match score */}
                <div className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2 text-xs font-extrabold text-primary">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                  <span>Kecocokan Filosofis AI: {matchScore}%</span>
                </div>
              </div>

              {/* Dropdown Selectors */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: compareLeft, setter: setCompareLeft, label: tx.selectLeft },
                  { value: compareRight, setter: setCompareRight, label: tx.selectRight },
                ].map(({ value, setter, label }, idx) => (
                  <div key={idx}>
                    <label className="text-xs font-bold text-muted-foreground mb-2 block">{label}</label>
                    <select
                      value={value}
                      onChange={e => setter(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-muted border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-semibold cursor-pointer"
                    >
                      {cultures.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              {/* Grid: Overlapping Radar Chart & Qualitative Aspect Table */}
              <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Overlapping Radar Chart (Left 5 Columns) */}
                <div className="lg:col-span-5 bg-muted/20 border border-border/40 rounded-3xl p-4 flex flex-col justify-center min-h-[300px]">
                  <div className="text-[10px] font-extrabold uppercase text-muted-foreground tracking-widest text-center mb-3">
                    Diagram Perbandingan Indeks Adat (Overlaid)
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={combinedRadarData}>
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: '700' }} />
                        <Radar name={leftCulture.name} dataKey="leftValue" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.25} />
                        <Radar name={rightCulture.name} dataKey="rightValue" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.2} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: 11, fontWeight: '700', color: 'var(--foreground)' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Qualitative side-by-side aspects (Right 7 Columns) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-xs font-bold text-foreground flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-primary" />
                    {tx.qualitative}
                  </div>
                  
                  {/* Env Practice row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">
                        🌿 {leftCulture.name} - {tx.envPracticeTitle}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                        {lang === 'id' ? leftCulture.envPractice : leftCulture.envPracticeEn}
                      </p>
                    </div>
                    <div className="p-4 bg-accent/5 border border-accent/15 rounded-2xl">
                      <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1.5">
                        🌿 {rightCulture.name} - {tx.envPracticeTitle}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                        {lang === 'id' ? rightCulture.envPractice : rightCulture.envPracticeEn}
                      </p>
                    </div>
                  </div>

                  {/* Way of Life row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">
                        🏡 {leftCulture.name} - {tx.wayOfLifeTitle}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                        {lang === 'id' ? leftCulture.wayOfLife : leftCulture.wayOfLifeEn}
                      </p>
                    </div>
                    <div className="p-4 bg-accent/5 border border-accent/15 rounded-2xl">
                      <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1.5">
                        🏡 {rightCulture.name} - {tx.wayOfLifeTitle}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                        {lang === 'id' ? rightCulture.wayOfLife : rightCulture.wayOfLifeEn}
                      </p>
                    </div>
                  </div>

                  {/* Philosophy row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">
                        📜 {leftCulture.name} - {tx.philosophyTitle}
                      </div>
                      <p className="text-xs text-muted-foreground italic leading-relaxed font-medium">
                        {lang === 'id' ? leftCulture.philosophy : leftCulture.philosophyEn}
                      </p>
                    </div>
                    <div className="p-4 bg-accent/5 border border-accent/15 rounded-2xl">
                      <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1.5">
                        📜 {rightCulture.name} - {tx.philosophyTitle}
                      </div>
                      <p className="text-xs text-muted-foreground italic leading-relaxed font-medium">
                        {lang === 'id' ? rightCulture.philosophy : rightCulture.philosophyEn}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Historical Data Charts section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-6 border-b border-border pb-3">
            <TrendingDown className="w-5 h-5 text-accent animate-pulse" />
            <h3 className="text-foreground text-lg font-bold tracking-tight">{tx.chart}</h3>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={preservationData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBaduy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorToraja" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDayak" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F4A261" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F4A261" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMinang" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBali" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: '600' }} axisLine={false} tickLine={false} />
                <YAxis domain={[65, 100]} tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: '600' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, color: 'var(--foreground)', fontSize: 12, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="baduy" name="Suku Baduy" stroke="#10B981" strokeWidth={2.5} fill="url(#colorBaduy)" />
                <Area type="monotone" dataKey="naga" name="Kampung Naga" stroke="#059669" strokeWidth={2} strokeDasharray="3 3" fill="none" />
                <Area type="monotone" dataKey="toraja" name="Toraja" stroke="#A855F7" strokeWidth={2.5} fill="url(#colorToraja)" />
                <Area type="monotone" dataKey="dayak" name="Suku Dayak" stroke="#F4A261" strokeWidth={2.5} fill="url(#colorDayak)" />
                <Area type="monotone" dataKey="minang" name="Minangkabau" stroke="#3B82F6" strokeWidth={2.5} fill="url(#colorMinang)" />
                <Area type="monotone" dataKey="bali" name="Bali Subak" stroke="#06B6D4" strokeWidth={2.5} fill="url(#colorBali)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
