import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import RootLayout, {metadata} from '../../app/layout'

describe('RootLayout Component', () => {
  it('renders the HeaderBasic, LayoutContainer, and footer', () => {
    render(
      <RootLayout>
        <div>Layout test!</div>
      </RootLayout>
    )

    expect(screen.getByRole('main')).toBeDefined()
    expect(screen.getByText('Layout test!')).toBeDefined()
  })

  it('exports correct metadata', () => {
    expect(metadata.title).toBe('MBST - A Zara Challenge by Luis Garrido')
    expect(metadata.description).toBe('MBST - A Zara Challenge by Luis Garrido, built with Next.js')
  })
})
