import * as React from "react";
import Helmet from "react-helmet";
import SiteShell from "./index";
import { graphql, StaticQuery } from "gatsby";

interface PageProps {
  readonly title: string;
  readonly description: string;
  readonly keywords?: Array<string>;
}

export abstract class Page extends React.PureComponent<PageProps> {
  private get keywords() {
    return [
      "James",
      "Adarich",
      "developer",
      "software engineer",
      "blog"
    ].concat(this.props.keywords);
  }

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <SiteShell>
        <div className="page-container">
          <StaticQuery
            query={seoQuery}
            render={({ site: { siteMetadata: { siteUrl }}}) => (
              <Helmet
                title={`James Adarich - ${this.props.title}`}
                meta={[
                  { name: "description", content: this.props.description },
                  { name: "keywords", content: this.keywords.join(", ") },
                  { name: "image", content: `${siteUrl}/icons/icon-512x512.png` },
                  { property: "og:title", content: this.props.title },
                  { property: "og:description", content: this.props.description },
                  { property: "og:image", content: `${siteUrl}/icons/icon-512x512.png` }
                ]}
              >
                <html lang="en" />
              </Helmet>
            )}
          />
          {this.props.children}
        </div>
      </SiteShell>
    );
  }
}

const seoQuery = graphql`query SEO {
  site {
    siteMetadata {
      siteUrl
    }
  }
}`;
