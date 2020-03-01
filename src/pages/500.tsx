import * as React from "react";
import { Page } from "../layouts/page";

export default function UnexpectedErrorPage() {
  return (
    <Page title="Unexpected Error" description="An unexpected error ocurred">
      <div className="page-content">
        <h1>Unexpected Error</h1>
        <hr />
        <p>Yikes, something really went wrong.</p>
      </div>
    </Page>
  );
}
