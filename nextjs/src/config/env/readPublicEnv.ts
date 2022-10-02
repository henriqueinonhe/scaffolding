import { cleanEnv, port, url, str } from "envalid";
import { Environment } from "./Environment";

export const readPublicEnv = () => {
  const publicEnvSchema = {
    ENVIRONMENT: str({
      choices: Object.values(Environment),
    }),
    PORT: port(),
    APP_HOSTNAME: str(),
    ASSETS_BASE_URL: url(),
  };

  const publicEnvCandidate = {
    ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    PORT: process.env.NEXT_PUBLIC_PORT,
    APP_HOSTNAME: process.env.NEXT_PUBLIC_APP_HOSTNAME,
    ASSETS_BASE_URL: process.env.NEXT_PUBLIC_ASSETS_BASE_URL,
  };

  return cleanEnv(publicEnvCandidate, publicEnvSchema);
};
