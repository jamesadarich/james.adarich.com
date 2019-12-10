import * as React from "react";
import Header from "../components/Header";
import "./index.scss";

export default class SiteShell extends React.PureComponent {
  public render() {
    return (
      <div>
        <Header />
        <div>{this.props.children}</div>
        <footer>© James Adarich</footer>
      </div>
    );
  }
}
