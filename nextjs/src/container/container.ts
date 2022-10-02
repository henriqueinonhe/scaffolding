import * as Config from "@/config";
import * as Utils from "@/utils";
import * as AwilixUtils from "@/awilixUtils";
import {
  asValue,
  createContainer as createContainerBuilder,
  InjectionMode,
} from "awilix";

export const createContainer = () => {
  const dependenciesResolvers = {
    // Modules
    Config: AwilixUtils.asSingletonFunction(Config.make),
    Utils: AwilixUtils.asSingletonFunction(Utils.make),

    // Services
    isServer: AwilixUtils.asSingletonFunction(
      ({ Utils }: { Utils: Utils.Type }) => Utils.isServer
    ),
    fetchPublicRemoteConfig: asValue(undefined),
    fetchServerRemoteConfig: asValue(undefined),
  };

  const containerBuilder = createContainerBuilder<
    AwilixUtils.AwilixContainer<typeof dependenciesResolvers>
  >({
    injectionMode: InjectionMode.PROXY,
  });

  containerBuilder.register(dependenciesResolvers);

  return containerBuilder.cradle;
};
