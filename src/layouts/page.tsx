import * as React from "react";
import Helmet from "react-helmet";
import SiteShell from "./index";
import { graphql } from "gatsby";

interface PageProps {
  readonly title: string;
  readonly description: string;
  readonly keywords?: Array<string>;
  readonly site: {
    siteMetadata: {
      siteUrl: string;
    }
  }
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
          <Helmet
            title={`James Adarich - ${this.props.title}`}
            meta={[
              { name: "description", content: this.props.description },
              { name: "keywords", content: this.keywords.join(", ") },
              { name: "image", content: `${this.props.site.siteMetadata.siteUrl}/icons/icon-512x512.png` },
              { property: "og:title", content: this.props.title },
              { property: "og:description", content: this.props.description },
              { property: "og:image", content: `${this.props.site.siteMetadata.siteUrl}/icons/icon-512x512.png` }
            ]}
          >
            <html lang="en" />
          </Helmet>
          {this.props.children}
        </div>
      </SiteShell>
    );
  }
}

export const pageQuery = graphql`{
  site {
    siteMetadata {
      siteUrl
    }
  }
}`;
