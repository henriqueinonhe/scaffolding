export const makeFetchPublicRemoteConfig = () => async () => {
  return { featureFlags: {} };
};

export type FetchPublicRemoteConfig = ReturnType<
  typeof makeFetchPublicRemoteConfig
>;
