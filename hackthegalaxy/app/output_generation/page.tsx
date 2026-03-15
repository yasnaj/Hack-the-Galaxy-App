'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Share2, Music, Image as ImageIcon } from 'lucide-react'
import './styles.css'

export default function OutputPage() {
  const [displayImages, setDisplayImages] = useState<string[]>(Array(10).fill(""))
  const [isReady, setIsReady] = useState(false)

  const vibeTitle = "Celestial Market Wanders"
  const artist = "Lofi Girl"
  const songTitle = "Soft Currents"
  const suggestions = [
    "Sun in Gemini: Community & New Crafts.",
    "Try a local pottery workshop this weekend.",
    "Visit the market for fresh mint inspiration."
  ]

  useEffect(() => {
    // Open Version 2 to match Input Page
    const request = indexedDB.open("VibeVaultDB", 2);

    request.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images");
      }
    };

    request.onsuccess = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("images")) {
        setIsReady(true);
        return;
      }
      const tx = db.transaction("images", "readonly");
      const store = tx.objectStore("images");
      const getReq = store.get("current_vibe");

      getReq.onsuccess = () => {
        if (getReq.result) setDisplayImages(getReq.result);
        setIsReady(true);
      };
    };
    request.onerror = () => setIsReady(true);
  }, [])

  const handlePlay = () => {
    const query = encodeURIComponent(`${songTitle} ${artist}`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  }

  if (!isReady) return <div className="min-h-screen bg-[#f8f5f0]" />;

  return (
    <main className="min-h-screen bg-[#f8f5f0] p-4 md:p-8 font-serif text-[#4a3f35] overflow-x-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        <header className="text-center mt-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#8c6d4f]">Today's vibe</h1>
        </header>

        <section className="relative aspect-square md:aspect-video w-full rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-[#d4c1ec] via-[#f2d5cf] to-[#e9c46a] p-8 flex flex-col justify-center">
          <div className="absolute inset-0 opacity-20 paper-texture pointer-events-none" />
          <p className="text-xs uppercase tracking-widest font-sans font-bold opacity-60 mb-2 text-[#4a3f35]">Curated Vibe Synopsis</p>
          <h2 className="text-5xl md:text-6xl font-handwriting leading-tight text-[#4a3f35]">{vibeTitle}</h2>
        </section>

        <section className="bg-[#8c6d4f] rounded-2xl p-4 text-[#fdfbf7] shadow-md max-w-md mx-auto w-full">
          <div className="flex items-center gap-3 mb-3">
            <Music size={18} />
            <p className="text-sm italic font-sans">Theme Song: '{songTitle}' by {artist}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-1 bg-white/20 rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-1/3 bg-white rounded-full" />
            </div>
            <button onClick={handlePlay} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-1 rounded-full text-xs uppercase font-bold transition">
              <Play size={12} fill="currentColor" /> Play
            </button>
          </div>
        </section>

        <section className="relative h-[1200px] md:h-[1000px] mt-10">
          {[
            { s: "w-44 p-2 bg-white shadow-xl -rotate-6 top-0 left-0", icon: "📎" },
            { s: "w-52 p-2 bg-white shadow-xl rotate-3 top-10 right-0", tape: true },
            { s: "w-48 p-2 bg-white shadow-xl rotate-2 top-60 left-10" },
            { s: "w-36 top-[420px] left-1/4 -translate-x-1/2 z-20", heart: true },
            { s: "w-36 top-[440px] left-[45%] -translate-x-1/2 z-20", heart: true },
            { s: "w-44 p-2 bg-white shadow-xl -rotate-3 top-80 right-10", icon: "⭐" },
            { s: "w-48 p-2 bg-white shadow-xl rotate-6 top-[700px] left-4" },
            { s: "w-40 p-2 bg-white shadow-2xl -rotate-12 bottom-20 right-32 z-10" },
            { s: "w-40 p-2 bg-white shadow-2xl rotate-6 bottom-10 right-16 z-11" },
            { s: "w-40 p-2 bg-white shadow-2xl -rotate-2 bottom-0 right-0 z-12" }
          ].map((item, i) => (
            <motion.div key={i} drag className={`absolute cursor-grab active:cursor-grabbing ${item.s}`}>
              {item.icon && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl select-none">{item.icon}</div>}
              {item.tape && <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#d4a373]/20 backdrop-blur-sm border border-black/5 rotate-2" />}
              <div className={`w-full h-full overflow-hidden bg-gray-200 ${item.heart ? 'rounded-full border-[10px] border-[#d4a373] shadow-lg aspect-square' : 'aspect-square'}`}>
                {displayImages[i] ? (
                  <img src={displayImages[i]} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={16}/></div>
                )}
              </div>
            </motion.div>
          ))}
        </section>

        <section className="mt-20 mb-20 relative max-w-sm mx-auto w-full">
          <div className="bg-white p-8 shadow-2xl border border-gray-100 relative rotate-[-2deg]">
             <h3 className="text-3xl font-serif italic text-[#d4a373] mb-6">Future Mission:</h3>
             <ul className="space-y-4 font-serif text-sm relative z-10 list-none">
                {suggestions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#d4a373] font-bold text-lg leading-none">•</span>
                    <span className="italic text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
             </ul>
          </div>
        </section>
      </div>
    </main>
  )
}