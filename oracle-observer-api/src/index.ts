import express, { Express, Request, Response } from "express";
import { db } from "./db";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/:hotspotKey/rewards/iot", async (req: Request, res: Response) => {
  try {
    const query = db
      .select("*")
      .from("iot_poc_rewards")
      .where("hotspot_key", req.params.hotspotKey)
      .limit(20)
      .orderBy("epoch_end");
    const rewards = await query;
    res.send({ rewards });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/:hotspotKey/rewards/mobile", async (req: Request, res: Response) => {
  try {
    const rewards = await db
      .select("*")
      .from("mobile_poc_rewards")
      .where("hotspot_key", req.params.hotspotKey)
      .limit(20)
      .orderBy("epoch_end");
    res.send({ rewards });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
