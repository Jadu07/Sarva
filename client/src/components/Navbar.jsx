import { Link } from 'react-router-dom'

export default function Navbar() {
  const links = [
    ['Home', '/'],
    ['Explore', '/explore'],
    ['Downloads', '/downloads']
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-zinc-900">
          SARVA OS
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(([t, p]) => (
            <Link key={p} to={p} className="text-sm font-medium text-zinc-500 hover:text-zinc-900">
              {t}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
