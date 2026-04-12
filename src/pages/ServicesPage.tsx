import type { MouseEvent } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { Bot, Database, Layers, Mail, TrendingUp, Zap, type LucideIcon } from 'lucide-react'

type Service = {
  title: string
  tagline: string
  icon: LucideIcon
}

const services: Service[] = [
  {
    title: 'GHL CRM Build',
    tagline: 'Launch a clean CRM structure that keeps your pipeline visible and your team aligned.',
    icon: Database,
  },
  {
    title: 'SaaS Mode & White Label',
    tagline: 'Package your offer into a branded SaaS experience clients can buy and adopt quickly.',
    icon: Layers,
  },
  {
    title: 'AI Voice & Chat Agents',
    tagline: 'Deploy AI agents that respond instantly, qualify leads, and book qualified calls 24/7.',
    icon: Bot,
  },
  {
    title: 'Lead Gen Funnels',
    tagline: 'Build conversion-first funnels that turn cold traffic into scheduled conversations.',
    icon: TrendingUp,
  },
  {
    title: 'Email & SMS Automation',
    tagline: 'Automate follow-up sequences so prospects stay warm and no opportunity slips.',
    icon: Mail,
  },
  {
    title: 'Webhook & API Systems',
    tagline: 'Connect your tools into one reliable workflow that updates data in real time.',
    icon: Zap,
  },
]

function ServiceCard({ service }: { service: Service }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    const tiltLimit = 6

    rotateX.set(-y * tiltLimit)
    rotateY.set(x * tiltLimit)
  }

  const onMouseLeave = () => {
    animate(rotateX, 0, { duration: 0.4, ease: 'easeOut' })
    animate(rotateY, 0, { duration: 0.4, ease: 'easeOut' })
  }

  const Icon = service.icon

  return (
    <motion.article
      className="service-card"
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="service-card-head">
        <div className="service-icon-shell">
          <Icon className="service-icon" size={48} strokeWidth={1.8} />
        </div>
        <span className="service-arrow" aria-hidden="true">
          →
        </span>
      </div>
      <h3>{service.title}</h3>
      <p className="service-tagline">{service.tagline}</p>
      <a href="#contact" className="service-learn-more">
        Learn more
      </a>
    </motion.article>
  )
}

export default function ServicesPage() {
  return (
    <section id="services" className="services-section" aria-labelledby="services-heading">
      <h2 id="services-heading">Services</h2>
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  )
}
