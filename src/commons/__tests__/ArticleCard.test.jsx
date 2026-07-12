import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ArticleCard from '../ArticleCard'

vi.mock('../../assets/programming/leftArrow.png', () => ({ default: 'leftArrow.png' }))
vi.mock('../../assets/programming/rightArrow.png', () => ({ default: 'rightArrow.png' }))

vi.mock('../../utils/programming', () => ({
  programming: [
    {
      id: 1,
      name: 'Test Article',
      title: 'title.png',
      slug: 'test-article',
      image: 'image.png',
      epilogo: ['Epigrafe line 1', 'Epigrafe line 2'],
      body: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10'],
    },
  ],
}))

const renderArticle = (slug = 'test-article') =>
  render(
    <MemoryRouter initialEntries={[`/programming/${slug}`]}>
      <Routes>
        <Route path="/programming/:slug" element={<ArticleCard />} />
      </Routes>
    </MemoryRouter>
  )

describe('ArticleCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders "Article not found" for unknown slug', () => {
    renderArticle('non-existent-slug')
    expect(screen.getByText('Article not found.')).toBeInTheDocument()
  })

  it('renders the article body paragraphs', () => {
    renderArticle()
    expect(screen.getByText('P1')).toBeInTheDocument()
    expect(screen.getByText('P5')).toBeInTheDocument()
  })

  it('shows only 5 paragraphs per page', () => {
    renderArticle()
    expect(screen.getByText('P1')).toBeInTheDocument()
    expect(screen.getByText('P5')).toBeInTheDocument()
    expect(screen.queryByText('P6')).not.toBeInTheDocument()
  })

  it('displays "Page 1 of 2" initially', () => {
    renderArticle()
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
  })

  it('navigates to next page on right arrow click', () => {
    renderArticle()
    fireEvent.click(screen.getByAltText('Next page'))
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument()
    expect(screen.getByText('P6')).toBeInTheDocument()
    expect(screen.queryByText('P1')).not.toBeInTheDocument()
  })

  it('navigates to previous page on left arrow click', () => {
    renderArticle()
    fireEvent.click(screen.getByAltText('Next page'))
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument()

    fireEvent.click(screen.getByAltText('Previous page'))
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    expect(screen.getByText('P1')).toBeInTheDocument()
  })

  it('disables previous arrow on first page', () => {
    renderArticle()
    const prevArrow = screen.getByAltText('Previous page').closest('figure')
    expect(prevArrow).toHaveClass('disabled')
  })

  it('disables next arrow on last page', () => {
    renderArticle()
    fireEvent.click(screen.getByAltText('Next page'))
    const nextArrow = screen.getByAltText('Next page').closest('figure')
    expect(nextArrow).toHaveClass('disabled')
  })

  it('renders epigrafe text', () => {
    renderArticle()
    expect(screen.getByText('Epigrafe line 1')).toBeInTheDocument()
    expect(screen.getByText('Epigrafe line 2')).toBeInTheDocument()
  })
})
