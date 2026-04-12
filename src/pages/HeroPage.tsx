import { useRef } from 'react'
import HeroSection from '../components/HeroSection'
import useLiquidCursor from '../hooks/useLiquidCursor'

function HeroPage() {
  const liquidCanvasRef = useRef<HTMLDivElement | null>(null)
  useLiquidCursor(liquidCanvasRef)

  return (
    <section className="hero-page">
      <div className="liquid-canvas" ref={liquidCanvasRef} aria-hidden="true" />
      <div className="hero-page-content">
        <HeroSection />
      </div>
    </section>
  )
}

export default HeroPage
