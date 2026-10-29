import * as React from "react";
import { Link } from "gatsby";
import { BlogPostQueryModel } from "../graphql/blog-post";

interface PostLinkProps {
  post: BlogPostQueryModel;
}

export function PostLink({ post }: PostLinkProps) {

  return (
    <div className="post-link">
      <div>
        <h2>{post.frontmatter.title}</h2>
        <p>{post.frontmatter.description}</p>
        <Link title={`Read ${post.frontmatter.title}`} className="read-more-link" to={post.frontmatter.path}>
          read more
        </Link>
      </div>
    </div>
  );
}
