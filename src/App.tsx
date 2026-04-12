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
  gradient.addColorStop(0, '#080808')
  gradient.addColorStop(0.45, '#0d0d0d')
  gradient.addColorStop(1, '#111111')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < 24; i += 1) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = 80 + Math.random() * 240
    const orb = ctx.createRadialGradient(x, y, 0, x, y, radius)
    orb.addColorStop(0, 'rgba(212, 255, 107, 0.1)')
    orb.addColorStop(1, 'rgba(212, 255, 107, 0)')
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
  gradient.addColorStop(0, 'rgba(212, 255, 107, 0.9)')
  gradient.addColorStop(0.28, 'rgba(107, 255, 212, 0.55)')
  gradient.addColorStop(0.65, 'rgba(167, 139, 250, 0.2)')
  gradient.addColorStop(1, 'rgba(212, 255, 107, 0)')

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
        backgroundColor: 0x080808,
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
  const brandLogoUrl = '/favicon.png'
  const topProfileImageUrl = 'https://github.com/user-attachments/assets/c97b9d2f-2567-44a3-a07a-5094a3ea6eaf'
  const bottomProfileImageUrl = 'https://github.com/user-attachments/assets/87fcaced-f262-402f-acf5-6c51c339caac'
  const socialLinks = {
    whatsapp: 'https://wa.me/923285093973?text=Hi%20Rizwan%2C%20I%20want%20to%20build%20Precision%20Flow%20automation.',
    linkedin: 'https://www.linkedin.com/in/rizwan-aslam',
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
                src={brandLogoUrl}
                alt="Precision Flow monogram logo"
                onError={(event) => {
                  event.currentTarget.src = '/favicon.svg'
                }}
              />
              </div>
            <p className="kicker">Precision Flow</p>
            <h1>Your Business Should Run Without You In It.</h1>
            <p className="hero-lead">
              Dark, premium automation systems engineered for operators who want execution without chaos.
            </p>
            <div className="brand-meta" aria-label="Brand information">
              <p>
                Owner <strong>Rizwan Aslam</strong> — Automation Architect &amp; GoHighLevel Specialist
              </p>
              <p>
                Domain <code>precisionflow.me</code>
              </p>
              <p>
                Email <a href="mailto:rizwan@precisionflow.me">rizwan@precisionflow.me</a>
              </p>
            </div>
            <div className="cta-row">
              <a href="#contact" className="cta-primary">
                Start Precision Flow
              </a>
              <a href="#expertise" className="cta-secondary">
                Explore Systems
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
              src={topProfileImageUrl}
              alt="Smiling professional portrait of Rixwan"
              width={350}
              height={250}
              onError={(event) => {
                event.currentTarget.src = '/profile-portrait.svg'
              }}
            />
          </div>
        </header>

        <section id="expertise" className="expertise-section">
          <div className="content-grid">
            <article className="info-card">
              <h2>Automation Architecture</h2>
              <p>
                Full operating systems for lead capture, qualification, follow-up, and owner-level visibility.
              </p>
            </article>

            <article className="info-card">
              <h2>GoHighLevel Specialization</h2>
              <p>
                Pipeline logic, workflows, snapshots, and SaaS mode configured for control and compounding scale.
              </p>
            </article>
          </div>

          <div className="skills-section" role="region" aria-labelledby="gohighlevel-capabilities-heading">
            <h2 id="gohighlevel-capabilities-heading" className="skills-heading">
              GoHighLevel Capabilities
            </h2>
            <div className="skills-grid">
              <article className="skill-card">
                <h3>Sales Pipeline Logic</h3>
                <p>Stage gates, assignment rules, and trigger discipline across the full journey.</p>
              </article>
              <article className="skill-card">
                <h3>Follow-Up Automation</h3>
                <p>Response windows, retries, and no-lead-left-behind execution systems.</p>
              </article>
              <article className="skill-card">
                <h3>Team Accountability</h3>
                <p>Clear ownership, clean statuses, and real-time operational feedback loops.</p>
              </article>
              <article className="skill-card">
                <h3>Performance Visibility</h3>
                <p>Operator-ready dashboards focused on decisions, not vanity reporting.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="about-card">
          <h2>Operator Profile</h2>
          <p className="about-copy">
            Rizwan Aslam builds backend business systems with a technical-first approach and execution discipline.
          </p>
          <p className="about-copy">
            The objective is simple: remove owner bottlenecks, standardize response quality, and let the business
            run on process.
          </p>
          <p className="about-copy">
            Every workflow is designed to lower operational drag and increase decision speed.
          </p>
        </section>

        <section className="portrait-section" aria-label="Thinking portrait">
          <img
            className="portrait-image"
            src={bottomProfileImageUrl}
            alt="Thinking portrait of Rixwan"
            onError={(event) => {
              event.currentTarget.src = '/profile-portrait.svg'
            }}
          />
        </section>

        <section id="contact" className="final-cta">
          <h2>Ready to Build Precision Flow?</h2>
          <p>
            If you want infrastructure that runs even when you step away, start here.
          </p>
          <a href="mailto:rizwan@precisionflow.me" className="cta-primary">
            Start the Conversation
          </a>
        </section>
      </main>
    </>
  )
}

export default App
