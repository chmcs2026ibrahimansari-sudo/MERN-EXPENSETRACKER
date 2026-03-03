import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import cors from "cors"
dotenv.config()
const app = express();
const port = process.env.PORT || 3001
    app.use(cors(
    {
         origin:'https://mernexpensetracker-1.onrender.com/',
        credentials:true
    }
))

 app.use(express.json());

app.use("/expenses", expenseRoutes)
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/expenses`)
    })
})
