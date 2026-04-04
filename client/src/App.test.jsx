import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'
import Footer from './components/Footer'

describe('Sarva OS Tests', () => {

    describe('Homepage (App)', () => {
        it('renders brand and main links', () => {
            render(<App />)

            expect(screen.getAllByText(/SARVA OS/i).length).toBeGreaterThan(0)
            expect(screen.getByText(/Home/i)).toBeInTheDocument()
            expect(screen.getByText(/Explore/i)).toBeInTheDocument()
            expect(screen.getByText(/Downloads/i)).toBeInTheDocument()
        })
    })


    describe('Footer', () => {

    it('renders links', () => {
        render(<Footer />)

        expect(screen.getByText(/GitHub/i)).toBeInTheDocument()
        expect(screen.getByText(/Privacy/i)).toBeInTheDocument()
    })

    it('renders current year', () => {
        render(<Footer />)

        const year = new Date().getFullYear()
        expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
    })

    })

})



describe('Backend Connectivity Test', () => {
  it('should respond with healthy status', async () => {
    const url = 'http://localhost:5001/api/health'

    try {
      const res = await fetch(url)
      const data = await res.json()

      expect(res.ok).toBe(true)
      expect(data.status).toBe('ok')
      expect(data.message).toContain('Backend')
    } catch (err) {
      throw new Error('Backend not reachable')
    }
  })
})