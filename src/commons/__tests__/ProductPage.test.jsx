import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProductPage from '../ProductPage'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

vi.mock('../../assets/market/viewCart.png', () => ({ default: 'viewCart.png' }))
vi.mock('../../assets/market/itemsTitle.png', () => ({ default: 'itemsTitle.png' }))
vi.mock('../../assets/market/list.png', () => ({ default: 'list.png' }))
vi.mock('../../assets/market/sold-badge.webp', () => ({ default: 'sold-badge.webp' }))
vi.mock('../../assets/market/addToCart2.png', () => ({ default: 'addToCart2.png' }))
vi.mock('../../assets/programming/leftArrow.png', () => ({ default: 'leftArrow.png' }))
vi.mock('../../assets/programming/rightArrow.png', () => ({ default: 'rightArrow.png' }))

import axios from 'axios'

const mockProduct = {
  id: '42',
  title: 'Test Ring',
  price: 99.99,
  image: 'https://test.com/ring.webp',
  size: 'Size 8',
  sku: 'SKU-42',
  available: true,
}

const mockImages = [
  'https://res.cloudinary.com/test/image/upload/v1/img1.webp',
  'https://res.cloudinary.com/test/image/upload/v1/img2.webp',
]

const waitForProduct = () =>
  waitFor(() => {
    expect(screen.getAllByText('Test Ring').length).toBeGreaterThanOrEqual(1)
  })

const mockFetch = (product = mockProduct, images = mockImages) => {
  axios.get.mockImplementation((url) => {
    if (url.includes('/images/')) return Promise.resolve({ data: images })
    return Promise.resolve({ data: product })
  })
}

const renderProductPage = (id = '42', state = undefined) =>
  render(
    <MemoryRouter initialEntries={[{ pathname: `/market/${id}`, state }]}>
      <Routes>
        <Route path="/market/:id" element={<ProductPage />} />
      </Routes>
    </MemoryRouter>
  )

describe('ProductPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 })
  })

  it('shows loading message initially', () => {
    axios.get.mockReturnValue(new Promise(() => {}))
    renderProductPage()
    expect(screen.getByText('Loading, please wait...')).toBeInTheDocument()
  })

  it('fetches product and images, then renders product details', async () => {
    mockFetch()
    renderProductPage()
    await waitForProduct()
    expect(screen.getByText('£99')).toBeInTheDocument()
  })

  it('renders with state data (skips product fetch)', async () => {
    axios.get.mockResolvedValue({ data: mockImages })
    renderProductPage('42', { itemData: mockProduct })
    await waitForProduct()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/images/'))
  })

  it('renders size and price', async () => {
    mockFetch()
    renderProductPage()
    await waitForProduct()
    expect(screen.getAllByText(/Size 8/).length).toBeGreaterThanOrEqual(1)
  })

  it('shows sold badge when product is not available', async () => {
    mockFetch({ ...mockProduct, available: false })
    renderProductPage()
    await waitForProduct()
    expect(document.querySelector('.sold-badge-product-page')).toBeInTheDocument()
  })

  it('does not show sold badge when product is available', async () => {
    mockFetch()
    renderProductPage()
    await waitForProduct()
    expect(document.querySelector('.sold-badge-product-page')).not.toBeInTheDocument()
  })

  it('shows AddCartButton when product is available', async () => {
    mockFetch()
    renderProductPage()
    await waitForProduct()
    const buttons = screen.getAllByRole('img', { name: /add to cart button/i })
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not show AddCartButton when sold out', async () => {
    mockFetch({ ...mockProduct, available: false })
    renderProductPage()
    await waitForProduct()
    expect(screen.queryByRole('img', { name: /add to cart button/i })).not.toBeInTheDocument()
  })

  it('navigates gallery forward on right arrow click', async () => {
    mockFetch()
    renderProductPage()
    await waitForProduct()

    const img = screen.getByAltText('Test Ring')
    const initialSrc = img.src

    const rightArrows = document.querySelectorAll('.arrow-desktop')
    fireEvent.click(rightArrows[1])

    expect(img.src).not.toBe(initialSrc)
  })

  it('hides left arrow on first image', async () => {
    mockFetch()
    renderProductPage()
    await waitForProduct()

    const leftArrow = document.querySelector('.arrow-desktop')
    expect(leftArrow.style.visibility).toBe('hidden')
  })

  it('shows "No images available" when images array is empty', async () => {
    mockFetch(mockProduct, [])
    renderProductPage()
    await waitFor(() => {
      expect(screen.getByText('No images available')).toBeInTheDocument()
    })
  })

  it('renders the snipcart checkout button', async () => {
    mockFetch()
    renderProductPage()
    await waitForProduct()
    expect(document.querySelector('.snipcart-checkout')).toBeInTheDocument()
  })
})
