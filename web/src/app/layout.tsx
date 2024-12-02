"use client"
// import Navbar from '@/components/shared/Navbar'
import './globals.css'
import { Provider } from '@/components/ui/provider'
import { AuthProvider } from '@/contexts/auth'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        {/* <Navbar /> */}
        <Provider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  )
}
