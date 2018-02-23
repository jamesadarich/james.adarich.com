import * as React from "react";
import * as PropTypes from "prop-types";
import Header from "../components/Header";
import "./index.scss";

export default class SiteShell extends React.PureComponent {

  public render() {

    return (
      <div>
        <Header />
        <div className="body-container">
          <div className="page-container">
            {(this.props.children as any)()}
          </div>
        </div>
      </div>
    );
  }
}

(SiteShell as any).propTypes = {
  children: PropTypes.func
};
