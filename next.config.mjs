/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    // @react-pdf/renderer pulls in pdfkit + fontkit which have native deps
    // and can't be bundled by Next.js's webpack into the serverless function
    // bundle. Marking it as external tells Next to leave it as a runtime
    // require so the Netlify Function loads it from node_modules at exec
    // time. Without this, the route crashes with "An unknown error has
    // occurred" inside the Netlify function wrapper because react-pdf's
    // internal dynamic requires can't resolve.
    serverComponentsExternalPackages: [
      '@react-pdf/renderer',
      '@react-pdf/pdfkit',
      '@react-pdf/font',
      '@react-pdf/textkit',
      'fontkit',
    ],
  },
};

export default nextConfig;
