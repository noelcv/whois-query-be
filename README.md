# whois-query-be
Back-end repository for a WhoisQuery Application.

## Tech Stack

<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="36" height="36" alt="TypeScript" /></a>
<a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="36" height="36" alt="NodeJS" /></a>
<a href="https://expressjs.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express-colored-dark.svg" width="36" height="36" alt="Express" /></a>
<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mongodb-colored.svg" width="36" height="36" alt="MongoDB" /></a>
<a href="https://www.heroku.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/heroku-colored.svg" width="36" height="36" alt="Heroku" /></a>
</p>


## Security considerations

### No external libraries to perform Whois queries
To reduce vulnerabilities associated with external dependencies in the core service of the application, we relied solely on the default NET module from NodeJS, which provides an asynchronous network API for creating stream-based TCP servers.

### CORS Policy

We define environment variables for allowedOrigins and pass them as options on CORS middleware to verify the requests are coming from trusted origins. 

On Heroku, we safely store those environment variables to be accessed in PRODUCTION.

Moreover, we also define the HTTP Request methods to be allowed - for now, only GET requests are allowed, given that we are only storing queries logs on the database.

### Security Middleware and Server-side sanitization

Using helmet as Middleware to set custom headers, we define custom security policies to reduce the surface and preventing against MIME-Type sniffing, Man-in-the-Middle and XSS-Cross Site Scripting attacks.

We also validate the query parameters from the client against REGEX patterns to match the following conditions: 
    - The domain name shall have between 1 and 63 characters.
    - Only alphanumeric characters and hiffens (-) are acceptable.
    - Period (.) signs are allowed as long as they are not placed neither at the beginning nor at the end of the SLD. Also, we implemented sanitization against having two dots in a row;
    - Parallel validation of the Top-Level Domains against the list of supported TLD by the application.

### Semantic Error Handling
All the controllers provide consistent error handling, using try/catch blocks, with semantical comments both for guidance over development, but also to provide contextual feedback to enhance the UX / UI, without exposing sensible information on the App architecture.

## Separation of Concerns
In order to keep the codebase clean and maintainable, we followed separation of concerns conventions and keep separate folders and files for Controllers, Models, Utils and Configurations. 