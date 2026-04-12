import { useEffect, useRef } from 'react'
import brandLogo from '../assets/brand-logo.webp'
import heroPhoto from '../assets/hero-photo.webp'
import portraitPhoto from '../assets/portrait.webp'

type BlobConfig = {
  radius: number
  alpha: number
  hue: number
  speedX: number
  speedY: number
  offsetX: number
  offsetY: number
}

function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) {
      return
    }

    let frameId = 0
    let width = window.innerWidth
    let height = window.innerHeight

    const pointer = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      energy: 0,
    }

    const blobs: BlobConfig[] = Array.from({ length: 6 }, (_, index) => ({
      radius: 130 + index * 26,
      alpha: 0.16 - index * 0.016,
      hue: 190 + index * 6,
      speedX: 0.00035 + index * 0.00005,
      speedY: 0.00025 + index * 0.00004,
      offsetX: Math.random() * Math.PI * 2,
      offsetY: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const onPointerMove = (event: PointerEvent) => {
      const dx = event.clientX - pointer.targetX
      const dy = event.clientY - pointer.targetY
      pointer.energy = Math.min(80, Math.hypot(dx, dy))
      pointer.targetX = event.clientX
      pointer.targetY = event.clientY
    }

    const draw = (time: number) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.1
      pointer.y += (pointer.targetY - pointer.y) * 0.1
      pointer.energy *= 0.92

      const baseGradient = ctx.createLinearGradient(0, 0, width, height)
      baseGradient.addColorStop(0, '#060912')
      baseGradient.addColorStop(0.5, '#0b1730')
      baseGradient.addColorStop(1, '#09101f')
      ctx.fillStyle = baseGradient
      ctx.fillRect(0, 0, width, height)

      for (const blob of blobs) {
        const x =
          width * 0.5 +
          Math.sin(time * blob.speedX + blob.offsetX) * width * 0.35 +
          (pointer.x - width / 2) * 0.07
        const y =
          height * 0.5 +
          Math.cos(time * blob.speedY + blob.offsetY) * height * 0.35 +
          (pointer.y - height / 2) * 0.07
        const radius = blob.radius + pointer.energy * 0.35

        const gradient = ctx.createRadialGradient(x, y, 12, x, y, radius)
        gradient.addColorStop(0, `hsla(${blob.hue}, 94%, 72%, ${blob.alpha})`)
        gradient.addColorStop(1, `hsla(${blob.hue}, 94%, 72%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      frameId = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    frameId = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return <canvas className="liquid-background" ref={canvasRef} aria-hidden="true" />
}

function HeroPage() {
  const socialLinks = {
    whatsapp: 'https://wa.me/923285093973?text=Hi%20Rixwan%2C%20I%20want%20an%20automation%20audit.',
    linkedin: 'https://www.linkedin.com/in/muhammad-rizwan-aslam-43a2b5259',
    fiverr: 'https://www.fiverr.com/s/38rlVkV',
  }

  return (
    <>
      <LiquidBackground />
      <main className="page-shell">
        <header className="hero-section">
          <div className="hero-copy">
            <div className="brand-mark">
              <img
                className="brand-logo"
                src={brandLogo}
                alt="RW brand logo"
                width={150}
                height={150}
                loading="lazy"
              />
            </div>
            <p className="kicker">Automation Studio for Growth-Focused Operators</p>
            <h1>Your Business Should Run Without You In It.</h1>
            <p className="hero-lead">
              I design lean systems that close leads, automate follow-up, and keep your pipeline clean, so you
              can lead strategically instead of firefighting operations every day.
            </p>
            <div className="cta-row">
              <a href="#contact" className="cta-primary">
                Book Automation Audit
              </a>
              <a href="#expertise" className="cta-secondary">
                View Expertise
              </a>
            </div>
            <div className="social-row" role="group" aria-label="Social links">
              <a href={socialLinks.whatsapp} className="social-link" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a
                href={socialLinks.linkedin}
                className="social-link social-link-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn profile in a new tab"
                title="LinkedIn"
              >
                <span className="social-icon social-icon-linkedin" aria-hidden="true">
                  in
                </span>
              </a>
              <a
                href={socialLinks.fiverr}
                className="social-link social-link-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Fiverr profile in a new tab"
                title="Fiverr"
              >
                <span className="social-icon social-icon-fiverr" aria-hidden="true">
                  fi
                </span>
              </a>
            </div>
          </div>

          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src={heroPhoto}
              alt="Smiling professional portrait of Rixwan"
              width={343}
              height={361}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </header>

        <section id="expertise" className="expertise-section">
          <div className="content-grid">
            <article className="info-card">
              <h2>GoHighLevel Mastery</h2>
              <p>
                I build production-grade GoHighLevel ecosystems that align funnel design, CRM architecture, and
                sales execution so teams can scale with speed and consistency.
              </p>
            </article>

            <article className="info-card">
              <h2>Business Automation</h2>
              <p>
                From lead capture to closeout, I engineer workflows that reduce leakage, shorten response time,
                and provide clean visibility across pipeline operations.
              </p>
            </article>
          </div>

          <div className="skills-section" role="region" aria-labelledby="gohighlevel-capabilities-heading">
            <h2 id="gohighlevel-capabilities-heading" className="skills-heading">
              GoHighLevel Capabilities
            </h2>
            <div className="skills-grid">
              <article className="skill-card">
                <h3>Snapshots</h3>
                <p>Conversion-ready templates for fast deployment across client accounts.</p>
              </article>
              <article className="skill-card">
                <h3>SaaS Mode</h3>
                <p>Monetizable white-label setup with packaging, billing logic, and onboarding flow.</p>
              </article>
              <article className="skill-card">
                <h3>Advanced Workflows</h3>
                <p>Multi-step automations for nurturing, reminders, reactivation, and follow-up.</p>
              </article>
              <article className="skill-card">
                <h3>CRM Pipeline Systems</h3>
                <p>Structured stages, triggers, and reporting for predictable sales management.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="about-card">
          <h2>About Me</h2>
          <p className="about-copy">
            I’m Rixwan, a <strong>NUST Mechatronics Engineering</strong> graduate with a management-first mindset
            and practical execution style.
          </p>
          <p className="about-copy">
            I design systems that reduce owner dependency, improve team accountability, and turn operations into
            predictable outcomes.
          </p>
          <p className="about-copy">
            My long-term goal is to build a technical school for needy children in my village so practical skills
            can create real economic freedom.
          </p>
        </section>

        <section className="portrait-section" aria-label="Thinking portrait">
          <img
            className="portrait-image"
            src={portraitPhoto}
            alt="Thinking portrait of Rixwan"
            width={460}
            height={484}
            loading="lazy"
          />
        </section>

        <section id="contact" className="final-cta">
          <h2>Ready to Stop Being the Bottleneck?</h2>
          <p>
            Let’s map your current process, eliminate friction, and install a system that scales without adding
            chaos.
          </p>
          <a href="mailto:rixwan44mts@gmail.com" className="cta-primary">
            Start the Conversation
          </a>
        </section>
      </main>
    </>
  )
}

export default HeroPage
