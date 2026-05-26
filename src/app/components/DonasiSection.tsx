import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, QrCode, CheckCircle, ChevronDown, ChevronUp, Users, TreePine, Sparkles } from 'lucide-react';

interface Props { lang: 'id' | 'en' }

const QRIS_PLACEHOLDER = 'https://images.unsplash.com/photo-1558520845-e80332dda30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80';

const t = {
  id: {
    title: 'Donasi untuk Baduy',
    sub: 'Setiap kontribusi Anda membantu melestarikan budaya dan alam Baduy untuk generasi mendatang',
    target: 'Target Dana',
    collected: 'Terkumpul',
    donors: 'Donatur',
    days: 'Hari Tersisa',
    amts: ['Rp 20.000', 'Rp 50.000', 'Rp 100.000', 'Rp 250.000', 'Rp 500.000'],
    custom: 'Jumlah Lain',
    qris: 'Bayar dengan QRIS',
    scanQr: 'Scan QR Code di bawah',
    or: 'atau',
    impact: 'Dampak Donasi Anda',
    items: [
      { icon: '📚', title: 'Beasiswa Anak Baduy', desc: 'Rp 50.000 dapat mendukung pendidikan 1 anak selama 1 bulan' },
      { icon: '🌳', title: 'Penanaman Pohon', desc: 'Rp 20.000 dapat menanam 1 pohon di hutan Baduy' },
      { icon: '🏠', title: 'Renovasi Rumah Adat', desc: 'Rp 500.000 berkontribusi pada renovasi 1 rumah tradisional' },
    ],
    transparency: 'Transparansi Penggunaan Dana',
    fund1: 'Program Pendidikan', p1: 40,
    fund2: 'Pelestarian Lingkungan', p2: 30,
    fund3: 'Pengembangan Platform', p3: 20,
    fund4: 'Operasional', p4: 10,
    donated: 'Donasi Dikirim! Terima kasih atas kontribusi Anda 🌿',
    btnDonate: 'Donasi Sekarang',
  },
  en: {
    title: 'Donate for Baduy',
    sub: 'Every contribution helps preserve Baduy culture and nature for future generations',
    target: 'Target Fund',
    collected: 'Collected',
    donors: 'Donors',
    days: 'Days Left',
    amts: ['IDR 20,000', 'IDR 50,000', 'IDR 100,000', 'IDR 250,000', 'IDR 500,000'],
    custom: 'Other Amount',
    qris: 'Pay with QRIS',
    scanQr: 'Scan QR Code below',
    or: 'or',
    impact: 'Impact of Your Donation',
    items: [
      { icon: '📚', title: 'Baduy Children Scholarship', desc: 'IDR 50,000 can support 1 child\'s education for 1 month' },
      { icon: '🌳', title: 'Tree Planting', desc: 'IDR 20,000 can plant 1 tree in Baduy forest' },
      { icon: '🏠', title: 'Traditional House Renovation', desc: 'IDR 500,000 contributes to renovating 1 traditional house' },
    ],
    transparency: 'Fund Usage Transparency',
    fund1: 'Education Program', p1: 40,
    fund2: 'Environmental Preservation', p2: 30,
    fund3: 'Platform Development', p3: 20,
    fund4: 'Operational', p4: 10,
    donated: 'Donation Sent! Thank you for your contribution 🌿',
    btnDonate: 'Donate Now',
  },
};

const progressPct = 72;
const totalCollected = 'Rp 36.4 Juta';
const targetAmt = 'Rp 50 Juta';
const donorCount = 1247;
const daysLeft = 28;

export function DonasiSection({ lang }: Props) {
  const [selectedAmt, setSelectedAmt] = useState<number | null>(1);
  const [showQris, setShowQris] = useState(false);
  const [donated, setDonated] = useState(false);
  const [showTransparency, setShowTransparency] = useState(false);
  const tx = t[lang];

  const handleDonate = () => {
    setShowQris(true);
    setTimeout(() => {
      setShowQris(false);
      setDonated(true);
    }, 3000);
  };

  const funds = [
    { label: tx.fund1, pct: tx.p1, color: 'bg-primary' },
    { label: tx.fund2, pct: tx.p2, color: 'bg-emerald-400' },
    { label: tx.fund3, pct: tx.p3, color: 'bg-accent' },
    { label: tx.fund4, pct: tx.p4, color: 'bg-purple-400' },
  ];

  return (
    <section id="donasi" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4">
            <Heart className="w-4 h-4" />
            {lang === 'id' ? 'Dukung Pelestarian' : 'Support Preservation'}
          </div>
          <h2 className="text-foreground mb-3">{tx.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{tx.sub}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — Progress + Impact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Progress Card */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>{totalCollected}</div>
                  <div className="text-xs text-muted-foreground">{tx.collected} dari {targetAmt}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>{progressPct}%</div>
                  <div className="text-xs text-muted-foreground">{tx.target}</div>
                </div>
              </div>
              <div className="h-4 rounded-full bg-muted overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progressPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #2D6A4F, #52B788)' }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: donorCount.toLocaleString(), label: tx.donors, icon: Users },
                  { value: targetAmt, label: tx.target, icon: Sparkles },
                  { value: `${daysLeft}`, label: tx.days, icon: TreePine },
                ].map(({ value, label, icon: Icon }) => (
                  <div key={label} className="p-3 rounded-xl bg-muted/50">
                    <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                    <div className="text-sm font-bold text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Items */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-foreground text-base mb-4">{tx.impact}</h3>
              <div className="space-y-3">
                {tx.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-primary/5 border border-primary/10"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{item.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Transparency */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              <button
                onClick={() => setShowTransparency(!showTransparency)}
                className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
              >
                <span className="text-sm font-semibold text-foreground">{tx.transparency}</span>
                {showTransparency ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              <AnimatePresence>
                {showTransparency && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-3">
                      {funds.map(f => (
                        <div key={f.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{f.label}</span>
                            <span className="font-semibold text-foreground">{f.pct}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${f.pct}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className={`h-full rounded-full ${f.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right — Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl p-6 shadow-sm"
          >
            {donated ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-foreground font-semibold">{tx.donated}</p>
                <button
                  onClick={() => setDonated(false)}
                  className="mt-4 text-sm text-muted-foreground hover:text-primary transition-colors underline"
                >
                  {lang === 'id' ? 'Donasi Lagi' : 'Donate Again'}
                </button>
              </motion.div>
            ) : showQris ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <QrCode className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-foreground font-semibold mb-2">{tx.scanQr}</p>
                <div className="relative inline-block">
                  <div className="w-48 h-48 mx-auto rounded-2xl bg-white p-3 border-2 border-primary/30 overflow-hidden">
                    {/* QR Code placeholder pattern */}
                    <div className="w-full h-full grid grid-cols-7 gap-0.5">
                      {Array.from({ length: 49 }).map((_, i) => (
                        <div
                          key={i}
                          className="rounded-sm"
                          style={{ background: Math.random() > 0.4 ? '#1C2B1A' : 'transparent' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <motion.div
                    className="w-48 h-1 mx-auto rounded-full bg-muted overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="w-1/2 h-full bg-primary rounded-full"
                    />
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-2">{lang === 'id' ? 'Menunggu pembayaran...' : 'Waiting for payment...'}</p>
                </div>
              </motion.div>
            ) : (
              <>
                <h3 className="text-foreground text-base mb-5">{lang === 'id' ? 'Pilih Nominal Donasi' : 'Select Donation Amount'}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                  {tx.amts.map((amt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedAmt(i)}
                      className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                        selectedAmt === i
                          ? 'border-primary bg-primary/10 text-primary shadow-sm'
                          : 'border-border text-muted-foreground hover:border-primary/40 hover:text-primary'
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedAmt(null)}
                    className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all col-span-2 sm:col-span-1 ${
                      selectedAmt === null
                        ? 'border-accent bg-accent/10 text-accent-foreground shadow-sm'
                        : 'border-border text-muted-foreground hover:border-accent/40'
                    }`}
                  >
                    {tx.custom}
                  </button>
                </div>

                {selectedAmt === null && (
                  <div className="mb-5">
                    <input
                      type="number"
                      placeholder={lang === 'id' ? 'Masukkan jumlah (Rp)' : 'Enter amount (IDR)'}
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                )}

                <div className="border-t border-border pt-5">
                  <p className="text-xs text-muted-foreground mb-4 text-center">{tx.or}</p>
                  <button
                    onClick={handleDonate}
                    className="w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-xl"
                    style={{ background: 'linear-gradient(135deg, #2D6A4F, #52B788)', color: '#fff', boxShadow: '0 8px 24px rgba(45,106,79,0.3)' }}
                  >
                    <QrCode className="w-5 h-5" />
                    {tx.qris}
                  </button>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    {lang === 'id' ? 'Aman & Terenkripsi • Transparansi 100%' : 'Secure & Encrypted • 100% Transparent'}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
