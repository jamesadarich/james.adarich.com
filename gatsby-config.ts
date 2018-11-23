import * as path from "path";

interface GatsbyConfig {
  siteMetadata: {
    siteUrl: string;
    title: string;
  };
  plugins: Array<string | { resolve: string; options?: object }>;
}

const SITE_NAME = "James Adarich";
const SITE_URL = `https://${process.env.SITE_DOMAIN || "james.adarich.com"}`;

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
      resolve: "gatsby-plugin-manifest",
      options: {
        name: SITE_NAME,
        short_name: SITE_NAME,
        start_url: "/",
        background_color: "#eee",
        theme_color: "#eee",
        display: "minimal-ui",
        icon: "src/images/favicon.png"
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
              maxWidth: 1000,
              linkImagesToOriginal: false
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
                regex: "${/^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback|500|blog\/)).*$/}"
              }
            }
          ) {
            edges {
              node {
                path
              }
            }
          }
          allMarkdownRemark(
            filter: {
              frontmatter: {
                draft: { ne: true }
              }
            }
          ) {
            edges {
              node {
                frontmatter {
                  path
                }
              }
            }
          }
        }`,
        serialize: ({ site, allSitePage, allMarkdownRemark }: any) => {
          const siteUrl = site.siteMetadata.siteUrl;

          return allSitePage.edges
            .map((edge: any) => siteUrl + edge.node.path)
            .concat(
              allMarkdownRemark.edges.map(
                (edge: any) => siteUrl + edge.node.frontmatter.path
              )
            )
            .map((url: string) => {
              return {
                url,
                changefreq: `daily`,
                priority: 0.7
              };
            });
        }
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
