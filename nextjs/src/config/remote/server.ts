import { ServerFeatureFlags } from "../types";

export const fetchServerRemoteConfig = async () => {
  return { featureFlags: {} as ServerFeatureFlags };
};
