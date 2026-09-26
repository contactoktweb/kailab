export const SHIPPING_CONFIG = {
  timezone: 'America/Bogota',
  cutoffWeekdayHour: 16, // 4 p.m.
  cutoffSaturdayHour: 12, // 12 m.
  shippingCosts: {
    default: 0, // Envío gratis a toda Colombia
  },
  estimatedTimes: {
    ciudadesPrincipales: '1–2 días hábiles',
    ciudadesIntermedias: '2–3 días hábiles',
    municipiosYZonasExtendidas: '3–5 días hábiles',
  }
}
