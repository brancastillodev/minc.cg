import { describe, it, expect } from 'vitest'
import { videos } from '../videos'

describe('videos utility data', () => {
  it('exports an array of videos', () => {
    expect(Array.isArray(videos)).toBe(true)
    expect(videos.length).toBeGreaterThan(0)
  })

  it('each video has required fields', () => {
    videos.forEach((video) => {
      expect(video).toHaveProperty('title')
      expect(video).toHaveProperty('desc')
      expect(video).toHaveProperty('link')
      expect(video).toHaveProperty('anime')
      expect(typeof video.anime).toBe('boolean')
    })
  })

  it('each video has a valid YouTube link', () => {
    videos.forEach((video) => {
      expect(video.link).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/)
    })
  })

  it('animated videos have vidM and vidD properties', () => {
    const animated = videos.filter((v) => v.anime === true)
    animated.forEach((video) => {
      expect(video).toHaveProperty('vidM')
      expect(video).toHaveProperty('vidD')
    })
  })

  it('non-animated videos have image property', () => {
    const staticVideos = videos.filter((v) => v.anime === false)
    staticVideos.forEach((video) => {
      expect(video).toHaveProperty('image')
    })
  })

  it('each video has a doubleLine boolean', () => {
    videos.forEach((video) => {
      expect(typeof video.doubleLine).toBe('boolean')
    })
  })
})
