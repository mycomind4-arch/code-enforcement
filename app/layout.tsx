import './globals.css'

export const metadata = {
  title: 'Code Enforcement | My-CoMind',
  description: 'Evidence-first command center for local code-enforcement cases.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
