import { PublicFeatureFlags } from "../types";

export const fetchPublicRemoteConfig = async () => {
  return { featureFlags: {} as PublicFeatureFlags };
};
