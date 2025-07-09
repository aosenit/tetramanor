/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  output: "standalone",
  trailingSlash: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/",
          outputPath: "static/",
          name: "[name].[hash].[ext]",
        },
      },
    });
    return config;
  },
};

export default nextConfig;
