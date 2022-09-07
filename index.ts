import Express from "express";
import cors from "cors";
import router from './router'
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan"

const PORT = process.env.PORT || 3001;

const app = Express();
app.use(cors());
app.use(morgan("dev"));
app.use(router)
app.use(Express.json());



app.listen(PORT, () => {
  try {
    console.log(`🚀Server is running at http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Error launching server: ", err)
  }
})