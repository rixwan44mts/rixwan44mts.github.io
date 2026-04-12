import { useState } from 'react'
import HeroSection from '../components/HeroSection'
import useLiquidCursor from '../hooks/useLiquidCursor'

function HeroPage() {
  const [liquidContainer, setLiquidContainer] = useState<HTMLDivElement | null>(null)

  useLiquidCursor(liquidContainer)

  return (
    <>
      <div className="liquid-background" ref={setLiquidContainer} aria-hidden="true" />
      <HeroSection />
    </>
  )
}

export default HeroPage
