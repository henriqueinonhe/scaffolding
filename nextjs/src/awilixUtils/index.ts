import {
  FunctionReturning,
  BuildResolverOptions,
  asFunction,
  Lifetime,
  Constructor,
  asClass,
  BuildResolver,
  DisposableResolver,
  Resolver,
} from "awilix";

export const asSingletonFunction = <T>(
  fn: FunctionReturning<T>,
  options?: BuildResolverOptions<T>
) =>
  asFunction<T>(fn, {
    ...options,
    lifetime: Lifetime.SINGLETON,
  });

export const asSingletonClass = <T>(
  constructor: Constructor<T>,
  options?: BuildResolverOptions<T>
) =>
  asClass(constructor, {
    ...options,
    lifetime: Lifetime.SINGLETON,
  });

type ExtractResolverType<T> = T extends Resolver<infer U>
  ? U
  : T extends BuildResolver<infer U>
  ? U
  : T extends DisposableResolver<infer U>
  ? U
  : never;

export type AwilixContainer<Dependencies> = {
  [Key in keyof Dependencies]: ExtractResolverType<Dependencies[Key]>;
};
