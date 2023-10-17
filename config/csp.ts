const CONTENT_SECURITY_POLICY: object = {
  useDefaults: true,
  directives: {
    defaultSrc: ["'self'", 'whois-query-fe.vercel.app/*'],
    scriptSrc: ["'self'", 'whois-query-fe.vercel.app/*'],
    connectSrc: ["'self'", 'https://whois-query-fe.vercel.app/*'],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    styleSrc: ["'self'"],
    fontSrc: ["'self'"],
    sandbox: ["allow-forms", "allow-scripts"],
    reportUri: "/report-violation",
  },
  reportOnly: true,
}
// default-src 'none'; 


export default CONTENT_SECURITY_POLICY