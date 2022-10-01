import { readServerEnv } from "./env/server";
import { FetchServerRemoteConfig } from "./remote/server";

type Dependencies = {
  fetchServerRemoteConfig: FetchServerRemoteConfig;
};

export const makeGetServerConfig =
  ({ fetchServerRemoteConfig }: Dependencies) =>
  async () => {
    const serverEnv = readServerEnv();
    const serverRemoteConfig = await fetchServerRemoteConfig();

    return {
      revalidate: {
        secret: serverEnv.REVALIDATE_SECRET,
      },
      featureFlags: serverRemoteConfig.featureFlags,
    };
  };

export type GetServerConfig = ReturnType<typeof makeGetServerConfig>;
