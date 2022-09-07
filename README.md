# whois-query-be

## Security considerations

### Server-side sanitization: 
We validate the payload from the client against REGEX patterns to match the following conditions: 
    - The domain name shall have between 1 and 63 characters.
    - Only alphanumeric characters and hiffens (-) are acceptable.
    - Period (.) signs are allowed as long as they are not placed neither at the beginning nor at the end of the SLD. Also, we implemented sanitization against having two dots in a row;
    - Parallel validation of the Top-Level Domains against the list of supported TLD by the application.
  
### No external libraries to perform Whois queries
To reduce vulnerabilities associated with external dependencies in the core service of the application, we relied solely on the default NET module from NodeJS, which provides an asynchronous network API for creating stream-based TCP servers.

### Semantic Error Handling
All the controllers provide consistent error handling, using try/catch blocks, with semantical comments both for guidance over development, but also to provide contextual feedback to enhance the UX / UI, without exposing sensible information on the App architecture.

## Separation of Concerns
