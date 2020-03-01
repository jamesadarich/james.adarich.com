import * as React from "react";
import { Link } from "gatsby";

export function Header() {
  return (
    <header>
      <h1>James Adarich</h1>
      <p>
        Principal Developer @{" "}
        <a className="neworbit-link" href="https://neworbit.co.uk">
          NewOrbit
        </a>
      </p>
      <nav>
        <Link to="/">Blog</Link>
        <a href="https://github.com/jamesadarich">Github</a>
      </nav>
    </header>
  );
}
