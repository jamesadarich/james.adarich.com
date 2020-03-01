import * as React from "react";
import { Link } from "gatsby";

export function Header() {
  return (
    <header>
      <h1>James Adarich <small>software engineer and geek</small></h1>
      <p>
        Principal Developer @{" "}
        <a title="NewOrbit website" className="neworbit-link" href="https://neworbit.co.uk">
          NewOrbit
        </a>
      </p>
      <nav>
        <Link to="/" title="James Adarich Blog">Blog</Link>
        <a title="James Adarich on GitHub" href="https://github.com/jamesadarich">Github</a>
      </nav>
    </header>
  );
}
