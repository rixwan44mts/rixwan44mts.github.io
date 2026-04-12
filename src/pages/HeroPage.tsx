import { Link } from 'react-router-dom'
import { LiquidBackground } from '../components/LiquidBackground'

const brandLogoUrl =
  'https://github.com/user-attachments/assets/801f6f28-6426-4526-892d-08f60b3639d9'
const topProfileImageUrl =
  'https://github.com/user-attachments/assets/c97b9d2f-2567-44a3-a07a-5094a3ea6eaf'

export function HeroPage() {
  return (
    <>
      <LiquidBackground />
      <header className="hero-section">
        <div className="hero-copy">
          <div className="brand-mark">
            <img className="brand-logo" src={brandLogoUrl} alt="RW brand logo" />
          </div>
          <p className="kicker">Automation Studio for Growth-Focused Operators</p>
          <h1>Your Business Should Run Without You In It.</h1>
          <p className="hero-lead">
            I design lean systems that close leads, automate follow-up, and keep your pipeline clean, so you
            can lead strategically instead of firefighting operations every day.
          </p>
          <div className="cta-row">
            <Link to="/contact" className="cta-primary">
              Book Automation Audit
            </Link>
            <Link to="/services" className="cta-secondary">
              View Services
            </Link>
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
    </>
  )
}
