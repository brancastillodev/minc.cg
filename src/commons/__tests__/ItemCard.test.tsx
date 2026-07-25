import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ItemCard from '../ItemCard'

vi.mock('../../assets/market/sold-badge.webp', () => ({ default: 'sold-badge.webp' }))
vi.mock('../../assets/market/addToCart2.png', () => ({ default: 'addToCart2.png' }))

const renderWithRouter = (component) =>
  render(<MemoryRouter>{component}</MemoryRouter>)

describe('ItemCard', () => {
  const availableItem = {
    id: '1',
    title: 'Test Ring',
    price: 45.50,
    image: 'https://res.cloudinary.com/test/image/upload/v1/test.webp',
    size: 'Size 8',
    sku: 'RING-001',
    available: true,
  }

  const soldOutItem = {
    ...availableItem,
    available: false,
  }

  it('renders the product title', () => {
    renderWithRouter(<ItemCard itemData={availableItem} />)
    expect(screen.getByText('Test Ring')).toBeInTheDocument()
  })

  it('renders the price truncated (no decimals)', () => {
    renderWithRouter(<ItemCard itemData={availableItem} />)
    expect(screen.getByText('£45')).toBeInTheDocument()
  })

  it('renders the size', () => {
    renderWithRouter(<ItemCard itemData={availableItem} />)
    expect(screen.getByText('Size 8')).toBeInTheDocument()
  })

  it('applies Cloudinary transformation to image URL', () => {
    renderWithRouter(<ItemCard itemData={availableItem} />)
    const img = screen.getAllByRole('img')[0]
    expect(img.src).toContain('f_auto,q_auto,w_400')
  })

  it('links to the product detail page', () => {
    renderWithRouter(<ItemCard itemData={availableItem} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/market/1')
  })

  it('shows sold badge when item is not available', () => {
    renderWithRouter(<ItemCard itemData={soldOutItem} />)
    const badge = document.querySelector('.sold-badge')
    expect(badge).toBeInTheDocument()
  })

  it('does not show sold badge when item is available', () => {
    renderWithRouter(<ItemCard itemData={availableItem} />)
    const badge = document.querySelector('.sold-badge')
    expect(badge).not.toBeInTheDocument()
  })

  it('shows AddCartButton when available', () => {
    renderWithRouter(<ItemCard itemData={availableItem} />)
    expect(screen.getByRole('img', { name: /add to cart button/i })).toBeInTheDocument()
  })

  it('shows sold-out-box when sold out', () => {
    renderWithRouter(<ItemCard itemData={soldOutItem} />)
    expect(document.querySelector('.sold-out-box')).toBeInTheDocument()
    expect(screen.queryByRole('img', { name: /add to cart button/i })).not.toBeInTheDocument()
  })
})
