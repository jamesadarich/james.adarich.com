import * as React from "react";
import Link from "gatsby-link";

export default function PostLink({ post }: any) {
  return (
    
    <div className="post-link">    
      <div>
        <h2>{post.frontmatter.title}</h2>
        <p>{post.frontmatter.description}</p>
        <Link className="read-more-link" to={post.frontmatter.path}>read more</Link>
      </div>
    </div>
  );
}
