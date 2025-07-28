
import Link from "next/link"
import { Trophy } from "lucide-react"

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3.3 4.9-6.1-1.4-6.1-6.1-6.1-6.1s-2.1-.7-3.4 2.1c-1.4-1.6-4.9-3.3-4.9-3.3s6.1 1.4 6.1 6.1-1.4 6.1-6.1 6.1c-1.6-1.4-3.3-4.9-3.3-4.9s1.4 2.1 3.4 3.4-4.9 2-4.9 2" />
  </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
)

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-12 border-t">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg text-accent">Club Del Lago</span>
        </div>
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Club Del Lago. Todos los derechos reservados.
        </p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-accent transition-colors">
            <TwitterIcon className="h-5 w-5" />
          </Link>
          <Link href="#" className="hover:text-accent transition-colors">
            <FacebookIcon className="h-5 w-5" />
          </Link>
          <Link href="#" className="hover:text-accent transition-colors">
            <InstagramIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
