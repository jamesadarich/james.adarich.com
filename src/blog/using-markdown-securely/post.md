---
path: "/blog/using-markdown-securely"
date: "2020-07-26"
title: "Using Markdown Securely"
description: "Markdown is a simple solution for writing and maintaining rich text but it's security credentials aren't all that"
keywords: "Markdown, security, web"
draft: false
---

![Markdown logo](markdown.png)

**Markdown** is a markup langauge for text formatting, however under the surface lies a whole host of functionality which could leave your app open to abuse and attack.

## What's the big deal?

Injecting XSS into **Markdown** is very easy, just check out this totally normal link for example.

```markdown
[Click for XSS](javascript:alert('You just got hacked!'))
```

Also, **Markdown** supports HTML so the following is also completely valid.

```markdown
<script>console.log("here be hacks!")</script>
```

Beyond this there are even more options but I think the point has been made.

Most **Markdown** libs have a "sanitize" functionality but they acknowledge that these don't work properly / are deprecated

[marked sanitize warning](https://github.com/markedjs/marked/blob/0c561f34590d392eaa9bf219aec1d34aab985c92/README.md#warning--marked-does-not-sanitize-the-output-html-please-use-a-sanitize-library-like-dompurify-recommended-sanitize-html-or-insane-on-the-output-html-)

[showdown acknowledgement](https://github.com/showdownjs/showdown#xss-vulnerability)

## OK, how do I secure my Markdown then?

Good news is there are loads of options to properly sanitize the HTML output from a **Markdown** libaray. Below is an example using [dompurify](https://www.npmjs.com/package/dompurify) inside a `react` component.

```typescript{3,13}
import * as marked from "marked";
import * as React from "react";
import { sanitize } from "dompurify";

interface MarkdownEditorProps {
    value: string;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
    const [markdownValue, setMarkdownValue] = React.useState(""));

    const onChange = React.useCallback((value, valid) => {
        setMarkdownValue(sanitize(marked(value)));
    }, []);

    return (<textarea value={markdownValue} onChange={onChange} />;
}
```

### But what about the back end?

Yep, of course we can't trust anything coming from a client so we'll have to do it on the back end too.

If you're using node you can use `dompurify` again in exactly the same way but let's make this a bit more difficult with some C#. This is just as simple see the example below using [HtmlSanitizer](https://www.nuget.org/packages/HtmlSanitizer/).

```csharp{3,16}
namespace YourApp.Namespace
{
    using Ganss.XSS;

    public class HtmlSanitizationService
    {
        private readonly IHtmlSanitizer htmlSanitizer;

        public HtmlSanitizationService(IHtmlSanitizer htmlSanitizer)
        {
            this.htmlSanitizer = htmlSanitizer;
        }

        public string Sanitize(string unsanitizedHtml)
        {
            return this.htmlSanitizer.Sanitize(unsanitizedHtml);
        }
    }
}
```

### Great, now how do I display this safely?

Just use the `dompurify` sanitize function again and your golden (note regardless of where HTML is coming from you should always sanitize it coming into `dangerouslySetInnerHTML`. The name of the prop should be a clue!)

```typescript{2,13}
import * as React from "react";
import { sanitize } from "dompurify";

interface HtmlRendererProps {
    value: string;
}

export function HtmlRenderer({ value }: HtmlRendererProps) {

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: sanitize(value)
            }}
        />
    );
}
```

## Wait! What about when the user wants to edit?

Perfect, you've found the hole in the solution. As we've had to rely on **HTML** sanitizers to get the job done we've inadvertently changed the data type. So when the user comes to edit a field, suddenly they are presented with some **HTML** and not the **Markdown** they'd initially input. Fortunatly, [turndown](https://www.npmjs.com/package/turndown) gives us the ability to reverse engineer the **Markdown** from the **HTML** so all we need to do is use this when we're loading the value back into our component's state.

```typescript{4,11,13}
import * as marked from "marked";
import * as React from "react";
import { sanitize } from "dompurify";
import TurndownService from "turndown";

interface MarkdownEditorProps {
    value: string;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
    const turndownService = new TurndownService();
    const [markdownValue, setMarkdownValue] = React.useState(
        turndownService.turndown(props.value)
    );

    const onChange = React.useCallback((value, valid) => {
        setMarkdownValue(sanitize(marked(value)));
    }, []);

    return (<textarea value={markdownValue} onChange={onChange} />;
}
```

## Awesome, can you just briefly summarize that for me?

For sure;

1. Sanitize the **Markdown** in the app
2. Sanitize the converted **HTML** before storing
3. Ensure you sanitize the stored **HTML** before you display it
4. Remember to convert the **HTML** back to **Markdown** before editing

As a side note this highlights the importance of implementing a strong [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) as if we miss a potential **XSS** attack we can fall back to this to help protect our application and users.
