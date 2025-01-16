'use client'
import { useState } from 'react'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

type Themes = Record<string, string>

const themes: Themes = {
  winter: 'winter',
  dracula: 'dracula',
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<keyof Themes>(themes.winter)

  const handleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'winter' ? 'dracula' : 'winter'

      if (prevTheme === 'winter')
        document.documentElement.setAttribute('data-theme', newTheme)
      else document.documentElement.setAttribute('data-theme', newTheme)

      return newTheme
    })
  }

  return (
    <button className='btn btn-sm btn-outline' onClick={handleTheme}>
      {theme === 'winter' ? <BsMoonFill className='h-4 w-4' /> : <BsSunFill />}
    </button>
  )
}
