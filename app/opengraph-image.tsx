import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'KAILAB'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  try {
    const svgBuffer = readFileSync(join(process.cwd(), 'public', 'KAILAB_Logo_Navy-Blue.svg'))
    const base64 = svgBuffer.toString('base64')
    const src = `data:image/svg+xml;base64,${base64}`

    return new ImageResponse(
      (
        <div
          style={{
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={src}
            alt="KAILAB Logo"
            style={{ width: 500, height: 'auto' }}
          />
        </div>
      ),
      { ...size }
    )
  } catch (e) {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ fontSize: 60, color: '#17294F', fontFamily: 'sans-serif' }}>KAILAB</h1>
        </div>
      ),
      { ...size }
    )
  }
}
