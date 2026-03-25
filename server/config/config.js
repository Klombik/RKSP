const path = require("path");

function getEnv(name, fallback = undefined) {
  return process.env[name] ?? fallback;
}

module.exports = {
  port: Number(getEnv("PORT", 3000)),
  nodeEnv: getEnv("NODE_ENV", "development"),
  appEnv: getEnv("APP_ENV", "local"),

  imageTag: getEnv("IMAGE_TAG", "dev"),
  gitSha: getEnv("GIT_SHA", "unknown"),

  mongoUri: getEnv("MONGO_URI", "mongodb://localhost:27017/calorie_tracker"),
  redisUrl: getEnv("REDIS_URL", "redis://localhost:6379"),

  sessionSecret: getEnv("SESSION_SECRET", "change-me"),
  sessionName: getEnv("SESSION_NAME", "calorie.sid"),
  sessionTtlSeconds: Number(getEnv("SESSION_TTL_SECONDS", 60 * 60 * 24)),

  clientOrigin: getEnv("CLIENT_ORIGIN", "http://localhost:5173"),

  instanceId:
    getEnv("HOSTNAME") ||
    `${process.pid}-${Math.random().toString(36).slice(2, 8)}`,

  rootDir: path.resolve(__dirname)
};