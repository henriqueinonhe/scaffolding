import { readPublicEnv } from "../env/readPublicEnv";
import { FetchPublicRemoteConfig } from "../remote/fetchPublicRemoteConfig";

type Dependencies = {
  fetchPublicRemoteConfig: FetchPublicRemoteConfig;
};

export const makeGetPublicConfig =
  ({ fetchPublicRemoteConfig }: Dependencies) =>
  async () => {
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

export type GetPublicConfig = ReturnType<typeof makeGetPublicConfig>;
