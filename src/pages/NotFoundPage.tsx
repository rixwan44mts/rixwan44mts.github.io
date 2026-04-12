function NotFoundPage() {
  return (
    <main className="page-shell">
      <section className="final-cta">
        <h1>Page Not Found</h1>
        <p>The page you requested does not exist.</p>
        <a href="/" className="cta-primary">
          Back to Home
        </a>
      </section>
    </main>
  )
}

export default NotFoundPage
