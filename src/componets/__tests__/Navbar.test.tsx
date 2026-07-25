import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../Navbar'

vi.mock('../../assets/logo/CGCmincLogo.webp', () => ({ default: 'logo.webp' }))
vi.mock('../../assets/buttons/menuBttn@300x.png', () => ({ default: 'menuBttn.png' }))
vi.mock('../../assets/buttons/menuLine.svg', () => ({ default: 'menuLine.svg' }))
vi.mock('../../assets/buttons/proBttn@300x.png', () => ({ default: 'proBttn.png' }))
vi.mock('../../assets/buttons/VidBttn@300x.png', () => ({ default: 'VidBttn.png' }))
vi.mock('../../assets/buttons/markBttn@300x.png', () => ({ default: 'markBttn.png' }))
vi.mock('../../assets/buttons/new@300x.png', () => ({ default: 'new.png' }))
vi.mock('../../assets/buttons/menuBar.png', () => ({ default: 'menuBar.png' }))
vi.mock('../../assets/buttons/oneBoxShadow.png', () => ({ default: 'oneBoxShadow.png' }))
vi.mock('../../assets/buttons/menuBoxesShadowSel.png', () => ({ default: 'menuBoxesShadowSel.png' }))

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the logo link to home', () => {
    renderNavbar()
    const logoLink = document.querySelector('.navbar-logotipo')
    expect(logoLink).toBeInTheDocument()
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders desktop navigation links', () => {
    renderNavbar()
    const desktopLinks = document.querySelectorAll('.menu-desktop .menu-link')
    expect(desktopLinks.length).toBe(3)
    const hrefs = Array.from(desktopLinks).map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('/programming')
    expect(hrefs).toContain('/videos')
    expect(hrefs).toContain('/market')
  })

  it('toggles mobile menu open', () => {
    renderNavbar()
    const menuImg = document.querySelector('.menu-mobile-button > img')
    fireEvent.click(menuImg)

    const extraMenu = document.querySelector('.extra-menu')
    expect(extraMenu).toBeInTheDocument()
    expect(extraMenu).toHaveClass('extra-menu')
  })

  it('closes mobile menu when a link is clicked', () => {
    renderNavbar()
    const menuImg = document.querySelector('.menu-mobile-button > img')
    fireEvent.click(menuImg)

    const extraMenu = document.querySelector('.extra-menu')
    expect(extraMenu).toHaveClass('extra-menu')

    const programmingLink = extraMenu.querySelector('a[href="/programming"]')
    fireEvent.click(programmingLink)

    const closedMenu = document.querySelector('.extra-menu-buttons-div').parentElement
    expect(closedMenu).toHaveClass('menu-closed')
  })

  it('logo link navigates to home', () => {
    renderNavbar()
    const logoLink = document.querySelector('.navbar-logotipo')
    expect(logoLink).toHaveAttribute('href', '/')
  })
})
