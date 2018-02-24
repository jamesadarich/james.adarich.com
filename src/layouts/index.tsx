import * as React from "react";
import * as PropTypes from "prop-types";
import Header from "../components/Header";
import "./index.scss";

export default class SiteShell extends React.PureComponent {
  public render() {
    return (
      <div>
        <Header />
        <div>{(this.props.children as any)()}</div>
      </div>
    );
  }
}

(SiteShell as any).propTypes = {
  children: PropTypes.func
};
