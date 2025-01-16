import Link from 'next/link'

type Links = {
  href: string
  label: string
}

const links: Links[] = [
  { href: '/chat', label: 'chat' },
  { href: '/tours', label: 'tours' },
  { href: '/tours/new', label: 'new tour' },
  { href: '/profile', label: 'profile' },
]

export default function NavLinks() {
  return (
    <ul className='menu text-base-content'>
      {links.map((link) => {
        return (
          <li key={link.label} className='capitalize'>
            <Link href={link.href}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}
