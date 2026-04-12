import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PageTransition from './components/PageTransition.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageTransition>
      <App />
    </PageTransition>
  </StrictMode>,
)
