import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AddCartButton from '../AddCartButton'

vi.mock('../../assets/market/addToCart2.png', () => ({ default: 'addToCart2.png' }))

describe('AddCartButton', () => {
  const mockProduct = {
    id: '123',
    price: 29.99,
    title: 'Test Product',
    image: 'https://example.com/image.jpg',
    size: 'M',
    sku: 'SKU-001',
  }

  it('renders with correct Snipcart data attributes', () => {
    render(<AddCartButton product={mockProduct} />)

    const figure = screen.getByRole('img', { name: /add to cart button/i }).parentElement

    expect(figure).toHaveAttribute('data-item-id', '123')
    expect(figure).toHaveAttribute('data-item-price', '29.99')
    expect(figure).toHaveAttribute('data-item-name', 'Test Product')
    expect(figure).toHaveAttribute('data-item-image', 'https://example.com/image.jpg')
    expect(figure).toHaveAttribute('data-item-quantity', '1')
    expect(figure).toHaveAttribute('data-item-max-quantity', '1')
  })

  it('includes size and SKU in description', () => {
    render(<AddCartButton product={mockProduct} />)

    const figure = screen.getByRole('img', { name: /add to cart button/i }).parentElement
    expect(figure).toHaveAttribute('data-item-description', 'M | Code: SKU-001')
  })

  it('uses "No Size" when size is undefined', () => {
    const productNoSize = { ...mockProduct, size: undefined }
    render(<AddCartButton product={productNoSize} />)

    const figure = screen.getByRole('img', { name: /add to cart button/i }).parentElement
    expect(figure).toHaveAttribute('data-item-description', 'No Size | Code: SKU-001')
  })

  it('constructs the correct Snipcart item URL', () => {
    render(<AddCartButton product={mockProduct} />)

    const figure = screen.getByRole('img', { name: /add to cart button/i }).parentElement
    expect(figure).toHaveAttribute('data-item-url', expect.stringContaining('/products/123'))
  })

  it('has the snipcart-add-item class', () => {
    render(<AddCartButton product={mockProduct} />)

    const figure = screen.getByRole('img', { name: /add to cart button/i }).parentElement
    expect(figure).toHaveClass('snipcart-add-item')
  })
})
