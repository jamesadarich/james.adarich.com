---
path: "/blog/fetch-api-error-handling-a-good-idea"
date: "2018-02-26"
title: "Fetch API error handling: a good idea?"
description: "Controversially perhaps, I believe the fetch API's handling of errors is a good idea. Let the flame war commence!"
keywords: "programming, javascript, fetch, browser, api, error, catch, error handling, http"
---

## TL;DR

The [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API isn't perfect but it highlights how HTTP error statuses often go unhandled and how we should be handling them as if they were 200 OK.

![dog fetching a stick](dog-fetch.jpg)

It seems like the **fetch** API is getting a lot of heat around various lackings. Whilst **fetch** certainly is not perfect *(and if we want to take http seriously we should really be using streams but that's a whole other article)* it has highlighted an area which we could do with rethinking - **error handling**.

## Error handling is an afterthought

A problem I've seen so many times with applications web, server, desktop and mobile is how they handle errors - particularly around http. Part of the problem is that they are often easily overlooked because of syntax.

Consider try catch blocks

```javascript{5-8}
try {
    const response = await http.get(url);
    doSomething(response);
}
catch(error) {
    handleError(error);
}

```

Or promises

```javascript{3}
http.get(url)
    .then(doSomething)
    .catch(handleError);
```

Or even callbacks

```javascript{4}
var request = new XMLHttpRequest();

request.addEventListener("load", doSomething);
request.addEventListener("error", handleError);

request.open("GET", url);
request.send();

```

In every case removing the highlighted lines will not result in any compile or runtime issues other than any errors will not be handled. When we're making network calls so many things can go wrong and we can often get errors so it's important we handle them. By returning any valid repsonse regardless of HTTP status, the **fetch** API forces us to handle these situations and inform our users appropriately.

## HTTP responses with error status codes are not errors

If a request doesn't get the response we *wanted* is that really an error? I'd say not because if a child asks for some chocolate and the response is *"you're not allowed"* or *"you need to say please"* this isn't really unexpected behaviour (often in fact could be argued to be the norm). Similarly if HTTP requests go under the same scrutiny surely a 4xx status code could hardly be considered an error. As such I believe we should be treating them as if they are just a part of the normal flow of the application. Even in the case of actual errors (e.g. server failed to respond, network changed etc.) we should be giving the user good messaging and enabling them to work around these issues.

## Handle all HTTP status codes

The brilliant thing about HTTP status codes is they will usually give you enough information to give the user a meaningful message and by doing this you enable users to solve their own problems and feel confident in your application. There's nothing worse than the *"something went wrong"* message, it gives the impression that the application is unreliable and is often very frustrating for users.

You could even use a generic fallback function to give the user a valuable message based on status code if you couldn't find a more relevant one for that specific scenario. For example:

```javascript
function getUserMessageByHttpStatusCode(statusCode) {
    switch(statusCode) {
        case 400:
            return "Check your form for errors and resubmit.";
        case 401:
            return "Looks like you need to log in.";
        case 403:
            return "Naughty, naughty - you're not allowed to do that.";
        default:
            // even better here would be to generate a code for
            // your users to reference that you can link to logs
            // to help in diagnosis of a bug
            return "Something unexpected happened, if this persists please contact support.";
    }
}
```

## Code review

Finally, as a part of the code review process, ensuring that any errors that can happen are caught and handled appropriately. Global catch alls aren't ideal but are a good safety net but if there's a situation in which an error can be thrown you can surely bet it will be thrown. So push back on any code reviews missing handling of errors, particularly on HTTP requests.
