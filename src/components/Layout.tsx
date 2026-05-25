import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnalyticsScripts } from './AnalyticsScripts'
import { Footer } from './Footer'
import { Header } from './Header'
import { PageMeta } from './PageMeta'
import { PAGE_META } from '../config/pageMeta'

export function Layout() {
  const { pathname } = useLocation()
  const meta = PAGE_META[pathname] ?? PAGE_META['/']

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <AnalyticsScripts />
      <PageMeta {...meta} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
