import { makeGetConfig } from "./config";
import { makeGetPublicConfig } from "./public";
import { makeFetchPublicRemoteConfig } from "./remote/public";
import { makeFetchServerRemoteConfig } from "./remote/server";
import { makeGetServerConfig } from "./server";

type Dependencies = {
  isServer: boolean;
};

export const createContainer = ({ isServer }: Dependencies) => {
  const fetchPublicRemoteConfig = makeFetchPublicRemoteConfig();

  const fetchServerRemoteConfig = makeFetchServerRemoteConfig();

  const getPublicConfig = makeGetPublicConfig({
    fetchPublicRemoteConfig,
  });

  const getServerConfig = makeGetServerConfig({
    fetchServerRemoteConfig,
  });

  const getConfig = makeGetConfig({
    isServer,
    getPublicConfig,
    getServerConfig,
  });

  return {
    getConfig,
  };
};
