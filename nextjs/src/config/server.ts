import { readServerEnv } from "./env/server";
import { fetchServerRemoteConfig } from "./remote/server";

export const getServerConfig = async () => {
  const serverEnv = readServerEnv();
  const serverRemoteConfig = await fetchServerRemoteConfig();

  return {
    revalidate: {
      secret: serverEnv.REVALIDATE_SECRET,
    },
    featureFlags: serverRemoteConfig.featureFlags,
  };
};
