const session = require("express-session");
const { RedisStore } = require("connect-redis");
const { createClient } = require("redis");

async function createSessionMiddleware(config) {
  const redisClient = createClient({
    url: config.redisUrl
  });

  redisClient.on("error", (err) => {
    console.error("[redis] error:", err.message);
  });

  await redisClient.connect();

  const store = new RedisStore({
    client: redisClient,
    prefix: "calorie:sess:"
  });

  const middleware = session({
    store,
    name: config.sessionName,
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "lax",
      maxAge: config.sessionTtlSeconds * 1000
    }
  });

  return { middleware, redisClient };
}

module.exports = { createSessionMiddleware };