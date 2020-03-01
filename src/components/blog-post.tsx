import * as React from "react";
import { Page } from "../layouts/page";
import "prismjs/themes/prism.css";
import { BlogPostQueryModel } from "../graphql/blog-post";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

interface BlogPageProps {
  data: {
    markdownRemark: BlogPostQueryModel;
  };
}

export default function BlogPost(props: BlogPageProps) {
  const { markdownRemark } = props.data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Page
      title={frontmatter.title}
      description={frontmatter.description}
      keywords={frontmatter.keywords
        .split(",")
        .map((keyword: string) => keyword.trim())}
    >
      <Helmet 
        title={frontmatter.title}
        meta={[
        { property: "og:type", content: "article" },
        { property: "og:title", content: frontmatter.title },
        { property: "og:article:published_time", content: frontmatter.date },
        { property: "og:arcticle:author", content: "James Adarich" },
        { property: "og:arcticle:tags", content: frontmatter.keywords }
      ]} />
      <div className="page-content">
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <span className="blog-timestamp">({frontmatter.date})</span>
          <hr />
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Page>
  );
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        keywords
      }
    }
  }
`;
