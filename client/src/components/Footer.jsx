const footerLinks = [
  { title: 'Sarva OS', href: '' },
  { title: 'GitHub', href: '' },
  { title: 'Privacy', href: '' }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-white border-t border-zinc-100 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-8">
          {footerLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              {link.title}
            </a>
          ))}
        </div>

        <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
          © {currentYear} SARVA OS.
        </p>
      </div>
    </footer>
  )
}
