import { useEffect, useRef, useState } from 'react'
import { AlertCircle, BarChart3, Wrench } from 'lucide-react'
import { animate, motion, useInView } from 'framer-motion'

type CounterProps = {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

function Counter({ end, duration = 1.2, decimals = 0, prefix = '', suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, end, {
      duration,
      onUpdate: (latest) => setValue(latest),
    })

    return () => controls.stop()
  }, [duration, end, isInView])

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

const techStack = [
  'GoHighLevel',
  'A2P 10DLC',
  'SendBlue iMessage',
  'Google Sheets',
  'Gmail 2-Way Sync',
  'Shopify',
]

const sections = [
  {
    title: 'The Problem',
    icon: AlertCircle,
    content: [
      'No CRM in place to centralize and track incoming leads.',
      'Manual lead tracking created data gaps and delays.',
      'No reliable follow-up process, causing missed opportunities.',
    ],
  },
  {
    title: 'The Solution',
    icon: Wrench,
    content: [
      'Built dual GHL pipelines for clear sales-stage management.',
      'Added AI booking flows to speed up qualified scheduling.',
      'Configured A2P 10DLC and SendBlue iMessage channels.',
      'Connected Google Sheets reporting and Gmail 2-way sync.',
      'Embedded Shopify form capture directly into workflows.',
    ],
  },
  {
    title: 'The Impact',
    icon: BarChart3,
    content: [
      'Zero manual entry across the lead-to-booking process.',
      'Full pipeline visibility for status, ownership, and bottlenecks.',
      'Owner now manages all operations through one dashboard.',
    ],
  },
]

export function CaseStudyPage() {
  return (
    <main className="case-study-page">
      <header className="case-study-header case-study-panel">
        <p className="case-study-client-tag">Client: Logistics Insulation LLC</p>
        <div className="case-study-header-top">
          <h1>Construction Automation Case Study</h1>
          <span className="case-study-industry-badge">Industry: Construction</span>
        </div>
        <p className="case-study-stars">
          <Counter end={4.7} decimals={1} suffix="★" /> <span aria-hidden="true">·</span> Georgia, USA
        </p>
      </header>

      <section className="case-study-columns" aria-label="Case study details">
        {sections.map(({ title, icon: Icon, content }) => (
          <article key={title} className="case-study-panel case-study-column">
            <div className="case-study-column-header">
              <motion.span
                className="case-study-icon-wrap"
                initial={{ scale: 1, opacity: 0.7 }}
                whileInView={{ scale: [1, 1.14, 1], opacity: [0.7, 1, 0.9] }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <Icon className="case-study-icon" aria-hidden="true" />
              </motion.span>
              <h2>{title}</h2>
            </div>
            <ul>
              {content.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="case-study-impact-metrics case-study-panel" aria-label="Key outcomes">
        <div>
          <strong>
            <Counter end={0} />
          </strong>
          <span>manual entry</span>
        </div>
        <div>
          <strong>
            <Counter end={100} suffix="%" />
          </strong>
          <span>pipeline visibility</span>
        </div>
        <div>
          <strong>
            <Counter end={1} />
          </strong>
          <span>dashboard for owner control</span>
        </div>
      </section>

      <blockquote className="case-study-testimonial case-study-panel">
        “Before this system, we were guessing and chasing every lead manually. Now every inquiry is tracked,
        every follow-up is automated, and I can run the business from one dashboard.”
      </blockquote>

      <section className="case-study-stack" aria-label="Technology stack">
        {techStack.map((tech) => (
          <span key={tech} className="case-study-pill">
            {tech}
          </span>
        ))}
      </section>
    </main>
  )
}
