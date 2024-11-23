'use client'
import Navbar from '@/components/Navbar'
import './globals.css'
import { Provider } from '@/components/ui/provider'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

// export const metadata = {
//   title: 'Patec - Início',
//   icons: {
//     icon: '/favicon.ico',
//   },
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Navbar />
        <QueryClientProvider client={queryClient}>
        <Provider>{children}</Provider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
