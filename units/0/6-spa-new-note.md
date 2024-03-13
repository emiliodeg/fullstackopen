# Exercise 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: main.css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Some text", "date": "2024-01-01" }, ... ]
    deactivate server

    Note right of browser: Browser add unsorted list of comments, and then the user input some text on textarea and clicks on "Save" labeled button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa payload: {content: "this text is a test", date: "2024-03-13T20:44:14.243Z" }
    activate server
    server-->>browser: HTTP 201
    deactivate server

    Note right of browser: Browser get the response and if it's OK (HTTP 201) add the new note and redraw the unsorted list of comments.
```