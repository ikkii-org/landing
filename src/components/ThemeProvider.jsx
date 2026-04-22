import { createContext, useContext, useState, useEffect } from 'react'

export const ThemeContext = createContext({ theme: 'light', toggleTheme: () => { } })
export const useTheme = () => useContext(ThemeContext)

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
