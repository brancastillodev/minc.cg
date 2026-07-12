import { describe, it, expect } from 'vitest'
import { programming } from '../programming'

describe('programming utility data', () => {
  it('exports an array of articles', () => {
    expect(Array.isArray(programming)).toBe(true)
    expect(programming.length).toBeGreaterThan(0)
  })

  it('each article has required fields', () => {
    programming.forEach((article) => {
      expect(article).toHaveProperty('id')
      expect(article).toHaveProperty('name')
      expect(article).toHaveProperty('slug')
      expect(article).toHaveProperty('title')
      expect(article).toHaveProperty('body')
      expect(article).toHaveProperty('epilogo')
    })
  })

  it('each article body is a non-empty array of strings', () => {
    programming.forEach((article) => {
      expect(Array.isArray(article.body)).toBe(true)
      expect(article.body.length).toBeGreaterThan(0)
      article.body.forEach((paragraph) => {
        expect(typeof paragraph).toBe('string')
      })
    })
  })

  it('each article has a unique slug', () => {
    const slugs = programming.map((a) => a.slug)
    const uniqueSlugs = new Set(slugs)
    expect(uniqueSlugs.size).toBe(slugs.length)
  })

  it('each article has a unique id', () => {
    const ids = programming.map((a) => a.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('epilogo is an array of strings', () => {
    programming.forEach((article) => {
      expect(Array.isArray(article.epilogo)).toBe(true)
      article.epilogo.forEach((line) => {
        expect(typeof line).toBe('string')
      })
    })
  })
})
