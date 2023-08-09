import '@/app/globals.css'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import '@fontsource/open-sans/latin-300.css'
import '@fontsource/open-sans/latin-400.css'
import '@fontsource/open-sans/latin-700.css'
import '@fontsource/permanent-marker/latin-400.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { css, cx } from '@styled/css'
import { container } from '@styled/patterns'
import { type Metadata } from 'next'
import { type FC, type ReactNode } from 'react'

config.autoAddCss = false

export const metadata: Metadata = {
  title: 'EntGamers',
  description: 'a template for EntGamers website'
}

interface LayoutProps {
  children: ReactNode

}

const RootLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="es">
      <body>
        <Header />
        <main
          className={cx(container(), css({ minHeight: 'calc(100vh - (72px *2))' }))}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
