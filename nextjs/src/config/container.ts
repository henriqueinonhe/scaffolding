import * as AwilixHelpers from "@/awilixUtils";
import {
  asValue,
  createContainer as createContainerBuilder,
  InjectionMode,
} from "awilix";
import { makeClientGetConfig } from "./config/clientGetConfig";
import { makeGetPublicConfig } from "./config/getPublicConfig";
import { makeGetServerConfig } from "./config/getServerConfig";
import { makeServerGetConfig } from "./config/serverGetConfig";
import {
  FetchPublicRemoteConfig,
  fetchPublicRemoteConfig as stockFetchPublicRemoteConfig,
} from "./remote/fetchPublicRemoteConfig";
import {
  FetchServerRemoteConfig,
  fetchServerRemoteConfig as stockFetchServerRemoteConfig,
} from "./remote/fetchServerRemoteConfig";

type Dependencies = {
  isServer: boolean;
  fetchPublicRemoteConfig?: FetchPublicRemoteConfig;
  fetchServerRemoteConfig?: FetchServerRemoteConfig;
};

export const make = ({
  isServer,
  fetchPublicRemoteConfig = stockFetchPublicRemoteConfig,
  fetchServerRemoteConfig = stockFetchServerRemoteConfig,
}: Dependencies) => {
  const dependenciesResolvers = {
    fetchPublicRemoteConfig: asValue(fetchPublicRemoteConfig),
    fetchServerRemoteConfig: asValue(fetchServerRemoteConfig),
    getPublicConfig: AwilixHelpers.asSingletonFunction(makeGetPublicConfig),
    getServerConfig: AwilixHelpers.asSingletonFunction(makeGetServerConfig),
    getConfig: isServer
      ? AwilixHelpers.asSingletonFunction(makeServerGetConfig)
      : AwilixHelpers.asSingletonFunction(makeClientGetConfig),
  };

  const containerBuilder = createContainerBuilder<
    AwilixHelpers.AwilixContainer<typeof dependenciesResolvers>
  >({
    injectionMode: InjectionMode.PROXY,
  });

  containerBuilder.register(dependenciesResolvers);

  return containerBuilder.cradle;
};

export type Container = ReturnType<typeof make>;
