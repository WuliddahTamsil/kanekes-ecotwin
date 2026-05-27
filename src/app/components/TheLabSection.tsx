import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, Upload, Headphones, Glasses, Cpu, Zap, Image, Mic, ChevronRight, X, Sparkles, AlertCircle } from 'lucide-react';
import * as THREE from 'three';

interface Props { lang: 'id' | 'en' }

interface Message { role: 'user' | 'bot'; text: string; id: number }

const BOT_FOREST = 'https://images.unsplash.com/photo-1668086381578-241354528f87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80';

const mockAnswers: Record<string, { id: string; en: string }> = {
  listrik: {
    id: 'Suku Baduy menolak listrik karena percaya bahwa teknologi modern akan merusak keseimbangan alam dan spiritualitas mereka. Hukum adat Pikukuh melarang penggunaan peralatan modern untuk menjaga kehidupan yang harmonis dengan alam.',
    en: 'The Baduy tribe refuses electricity because they believe modern technology will disrupt the balance of nature and their spirituality. The customary law Pikukuh prohibits the use of modern equipment to maintain a harmonious life with nature.',
  },
  hutan: {
    id: 'Baduy menjaga hutan dengan konsep "leuweung kolot" atau hutan larangan. Area ini tidak boleh ditebang atau dimasuki sembarangan. Mereka percaya bahwa hutan adalah sumber kehidupan yang harus dilindungi.',
    en: 'Baduy protects forests with the concept of "leuweung kolot" or forbidden forests. These areas cannot be cut down or entered carelessly. They believe that forests are a source of life that must be protected.',
  },
  default: {
    id: 'Pertanyaan menarik! Suku Baduy memiliki filosofi hidup yang sangat dalam. Prinsip utama mereka adalah "Rawatan hidup" — menjaga keseimbangan antara manusia, alam, dan roh leluhur. Mereka percaya bahwa modernisasi berlebihan akan merusak harmoni ini.',
    en: 'Great question! The Baduy tribe has a very deep life philosophy. Their main principle is "Rawatan hidup" — maintaining the balance between humans, nature, and ancestral spirits. They believe that excessive modernization will disrupt this harmony.',
  },
};

const vrScenes = [
  { id: 'hutan', name: 'Hutan Larangan', nameEn: 'Sacred Forest', desc: 'Jelajahi hutan sakral Baduy Dalam yang belum pernah dijamah teknologi', descEn: 'Explore the sacred forest of Baduy Dalam untouched by technology', color: 'from-green-800 to-green-600', icon: '🌳' },
  { id: 'kampung', name: 'Kampung Baduy', nameEn: 'Baduy Village', desc: 'Kunjungi permukiman tradisional dengan rumah panggung khas Baduy', descEn: 'Visit traditional settlements with typical Baduy stilt houses', color: 'from-amber-800 to-amber-600', icon: '🏡' },
  { id: 'ritual', name: 'Ritual Kawalu', nameEn: 'Kawalu Ritual', desc: 'Saksikan upacara sakral Kawalu yang hanya dilakukan setahun sekali', descEn: 'Witness the sacred Kawalu ceremony held only once a year', color: 'from-purple-800 to-purple-600', icon: '🙏' },
];

const sceneImages: Record<string, string> = {
  hutan: 'https://images.unsplash.com/photo-1511497584788-876760111969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
  kampung: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
  ritual: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
};

const t = {
  id: {
    title: 'The Lab',
    sub: 'Teknologi canggih untuk pengalaman belajar yang lebih dalam',
    chatTitle: 'AI Chatbot Budaya',
    chatSub: 'Tanya apa saja tentang budaya Baduy',
    chatPlaceholder: 'Contoh: Kenapa Baduy tidak pakai listrik?',
    chatSend: 'Kirim',
    vrTitle: 'Virtual Reality Tour',
    vrSub: 'Masuk ke dunia Baduy tanpa meninggalkan tempat duduk',
    arTitle: 'AR Experience',
    arSub: 'Scan lingkungan sekitar dan temukan prinsip Baduy di dunia nyata',
    arDesc: 'Arahkan kamera ke lingkungan sekitar Anda. AI akan menganalisis dan memberikan insight tentang cara menerapkan prinsip Baduy.',
    imgTitle: 'AI Image Recognition',
    imgSub: 'Upload foto untuk identifikasi budaya dan asal daerah',
    imgBtn: 'Upload Foto',
    imgDesc: 'AI akan menganalisis foto Anda dan mengidentifikasi budaya, tradisi, dan asal daerah dari objek atau pakaian yang terdeteksi.',
    enter: 'Masuk ke VR',
    active: 'Aktifkan AR',
    analyzing: 'Menganalisis...',
    detected: 'Terdeteksi: Kain Tenun Baduy Luar, Banten — Motif Poleng, simbol keseimbangan alam',
    arHint: '💡 Klik tombol di bawah untuk mengaktifkan webcam asli kamu untuk simulasi pemindaian AR.',
    arStop: 'Matikan AR',
    arCamError: '⚠️ Kamera tidak dapat diakses (Akses ditolak atau perangkat tidak ada). Berjalan dalam mode simulasi.'
  },
  en: {
    title: 'The Lab',
    sub: 'Advanced technology for a deeper learning experience',
    chatTitle: 'Cultural AI Chatbot',
    chatSub: 'Ask anything about Baduy culture',
    chatPlaceholder: 'Example: Why doesn\'t Baduy use electricity?',
    chatSend: 'Send',
    vrTitle: 'Virtual Reality Tour',
    vrSub: 'Enter the world of Baduy without leaving your seat',
    arTitle: 'AR Experience',
    arSub: 'Scan your surroundings and discover Baduy principles in the real world',
    arDesc: 'Point your camera at your surroundings. AI will analyze and provide insights on how to apply Baduy principles.',
    imgTitle: 'AI Image Recognition',
    imgSub: 'Upload a photo to identify culture and region of origin',
    imgBtn: 'Upload Photo',
    imgDesc: 'AI will analyze your photo and identify culture, traditions, and regional origins from detected objects or clothing.',
    enter: 'Enter VR',
    active: 'Activate AR',
    analyzing: 'Analyzing...',
    detected: 'Detected: Baduy Luar Woven Fabric, Banten — Poleng motif, symbol of natural balance',
    arHint: '💡 Click the button below to turn on your actual webcam for the AR scanning simulation.',
    arStop: 'Deactivate AR',
    arCamError: '⚠️ Camera cannot be accessed (Access denied or device missing). Running in simulated mode.'
  },
};

let msgId = 0;

// Three.js VR 360 Viewer Modal Component
interface VRModalProps {
  sceneId: string;
  onClose: () => void;
  lang: 'id' | 'en';
}

function VRModal({ sceneId, onClose, lang }: VRModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene
    const scene = new THREE.Scene();

    // 2. Setup Camera
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    camera.position.set(0, 0, 0);

    // 3. Setup Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Create inverted Sphere Geometry
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Flip sphere inside out

    // 5. Load Texture
    const texture = new THREE.TextureLoader().load(sceneImages[sceneId] || sceneImages.hutan);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Variables for drag controls
    let isUserInteracting = false;
    let onPointerDownPointerX = 0;
    let onPointerDownPointerY = 0;
    let onPointerDownLon = 0;
    let onPointerDownLat = 0;
    let lon = 0;
    let lat = 0;
    let phi = 0;
    let theta = 0;

    const onPointerDown = (event: PointerEvent) => {
      if (event.isPrimary === false) return;
      isUserInteracting = true;
      onPointerDownPointerX = event.clientX;
      onPointerDownPointerY = event.clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.isPrimary === false) return;
      if (isUserInteracting === true) {
        lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.isPrimary === false) return;
      isUserInteracting = false;
    };

    const container = containerRef.current;
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isUserInteracting === false) {
        lon += 0.05; // Auto rotate slowly
      }

      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(x, y, z);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('pointerdown', onPointerDown);
        container.removeEventListener('pointermove', onPointerMove);
        container.removeEventListener('pointerup', onPointerUp);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [sceneId]);

  return (
    <div className="fixed inset-0 z-[2000] bg-black flex flex-col justify-between">
      {/* Top Bar Overlay */}
      <div className="absolute top-0 left-0 right-0 p-5 bg-gradient-to-b from-black/80 to-transparent z-[2001] flex items-center justify-between">
        <div>
          <h4 className="text-white text-base font-bold flex items-center gap-2">
            <Headphones className="w-5 h-5 text-emerald-400" />
            360° Virtual Reality Experience
          </h4>
          <p className="text-white/60 text-xs mt-0.5">
            {lang === 'id' 
              ? 'Tarik/Drag mouse untuk melihat sekeliling 360 derajat. Nikmati visualisasi imersif.' 
              : 'Drag mouse to look around in 360 degrees. Enjoy the immersive visualization.'}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* 3D Canvas wrapper */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Bottom Hint */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[2001] bg-black/60 backdrop-blur border border-white/10 px-4 py-2 rounded-xl text-white/80 text-[10px] uppercase tracking-widest font-bold font-mono">
        🖱️ Drag mouse to look around
      </div>
    </div>
  );
}

export function TheLabSection({ lang }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: lang === 'id' ? 'Halo! Saya AI Asisten Budaya Baduy. Silakan tanyakan apa saja tentang kearifan lokal Suku Baduy 🌿' : 'Hello! I\'m the Baduy Cultural AI Assistant. Feel free to ask anything about the local wisdom of the Baduy Tribe 🌿', id: ++msgId },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeVr, setActiveVr] = useState<string | null>(null);
  const [imgState, setImgState] = useState<'idle' | 'analyzing' | 'done'>('idle');
  
  // AR states and refs
  const [arActive, setArActive] = useState(false);
  const [arCamError, setArCamError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const tx = t[lang];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Request/Stop webcam feed dynamically for AR Experience
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    if (arActive) {
      setArCamError(false);
      const constraints = { 
        video: { 
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      };

      navigator.mediaDevices.getUserMedia(constraints)
        .then(mediaStream => {
          activeStream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play().catch(e => {
              console.warn("Video playback was interrupted or not allowed:", e);
            });
          }
        })
        .catch(err => {
          console.error("Camera stream access failed:", err);
          setArCamError(true);
        });
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => {
          try {
            track.stop();
          } catch (e) {
            console.error("Error stopping video track:", e);
          }
        });
      }
    };
  }, [arActive]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg, id: ++msgId }]);
    setIsTyping(true);

    setTimeout(() => {
      const lowerMsg = userMsg.toLowerCase();
      let answer: string;
      if (lowerMsg.includes('listrik') || lowerMsg.includes('electricity') || lowerMsg.includes('teknologi') || lowerMsg.includes('technology')) {
        answer = mockAnswers.listrik[lang];
      } else if (lowerMsg.includes('hutan') || lowerMsg.includes('forest') || lowerMsg.includes('alam') || lowerMsg.includes('nature')) {
        answer = mockAnswers.hutan[lang];
      } else {
        answer = mockAnswers.default[lang];
      }
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: answer, id: ++msgId }]);
    }, 1500);
  };

  const handleImgUpload = () => {
    setImgState('analyzing');
    setTimeout(() => setImgState('done'), 2500);
  };

  return (
    <section id="lab" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4 font-semibold">
            <Cpu className="w-4 h-4" />
            Advanced Technology
          </div>
          <h2 className="text-foreground mb-3">{tx.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{tx.sub}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* AI Chatbot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col"
            style={{ height: 520 }}
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 p-5 border-b border-border bg-primary/5">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img src={BOT_FOREST} alt="AI" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">{tx.chatTitle}</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {tx.chatSub}
                </div>
              </div>
              <Bot className="ml-auto w-5 h-5 text-primary" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-muted text-foreground rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-1">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder={tx.chatPlaceholder}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* VR Tour */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Headphones className="w-5 h-5 text-primary" />
                <h3 className="text-foreground text-base">{tx.vrTitle}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{tx.vrSub}</p>
              <div className="grid gap-3">
                {vrScenes.map(scene => {
                  const isActive = activeVr === scene.id;
                  return (
                    <motion.div
                      key={scene.id}
                      whileHover={{ scale: 1.01 }}
                      className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all border ${
                        isActive ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${scene.color} opacity-15`} />
                      <div className="relative flex items-center gap-3">
                        <div className="text-2xl">{scene.icon}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground text-sm">{lang === 'id' ? scene.name : scene.nameEn}</div>
                          <div className="text-muted-foreground text-xs mt-0.5">{lang === 'id' ? scene.desc : scene.descEn}</div>
                        </div>
                        <button
                          onClick={() => setActiveVr(isActive ? null : scene.id)}
                          className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all cursor-pointer border border-primary/20"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Sub-activation to trigger Fullscreen VR Modal */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="relative mt-3 pt-3 border-t border-border/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
                              <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5, ease: 'linear' }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                            <button 
                              onClick={() => {}} // ActiveVr state keeps it mounted, VRModal is triggered by separate rendering below
                              className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold cursor-pointer shadow"
                            >
                              {tx.enter}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* AR + Image Recognition */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* AR Experience with actual Camera Feed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Glasses className="w-5 h-5 text-sky-500" />
              <h3 className="text-foreground text-base">{tx.arTitle}</h3>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">{tx.arDesc}</p>
            <div className="text-[11px] font-medium text-muted-foreground mb-4 bg-muted border border-border/40 p-2.5 rounded-xl">
              {tx.arHint}
            </div>

            <div
              className="relative rounded-2xl overflow-hidden aspect-video flex items-center justify-center group border border-border bg-black"
            >
              {/* Actual Camera Stream background */}
              {arActive && !arCamError && (
                <video 
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              )}

              {/* Grid scanning effect overlay */}
              <div className="absolute inset-0 opacity-20 z-10 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="absolute border-t border-green-400/30" style={{ top: `${20 * (i + 1)}%`, left: 0, right: 0 }} />
                ))}
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="absolute border-l border-green-400/30" style={{ left: `${20 * (i + 1)}%`, top: 0, bottom: 0 }} />
                ))}
              </div>

              {/* Scanning lines */}
              {arActive && (
                <motion.div
                  className="absolute left-0 right-0 h-px bg-green-400 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)] z-10"
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              )}

              {/* Corner brackets */}
              {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-6 h-6 z-10`}>
                  <div className={`absolute border-green-400 ${i < 2 ? 'top-0 border-t-2' : 'bottom-0 border-b-2'} ${i % 2 === 0 ? 'left-0 border-l-2' : 'right-0 border-r-2'} w-4 h-4`} />
                </div>
              ))}

              {/* Camera Fallback simulated background */}
              {arActive && arCamError && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B14] to-[#1B3A2C] flex items-center justify-center p-6 text-center z-0">
                  <div className="text-[10px] text-rose-400 leading-normal flex flex-col items-center gap-1.5 font-semibold">
                    <AlertCircle className="w-5 h-5 text-rose-500" />
                    <span>{tx.arCamError}</span>
                  </div>
                </div>
              )}

              <div className="relative z-20 text-center bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10 max-w-[80%]">
                <Glasses className={`w-10 h-10 mx-auto mb-2 ${arActive ? 'text-green-400' : 'text-green-400/50'}`} />
                <div className={`text-xs font-extrabold ${arActive ? 'text-green-400' : 'text-green-400/50'}`}>
                  {arActive ? (lang === 'id' ? '📍 Mendeteksi lingkungan...' : '📍 Detecting environment...') : tx.active}
                </div>
                
                {arActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-3 px-3 py-2 rounded-lg bg-green-400/20 border border-green-400/30 text-green-400 text-[10px] leading-normal font-mono"
                  >
                    💡 {lang === 'id' ? 'Terapkan prinsip Baduy: Kurangi penggunaan plastik — gunakan bahan alami' : 'Apply Baduy principle: Reduce plastic use — use natural materials'}
                  </motion.div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => setArActive(!arActive)}
              className={`w-full mt-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer text-center ${
                arActive ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              {arActive ? tx.arStop : tx.active}
            </button>
          </motion.div>

          {/* AI Image Recognition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Image className="w-5 h-5 text-amber-500" />
              <h3 className="text-foreground text-base">{tx.imgTitle}</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-5">{tx.imgDesc}</p>

            <div
              onClick={() => imgState === 'idle' && handleImgUpload()}
              className={`relative rounded-2xl border-2 border-dashed aspect-video flex flex-col items-center justify-center cursor-pointer transition-all ${
                imgState !== 'idle' ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-primary/3'
              }`}
            >
              {imgState === 'idle' && (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <div className="text-sm font-semibold text-foreground">{tx.imgBtn}</div>
                  <div className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP</div>
                </div>
              )}

              {imgState === 'analyzing' && (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary mx-auto mb-3"
                  />
                  <div className="text-sm text-primary font-semibold">{tx.analyzing}</div>
                  <div className="text-xs text-muted-foreground mt-1">AI Processing...</div>
                </div>
              )}

              {imgState === 'done' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-4"
                >
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-sm font-semibold text-foreground mb-2">
                    {lang === 'id' ? 'Analisis Selesai!' : 'Analysis Complete!'}
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs leading-relaxed">
                    {tx.detected}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setImgState('idle'); }}
                    className="mt-3 text-xs text-muted-foreground hover:text-primary transition-colors underline cursor-pointer"
                  >
                    {lang === 'id' ? 'Upload foto lain' : 'Upload another'}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Render immersive WebGL 360° VR Modal sphere if active */}
      <AnimatePresence>
        {activeVr && (
          <VRModal 
            sceneId={activeVr} 
            onClose={() => setActiveVr(null)}
            lang={lang}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
