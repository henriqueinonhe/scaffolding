const { execSync } = require("child_process");
const { port, cleanEnv } = require("envalid");
const { existsSync, copyFileSync } = require("fs");
const { config: readEnvironmentVariablesFromDotEnv } = require("dotenv");

const main = () => {
  const env = loadEnvironmentVariables();

  execSync(
    `npx concurrently -n SSL-Proxy,Next "local-ssl-proxy --source ${env.NEXT_PUBLIC_PORT} --target ${env.SSL_PROXY_PORT}" "next dev -p ${env.SSL_PROXY_PORT}"`,
    {
      stdio: "inherit",
    }
  );
};

const loadEnvironmentVariables = () => {
  const dotEnvFileExists = existsSync(".env");

  if (!dotEnvFileExists) {
    createDotEnvFromSample();
  }

  readEnvironmentVariablesFromDotEnv();

  return cleanEnv(process.env, {
    NEXT_PUBLIC_PORT: port(),
    SSL_PROXY_PORT: port(),
  });
};

const createDotEnvFromSample = () => {
  copyFileSync(".env-sample", ".env");
};

main();
