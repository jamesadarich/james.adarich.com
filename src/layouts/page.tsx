import * as React from "react";
import Helmet from "react-helmet";

interface PageProps {    
    readonly title: string;
    readonly description: string;
    readonly keywords?: Array<string>;
}

export abstract class Page extends React.PureComponent<PageProps> {
    
    private get keywords() {
        return [
            "James Adarich",
            "developer",
            "software engineer",
            "blog"
        ].concat(this.props.keywords);
    }

    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>                
                <Helmet
                    title={`James Adarich - ${this.props.title}`}
                    meta={[
                        { name: "description", content: this.props.description },
                        { name: "keywords", content: this.keywords.join(", ") }
                    ]}
                    >
                    <html lang="en" />
                </Helmet>
                {this.props.children}
            </div>
        )
    }
}
