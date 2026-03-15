'use client'
import { useState, useRef } from 'react' // 1. Added useRef here
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react' 
import UploadButton from './UploadButton'
import { useRouter } from 'next/navigation'
import './styles.css'
interface PinnedFragment {
  id: number
  url: string
  top: number
  left: number
  rotate: number
}

export default function InputUploadPage() {
  // Inside your first page component
  const [images, setImages] = useState<string[]>(Array(10).fill(""))

  const handleUpload = (url: string, index: number) => {
    setImages((prevImages) => {
      // 1. Create the new array based on the previous state
      const updated = [...prevImages];
      updated[index] = url;
      
      // 2. Save THIS specific updated array to LocalStorage
      localStorage.setItem('vibe_images', JSON.stringify(updated));
      
      return updated;
    });
  };
  const router = useRouter()
  const [fragments, setFragments] = useState<PinnedFragment[]>([])
  const GOAL = 10
  
  // 2. This is the missing "Ref" variable
  const bulletinBoardRef = useRef(null)

  const addFragment = (url: string) => {
    const count = fragments.length;
    const row = Math.floor(count / 5) % 4; 
    const col = count % 5;

    const newFragment: PinnedFragment = {
      id: Date.now(),
      url,
      top: (row * 20) + 10 + (Math.random() * 10),
      left: (col * 15) + 10 + (Math.random() * 10),
      rotate: Math.floor(Math.random() * 20) - 10 
    }
    setFragments((prev) => [...prev, newFragment])
  }

  const removeFragment = (id: number) => {
    setFragments((prev) => prev.filter(f => f.id !== id))
  }

  return (
    <main className="min-h-screen bg-[#ede9e0] flex items-center justify-center p-0 md:p-8">
      <div className="w-full h-screen md:h-auto md:max-w-6xl md:min-h-[85vh] bg-[#fdfbf7] paper-texture md:rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-black/5">
        
        {/* LEFT SIDE: Sidebar */}
        <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/5">
          <header>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-orange-300 shadow-inner mb-8" />
            <h1 className="text-4xl md:text-6xl font-serif text-[#8c6d4f] leading-tight">
              Today's <br className="hidden md:block" /> Field <br></br>Notes.
            </h1>
          </header>

          <div className="flex-1 flex items-center">
            <button 
                className="mood-standard-btn"
                onClick={() => {
                  // This sends the user to the output page
                  router.push('/output_generation')
                }}
                // The button stays disabled until your goal of 10 is reached
                disabled={fragments.length < GOAL}
            >
                Generate Mood
            </button>
            </div>
          <footer>
            <div className="w-full h-3 bg-black/5 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-[#d4a373]" 
                animate={{ width: `${(fragments.length / GOAL) * 100}%` }}
              />
            </div>
            <p className="text-xs font-serif text-gray-500 italic">{fragments.length} images uploaded</p>
          </footer>
        </div>

        {/* RIGHT SIDE: The Bulletin Board */}
        <div 
          ref={bulletinBoardRef} // 3. Attached the ref here to define the "Wall"
          className="flex-1 bg-[#e9e4d9] m-4 md:m-8 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden shadow-inner border border-black/[0.02]"
        >
          
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="pointer-events-auto">
              <UploadButton onUpload={addFragment} />
            </div>
          </div>

          <AnimatePresence>
            {fragments.map((fragment) => (
              <motion.div
                key={fragment.id}
                drag
                // 4. Added these two lines to stop images at the border
                dragConstraints={bulletinBoardRef} 
                dragElastic={0}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileDrag={{ zIndex: 100, scale: 1.05 }}
                className="absolute p-2 bg-white shadow-xl border-b-[20px] md:border-b-[30px] border-white w-32 md:w-44 cursor-grab active:cursor-grabbing group"
                style={{ 
                  top: `${fragment.top}%`, 
                  left: `${fragment.left}%`,
                  rotate: `${fragment.rotate}deg`
                }}
              >
                <button 
                  onClick={() => removeFragment(fragment.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 z-50 border border-black/5"
                >
                  <X size={14} />
                </button>

                <img 
                  src={fragment.url} 
                  className="w-full h-24 md:h-36 object-cover rounded-sm pointer-events-none" 
                  alt="pinned item" 
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="absolute bottom-10 w-full text-center pointer-events-none opacity-30">
            <h2 className="text-xl font-serif text-gray-800 italic">Vibe Vault</h2>
          </div>
        </div>

      </div>
    </main>
  )
}