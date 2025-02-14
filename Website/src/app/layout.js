import { Inter } from 'next/font/google'
import '@mantine/core/styles.css';
import Providers from './providers';
import '../css/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Innosend',
  description: 'The safe chat app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
