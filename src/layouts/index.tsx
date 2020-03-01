import * as React from "react";
import Header from "../components/Header";
import "./index.scss";
import githubIcon from "../images/github.svg";

export default class SiteShell extends React.PureComponent {
  public render() {
    return (
      <div>
        <Header />
        <div>{this.props.children}</div>
        <footer>
          <div>
            <a href="https://github.com/jamesadarich">
              <img src={githubIcon} />
              jamesadarich
            </a>
          </div>
          <div>© James Adarich</div>
        </footer>
      </div>
    );
  }
}
