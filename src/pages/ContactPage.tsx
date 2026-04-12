const bookingUrl = 'https://wa.me/923285093973?text=Hi%20Rixwan%2C%20I%20want%20an%20automation%20audit.'

export function ContactPage() {
  return (
    <section className="page-panel section-stack">
      <p className="kicker">Booking + Email Form</p>
      <h1>Contact</h1>

      <article className="final-cta">
        <h2>Ready to Stop Being the Bottleneck?</h2>
        <p>Book your automation audit or send project details using the form below.</p>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="cta-primary">
          Book Automation Audit
        </a>
      </article>

      <form className="contact-form" action="mailto:rixwan44mts@gmail.com" method="post" encType="text/plain">
        <label className="form-field">
          Name
          <input type="text" name="name" required />
        </label>
        <label className="form-field">
          Email
          <input type="email" name="email" required />
        </label>
        <label className="form-field">
          Message
          <textarea name="message" rows={5} required />
        </label>
        <button type="submit" className="cta-primary form-submit">
          Send Email
        </button>
      </form>
    </section>
  )
}
