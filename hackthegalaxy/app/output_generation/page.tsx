'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Play, Share2, Music } from 'lucide-react'
import './styles.css'

// --- Integration Types ---
interface VibeData {
  title: string;          // From backend: 'vibe name'
  artist: string;         // From backend: 'artist'
  songTitle: string;      // From backend: 'song'
  suggestions: string[];  // From backend: 'activity suggestions'
  images: string[];       // From frontend: Array of 10 image URLs
}

export default function OutputPage({ data }: { data?: Partial<VibeData> }) {
  
  // 1. FALLBACKS: Uses backend data if available, otherwise defaults to these strings
  const title = data?.title || "Celestial Market Wanders";
  const artist = data?.artist || "Lofi Girl";
  const songTitle = data?.songTitle || "Soft Currents";
  const suggestions = data?.suggestions || [
    "Sun in Gemini: Community & New Crafts.",
    "Try a local pottery workshop this weekend.",
    "Visit the market for fresh mint inspiration."
  ];

  // 2. IMAGE LOGIC: Prioritizes your 10 uploaded images
  const displayImages = data?.images || Array(10).fill("");

  // 3. YOUTUBE REDIRECT: Finds the song based on dynamic artist/title
  const handlePlay = () => {
    const query = encodeURIComponent(`${songTitle} ${artist}`);
    const youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="min-h-screen bg-[#f8f5f0] p-4 md:p-8 font-serif text-[#4a3f35] overflow-x-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* HEADER */}
        <header className="text-center mt-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#8c6d4f]">
            Today's vibe...
          </h1>
        </header>

        {/* VIBE HERO CARD */}
        <section className="relative aspect-square md:aspect-video w-full rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-[#d4c1ec] via-[#f2d5cf] to-[#e9c46a] p-8 flex flex-col justify-center">
          <div className="absolute inset-0 opacity-20 paper-texture pointer-events-none" />
          <p className="text-xs uppercase tracking-widest font-sans font-bold opacity-60 mb-2">
            Curated Vibe Synopsis
          </p>
          <h2 className="text-5xl md:text-6xl font-handwriting leading-tight text-[#4a3f35]">
            {title}
          </h2>
        </section>

        {/* MUSIC PLAYER */}
        <section className="bg-[#8c6d4f] rounded-2xl p-4 text-[#fdfbf7] shadow-md max-w-md mx-auto w-full">
          <div className="flex items-center gap-3 mb-3">
            <Music size={18} />
            <p className="text-sm italic font-sans">
              Theme Song: '{songTitle}' by {artist}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-1 bg-white/20 rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-1/3 bg-white rounded-full" />
              <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
            </div>
            
            {/* FUNCTIONAL PLAY BUTTON */}
            <button 
              onClick={handlePlay}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-1 rounded-full text-xs uppercase font-bold transition active:scale-95"
            >
              <Play size={12} fill="currentColor" /> Play
            </button>
          </div>
        </section>

        {/* DAILY SNAPS CLUSTER (The Pinterest Style) */}
        <section className="relative h-[1200px] md:h-[1000px] mt-10">
          <p className="text-sm uppercase tracking-widest text-center opacity-70 mb-12 font-sans font-bold">
            Daily snaps, stylized
          </p>
          
          {/* Photo 1: Top Left */}
          <motion.div drag whileDrag={{ zIndex: 50 }} className="absolute w-44 p-2 bg-white shadow-xl -rotate-6 top-0 left-0 cursor-grab active:cursor-grabbing">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl drop-shadow-sm select-none">📎</div>
            <img src={displayImages[0]} className="w-full aspect-[4/5] object-cover bg-gray-100" alt="Vibe 1" />
          </motion.div>

          {/* Photo 2: Top Right */}
          <motion.div drag whileDrag={{ zIndex: 50 }} className="absolute w-52 p-2 bg-white shadow-xl rotate-3 top-10 right-0 cursor-grab active:cursor-grabbing">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#d4a373]/20 backdrop-blur-sm border border-black/5 rotate-2" />
            <img src={displayImages[1]} className="w-full aspect-square object-cover bg-gray-100" alt="Vibe 2" />
          </motion.div>

          {/* Photo 3: Middle Left */}
          <motion.div drag whileDrag={{ zIndex: 50 }} className="absolute w-48 p-2 bg-white shadow-xl rotate-2 top-60 left-10 cursor-grab active:cursor-grabbing">
            <img src={displayImages[2]} className="w-full aspect-[3/4] object-cover bg-gray-100" alt="Vibe 3" />
          </motion.div>

          {/* Photos 4 & 5: THE HEART LOCKET CLUSTER */}
          <motion.div drag whileDrag={{ zIndex: 50 }} className="absolute w-36 top-[420px] left-1/4 -translate-x-1/2 z-20 cursor-grab active:cursor-grabbing">
             <img src={displayImages[3]} className="w-full aspect-square object-cover rounded-full border-[10px] border-[#d4a373] shadow-lg bg-gray-100" alt="Vibe 4" />
          </motion.div>
          <motion.div drag whileDrag={{ zIndex: 50 }} className="absolute w-36 top-[440px] left-[45%] -translate-x-1/2 z-20 cursor-grab active:cursor-grabbing">
             <img src={displayImages[4]} className="w-full aspect-square object-cover rounded-full border-[10px] border-[#d4a373] shadow-lg bg-gray-100" alt="Vibe 5" />
          </motion.div>

          {/* Photo 6: Middle Right */}
          <motion.div drag whileDrag={{ zIndex: 50 }} className="absolute w-44 p-2 bg-white shadow-xl -rotate-3 top-80 right-10 cursor-grab active:cursor-grabbing">
            <div className="absolute -top-2 -right-2 text-2xl select-none">⭐</div>
            <img src={displayImages[5]} className="w-full aspect-[4/5] object-cover bg-gray-100" alt="Vibe 6" />
          </motion.div>

          {/* Photo 7: Lower Left */}
          <motion.div drag whileDrag={{ zIndex: 50 }} className="absolute w-48 p-2 bg-white shadow-xl rotate-6 top-[700px] left-4 cursor-grab active:cursor-grabbing">
            <img src={displayImages[6]} className="w-full h-40 object-cover bg-gray-100" alt="Vibe 7" />
          </motion.div>

          {/* Photo 8, 9, 10: BOTTOM STACK */}
          <motion.div drag whileDrag={{ zIndex: 50 }} className="absolute w-40 p-2 bg-white shadow-2xl -rotate-12 bottom-20 right-32 z-10 cursor-grab active:cursor-grabbing">
            <img src={displayImages[7]} className="w-full aspect-square object-cover bg-gray-100" alt="Vibe 8" />
          </motion.div>
          <motion.div drag whileDrag={{ zIndex: 50 }} className="absolute w-40 p-2 bg-white shadow-2xl rotate-6 bottom-10 right-16 z-11 cursor-grab active:cursor-grabbing">
            <img src={displayImages[8]} className="w-full aspect-square object-cover bg-gray-100" alt="Vibe 9" />
          </motion.div>
          <motion.div drag whileDrag={{ zIndex: 50 }} className="absolute w-40 p-2 bg-white shadow-2xl -rotate-2 bottom-0 right-0 z-12 cursor-grab active:cursor-grabbing">
            <img src={displayImages[9]} className="w-full aspect-square object-cover bg-gray-100" alt="Vibe 10" />
          </motion.div>
        </section>

        {/* MISSION TAG */}
        <section className="mt-20 mb-20 relative max-w-sm mx-auto w-full">
          <div className="bg-white p-8 shadow-2xl border border-gray-100 relative rotate-[-2deg]">
             <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 2.5rem', marginTop: '3.5rem' }} 
             />
             <h3 className="text-3xl font-serif italic text-[#d4a373] mb-6">Future Mission:</h3>
             <ul className="space-y-4 font-serif text-sm relative z-10 list-none">
                {suggestions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#d4a373] font-bold text-lg leading-none">•</span>
                    <span className="italic text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
             </ul>
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-[#d4a373]/20 backdrop-blur-sm border border-[#d4a373]/10 rotate-1" />
          </div>
          
          <div className="flex justify-center mt-12">
            <button className="flex items-center gap-2 text-xs uppercase font-bold opacity-50 hover:opacity-100 transition">
              <Share2 size={16} /> Share with friends
            </button>
          </div>
        </section>

      </div>
    </main>
  )
}