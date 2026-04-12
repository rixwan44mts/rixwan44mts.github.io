import heroImage from '../assets/hero.png'
import { useLiquidCursor } from '../hooks/useLiquidCursor'
import './HeroPage.css'

const tickerItems = [
  'Lead Capture Systems',
  'CRM Pipeline Architecture',
  'Follow-up Automation',
  'Sales Ops Visibility',
  'GoHighLevel Implementation',
]

function HeroPage() {
  const canvasRef = useLiquidCursor(7)

  return (
    <div style={{ minHeight: '100vh', background: '#03060d', color: '#edf5ff' }}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
      />

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          background: 'rgba(3, 8, 18, 0.72)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(132, 188, 250, 0.22)',
        }}
      >
        <nav
          style={{
            maxWidth: '1120px',
            margin: '0 auto',
            padding: '0.9rem 1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <strong style={{ letterSpacing: '0.08em', fontSize: '0.85rem' }}>RIXWAN // SYSTEMS</strong>
          <div style={{ display: 'flex', gap: '1.2rem', fontSize: '0.9rem' }}>
            <a href="#work" style={{ color: '#d8ebff' }}>
              Work
            </a>
            <a href="#about" style={{ color: '#d8ebff' }}>
              About
            </a>
            <a href="#contact" style={{ color: '#d8ebff' }}>
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '7rem 1.1rem 0',
        }}
      >
        <section
          id="work"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 250px',
            gap: '2.4rem',
            alignItems: 'center',
            minHeight: 'calc(100vh - 9.5rem)',
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#88c8ff',
                fontWeight: 700,
                fontSize: '0.8rem',
              }}
            >
              Automation Studio
            </p>
            <h1
              style={{
                margin: '0.85rem 0 0',
                lineHeight: 1.1,
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                maxWidth: '13ch',
                textWrap: 'balance',
              }}
            >
              Your Business Should Run Without You In It.
            </h1>
            <p style={{ marginTop: '1.05rem', maxWidth: '58ch', color: '#c2d7ef' }}>
              I build high-leverage systems that clean your pipeline, automate follow-up, and stop lead
              leakage, so you can focus on strategy instead of daily firefighting.
            </p>
          </div>

          <div
            style={{
              width: 250,
              height: 350,
              borderRadius: 24,
              border: '1px solid rgba(170, 219, 255, 0.42)',
              background: 'rgba(10, 22, 40, 0.74)',
              boxShadow: '0 22px 56px rgba(2, 10, 23, 0.72)',
              overflow: 'hidden',
              justifySelf: 'end',
            }}
          >
            <img
              src={heroImage}
              alt="Portrait of Rixwan"
              width={250}
              height={350}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </section>
      </main>

      <section
        aria-label="Capabilities ticker"
        style={{
          position: 'relative',
          zIndex: 2,
          borderTop: '1px solid rgba(145, 201, 255, 0.25)',
          borderBottom: '1px solid rgba(145, 201, 255, 0.25)',
          background: 'rgba(4, 10, 22, 0.72)',
          overflow: 'hidden',
          padding: '0.95rem 0',
        }}
      >
        <div className="hero-ticker-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              style={{ fontSize: '0.88rem', letterSpacing: '0.06em', color: '#cfe8ff', textTransform: 'uppercase' }}
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HeroPage
