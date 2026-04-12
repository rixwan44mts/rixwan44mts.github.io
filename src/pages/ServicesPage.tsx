function ServicesPage() {
  return (
    <section className="content-page">
      <h1>Services</h1>
      <p className="page-intro">
        I build automation systems that combine GoHighLevel architecture, CRM pipeline clarity, and
        dependable follow-up execution.
      </p>

      <div className="content-grid">
        <article className="info-card">
          <h2>GoHighLevel Mastery</h2>
          <p>
            Production-ready account structures, reusable snapshots, and conversion-focused customer journeys
            that scale across teams.
          </p>
        </article>

        <article className="info-card">
          <h2>Business Automation</h2>
          <p>
            End-to-end workflow automations that reduce lead leakage, speed up response times, and eliminate
            repetitive manual work.
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
            <p>White-label setup with packaging, billing logic, and onboarding workflows.</p>
          </article>
          <article className="skill-card">
            <h3>Advanced Workflows</h3>
            <p>Multi-step nurtures, reminders, reactivation, and follow-up systems.</p>
          </article>
          <article className="skill-card">
            <h3>CRM Pipeline Systems</h3>
            <p>Structured stages, reporting dashboards, and predictable sales management.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ServicesPage
