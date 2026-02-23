/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Prevents picomatch stack-overflow on Vercel during "Collecting build traces".
    // Next.js traces every file it can reach; excluding large native binaries and
    // non-JS assets keeps the traversal shallow enough to avoid the recursion limit.
    outputFileTracingExcludes: {
      '*': [
        // SWC native binaries (linux, darwin, win32 – only the host arch is used)
        'node_modules/@swc/core-linux-x64-gnu/**',
        'node_modules/@swc/core-linux-x64-musl/**',
        'node_modules/@swc/core-darwin-x64/**',
        'node_modules/@swc/core-darwin-arm64/**',
        'node_modules/@swc/core-win32-x64-msvc/**',
        // Animation libraries with deep sub-trees
        'node_modules/framer-motion/**',
        'node_modules/gsap/**',
        // Tooling that is never needed at runtime
        'node_modules/typescript/**',
        'node_modules/webpack/**',
        'node_modules/eslint/**',
        'node_modules/postcss/**',
        'node_modules/tailwindcss/**',
        // Static assets — served directly, not bundled
        'public/**',
        '.next/cache/**',
      ],
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Enable HTTP/2 push headers for critical assets
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig