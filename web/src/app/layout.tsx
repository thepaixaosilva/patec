import Navbar from '@/components/Navbar'
import './globals.css'
import { Provider } from '@/components/ui/provider'

export const metadata = {
  title: 'Patec - Início',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Navbar />
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
