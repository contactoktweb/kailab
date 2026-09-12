import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';

declare global {
  interface Window {
    WompiCheckout?: any;
  }
}

interface WompiCheckoutProps {
  amountCOP: number; // amount in Colombian Pesos
  productName: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  className?: string;
  label?: string;
}

/**
 * Renders a button that opens the Wompi checkout widget using sandbox credentials.
 * The public key is read from NEXT_PUBLIC_WOMPI_PUBLIC_KEY.
 *
 * NOTE: This component is client‑only (uses useEffect) and should be used inside a
 * "use client" file.
 */
export function WompiCheckoutButton({
  amountCOP,
  productName,
  onSuccess,
  onError,
  className,
  label = "Pagar",
}: WompiCheckoutProps) {
  // Load Wompi script lazily
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.WompiCheckout) return; // already loaded
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = () => {
    if (!window.WompiCheckout) {
      console.error('Wompi script not loaded');
      return;
    }
    const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error('Wompi public key missing');
      return;
    }
    window.WompiCheckout.open({
      currency: 'COP',
      amountInCents: amountCOP * 100, // widget expects cents
      reference: `order-${Date.now()}`,
      publicKey,
      description: productName,
      // Optional callbacks – the widget will postMessage back to the window
      // We'll listen for them via `window.addEventListener('message', …)`
    });
  };

  // Listen for widget messages (success / failure)
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      // Wompi sends messages from its own origin
      if (!event.origin.includes('wompi.co')) return;
      const { type, data } = event.data || {};
      if (type === 'WompiCheckoutSuccess' && onSuccess) {
        onSuccess(data);
      }
      if (type === 'WompiCheckoutError' && onError) {
        onError(data);
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [onSuccess, onError]);

  return (
    <button
      onClick={handleClick}
      className={
        className ||
        "flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#1959D7] px-5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#1959D7]/90 active:scale-[0.98]"
      }
    >
      {label}
    </button>
  );
}
