import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  siteMetadata: {
    title: `Jack Bergin Portfolio`,
    siteUrl: process.env.NODE_ENV === "production" 
      ? `https://jackbergin.github.io/portfolio`
      : `http://localhost:8000`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    }
  ]
};

export default config;
