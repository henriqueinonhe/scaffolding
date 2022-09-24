import { readPublicEnv } from "./env/public";
import { fetchPublicRemoteConfig } from "./remote/public";

export const getPublicConfig = async () => {
  const publicEnv = readPublicEnv();
  const publicRemoteConfig = await fetchPublicRemoteConfig();

  return {
    app: {
      environment: publicEnv.ENVIRONMENT,
      port: publicEnv.PORT,
      hostname: publicEnv.APP_HOSTNAME,
      assetsBaseUrl: publicEnv.ASSETS_BASE_URL,
    },
    featureFlags: publicRemoteConfig.featureFlags,
  };
};
