const services = [
  {
    title: 'Lead Capture Systems',
    description: 'Website + form + CRM flows that capture and qualify leads with zero manual handoff.',
  },
  {
    title: 'Pipeline Automation',
    description: 'Stage-based workflows that trigger tasks, reminders, and status updates automatically.',
  },
  {
    title: 'Follow-up Sequences',
    description: 'Email/SMS nurture tracks that keep prospects warm and reduce deal leakage.',
  },
  {
    title: 'Client Onboarding',
    description: 'Structured onboarding journeys with documents, checklists, and milestone tracking.',
  },
  {
    title: 'Reporting Dashboards',
    description: 'Executive dashboards for lead sources, response time, conversion, and team performance.',
  },
  {
    title: 'GoHighLevel Snapshots',
    description: 'Reusable account blueprints for fast, repeatable deployments across client projects.',
  },
]

export function ServicesPage() {
  return (
    <section className="page-panel">
      <p className="kicker">What I Build</p>
      <h1>Services</h1>
      <p className="hero-lead">Practical, implementation-ready systems built to reduce owner dependency.</p>
      <div className="services-grid">
        {services.map((service) => (
          <article className="skill-card" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
