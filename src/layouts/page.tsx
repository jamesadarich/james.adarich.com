import * as React from "react";
import Helmet from "react-helmet";
import { SiteShell } from "./index";
import { graphql, useStaticQuery } from "gatsby";
import { useLocation } from "@reach/router";

interface PageProps extends React.Props<void> {
  readonly title: string;
  readonly description: string;
  readonly keywords?: Array<string>;
}

export function Page (props: PageProps) {
  const keywords = [
    "James",
    "Adarich",
    "developer",
    "software engineer",
    "blog"
  ].concat(props.keywords);

  const location = useLocation();

  const { site } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const siteUrl = site.siteMetadata.siteUrl;

  return (
    <SiteShell>
      <div className="page-container">
        <Helmet
          title={`James Adarich - ${props.title}`}
          meta={[
            { name: "description", content: props.description },
            { name: "keywords", content: keywords.join(", ") },
            {
              name: "image",
              content: `${siteUrl}/icons/icon-512x512.png`
            },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: "James Adarich" },
            { property: "og:title", content: `James Adarich - ${props.title}` },
            { property: "og:url", content: `${siteUrl}${location.pathname}` },
            {
              property: "og:description",
              content: props.description
            },
            {
              property: "og:image",
              content: `${siteUrl}/icons/icon-512x512.png`
            },

            { property: "twitter:card", content: "summary" },
            { property: "twitter:title", content: props.title },
            { property: "twitter:image", content: `${siteUrl}/icons/icon-512x512.png` },
            { property: "twitter:description", content: props.description },
          ]}
        >
          <html lang="en" />
        </Helmet>
        {props.children}
      </div>
    </SiteShell>
  );
};
