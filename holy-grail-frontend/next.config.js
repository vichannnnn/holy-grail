module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bucket.tori.sg',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'image.tori.sg',
        pathname: '**',
      },
    ],
  },
};
