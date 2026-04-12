import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type AboutPageProps = {
  photoUrl: string
}

type ShippedStat = {
  icon: string
  value: number
  suffix: string
  label: string
}

const bioLines = [
  "I don't build software. I build leverage.",
  'Most businesses are hemorrhaging time on tasks a well-built system should handle automatically.',
  'I find those gaps, map the logic, and deploy systems that run without babysitting.',
  'My work sits at the intersection of CRM strategy, workflow automation, and AI integration.',
  'GoHighLevel is my core platform. Make, n8n, and custom API work extend it far beyond what most operators think is possible.',
]

const shippedStats: ShippedStat[] = [
  { icon: '⚙️', value: 120, suffix: '+', label: 'Workflow Builds' },
  { icon: '📈', value: 85, suffix: '+', label: 'Pipeline Systems' },
  { icon: '🤖', value: 200, suffix: '+', label: 'AI Automations' },
  { icon: '⏱️', value: 5000, suffix: '+', label: 'Hours Reclaimed' },
]

function CountUpValue({ value, suffix }: { value: number; suffix: string }) {
  const counterRef = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(counterRef, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (latest) => setCount(Math.round(latest)),
    })

    return () => controls.stop()
  }, [isInView, value])

  return (
    <span ref={counterRef} className="about-stat-value">
      {count}
      {suffix}
    </span>
  )
}

export function AboutPage({ photoUrl }: AboutPageProps) {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="about-layout">
        <div className="about-photo-frame">
          <img
            className="about-photo"
            src={photoUrl}
            alt="Portrait of Rixwan"
            width={250}
            height={350}
            onError={(event) => {
              event.currentTarget.src = '/profile-portrait.svg'
            }}
          />
        </div>

        <div className="about-content">
          <h2 id="about-heading">About Me</h2>
          <motion.div
            className="about-bio-stack"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.16,
                },
              },
            }}
          >
            {bioLines.map((line) => (
              <motion.p
                key={line}
                className="about-copy"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          <div className="what-shipped">
            <h3>What I&apos;ve shipped</h3>
            <div className="about-stats-row" role="list" aria-label="Shipped outcomes">
              {shippedStats.map((item) => (
                <article className="about-stat-card" key={item.label} role="listitem">
                  <span className="about-stat-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <CountUpValue value={item.value} suffix={item.suffix} />
                  <p className="about-stat-label">{item.label}</p>
                </article>
              ))}
            </div>
          </div>

          <p className="about-cert-row">GHL Certified · Make Partner · NERC Winner 2025 · NUST Mechatronics</p>
        </div>
      </div>
    </section>
  )
}
