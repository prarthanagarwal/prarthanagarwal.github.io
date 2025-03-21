import localFont from 'next/font/local';

export const satoshi = localFont({
  src: '../assets/fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
});

export const instrumentSerif = localFont({
  src: '../assets/fonts/InstrumentSerif-Regular.ttf',
  variable: '--font-instrument-serif',
  display: 'swap',
});
