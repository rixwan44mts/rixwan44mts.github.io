import heroImage from '../assets/hero.png'
import { Link } from 'react-router-dom'

const socialLinks = {
  whatsapp: 'https://wa.me/923285093973?text=Hi%20Rixwan%2C%20I%20want%20an%20automation%20audit.',
  linkedin: 'https://www.linkedin.com/in/muhammad-rizwan-aslam-43a2b5259',
  fiverr: 'https://www.fiverr.com/s/38rlVkV',
}

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
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
            View Expertise
          </Link>
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
          src={heroImage}
          alt="Professional portrait of Rixwan"
          width={350}
          height={250}
        />
      </div>
    </section>
  )
}

export default HeroSection
