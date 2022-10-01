export const makeFetchServerRemoteConfig = () => async () => {
  return { featureFlags: {} };
};

export type FetchServerRemoteConfig = ReturnType<
  typeof makeFetchServerRemoteConfig
>;
