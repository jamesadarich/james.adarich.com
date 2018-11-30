import * as React from "react";
import { Link } from "gatsby";
import { BlogPost } from "../graphql/blog-post";

interface PostLinkProps {
  post: BlogPost;
}

export default function PostLink({ post }: PostLinkProps) {
  // ensure no redirect for non JS users / crawlers
  const postUrl = post.frontmatter.path.endsWith("/")
    ? post.frontmatter.path
    : `${post.frontmatter.path}/`;

  return (
    <div className="post-link">
      <div>
        <h2>{post.frontmatter.title}</h2>
        <p>{post.frontmatter.description}</p>
        <Link className="read-more-link" to={postUrl}>
          read more
        </Link>
      </div>
    </div>
  );
}
