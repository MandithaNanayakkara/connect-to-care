import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Impact } from './pages/Impact'
import { Connect } from './pages/Connect'
import { Team } from './pages/Team'
import { Newsletter } from './pages/Newsletter'
import { NewsletterStory } from './pages/NewsletterStory'
import { Outcomes } from './pages/Outcomes'
import { Admin } from './pages/Admin'
import { AuditReports } from './pages/AuditReports'

const basename =
  import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '')

function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="impact" element={<Impact />} />
          <Route path="team" element={<Team />} />
          <Route path="admin" element={<Admin />} />
          <Route path="audit-reports" element={<AuditReports />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="newsletter/:slug" element={<NewsletterStory />} />
          <Route path="outcomes" element={<Outcomes />} />
          <Route path="connect" element={<Connect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
