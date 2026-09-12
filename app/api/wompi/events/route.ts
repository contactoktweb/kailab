import { NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * Route Handler for Wompi Webhooks / Events Notification
 * URL relative: /api/wompi/events
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event, data, timestamp, signature } = body

    const eventsSecret = process.env.WOMPI_EVENTS_SECRET

    if (!eventsSecret) {
      console.warn('[Wompi Webhook] WOMPI_EVENTS_SECRET non configurado en .env.local')
    } else if (signature && signature.properties && signature.checksum) {
      // Validate checksum if signature properties exist
      const concatValues = signature.properties
        .map((propPath: string) => {
          const parts = propPath.split('.')
          let current: any = data
          for (const p of parts) {
            current = current?.[p]
          }
          return current
        })
        .join('')

      const chain = `${concatValues}${timestamp}${eventsSecret}`
      const calculatedChecksum = crypto.createHash('sha256').update(chain).digest('hex')

      if (calculatedChecksum !== signature.checksum) {
        console.error('[Wompi Webhook] Checksum inválido')
        return NextResponse.json({ error: 'Invalid checksum' }, { status: 400 })
      }
    }

    console.log(`[Wompi Event Logged] Tipo: ${event}, ID Transacción: ${data?.transaction?.id}, Estado: ${data?.transaction?.status}`)

    // Handle transaction updates (APPROVED, DECLINED, VOIDED)
    if (event === 'transaction.updated') {
      const transaction = data?.transaction
      console.log(`[Wompi Transaction Updated] Status: ${transaction?.status}, Referencia: ${transaction?.reference}`)
    }

    return NextResponse.json({ status: 'success' }, { status: 200 })
  } catch (error: any) {
    console.error('[Wompi Webhook Error]', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}
