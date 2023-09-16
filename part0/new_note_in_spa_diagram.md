```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: new_note_spa
    deactivate server

    Note right of browser: In the JavaScript code, an event handler for the form's submit event prevents the default way 
    of handling the form event. This prevents the page from reloading like the traditional webpage version. Then, the event 
    handler creates a new note, appends it to the notes list, and rerenders the note list on the page. Lastly, it sends the 
    new note to the server in the form of a JSON string.
```