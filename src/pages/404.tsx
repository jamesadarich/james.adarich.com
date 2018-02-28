import * as React from "react";
import { Page } from "../layouts/page";

export default class NotFoundPage extends React.PureComponent {
  public render() {
    return (
      <Page title="Not Found" description="Not Found">
        <div className="page-content">
          <h1>Not Found</h1>
          <hr />
          <p>We couldn't find what you were looking for.</p>
        </div>
      </Page>
    );
  }
}
