import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Award,
  BookOpen,
  Brain,
  ChevronRight,
  Flame,
  Leaf,
  MapPin,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  Trophy,
  X,
} from 'lucide-react';

interface Props { lang: 'id' | 'en' }

type Region = 'Sumatera' | 'Pulau Jawa' | 'Kalimantan' | 'Sulawesi' | 'Bali & Nusa Tenggara' | 'Maluku' | 'Papua';
type Category = 'Tradisional' | 'Maritim' | 'Pegunungan' | 'Ritual' | 'Urban / Akulturasi';

interface CultureCard {
  id: string;
  name: string;
  region: Region;
  location: string;
  category: Category;
  culture: string;
  funFact: string;
  image: string;
  history: string;
  tradition: string;
  wisdom: string;
  education: string;
  trending?: boolean;
}

const translations = {
  id: {
    title: 'Sejarah & Budaya',
    subtitle: 'Jelajahi keragaman suku dan budaya Indonesia lewat cerita singkat, fakta unik, dan tantangan ringan.',
    explorer: 'Culture Explorer',
    regionAll: 'Semua Pulau',
    categoryAll: 'Semua Kategori',
    searchPlaceholder: 'Cari suku, lokasi, atau kata kunci...',
    detail: 'Detail Budaya',
    close: 'Tutup',
    random: 'Random Culture',
    trending: 'Trending Culture',
    cultureOfDay: 'Culture of The Day',
    didYouKnow: 'Did You Know?',
    progress: 'Progress Explore',
    badge: 'Badge',
    quiz: 'Quiz Ringan',
    correct: 'Benar. Keren, kamu makin peka budaya.',
    wrong: 'Belum tepat. Coba lihat lagi petunjuk di card.',
    noResults: 'Tidak ada hasil ditemukan. Coba ubah filter atau pencarian Anda.',
  },
  en: {
    title: 'History & Culture',
    subtitle: 'Explore Indonesia culture through short stories, unique facts, and light challenges.',
    explorer: 'Culture Explorer',
    regionAll: 'All Islands',
    categoryAll: 'All Categories',
    searchPlaceholder: 'Search tribe, place, or keyword...',
    detail: 'Culture Details',
    close: 'Close',
    random: 'Random Culture',
    trending: 'Trending Culture',
    cultureOfDay: 'Culture of The Day',
    didYouKnow: 'Did You Know?',
    progress: 'Explore Progress',
    badge: 'Badge',
    quiz: 'Quick Quiz',
    correct: 'Correct. Nice cultural instinct.',
    wrong: 'Not quite. Check the card clue again.',
    noResults: 'No results found. Try changing your search or filters.',
  },
};

const imageByRegion: Record<Region, string> = {
  Sumatera: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
  'Pulau Jawa': 'https://images.unsplash.com/photo-1583336661016-970247c23603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
  Kalimantan: 'https://images.unsplash.com/photo-1517457373958-bf4f22fa63d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
  Sulawesi: 'https://images.unsplash.com/photo-1545156521-7f4f8e57c4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
  'Bali & Nusa Tenggara': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
  Maluku: 'https://images.unsplash.com/photo-1516501765870-6a952f9f6b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
  Papua: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
};

const cultureCards: CultureCard[] = [
  {
    id: 'aceh',
    name: 'Aceh',
    region: 'Sumatera',
    location: 'Aceh',
    category: 'Ritual',
    culture: 'Islam kuat dan Tari Saman',
    funFact: 'Tari Saman bisa terlihat seperti gelombang karena penarinya bergerak sangat kompak.',
    image: imageByRegion.Sumatera,
    history: 'Aceh lama dikenal sebagai gerbang perdagangan dan penyebaran Islam di Nusantara. Dari pelabuhan, ulama, pedagang, dan masyarakat bertemu lalu membentuk budaya yang tegas sekaligus hangat.',
    tradition: 'Tari Saman, adat meugang, dan tradisi musyawarah membuat kebersamaan terasa kuat dalam kehidupan sehari-hari.',
    wisdom: 'Masyarakat Aceh mengajarkan disiplin, hormat pada ilmu, dan keberanian menjaga identitas.',
    education: 'Siswa bisa belajar bahwa agama, seni, dan sejarah dapat berjalan bersama tanpa menghapus keramahan budaya.',
    trending: true,
  },
  {
    id: 'gayo',
    name: 'Gayo',
    region: 'Sumatera',
    location: 'Dataran Tinggi Gayo, Aceh',
    category: 'Pegunungan',
    culture: 'Kopi dunia dan seni tari',
    funFact: 'Kopi Gayo terkenal sampai luar negeri karena aroma dan cita rasanya khas dataran tinggi.',
    image: imageByRegion.Sumatera,
    history: 'Orang Gayo tumbuh di wilayah pegunungan yang sejuk. Alam, kebun kopi, dan seni lisan menjadi bagian penting dari cerita hidup mereka.',
    tradition: 'Didong, tari tradisional, dan budaya bertani kopi menjadi wajah budaya Gayo yang mudah dikenali.',
    wisdom: 'Kerja tekun dan menjaga tanah subur adalah pelajaran besar dari masyarakat Gayo.',
    education: 'Budaya Gayo menunjukkan bahwa komoditas lokal bisa menjadi kebanggaan dunia.',
  },
  {
    id: 'alas',
    name: 'Alas',
    region: 'Sumatera',
    location: 'Aceh Tenggara',
    category: 'Tradisional',
    culture: 'Adat kuat dan agraris',
    funFact: 'Kehidupan agraris membuat kalender adat Alas dekat dengan musim tanam dan panen.',
    image: imageByRegion.Sumatera,
    history: 'Suku Alas hidup di lembah subur dan membangun tradisi yang dekat dengan pertanian. Adat menjadi cara menjaga hubungan antarwarga.',
    tradition: 'Upacara adat, bahasa Alas, dan gotong royong sawah sering menjadi pusat kegiatan sosial.',
    wisdom: 'Mereka mengajarkan bahwa pangan, keluarga, dan kerja bersama adalah fondasi komunitas.',
    education: 'Pelajar dapat melihat bagaimana budaya agraris melatih tanggung jawab terhadap alam.',
  },
  {
    id: 'batak-toba',
    name: 'Batak Toba',
    region: 'Sumatera',
    location: 'Sekitar Danau Toba, Sumatera Utara',
    category: 'Tradisional',
    culture: 'Danau Toba dan ulos',
    funFact: 'Ulos bukan sekadar kain, tetapi simbol doa, kasih, dan ikatan keluarga.',
    image: 'https://images.unsplash.com/photo-1510251189075-9a0f4a53f1ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
    history: 'Budaya Batak Toba berkembang di sekitar Danau Toba. Marga, lagu, dan adat membuat hubungan keluarga terasa sangat penting.',
    tradition: 'Ulos, gondang, tortor, dan upacara adat keluarga menjadi bagian besar dari identitas Batak Toba.',
    wisdom: 'Nilai hormat kepada leluhur dan saling mendukung dalam keluarga besar sangat kuat.',
    education: 'Kita belajar bahwa identitas keluarga dapat menjadi sumber tanggung jawab sosial.',
    trending: true,
  },
  {
    id: 'batak-karo',
    name: 'Batak Karo',
    region: 'Sumatera',
    location: 'Tanah Karo, Sumatera Utara',
    category: 'Pegunungan',
    culture: 'Sistem marga unik',
    funFact: 'Marga dalam masyarakat Karo membantu orang memahami hubungan keluarga dan aturan adat.',
    image: imageByRegion.Sumatera,
    history: 'Batak Karo hidup di dataran tinggi dengan tradisi kekerabatan yang rapi. Setiap upacara adat menunjukkan posisi keluarga dan peran sosial.',
    tradition: 'Kerja tahun, rumah adat Karo, dan musik tradisional hadir dalam banyak acara komunitas.',
    wisdom: 'Karo mengajarkan pentingnya tahu asal-usul dan menjaga sopan santun dalam keluarga besar.',
    education: 'Pelajar bisa memahami bahwa sistem sosial membantu masyarakat hidup tertib.',
  },
  {
    id: 'batak-mandailing',
    name: 'Batak Mandailing',
    region: 'Sumatera',
    location: 'Mandailing Natal, Sumatera Utara',
    category: 'Tradisional',
    culture: 'Musik gordang',
    funFact: 'Gordang sambilan dimainkan beramai-ramai dan menghasilkan suara yang megah.',
    image: imageByRegion.Sumatera,
    history: 'Mandailing memiliki tradisi adat, sastra lisan, dan musik yang kuat. Budayanya tumbuh di antara pegunungan, kampung, dan jalur perantauan.',
    tradition: 'Gordang sambilan, upacara adat, dan bahasa Mandailing menjadi ciri khas yang hidup sampai sekarang.',
    wisdom: 'Masyarakat Mandailing menekankan kehormatan, pendidikan, dan solidaritas keluarga.',
    education: 'Budaya ini mengajarkan bahwa musik dapat menyimpan memori sejarah masyarakat.',
  },
  {
    id: 'nias',
    name: 'Nias',
    region: 'Sumatera',
    location: 'Pulau Nias',
    category: 'Ritual',
    culture: 'Lompat batu',
    funFact: 'Tradisi lompat batu dahulu menjadi simbol kedewasaan dan keberanian pemuda.',
    image: imageByRegion.Sumatera,
    history: 'Nias memiliki desa adat batu, rumah panggung besar, dan tradisi yang kuat. Pulau ini menyimpan kisah keberanian dan ketahanan masyarakat pesisir.',
    tradition: 'Fahombo atau lompat batu, tarian perang, dan arsitektur omo hada menjadi ikon Nias.',
    wisdom: 'Keberanian di Nias bukan hanya soal fisik, tetapi juga kesiapan bertanggung jawab.',
    education: 'Siswa belajar bahwa ritual bisa menjadi cara masyarakat menandai tahap hidup.',
  },
  {
    id: 'minangkabau',
    name: 'Minangkabau',
    region: 'Sumatera',
    location: 'Sumatera Barat',
    category: 'Tradisional',
    culture: 'Matrilineal dan Rumah Gadang',
    funFact: 'Minangkabau dikenal sebagai salah satu komunitas matrilineal terbesar di dunia.',
    image: 'https://images.unsplash.com/photo-1502182861870-3b8cc83c9223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
    history: 'Minangkabau tumbuh dengan adat yang memberi peran penting pada garis ibu. Rumah Gadang menjadi simbol keluarga besar dan tempat nilai adat diwariskan.',
    tradition: 'Randai, silek, kuliner, rumah gadang, dan tradisi merantau membuat budaya Minang mudah dikenal.',
    wisdom: 'Adat mengajarkan musyawarah, kecakapan berdagang, dan keberanian mencari pengalaman.',
    education: 'Pelajar dapat belajar bahwa peran perempuan dalam budaya Indonesia sangat beragam dan penting.',
    trending: true,
  },
  {
    id: 'mentawai',
    name: 'Mentawai',
    region: 'Sumatera',
    location: 'Kepulauan Mentawai',
    category: 'Tradisional',
    culture: 'Tato tradisional',
    funFact: 'Tato Mentawai bisa menunjukkan perjalanan hidup, status, dan hubungan dengan alam.',
    image: imageByRegion.Sumatera,
    history: 'Mentawai menjaga tradisi tua yang dekat dengan hutan, sungai, dan roh leluhur. Rumah uma menjadi pusat kehidupan bersama.',
    tradition: 'Tato titi, sikerei, tarian, dan obat alam menjadi bagian penting budaya Mentawai.',
    wisdom: 'Alam diperlakukan sebagai sahabat hidup, bukan sekadar sumber bahan.',
    education: 'Budaya Mentawai mengajarkan rasa hormat pada pengetahuan tradisional dan lingkungan.',
  },
  {
    id: 'melayu',
    name: 'Melayu',
    region: 'Sumatera',
    location: 'Riau, Jambi, Sumatera Timur',
    category: 'Maritim',
    culture: 'Budaya pesisir',
    funFact: 'Pantun Melayu sering dipakai untuk menyampaikan nasihat dengan cara halus dan indah.',
    image: imageByRegion.Sumatera,
    history: 'Melayu berkembang di wilayah sungai dan pesisir yang ramai perdagangan. Bahasa, sastra, dan adatnya memengaruhi banyak daerah Nusantara.',
    tradition: 'Pantun, zapin, adat bersendi syarak, dan budaya pelabuhan menjadi ciri Melayu.',
    wisdom: 'Budi bahasa dan sopan santun menjadi nilai utama dalam pergaulan.',
    education: 'Siswa belajar bahwa bahasa Indonesia punya akar kuat dari dunia Melayu.',
  },
  {
    id: 'rejang',
    name: 'Rejang',
    region: 'Sumatera',
    location: 'Bengkulu',
    category: 'Tradisional',
    culture: 'Suku tua',
    funFact: 'Aksara Rejang atau Kaganga adalah salah satu warisan tulis penting di Sumatera.',
    image: imageByRegion.Sumatera,
    history: 'Rejang dikenal sebagai salah satu suku tua di Bengkulu. Mereka memiliki bahasa dan aksara yang menunjukkan tradisi intelektual lokal.',
    tradition: 'Aksara Kaganga, adat desa, dan seni lisan menjadi penanda budaya Rejang.',
    wisdom: 'Menjaga bahasa berarti menjaga cara berpikir sebuah masyarakat.',
    education: 'Pelajar dapat melihat bahwa literasi Nusantara sudah ada dalam banyak bentuk lokal.',
  },
  {
    id: 'lampung',
    name: 'Lampung',
    region: 'Sumatera',
    location: 'Lampung',
    category: 'Tradisional',
    culture: 'Pepadun dan Saibatin',
    funFact: 'Lampung memiliki kain tapis yang dibuat dengan sulaman benang emas.',
    image: imageByRegion.Sumatera,
    history: 'Budaya Lampung tumbuh dari dua kelompok adat besar: Pepadun dan Saibatin. Keduanya memiliki tata adat dan simbol kehormatan masing-masing.',
    tradition: 'Kain tapis, siger, upacara adat, dan bahasa Lampung memperkaya identitas daerah.',
    wisdom: 'Piil pesenggiri mengajarkan harga diri, keramahan, dan tanggung jawab sosial.',
    education: 'Siswa belajar bahwa satu provinsi bisa memiliki beberapa sistem adat yang berdampingan.',
  },
  {
    id: 'jawa',
    name: 'Jawa',
    region: 'Pulau Jawa',
    location: 'Jawa Tengah, Yogyakarta, Jawa Timur',
    category: 'Tradisional',
    culture: 'Budaya keraton',
    funFact: 'Rumah joglo punya filosofi tentang keseimbangan manusia, alam, dan Sang Pencipta.',
    image: imageByRegion['Pulau Jawa'],
    history: 'Budaya Jawa berkembang lewat kerajaan, pesantren, desa, dan kota. Wayang, batik, dan keraton menyimpan cerita tentang etika hidup.',
    tradition: 'Wayang, gamelan, batik, sekaten, dan tata krama menjadi bagian penting budaya Jawa.',
    wisdom: 'Rukun, tepa selira, dan eling mengajarkan hidup tenang serta menghargai orang lain.',
    education: 'Pelajar belajar bahwa kelembutan sikap dapat menjadi kekuatan sosial.',
    trending: true,
  },
  {
    id: 'sunda',
    name: 'Sunda',
    region: 'Pulau Jawa',
    location: 'Jawa Barat dan Banten',
    category: 'Pegunungan',
    culture: 'Ramah dan angklung',
    funFact: 'Angklung mengajarkan harmoni karena satu pemain biasanya memegang nada berbeda.',
    image: 'https://images.unsplash.com/photo-1528747008803-6a5c2e293b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
    history: 'Sunda tumbuh di wilayah pegunungan, sawah, dan kota. Budayanya dikenal ramah, musikal, dan dekat dengan alam.',
    tradition: 'Angklung, jaipongan, seren taun, dan bahasa Sunda menjadi identitas yang hangat.',
    wisdom: 'Silih asah, silih asih, silih asuh mengajarkan saling mengembangkan, menyayangi, dan menjaga.',
    education: 'Siswa belajar bahwa kerja sama kecil bisa menciptakan harmoni besar.',
  },
  {
    id: 'betawi',
    name: 'Betawi',
    region: 'Pulau Jawa',
    location: 'Jakarta',
    category: 'Urban / Akulturasi',
    culture: 'Akulturasi',
    funFact: 'Ondel-ondel dulu dipercaya sebagai penjaga kampung, kini menjadi ikon budaya Jakarta.',
    image: imageByRegion['Pulau Jawa'],
    history: 'Betawi lahir dari pertemuan banyak bangsa dan suku di Batavia. Karena itu budayanya terasa lincah, terbuka, dan penuh campuran.',
    tradition: 'Ondel-ondel, lenong, tanjidor, kerak telor, dan palang pintu menjadi ciri Betawi.',
    wisdom: 'Perbedaan bisa menjadi identitas baru yang menyenangkan jika dirawat dengan saling hormat.',
    education: 'Betawi mengajarkan akulturasi: budaya baru dapat tumbuh dari pertemuan banyak orang.',
    trending: true,
  },
  {
    id: 'baduy',
    name: 'Baduy',
    region: 'Pulau Jawa',
    location: 'Lebak, Banten',
    category: 'Tradisional',
    culture: 'Hidup tanpa teknologi modern',
    funFact: 'Baduy Dalam menjaga aturan adat ketat, termasuk pembatasan listrik dan kendaraan.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
    history: 'Baduy mempertahankan cara hidup sederhana untuk menjaga hutan dan adat. Pilihan itu membuat mereka menjadi contoh kuat tentang konsistensi budaya.',
    tradition: 'Tenun, berjalan kaki, pikukuh adat, dan gotong royong menjadi bagian keseharian Baduy.',
    wisdom: 'Kesederhanaan dapat menjadi cara menjaga alam dan menjaga diri dari hidup berlebihan.',
    education: 'Pelajar belajar menghargai pilihan hidup yang berbeda tanpa merasa lebih modern.',
  },
  {
    id: 'tengger',
    name: 'Tengger',
    region: 'Pulau Jawa',
    location: 'Sekitar Gunung Bromo',
    category: 'Ritual',
    culture: 'Ritual Kasada',
    funFact: 'Saat Kasada, masyarakat Tengger membawa sesaji ke kawasan kawah Bromo.',
    image: imageByRegion['Pulau Jawa'],
    history: 'Tengger hidup di kawasan pegunungan Bromo. Cerita leluhur dan alam vulkanik membentuk ritual yang khas.',
    tradition: 'Yadnya Kasada, pakaian hangat khas pegunungan, dan pertanian lereng gunung menjadi ciri Tengger.',
    wisdom: 'Mereka mengajarkan rasa syukur kepada alam yang keras tetapi memberi kehidupan.',
    education: 'Siswa belajar bahwa ritual sering lahir dari hubungan manusia dengan tempat tinggalnya.',
  },
  {
    id: 'osing',
    name: 'Osing',
    region: 'Pulau Jawa',
    location: 'Banyuwangi, Jawa Timur',
    category: 'Tradisional',
    culture: 'Budaya Banyuwangi',
    funFact: 'Gandrung Banyuwangi menjadi tarian ikonik yang penuh energi dan warna.',
    image: imageByRegion['Pulau Jawa'],
    history: 'Osing adalah masyarakat asli Banyuwangi yang memiliki bahasa, musik, dan ritual khas. Budayanya terasa kuat di ujung timur Jawa.',
    tradition: 'Tari Gandrung, Seblang, bahasa Osing, dan festival budaya menjadi identitas Osing.',
    wisdom: 'Bangga pada bahasa daerah membuat budaya tetap hidup di tengah perubahan.',
    education: 'Pelajar dapat belajar bahwa daerah kecil pun bisa punya identitas budaya besar.',
  },
  {
    id: 'madura',
    name: 'Madura',
    region: 'Pulau Jawa',
    location: 'Pulau Madura dan pesisir Jawa Timur',
    category: 'Tradisional',
    culture: 'Karapan sapi',
    funFact: 'Karapan sapi bukan hanya lomba cepat, tetapi juga gengsi, seni hias, dan pesta rakyat.',
    image: imageByRegion['Pulau Jawa'],
    history: 'Madura dikenal dengan masyarakat yang tangguh, pekerja keras, dan dekat dengan budaya pesisir. Tradisi rakyatnya meriah dan penuh semangat.',
    tradition: 'Karapan sapi, saronen, batik Madura, dan tradisi merantau menjadi ciri khas.',
    wisdom: 'Kerja keras dan keberanian mengambil tantangan menjadi nilai penting.',
    education: 'Siswa belajar bahwa olahraga tradisional bisa menyimpan nilai sosial dan ekonomi.',
  },
  {
    id: 'cirebon',
    name: 'Cirebon',
    region: 'Pulau Jawa',
    location: 'Cirebon, Jawa Barat',
    category: 'Urban / Akulturasi',
    culture: 'Budaya campuran',
    funFact: 'Batik mega mendung Cirebon terinspirasi bentuk awan dan memiliki makna keteduhan.',
    image: imageByRegion['Pulau Jawa'],
    history: 'Cirebon berada di jalur pesisir yang ramai. Pengaruh Jawa, Sunda, Islam, Tionghoa, dan perdagangan membuat budayanya kaya campuran.',
    tradition: 'Batik mega mendung, keraton, tari topeng, dan tradisi pesisir menjadi identitas Cirebon.',
    wisdom: 'Pertemuan budaya bisa melahirkan seni baru yang indah.',
    education: 'Cirebon mengajarkan toleransi lewat contoh akulturasi yang nyata.',
  },
  {
    id: 'dayak',
    name: 'Dayak',
    region: 'Kalimantan',
    location: 'Pedalaman Kalimantan',
    category: 'Tradisional',
    culture: 'Hutan dan rumah panjang',
    funFact: 'Rumah panjang Dayak dapat menjadi tempat tinggal banyak keluarga sekaligus.',
    image: imageByRegion.Kalimantan,
    history: 'Dayak hidup erat dengan sungai dan hutan Kalimantan. Rumah panjang menjadi simbol kebersamaan dan perlindungan komunitas.',
    tradition: 'Tari Dayak, ukiran, mandau, tato, dan upacara adat hutan menjadi bagian identitasnya.',
    wisdom: 'Hutan dipandang sebagai ruang hidup yang harus dijaga untuk generasi berikutnya.',
    education: 'Pelajar belajar bahwa menjaga budaya sering berarti menjaga lingkungan.',
    trending: true,
  },
  {
    id: 'kenyah',
    name: 'Kenyah',
    region: 'Kalimantan',
    location: 'Kalimantan Timur dan Utara',
    category: 'Tradisional',
    culture: 'Tato simbolik',
    funFact: 'Motif tato Kenyah dapat menunjukkan perjalanan, kecantikan, atau status sosial.',
    image: imageByRegion.Kalimantan,
    history: 'Kenyah adalah bagian dari rumpun Dayak dengan seni ukir, musik, dan tato yang kuat. Mereka menjaga memori lewat motif dan cerita.',
    tradition: 'Sape, tato, ukiran rumah, dan tari tradisional menjadi wajah budaya Kenyah.',
    wisdom: 'Setiap motif memiliki makna, jadi seni menjadi bahasa kehidupan.',
    education: 'Siswa belajar membaca simbol budaya dengan lebih hati-hati dan hormat.',
  },
  {
    id: 'iban',
    name: 'Iban',
    region: 'Kalimantan',
    location: 'Kalimantan Barat',
    category: 'Tradisional',
    culture: 'Sejarah headhunter',
    funFact: 'Sejarah perang Iban kini lebih banyak dikenang sebagai cerita keberanian masa lalu.',
    image: imageByRegion.Kalimantan,
    history: 'Iban memiliki sejarah panjang di wilayah sungai dan hutan. Masa lalu perang dan perantauan membentuk cerita kepahlawanan mereka.',
    tradition: 'Rumah panjang, tenun pua kumbu, dan pesta panen menjadi bagian penting budaya Iban.',
    wisdom: 'Keberanian harus berubah menjadi tanggung jawab menjaga komunitas.',
    education: 'Pelajar belajar bahwa budaya dapat berubah: dari tradisi perang menuju pelestarian identitas.',
  },
  {
    id: 'ngaju',
    name: 'Ngaju',
    region: 'Kalimantan',
    location: 'Kalimantan Tengah',
    category: 'Ritual',
    culture: 'Kaharingan',
    funFact: 'Upacara Tiwah menjadi ritual penting untuk menghormati perjalanan arwah leluhur.',
    image: imageByRegion.Kalimantan,
    history: 'Ngaju hidup di sepanjang sungai Kalimantan Tengah. Kepercayaan Kaharingan dan ritual leluhur membentuk budaya yang kaya simbol.',
    tradition: 'Tiwah, rumah betang, ukiran, dan upacara sungai menjadi penanda budaya Ngaju.',
    wisdom: 'Menghormati leluhur berarti menjaga hubungan antar generasi.',
    education: 'Siswa belajar menghargai keragaman sistem kepercayaan di Indonesia.',
  },
  {
    id: 'punan',
    name: 'Punan',
    region: 'Kalimantan',
    location: 'Pedalaman Kalimantan',
    category: 'Tradisional',
    culture: 'Nomaden',
    funFact: 'Sebagian komunitas Punan dikenal memiliki pengetahuan hutan yang sangat detail.',
    image: imageByRegion.Kalimantan,
    history: 'Punan hidup dekat dengan hutan dan sebagian dahulu berpindah mengikuti sumber pangan. Pengetahuan alam menjadi bekal utama.',
    tradition: 'Berburu, meramu, anyaman, dan pengetahuan obat hutan menjadi bagian tradisi Punan.',
    wisdom: 'Mengambil secukupnya dari alam adalah cara menjaga keseimbangan hidup.',
    education: 'Pelajar belajar bahwa ilmu tidak selalu berasal dari buku, tetapi juga pengalaman lintas generasi.',
  },
  {
    id: 'bugis',
    name: 'Bugis',
    region: 'Sulawesi',
    location: 'Sulawesi Selatan',
    category: 'Maritim',
    culture: 'Pelaut ulung',
    funFact: 'Kapal pinisi dikenal dunia sebagai bukti keahlian maritim Bugis-Makassar.',
    image: imageByRegion.Sulawesi,
    history: 'Bugis dikenal sebagai pelaut, perantau, dan pedagang. Dari Sulawesi, mereka berlayar jauh membawa cerita dan jaringan dagang.',
    tradition: 'Pinisi, aksara lontara, adat siri, dan tradisi merantau menjadi ciri Bugis.',
    wisdom: 'Siri mengajarkan harga diri, tanggung jawab, dan keberanian menjaga janji.',
    education: 'Siswa belajar bahwa Indonesia memiliki sejarah maritim yang sangat kuat.',
    trending: true,
  },
  {
    id: 'makassar',
    name: 'Makassar',
    region: 'Sulawesi',
    location: 'Sulawesi Selatan',
    category: 'Maritim',
    culture: 'Perdagangan',
    funFact: 'Makassar pernah menjadi kota pelabuhan penting di jalur perdagangan timur Nusantara.',
    image: imageByRegion.Sulawesi,
    history: 'Makassar tumbuh sebagai pusat perdagangan, pelayaran, dan pertemuan budaya. Pelabuhan membuat masyarakatnya terbuka pada dunia luar.',
    tradition: 'Perahu, kuliner pesisir, aksara lontara, dan adat siri na pacce menjadi ciri Makassar.',
    wisdom: 'Keterbukaan pada pendatang dapat berjalan bersama kebanggaan identitas sendiri.',
    education: 'Pelajar belajar hubungan antara kota pelabuhan, ekonomi, dan budaya.',
  },
  {
    id: 'toraja',
    name: 'Toraja',
    region: 'Sulawesi',
    location: 'Tana Toraja, Sulawesi Selatan',
    category: 'Ritual',
    culture: 'Ritual kematian',
    funFact: 'Rambu Solo bisa berlangsung berhari-hari dan melibatkan keluarga besar.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
    history: 'Toraja dikenal lewat rumah tongkonan dan ritual yang menghormati leluhur. Bagi Toraja, keluarga tidak berhenti hanya karena kematian.',
    tradition: 'Tongkonan, Rambu Solo, ukiran, dan kubur tebing menjadi ikon budaya Toraja.',
    wisdom: 'Hidup, kematian, dan keluarga dipandang sebagai perjalanan panjang yang saling terhubung.',
    education: 'Siswa belajar memahami tradisi berbeda tanpa cepat menghakimi.',
    trending: true,
  },
  {
    id: 'minahasa',
    name: 'Minahasa',
    region: 'Sulawesi',
    location: 'Sulawesi Utara',
    category: 'Urban / Akulturasi',
    culture: 'Budaya terbuka',
    funFact: 'Budaya Minahasa dikenal mudah menyerap pengaruh luar tanpa kehilangan identitas lokal.',
    image: imageByRegion.Sulawesi,
    history: 'Minahasa tumbuh di wilayah utara Sulawesi dengan sejarah pertemuan budaya lokal, Eropa, dan perdagangan.',
    tradition: 'Mapalus, musik bambu, kuliner, dan tradisi gereja menjadi bagian wajah Minahasa.',
    wisdom: 'Mapalus mengajarkan kerja bersama untuk kepentingan banyak orang.',
    education: 'Pelajar belajar bahwa keterbukaan budaya dapat memperkaya komunitas.',
  },
  {
    id: 'gorontalo',
    name: 'Gorontalo',
    region: 'Sulawesi',
    location: 'Gorontalo',
    category: 'Ritual',
    culture: 'Adat Islam',
    funFact: 'Gorontalo dikenal dengan semboyan adat bersendikan syara dan syara bersendikan kitabullah.',
    image: imageByRegion.Sulawesi,
    history: 'Gorontalo memiliki tradisi kerajaan lokal dan Islam yang kuat. Adat dan agama berpadu dalam banyak upacara.',
    tradition: 'Upacara adat, tujaqi, pakaian adat, dan seni lisan menjadi bagian budaya Gorontalo.',
    wisdom: 'Nilai agama dipakai untuk memperkuat etika sosial dan saling menghormati.',
    education: 'Siswa belajar bahwa agama dapat menjadi sumber nilai budaya dan tata sosial.',
  },
  {
    id: 'mandar',
    name: 'Mandar',
    region: 'Sulawesi',
    location: 'Sulawesi Barat',
    category: 'Maritim',
    culture: 'Pelaut',
    funFact: 'Sandeq, perahu layar Mandar, terkenal ramping dan cepat di laut.',
    image: imageByRegion.Sulawesi,
    history: 'Mandar tumbuh sebagai masyarakat pesisir yang dekat dengan laut. Pelayaran menjadi bagian dari identitas dan ekonomi.',
    tradition: 'Perahu sandeq, tradisi nelayan, dan upacara laut menjadi budaya khas Mandar.',
    wisdom: 'Laut mengajarkan ketelitian membaca alam dan keberanian bekerja sama.',
    education: 'Pelajar belajar bahwa teknologi tradisional seperti perahu lahir dari kebutuhan nyata.',
  },
  {
    id: 'bajo',
    name: 'Bajo',
    region: 'Sulawesi',
    location: 'Pesisir Sulawesi dan Indonesia Timur',
    category: 'Maritim',
    culture: 'Manusia laut',
    funFact: 'Sebagian orang Bajo sangat mahir menyelam karena hidupnya dekat sekali dengan laut.',
    image: imageByRegion.Sulawesi,
    history: 'Bajo dikenal sebagai pengembara laut. Rumah, perahu, dan kehidupan mereka berputar di sekitar air.',
    tradition: 'Rumah panggung laut, menangkap ikan, dan pengetahuan arus menjadi bagian budaya Bajo.',
    wisdom: 'Laut bukan batas, tetapi rumah yang harus dihormati.',
    education: 'Siswa belajar bahwa cara hidup manusia bisa sangat beragam mengikuti lingkungan.',
  },
  {
    id: 'bali',
    name: 'Bali',
    region: 'Bali & Nusa Tenggara',
    location: 'Bali',
    category: 'Ritual',
    culture: 'Hindu dan upacara',
    funFact: 'Di Bali, seni dan upacara sering hadir dalam keseharian, bukan hanya saat festival.',
    image: imageByRegion['Bali & Nusa Tenggara'],
    history: 'Bali mempertahankan tradisi Hindu yang kuat dan berpadu dengan seni lokal. Desa adat memegang peran besar dalam kehidupan masyarakat.',
    tradition: 'Tari kecak, upacara melasti, canang sari, gamelan, dan pura menjadi wajah budaya Bali.',
    wisdom: 'Tri Hita Karana mengajarkan harmoni manusia dengan Tuhan, sesama, dan alam.',
    education: 'Pelajar belajar bahwa keseimbangan hidup dapat menjadi prinsip budaya.',
    trending: true,
  },
  {
    id: 'sasak',
    name: 'Sasak',
    region: 'Bali & Nusa Tenggara',
    location: 'Lombok, Nusa Tenggara Barat',
    category: 'Tradisional',
    culture: 'Lombok',
    funFact: 'Rumah adat Sasak memakai lantai tanah yang dirawat dengan cara tradisional.',
    image: imageByRegion['Bali & Nusa Tenggara'],
    history: 'Sasak adalah masyarakat asli Lombok dengan tradisi desa adat, tenun, dan musik yang kuat.',
    tradition: 'Tenun songket, gendang beleq, desa Sade, dan upacara adat menjadi ciri Sasak.',
    wisdom: 'Kesederhanaan rumah adat menunjukkan hubungan erat manusia dengan tanah.',
    education: 'Siswa belajar bahwa arsitektur tradisional sering menyesuaikan iklim dan alam sekitar.',
  },
  {
    id: 'sumbawa',
    name: 'Sumbawa',
    region: 'Bali & Nusa Tenggara',
    location: 'Pulau Sumbawa',
    category: 'Tradisional',
    culture: 'Agraris',
    funFact: 'Budaya Sumbawa dekat dengan peternakan, pertanian, dan tradisi lisan.',
    image: imageByRegion['Bali & Nusa Tenggara'],
    history: 'Sumbawa memiliki kerajaan lokal dan budaya agraris yang membentuk kehidupan masyarakatnya.',
    tradition: 'Main jaran, musik tradisional, dan adat panen menjadi bagian budaya Sumbawa.',
    wisdom: 'Ketahanan hidup lahir dari kerja keras mengelola tanah dan ternak.',
    education: 'Pelajar belajar bahwa budaya lokal banyak dipengaruhi mata pencaharian.',
  },
  {
    id: 'bima',
    name: 'Bima',
    region: 'Bali & Nusa Tenggara',
    location: 'Bima, Nusa Tenggara Barat',
    category: 'Tradisional',
    culture: 'Budaya kuda',
    funFact: 'Kuda punya tempat penting dalam sejarah, ekonomi, dan tradisi Bima.',
    image: imageByRegion['Bali & Nusa Tenggara'],
    history: 'Bima memiliki sejarah kerajaan dan tradisi yang kuat di wilayah timur Sumbawa. Budaya kuda menjadi salah satu identitasnya.',
    tradition: 'Pacuan kuda, pakaian adat rimpu, dan upacara lokal menjadi ciri Bima.',
    wisdom: 'Ketangkasan dan keberanian perlu diimbangi tanggung jawab.',
    education: 'Siswa belajar bahwa hewan dapat menjadi bagian penting dari identitas budaya.',
  },
  {
    id: 'sumba',
    name: 'Sumba',
    region: 'Bali & Nusa Tenggara',
    location: 'Pulau Sumba',
    category: 'Ritual',
    culture: 'Pasola',
    funFact: 'Pasola adalah tradisi berkuda yang menjadi bagian dari ritual adat Sumba.',
    image: imageByRegion['Bali & Nusa Tenggara'],
    history: 'Sumba memiliki tradisi megalitik, rumah adat tinggi, dan kain tenun yang penuh simbol. Alam kering membentuk budaya yang tangguh.',
    tradition: 'Pasola, tenun ikat, kampung adat, dan kepercayaan Marapu menjadi identitas Sumba.',
    wisdom: 'Ritual mengajarkan keseimbangan antara manusia, leluhur, dan alam.',
    education: 'Pelajar belajar bahwa kain tradisional dapat menyimpan cerita sosial dan spiritual.',
    trending: true,
  },
  {
    id: 'manggarai',
    name: 'Manggarai',
    region: 'Bali & Nusa Tenggara',
    location: 'Flores Barat',
    category: 'Pegunungan',
    culture: 'Sawah unik',
    funFact: 'Sawah lingko berbentuk seperti jaring laba-laba karena pembagian tanah adat.',
    image: imageByRegion['Bali & Nusa Tenggara'],
    history: 'Manggarai tumbuh di pegunungan Flores. Sistem tanah adat dan kampung tradisional membentuk pola hidup masyarakatnya.',
    tradition: 'Caci, rumah adat mbaru niang, dan sawah lingko menjadi ikon Manggarai.',
    wisdom: 'Pembagian tanah adat mengajarkan keadilan dan keteraturan komunitas.',
    education: 'Siswa belajar bahwa bentuk lanskap bisa mencerminkan sistem sosial.',
  },
  {
    id: 'ende',
    name: 'Ende',
    region: 'Bali & Nusa Tenggara',
    location: 'Flores, Nusa Tenggara Timur',
    category: 'Urban / Akulturasi',
    culture: 'Sejarah Soekarno',
    funFact: 'Ende dikenal sebagai salah satu tempat perenungan Soekarno sebelum lahirnya gagasan Pancasila.',
    image: imageByRegion['Bali & Nusa Tenggara'],
    history: 'Ende memiliki budaya Flores yang kaya dan jejak sejarah nasional. Tempat ini menghubungkan budaya lokal dengan cerita Indonesia modern.',
    tradition: 'Tenun ikat, musik lokal, dan tradisi kampung Flores menjadi bagian budaya Ende.',
    wisdom: 'Keberagaman dapat menjadi bahan renungan untuk membangun persatuan.',
    education: 'Pelajar belajar bahwa sejarah nasional juga tumbuh dari daerah-daerah.',
  },
  {
    id: 'ambon',
    name: 'Ambon',
    region: 'Maluku',
    location: 'Ambon, Maluku',
    category: 'Maritim',
    culture: 'Musik',
    funFact: 'Ambon sering disebut kota musik karena banyak penyanyi besar lahir dari sana.',
    image: imageByRegion.Maluku,
    history: 'Ambon berkembang sebagai kota pelabuhan rempah dan pertemuan budaya. Musik menjadi bahasa sosial yang kuat.',
    tradition: 'Musik vokal, pela gandong, dan budaya pesisir menjadi identitas Ambon.',
    wisdom: 'Pela gandong mengajarkan persaudaraan lintas kampung dan latar belakang.',
    education: 'Siswa belajar bahwa seni dapat menjadi jembatan perdamaian.',
    trending: true,
  },
  {
    id: 'ternate',
    name: 'Ternate',
    region: 'Maluku',
    location: 'Ternate, Maluku Utara',
    category: 'Maritim',
    culture: 'Sejarah rempah',
    funFact: 'Cengkih membuat Ternate pernah menjadi pusat perhatian perdagangan dunia.',
    image: imageByRegion.Maluku,
    history: 'Ternate adalah kerajaan rempah penting di Maluku Utara. Letaknya membuatnya terhubung dengan jalur dunia sejak lama.',
    tradition: 'Kesultanan, tradisi laut, dan cerita rempah menjadi ciri Ternate.',
    wisdom: 'Sumber daya alam perlu dikelola bijak agar tidak hanya memicu perebutan.',
    education: 'Pelajar belajar bahwa sejarah Indonesia terhubung dengan perdagangan global.',
  },
  {
    id: 'tidore',
    name: 'Tidore',
    region: 'Maluku',
    location: 'Tidore, Maluku Utara',
    category: 'Maritim',
    culture: 'Kerajaan Islam',
    funFact: 'Tidore memiliki sejarah kesultanan yang kuat dalam jaringan Islam dan rempah.',
    image: imageByRegion.Maluku,
    history: 'Tidore berdiri sebagai kerajaan Islam penting di kawasan Maluku. Hubungannya dengan laut dan rempah membentuk politik serta budaya.',
    tradition: 'Kesultanan, adat istana, dan tradisi pesisir menjadi wajah budaya Tidore.',
    wisdom: 'Identitas lokal dapat berdiri kuat sambil berhubungan dengan dunia luar.',
    education: 'Siswa belajar bahwa kerajaan Nusantara punya jaringan diplomasi luas.',
  },
  {
    id: 'kei',
    name: 'Kei',
    region: 'Maluku',
    location: 'Kepulauan Kei',
    category: 'Maritim',
    culture: 'Hukum adat',
    funFact: 'Hukum adat Larvul Ngabal dikenal sebagai pedoman hidup masyarakat Kei.',
    image: imageByRegion.Maluku,
    history: 'Kei hidup di kepulauan dengan ikatan adat yang kuat. Hukum adat membantu menjaga keteraturan masyarakat pesisir.',
    tradition: 'Larvul Ngabal, tradisi laut, dan ikatan keluarga menjadi ciri budaya Kei.',
    wisdom: 'Aturan adat membantu masyarakat menyelesaikan masalah dengan rasa adil.',
    education: 'Pelajar belajar bahwa hukum tidak hanya berasal dari negara, tetapi juga adat.',
  },
  {
    id: 'seram',
    name: 'Seram',
    region: 'Maluku',
    location: 'Pulau Seram',
    category: 'Tradisional',
    culture: 'Animisme',
    funFact: 'Pulau Seram sering dianggap sebagai pulau ibu dalam banyak cerita Maluku.',
    image: imageByRegion.Maluku,
    history: 'Seram menyimpan banyak tradisi tua Maluku yang dekat dengan hutan, gunung, dan laut.',
    tradition: 'Cerita leluhur, ritual alam, dan adat kampung menjadi bagian budaya Seram.',
    wisdom: 'Menghormati alam dan leluhur membantu masyarakat menjaga batas perilaku.',
    education: 'Siswa belajar memahami kepercayaan lokal sebagai bagian dari sejarah budaya.',
  },
  {
    id: 'dani',
    name: 'Dani',
    region: 'Papua',
    location: 'Lembah Baliem, Papua Pegunungan',
    category: 'Pegunungan',
    culture: 'Koteka dan pegunungan',
    funFact: 'Lembah Baliem menjadi salah satu pusat budaya pegunungan Papua yang paling dikenal.',
    image: imageByRegion.Papua,
    history: 'Dani hidup di pegunungan Papua dengan sistem kebun, kampung, dan tradisi yang kuat. Lingkungan tinggi membentuk cara hidup yang khas.',
    tradition: 'Honai, koteka, perang-perangan adat, dan kebun ubi menjadi ciri Dani.',
    wisdom: 'Hidup di pegunungan mengajarkan ketahanan, kerja bersama, dan adaptasi.',
    education: 'Pelajar belajar bahwa geografis Indonesia membuat budaya tiap daerah sangat berbeda.',
    trending: true,
  },
  {
    id: 'asmat',
    name: 'Asmat',
    region: 'Papua',
    location: 'Papua Selatan',
    category: 'Tradisional',
    culture: 'Ukiran kayu',
    funFact: 'Ukiran Asmat dihormati dunia karena detail dan makna spiritualnya.',
    image: imageByRegion.Papua,
    history: 'Asmat hidup di wilayah sungai dan rawa. Kayu menjadi media untuk menceritakan leluhur, alam, dan identitas.',
    tradition: 'Ukiran, patung bisj, tarian, dan ritual sungai menjadi bagian budaya Asmat.',
    wisdom: 'Seni adalah cara mengingat asal-usul dan menghormati alam sekitar.',
    education: 'Siswa belajar bahwa karya seni tradisional sering menyimpan filsafat hidup.',
    trending: true,
  },
  {
    id: 'korowai',
    name: 'Korowai',
    region: 'Papua',
    location: 'Pedalaman Papua Selatan',
    category: 'Tradisional',
    culture: 'Rumah pohon',
    funFact: 'Rumah pohon Korowai dibangun tinggi sebagai cara beradaptasi dengan hutan.',
    image: imageByRegion.Papua,
    history: 'Korowai dikenal dengan rumah pohon dan kehidupan yang sangat dekat dengan hutan. Arsitekturnya lahir dari kebutuhan lingkungan.',
    tradition: 'Rumah pohon, berburu, meramu, dan pengetahuan hutan menjadi ciri Korowai.',
    wisdom: 'Tempat tinggal yang baik adalah yang memahami alam sekitarnya.',
    education: 'Pelajar belajar bahwa desain tradisional sering sangat cerdas dan fungsional.',
  },
  {
    id: 'lani',
    name: 'Lani',
    region: 'Papua',
    location: 'Papua Pegunungan',
    category: 'Pegunungan',
    culture: 'Pegunungan',
    funFact: 'Masyarakat Lani hidup di wilayah tinggi dan mengandalkan kebun sebagai pusat kehidupan.',
    image: imageByRegion.Papua,
    history: 'Lani adalah masyarakat pegunungan Papua yang membangun kampung dan kebun di wilayah dingin.',
    tradition: 'Honai, kebun ubi, dan tradisi komunitas pegunungan menjadi ciri Lani.',
    wisdom: 'Ketahanan pangan lokal sangat penting untuk hidup di wilayah sulit.',
    education: 'Siswa belajar bahwa kemandirian pangan dapat menjadi bagian budaya.',
  },
  {
    id: 'yali',
    name: 'Yali',
    region: 'Papua',
    location: 'Papua Pegunungan',
    category: 'Tradisional',
    culture: 'Tradisional',
    funFact: 'Yali memiliki tradisi kampung pegunungan yang kuat dan dekat dengan alam.',
    image: imageByRegion.Papua,
    history: 'Yali hidup di daerah pegunungan dengan medan sulit. Tradisi mereka tumbuh dari kebutuhan saling menjaga dalam komunitas kecil.',
    tradition: 'Rumah tradisional, kebun, dan ritual lokal menjadi bagian budaya Yali.',
    wisdom: 'Kebersamaan menjadi bekal utama saat lingkungan menantang.',
    education: 'Pelajar belajar menghargai masyarakat yang mampu beradaptasi dengan alam ekstrem.',
  },
  {
    id: 'sentani',
    name: 'Sentani',
    region: 'Papua',
    location: 'Danau Sentani, Papua',
    category: 'Maritim',
    culture: 'Seni lukis',
    funFact: 'Motif Sentani sering terlihat pada lukisan kulit kayu dan karya seni lokal.',
    image: imageByRegion.Papua,
    history: 'Sentani tumbuh di sekitar danau yang indah. Air, perahu, dan seni visual menjadi bagian dari identitas masyarakat.',
    tradition: 'Lukisan kulit kayu, festival danau, perahu, dan tarian menjadi ciri Sentani.',
    wisdom: 'Danau mengajarkan hubungan antara keindahan alam dan ekspresi seni.',
    education: 'Siswa belajar bahwa lingkungan dapat menginspirasi bahasa seni masyarakat.',
  },
  {
    id: 'biak',
    name: 'Biak',
    region: 'Papua',
    location: 'Pulau Biak, Papua',
    category: 'Maritim',
    culture: 'Budaya laut',
    funFact: 'Budaya Biak memiliki banyak cerita pelayaran dan hubungan dengan pulau-pulau sekitar.',
    image: imageByRegion.Papua,
    history: 'Biak adalah masyarakat kepulauan Papua yang dekat dengan laut. Pelayaran, perdagangan, dan cerita lisan membentuk identitasnya.',
    tradition: 'Wor, tradisi laut, tarian, dan cerita pelayaran menjadi bagian budaya Biak.',
    wisdom: 'Laut mengajarkan keberanian sekaligus kehati-hatian.',
    education: 'Pelajar belajar bahwa Papua juga memiliki budaya maritim yang kaya.',
  },
];

const regions: Array<'Semua Pulau' | Region> = ['Semua Pulau', 'Sumatera', 'Pulau Jawa', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara', 'Maluku', 'Papua'];
const categories: Array<'Semua Kategori' | Category> = ['Semua Kategori', 'Tradisional', 'Maritim', 'Pegunungan', 'Ritual', 'Urban / Akulturasi'];

function getCultureOfTheDay() {
  const dayIndex = Math.floor(Date.now() / 86_400_000) % cultureCards.length;
  return cultureCards[dayIndex];
}

export function HistoryCultureSection({ lang }: Props) {
  const tx = translations[lang];
  const [activeRegion, setActiveRegion] = useState<(typeof regions)[number]>('Semua Pulau');
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('Semua Kategori');
  const [search, setSearch] = useState('');
  const [selectedCard, setSelectedCard] = useState<CultureCard | null>(null);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [randomFactIndex, setRandomFactIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState('');

  const cultureOfDay = useMemo(getCultureOfTheDay, []);
  const trendingCards = useMemo(() => cultureCards.filter((card) => card.trending).slice(0, 6), []);
  const didYouKnow = cultureCards[randomFactIndex % cultureCards.length];
  const explorePercent = Math.round((viewedIds.length / cultureCards.length) * 100);
  const badgeLabel = explorePercent >= 75 ? 'Culture Ranger' : explorePercent >= 35 ? 'Penjelajah Nusantara' : viewedIds.length > 0 ? 'Rookie Explorer' : 'Mulai Jelajah';

  const filteredCards = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return cultureCards.filter((card) => {
      const regionMatch = activeRegion === 'Semua Pulau' || card.region === activeRegion;
      const categoryMatch = activeCategory === 'Semua Kategori' || card.category === activeCategory;
      const searchMatch = !normalizedSearch || [
        card.name,
        card.region,
        card.location,
        card.category,
        card.culture,
        card.funFact,
        card.history,
      ].some((value) => value.toLowerCase().includes(normalizedSearch));

      return regionMatch && categoryMatch && searchMatch;
    });
  }, [activeCategory, activeRegion, search]);

  const openCard = (card: CultureCard) => {
    setSelectedCard(card);
    setViewedIds((current) => (current.includes(card.id) ? current : [...current, card.id]));
    setQuizAnswer('');
  };

  const showRandomCulture = () => {
    const pool = filteredCards.length > 0 ? filteredCards : cultureCards;
    const randomCard = pool[Math.floor(Math.random() * pool.length)];
    openCard(randomCard);
  };

  const nextRandomFact = () => {
    setRandomFactIndex((current) => (current + 7) % cultureCards.length);
  };

  return (
    <section id="historyculture" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4">
            <Sparkles className="h-4 w-4" />
            {tx.explorer}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{tx.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{tx.subtitle}</p>
        </motion.div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[1.4fr_0.9fr_0.9fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tx.searchPlaceholder}
              className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <select
            value={activeRegion}
            onChange={(e) => setActiveRegion(e.target.value as (typeof regions)[number])}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          >
            {regions.map((region) => (
              <option key={region} value={region}>{region === 'Semua Pulau' ? tx.regionAll : region}</option>
            ))}
          </select>
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value as (typeof categories)[number])}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category === 'Semua Kategori' ? tx.categoryAll : category}</option>
            ))}
          </select>
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{tx.progress}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{explorePercent}%</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Award className="h-3.5 w-3.5" />
                {badgeLabel}
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${explorePercent}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{viewedIds.length} dari {cultureCards.length} budaya sudah dibuka.</p>
          </div>

          <button
            onClick={showRandomCulture}
            className="group rounded-2xl border border-primary/30 bg-primary/10 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/15"
          >
            <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <RefreshCw className="h-5 w-5 transition group-hover:rotate-180" />
            </div>
            <p className="text-sm font-semibold text-foreground">{tx.random}</p>
            <p className="mt-1 text-xs text-muted-foreground">Buka satu budaya acak dan tambah progress eksplorasi.</p>
          </button>

          <button
            onClick={() => openCard(cultureOfDay)}
            className="group rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-primary/40"
          >
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Trophy className="h-4 w-4" />
              {tx.cultureOfDay}
            </div>
            <p className="text-xl font-bold text-foreground">{cultureOfDay.name}</p>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{cultureOfDay.funFact}</p>
          </button>
        </div>

        <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Brain className="h-4 w-4 text-primary" />
                {tx.didYouKnow}
              </div>
              <button onClick={nextRandomFact} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-primary">
                Ganti
              </button>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{didYouKnow.funFact}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Flame className="h-4 w-4 text-primary" />
              {tx.trending}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {trendingCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => openCard(card)}
                  className="shrink-0 rounded-full border border-border bg-muted/40 px-4 py-2 text-xs font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  {card.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Menampilkan <span className="font-semibold text-foreground">{filteredCards.length}</span> budaya
          </p>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Hover untuk highlight, klik untuk story mode.
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => openCard(card)}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-lg transition-all hover:border-primary/50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={card.image} alt={card.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/20 to-transparent" />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                    {card.category}
                  </span>
                  {viewedIds.includes(card.id) && (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur">
                      Dilihat
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-foreground">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-primary">
                    <MapPin className="h-3 w-3" />
                    {card.location}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold">{card.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{card.funFact}</p>
                </div>
              </div>
              <div className="space-y-3 px-5 py-4 bg-muted/30">
                <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span>{card.culture}</span>
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-primary">{card.region}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <ChevronRight className="h-3 w-3 text-primary" /> {tx.detail}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{tx.noResults}</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-8 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                aria-label={tx.close}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/85 text-foreground transition hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="max-h-[90vh] overflow-y-auto">
                <div className="relative h-72 overflow-hidden">
                  <img src={selectedCard.image} alt={selectedCard.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/35 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-16">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{selectedCard.category}</span>
                      <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">{selectedCard.region}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">{selectedCard.name}</h3>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{selectedCard.location} | {selectedCard.culture}</p>
                  </div>
                </div>

                <div className="grid gap-6 p-6 lg:grid-cols-[1.35fr_0.8fr]">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <StoryBlock icon={<BookOpen className="h-4 w-4" />} title="Sejarah singkat" text={selectedCard.history} />
                    <StoryBlock icon={<Sparkles className="h-4 w-4" />} title="Budaya & tradisi" text={selectedCard.tradition} />
                    <StoryBlock icon={<Leaf className="h-4 w-4" />} title="Kearifan lokal" text={selectedCard.wisdom} />
                    <StoryBlock icon={<Target className="h-4 w-4" />} title="Nilai edukasi" text={selectedCard.education} />
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-muted/30 p-5">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Brain className="h-4 w-4 text-primary" />
                        Fun Fact
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{selectedCard.funFact}</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-muted/30 p-5">
                      <div className="mb-3 text-sm font-semibold text-foreground">{tx.quiz}</div>
                      <p className="mb-3 text-sm text-muted-foreground">Suku {selectedCard.name} berasal dari wilayah mana?</p>
                      <div className="grid gap-2">
                        {[selectedCard.region, 'Sumatera', 'Papua']
                          .filter((value, index, array) => array.indexOf(value) === index)
                          .slice(0, 3)
                          .map((answer) => (
                            <button
                              key={answer}
                              onClick={() => setQuizAnswer(answer)}
                              className={`rounded-xl border px-4 py-2 text-left text-xs font-semibold transition ${
                                quizAnswer === answer
                                  ? answer === selectedCard.region
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-destructive/40 bg-destructive/10 text-destructive'
                                  : 'border-border bg-card text-foreground hover:border-primary/40'
                              }`}
                            >
                              {answer}
                            </button>
                          ))}
                      </div>
                      {quizAnswer && (
                        <p className="mt-3 text-xs text-muted-foreground">
                          {quizAnswer === selectedCard.region ? tx.correct : tx.wrong}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function StoryBlock({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-5">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
        {icon}
        {title}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
