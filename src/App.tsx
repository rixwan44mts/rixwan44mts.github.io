import { useEffect, useRef } from 'react'
import { Application, DisplacementFilter, Sprite, Texture } from 'pixi.js'
import './index.css'

function createGradientTexture(): Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 1200
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return Texture.WHITE
  }

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, '#060912')
  gradient.addColorStop(0.45, '#0b1730')
  gradient.addColorStop(1, '#09101f')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < 24; i += 1) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = 80 + Math.random() * 240
    const orb = ctx.createRadialGradient(x, y, 0, x, y, radius)
    orb.addColorStop(0, 'rgba(56, 189, 248, 0.14)')
    orb.addColorStop(1, 'rgba(56, 189, 248, 0)')
    ctx.fillStyle = orb
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  return Texture.from(canvas)
}

function createRippleTexture(): Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return Texture.WHITE
  }

  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 128)
  gradient.addColorStop(0, 'rgba(255,255,255,0.95)')
  gradient.addColorStop(0.28, 'rgba(130,198,255,0.7)')
  gradient.addColorStop(0.65, 'rgba(130,198,255,0.2)')
  gradient.addColorStop(1, 'rgba(130,198,255,0)')

  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(128, 128, 128, 0, Math.PI * 2)
  ctx.fill()

  return Texture.from(canvas)
}

function LiquidBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let isUnmounted = false
    const ripples: Sprite[] = []

    const initialize = async () => {
      if (!containerRef.current) return

      const app = new Application()
      await app.init({
        resizeTo: window,
        antialias: true,
        backgroundAlpha: 1,
        backgroundColor: 0x05080f,
      })

      if (isUnmounted || !containerRef.current) {
        app.destroy(true)
        return
      }

      containerRef.current.appendChild(app.canvas)

      const gradientTexture = createGradientTexture()
      const rippleTexture = createRippleTexture()

      const background = new Sprite(gradientTexture)
      background.width = app.screen.width
      background.height = app.screen.height

      const displacementMap = new Sprite(rippleTexture)
      displacementMap.anchor.set(0.5)
      displacementMap.alpha = 0.12
      displacementMap.x = app.screen.width / 2
      displacementMap.y = app.screen.height / 2
      displacementMap.scale.set(2.1)

      const displacementFilter = new DisplacementFilter(displacementMap)
      displacementFilter.scale.set(34, 34)
      background.filters = [displacementFilter]

      app.stage.addChild(background)
      app.stage.addChild(displacementMap)

      let targetX = app.screen.width / 2
      let targetY = app.screen.height / 2
      let currentX = targetX
      let currentY = targetY
      let pulse = 0
      let speed = 0

      const emitRipple = (x: number, y: number) => {
        const ripple = new Sprite(rippleTexture)
        ripple.anchor.set(0.5)
        ripple.x = x
        ripple.y = y
        ripple.alpha = 0.32
        ripple.scale.set(0.18)
        app.stage.addChild(ripple)
        ripples.push(ripple)
      }

      const onPointerMove = (event: PointerEvent) => {
        const dx = event.clientX - targetX
        const dy = event.clientY - targetY
        speed = Math.min(80, Math.hypot(dx, dy))
        targetX = event.clientX
        targetY = event.clientY
        emitRipple(targetX, targetY)
      }

      const onResize = () => {
        background.width = app.screen.width
        background.height = app.screen.height
      }

      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('resize', onResize)

      app.ticker.add(() => {
        currentX += (targetX - currentX) * 0.15
        currentY += (targetY - currentY) * 0.15

        pulse += 0.06
        const pulseScale = 1.9 + Math.sin(pulse) * 0.22 + speed * 0.012

        displacementMap.x = currentX
        displacementMap.y = currentY
        displacementMap.scale.set(pulseScale)
        displacementMap.rotation += 0.005 + speed * 0.00008

        const energy = 18 + speed * 0.75
        displacementFilter.scale.set(energy, energy)

        for (let i = ripples.length - 1; i >= 0; i -= 1) {
          const ripple = ripples[i]
          ripple.scale.x += 0.02
          ripple.scale.y += 0.02
          ripple.alpha *= 0.95
          if (ripple.alpha < 0.01) {
            app.stage.removeChild(ripple)
            ripple.destroy()
            ripples.splice(i, 1)
          }
        }

        speed *= 0.9
      })

      return () => {
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('resize', onResize)
        ripples.forEach((ripple) => ripple.destroy())
        app.destroy(true)
      }
    }

    let cleanup: (() => void) | undefined

    void initialize().then((destroyer) => {
      cleanup = destroyer
    })

    return () => {
      isUnmounted = true
      cleanup?.()
    }
  }, [])

  return <div className="liquid-background" ref={containerRef} aria-hidden="true" />
}

function App() {
  const brandLogoUrl = 'https://github.com/user-attachments/assets/da229b76-a503-4e2f-b361-1cff8d7e6080'
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
              <img className="brand-logo" src={brandLogoUrl} alt="RW brand logo" />
            </div>
            <p className="kicker">Automation Studio for Growth-Focused Operators</p>
            <h1>Your Business Should Run Without You In It.</h1>
            <p className="hero-lead">
              I design lean systems that close leads, automate follow-up, and keep your pipeline clean, so
              you can lead strategically instead of firefighting operations every day.
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
              <a
                href={socialLinks.whatsapp}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              src="/profile.png"
              alt="Smiling professional portrait of Rixwan"
              onError={(event) => {
                event.currentTarget.src = '/profile-portrait.svg'
              }}
            />
          </div>
        </header>

        <section id="expertise" className="expertise-section">
          <div className="content-grid">
            <article className="info-card">
              <h2>GoHighLevel Mastery</h2>
              <p>
                I build production-grade GoHighLevel ecosystems that align funnel design, CRM architecture,
                and sales execution so teams can scale with speed and consistency.
              </p>
            </article>

            <article className="info-card">
              <h2>Business Automation</h2>
              <p>
                From lead capture to closeout, I engineer workflows that reduce leakage, shorten response
                time, and provide clean visibility across pipeline operations.
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
            I’m Rixwan, a <strong>NUST Mechatronics Engineering</strong> graduate with a management-first
            mindset and practical execution style.
          </p>
          <p className="about-copy">
            I design systems that reduce owner dependency, improve team accountability, and turn operations
            into predictable outcomes.
          </p>
          <p className="about-copy">
            My long-term goal is to build a technical school for needy children in my village so practical
            skills can create real economic freedom.
          </p>
        </section>

        <section className="portrait-section" aria-label="Thinking portrait">
          <img
            className="portrait-image"
            src="/profile-thinking.png"
            alt="Thinking portrait of Rixwan"
            onError={(event) => {
              event.currentTarget.src = '/profile-portrait.svg'
            }}
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

export default App
