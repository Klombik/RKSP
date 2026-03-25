require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const config = require("./config");
const { createSessionMiddleware } = require("./session");

async function bootstrap() {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: config.clientOrigin,
      credentials: true
    })
  );

  const mongoClient = new MongoClient(config.mongoUri);
  await mongoClient.connect();
  console.log("[mongo] connected");

  const { middleware: sessionMiddleware } = await createSessionMiddleware(config);
  app.use(sessionMiddleware);

  app.use((req, res, next) => {
    res.setHeader("X-Instance-Id", config.instanceId);
    res.setHeader("X-Image-Tag", config.imageTag);
    res.setHeader("X-App-Env", config.appEnv);
    next();
  });

  app.get("/health", async (req, res) => {
    res.json({
      status: "ok",
      env: config.appEnv,
      nodeEnv: config.nodeEnv,
      imageTag: config.imageTag,
      gitSha: config.gitSha,
      instanceId: config.instanceId
    });
  });

  app.post("/api/session/increment", (req, res) => {
    if (!req.session.views) {
      req.session.views = 0;
    }
    req.session.views += 1;

    res.json({
      message: "session updated",
      views: req.session.views,
      instanceId: config.instanceId,
      imageTag: config.imageTag,
      env: config.appEnv
    });
  });

  app.get("/api/session/me", (req, res) => {
    res.json({
      views: req.session.views || 0,
      sessionId: req.sessionID,
      instanceId: config.instanceId
    });
  });

  app.get("/api/release", (req, res) => {
    res.json({
      imageTag: config.imageTag,
      gitSha: config.gitSha,
      env: config.appEnv,
      instanceId: config.instanceId
    });
  });

  app.listen(config.port, () => {
    console.log(
      `[startup] port=${config.port} env=${config.appEnv} imageTag=${config.imageTag} gitSha=${config.gitSha} instance=${config.instanceId}`
    );
  });
}

bootstrap().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});