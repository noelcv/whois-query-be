import Express from "express";
import cors from "cors";
import router from './router'
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan"
import helmet from 'helmet'
import CONTENT_SECURITY_POLICY from './config/contentSecurityPolicy'
const PORT = process.env.PORT || 3001;
const allowedOrigins = [process.env.PRODUCTION_CLIENT_URL, process.env.DEV_CLIENT_URL]


const app = Express();

app.use(cors({ 
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Request origin not allowed by CORS!'))
    }
  },
  methods: ['GET'],
}
));
app.use(helmet())
app.use(helmet(
  { 
    contentSecurityPolicy: CONTENT_SECURITY_POLICY, 
    crossOriginEmbedderPolicy: true, 
    crossOriginOpenerPolicy: { policy: "same-origin" }, 
    crossOriginResourcePolicy: { policy: "same-site" },
    dnsPrefetchControl: { allow: true },
    expectCt: { enforce: true, maxAge: 30 },
    frameguard: { action: "deny" },
    hidePoweredBy: true,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: { permittedPolicies: "none" },
    referrerPolicy: { policy: "same-origin" },
    xssFilter: true,
  }))

app.use(morgan("dev"));
app.use(Express.json());
app.use(router)



app.listen(PORT, () => {
  try {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Error launching server: ", err)
  }
})