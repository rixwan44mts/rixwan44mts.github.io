const bottomProfileImageUrl =
  'https://github.com/user-attachments/assets/87fcaced-f262-402f-acf5-6c51c339caac'

export function AboutPage() {
  return (
    <section className="page-panel section-stack">
      <p className="kicker">Rixwan's Story</p>
      <h1>About</h1>

      <article className="about-card">
        <h2>Story</h2>
        <p className="about-copy">
          I’m Rixwan, a NUST Mechatronics Engineering graduate focused on building practical systems that help
          operators scale without burnout.
        </p>
      </article>

      <div className="content-grid">
        <article className="info-card">
          <h2>Stack</h2>
          <p>GoHighLevel, CRM pipeline architecture, workflow automation, dashboarding, and process design.</p>
        </article>
        <article className="info-card">
          <h2>Certs</h2>
          <p>Hands-on delivery portfolio across automation builds, client operations systems, and SaaS setups.</p>
        </article>
      </div>

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
    </section>
  )
}
