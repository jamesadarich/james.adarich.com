import * as React from "react";
import Helmet from "react-helmet";
import SiteShell from "./index";
import { graphql, StaticQuery } from "gatsby";
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

  return (
    <SiteShell>
      <div className="page-container">
        <StaticQuery
          query={seoQuery}
          render={({
            site: {
              siteMetadata: { siteUrl }
            }
          }) => (
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
                { property: "og:title", content: props.title },
                { property: "og:url", content: `${siteUrl}${location.pathname}` },
                {
                  property: "og:description",
                  content: props.description
                },
                {
                  property: "og:image",
                  content: `${siteUrl}/icons/icon-512x512.png`
                }
              ]}
            >
              <html lang="en" />
            </Helmet>
          )}
        />
        {props.children}
      </div>
    </SiteShell>
  );
};

const seoQuery = graphql`
  query SEO {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
