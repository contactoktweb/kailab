import { NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * POST /api/wompi/signature
 * Genera la firma de integridad requerida por Wompi en el servidor.
 * El secreto de integridad NUNCA se expone al cliente.
 *
 * Body: { reference: string, amountInCents: number, currency: string }
 * Response: { signature: string }
 */
export async function POST(request: Request) {
  try {
    const { reference, amountInCents, currency } = await request.json()

    if (!reference || !amountInCents || !currency) {
      return NextResponse.json(
        { error: 'Faltan parámetros: reference, amountInCents, currency' },
        { status: 400 }
      )
    }

    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET
    if (!integritySecret) {
      console.error('[Wompi Signature] WOMPI_INTEGRITY_SECRET no configurado')
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta' },
        { status: 500 }
      )
    }

    // Cadena de integridad: reference + amountInCents + currency + integritySecret
    const chain = `${reference}${amountInCents}${currency}${integritySecret}`
    const signature = crypto.createHash('sha256').update(chain).digest('hex')

    return NextResponse.json({ signature })
  } catch (error: any) {
    console.error('[Wompi Signature Error]', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
