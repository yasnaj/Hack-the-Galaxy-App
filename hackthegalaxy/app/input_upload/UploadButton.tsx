'use client'
import { useState, useRef } from 'react'
import { Camera, Image as ImageIcon, Video, X } from 'lucide-react'

interface UploadButtonProps { onUpload: (url: string) => void }

export default function UploadButton({ onUpload }: UploadButtonProps) {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  

  // 1. Start the Camera Stream
  const startCamera = async () => {
    setIsCameraOpen(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      })
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch (err) {
      console.error("Camera access denied", err)
      setIsCameraOpen(false)
    }
  }

  // 2. Capture the Frame (Already uses Base64)
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      canvasRef.current.width = videoRef.current.videoWidth
      canvasRef.current.height = videoRef.current.videoHeight
      context?.drawImage(videoRef.current, 0, 0)
      
      const imageData = canvasRef.current.toDataURL('image/png')
      onUpload(imageData)
      stopCamera()
    }
  }

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream
    stream?.getTracks().forEach(track => track.stop())
    setIsCameraOpen(false)
  }

  // 3. NEW: Handle File Upload with Base64 conversion
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        onUpload(base64String) // Persistent data that won't break on page navigation
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex gap-4 relative">
      {/* Choice Buttons */}
      <label className="cursor-pointer bg-white/90 p-4 rounded-full shadow-xl hover:scale-110 transition-all border border-black/5">
        <ImageIcon size={24} className="text-[#8c6d4f]" />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="hidden" 
        />
      </label>

      <button onClick={startCamera} className="bg-white/90 p-4 rounded-full shadow-xl hover:scale-110 transition-all border border-black/5">
        <Camera size={24} className="text-[#8c6d4f]" />
      </button>

      {/* Fullscreen Camera Overlay */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-lg aspect-[3/4] bg-black rounded-[2rem] overflow-hidden border-4 border-white/20">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover mirrored" />
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Capture Controls */}
            <div className="absolute bottom-8 w-full flex justify-center gap-8 items-center">
              <button onClick={stopCamera} className="p-4 bg-white/20 rounded-full text-white hover:bg-white/40"><X size={24}/></button>
              <button onClick={takePhoto} className="w-20 h-20 bg-white rounded-full border-8 border-white/30 active:scale-90 transition-transform shadow-2xl" />
              <div className="w-14" /> {/* Spacer */}
            </div>
          </div>
          <p className="mt-4 text-white/60 font-serif italic text-sm">Capture a new fragment...</p>
        </div>
      )}
    </div>
  )
}