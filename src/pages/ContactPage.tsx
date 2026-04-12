import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { BriefcaseBusiness, CalendarDays, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import { z } from 'zod'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.email('Enter a valid email address'),
  businessType: z.string().min(1, 'Please select a business type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const contactMethods = [
  {
    title: 'Email',
    description: 'rixwan44mts@gmail.com',
    href: 'mailto:rixwan44mts@gmail.com',
    Icon: Mail,
  },
  {
    title: 'Calendar',
    description: 'Book an automation audit',
    href: 'https://calendly.com/',
    Icon: CalendarDays,
  },
  {
    title: 'LinkedIn',
    description: 'Connect professionally',
    href: 'https://www.linkedin.com/in/muhammad-rizwan-aslam-43a2b5259',
    Icon: BriefcaseBusiness,
  },
]

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      businessType: '',
      message: '',
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    console.log('Contact form submitted:', values)
    toast.success('Thanks! Your message has been sent.')
    reset()
  }

  return (
    <section id="contact" className="contact-page">
      <Toaster richColors position="top-right" />

      <div className="contact-left">
        <h2>Let&apos;s talk</h2>
        <div className="contact-methods">
          {contactMethods.map(({ title, description, href, Icon }) => (
            <motion.a
              key={title}
              href={href}
              className="contact-method-card"
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
            >
              <motion.div
                className="contact-method-icon"
                variants={{
                  hover: {
                    y: [0, -6, 0],
                    transition: { duration: 0.5, ease: 'easeInOut' },
                  },
                }}
              >
                <Icon size={18} />
              </motion.div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...register('name')} />
        {errors.name && <span className="contact-form-error">{errors.name.message}</span>}

        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span className="contact-form-error">{errors.email.message}</span>}

        <label htmlFor="businessType">Business type</label>
        <select id="businessType" {...register('businessType')}>
          <option value="">Select one</option>
          <option value="agency">Agency</option>
          <option value="saas">SaaS</option>
          <option value="ecommerce">E-commerce</option>
          <option value="consulting">Consulting</option>
          <option value="other">Other</option>
        </select>
        {errors.businessType && <span className="contact-form-error">{errors.businessType.message}</span>}

        <label htmlFor="message">Message</label>
        <textarea id="message" rows={5} {...register('message')} />
        {errors.message && <span className="contact-form-error">{errors.message.message}</span>}

        <button type="submit" className="contact-submit-button" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="contact-submit-spinner" aria-hidden="true" />
              Sending...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </section>
  )
}

export default ContactPage
