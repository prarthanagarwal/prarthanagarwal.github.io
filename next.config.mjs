/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'export', // Enable static exports for GitHub Pages
  basePath: '', // Empty for user site, or '/repo-name' for project site
  // Uncomment and set the line below if this is a project site (username.github.io/repo-name)
  // basePath: '/repo-name',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
