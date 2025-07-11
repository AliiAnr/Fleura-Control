/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`udykufvgdmysypdcsnnp.supabase.co`],
  },
  allowedDevOrigins: [
    "http://192.168.1.4:3000",
    "http://192.168.1.11:3000",
    "http://192.168.128.45:3000",
    "http://192.168.128.227:3000",
  ],
};

export default nextConfig;
