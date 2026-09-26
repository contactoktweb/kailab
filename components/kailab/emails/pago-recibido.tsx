import * as React from 'react'

interface Item {
  name: string
  quantity: number
  price: string
}

interface PagoRecibidoEmailProps {
  orderId: string
  customerName: string
  orderUrl: string
  subtotal: string
  total: string
  items: Item[]
  shippingAddress: string[]
}

export function PagoRecibidoEmail({
  orderId,
  customerName,
  orderUrl,
  subtotal,
  total,
  items,
  shippingAddress,
}: PagoRecibidoEmailProps) {
  return (
    <div style={{ fontFamily: 'monospace, sans-serif', color: '#17294F', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ margin: 0 }}>KAILAB</h2>
      </div>

      {/* Content */}
      <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <p>Hola, {customerName}. Recibimos el pago de tu pedido.</p>
        <p>Aquí puedes revisar los productos, el total y los datos de entrega.</p>

        {/* Action Button */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href={orderUrl}
            style={{
              backgroundColor: '#17294F',
              color: '#ffffff',
              padding: '12px 24px',
              textDecoration: 'none',
              fontWeight: 'bold',
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            Ver mi pedido
          </a>
        </div>

        {/* Order Summary */}
        <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Resumen del pedido</h3>
        <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td style={{ padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                  {item.name} x{item.quantity}
                </td>
                <td style={{ padding: '8px 0', borderBottom: '1px solid #f3f4f6', textAlign: 'right', fontWeight: 'bold' }}>
                  {item.price}
                </td>
              </tr>
            ))}
            <tr>
              <td style={{ padding: '8px 0' }}>Subtotal</td>
              <td style={{ padding: '8px 0', textAlign: 'right' }}>{subtotal}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>Envío</td>
              <td style={{ padding: '8px 0', textAlign: 'right', color: '#10b981' }}>Gratis</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', fontSize: '18px' }}>Total</td>
              <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 'bold', fontSize: '18px' }}>{total}</td>
            </tr>
          </tbody>
        </table>

        {/* Shipping details */}
        <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Datos de entrega</h3>
        <div style={{ padding: '10px 0', backgroundColor: '#f9fafb', paddingLeft: '10px' }}>
          {shippingAddress.map((line, i) => (
            <p key={i} style={{ margin: '4px 0' }}>{line}</p>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
        <p>¿Necesitas ayuda con este pedido?</p>
        <p>
          <a href="https://wa.me/573023041412" style={{ color: '#17294F', textDecoration: 'underline' }}>Escribir por WhatsApp</a>
          {' | '}
          <a href="mailto:info@kailab.com.co" style={{ color: '#17294F', textDecoration: 'underline' }}>info@kailab.com.co</a>
        </p>
      </div>
    </div>
  )
}
