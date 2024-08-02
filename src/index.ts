import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import bedRockRoutes from "./routes/bedRockRoutes";

//[dotenv configuration]
dotenv.config();

const app:Express = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res)=>{
  res.send("Express + Typescript");
});

app.use("/api/bedrock", bedRockRoutes);

app.listen(port, ()=>{
   console.log(`[Server]: Server is startng on port ${port}.`);
});