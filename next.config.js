/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // this makes Next.js generate static files
  images: { unoptimized: true }, // needed if you use <Image>
};

module.exports = nextConfig;

