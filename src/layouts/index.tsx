import * as React from "react";
import { Header } from "../components/header";
import "./index.scss";
import GithubIcon from "../images/github-icon.svg";

export function SiteShell(props: React.Props<void>) {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
      <footer>
        <div className="footer-link">
          <a className="github-link" href="https://github.com/jamesadarich">
            <GithubIcon />
            jamesadarich
          </a>
        </div>          
        <div className="footer-link">© James Adarich</div>
      </footer>
    </div>
  );
}
