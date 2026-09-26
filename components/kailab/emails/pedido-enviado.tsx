import * as React from 'react'

interface PedidoEnviadoEmailProps {
  orderId: string
  customerName: string
  carrier: string
  trackingNumber: string
  trackingUrl: string
}

export function PedidoEnviadoEmail({
  orderId,
  customerName,
  carrier,
  trackingNumber,
  trackingUrl,
}: PedidoEnviadoEmailProps) {
  return (
    <div style={{ fontFamily: 'monospace, sans-serif', color: '#17294F', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ margin: 0 }}>KAILAB</h2>
      </div>

      {/* Content */}
      <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <p>Hola, {customerName}. Tu pedido ya fue entregado a la transportadora.</p>
        <p>Usa la información de seguimiento para consultar su recorrido.</p>

        {/* Tracking info */}
        <div style={{ margin: '30px 0', backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 5px 0', color: '#6b7280', fontSize: '14px' }}>Transportadora</p>
          <p style={{ margin: '0 0 15px 0', fontWeight: 'bold', fontSize: '18px' }}>{carrier}</p>
          
          <p style={{ margin: '0 0 5px 0', color: '#6b7280', fontSize: '14px' }}>Número de guía</p>
          <p style={{ margin: '0 0 20px 0', fontWeight: 'bold', fontSize: '18px', letterSpacing: '1px' }}>{trackingNumber}</p>

          <a
            href={trackingUrl}
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
            Seguir envío
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
        <p>¿Necesitas ayuda con este envío?</p>
        <p>
          <a href="https://wa.me/573023041412" style={{ color: '#17294F', textDecoration: 'underline' }}>Escribir por WhatsApp</a>
          {' | '}
          <a href="mailto:info@kailab.com.co" style={{ color: '#17294F', textDecoration: 'underline' }}>info@kailab.com.co</a>
        </p>
      </div>
    </div>
  )
}
