import * as path from "path";

interface GatsbyConfig {
  siteMetadata: {
    siteUrl: string;
    title: string;
  };
  plugins: Array<string | { resolve: string; options?: object }>;
}

const SITE_NAME = "James Adarich";
const SITE_URL = `https://${process.env.SITE_DOMAIN}`;

const GATSBY_CONFIG: GatsbyConfig = {
  siteMetadata: {
    siteUrl: SITE_URL,
    title: SITE_NAME
  },
  plugins: [
    // core templates
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-offline",

    {
      resolve: "gatsby-plugin-favicon",
      options: {
        logo: "./src/images/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },

    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: SITE_NAME,
        short_name: SITE_NAME,
        start_url: "/",
        background_color: "#eee",
        theme_color: "#eee",
        display: "minimal-ui",
        icons: [
          {
            src: "/favicons/apple-touch-icon-72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "/favicons/apple-touch-icon-114x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/favicons/apple-touch-icon-180x180.png",
            sizes: "180x180",
            type: "image/png"
          }
        ]
      }
    },

    // markdown plugins
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: path.resolve("./src"),
        name: "markdown-pages"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-plugin-sharp",
          "gatsby-remark-copy-linked-files",
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "line-numbers language-"
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1000
            }
          }
        ]
      }
    },

    // SEO plugins
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: SITE_URL
      }
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(
            filter: {
              path: {
                regex: "${/^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback|500)).*$/}"
              }
            }
          ) {
            edges {
              node {
                path
              }
            }
          }
        }`
      }
    }
  ]
};

if (process.env.GOOGLE_TAG_MANAGER_ID) {
  GATSBY_CONFIG.plugins.push({
    resolve: "gatsby-plugin-google-tagmanager",
    options: {
      id: process.env.GOOGLE_TAG_MANAGER_ID,
      includeInDevelopment: false
    }
  });
}

export = GATSBY_CONFIG;
