const { Locales } = require("./src/i18n/locales");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: Object.values(Locales),
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: Locales["en-US"],
  },
};

module.exports = nextConfig;
