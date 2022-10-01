# NextJS Template

## SSL/TLS

It's always a good idea to make our development environment as close as possible to production, and as we'll (hopefully) be serving our application via HTTP**S**, it's useful to have SSL/TLS setup during development, especially if the backend we're connecting to during development is also being served over HTTPS, otherwise we may run into mixed context, CORS or cookies issues.

Usually, in order to enable SSL/TLS during development, we generate a self-signed certificate and then tweak our development server to use it.

Especifically in NextJS, this is often acomplished through the use of a [custom server](https://nextjs.org/docs/advanced-features/custom-server).

However, in this template we chose to follow a different path, where instead of tweaking our development server, we use NextJS's default server to serve our application using plain old HTTP and then we put a **HTTPS proxy** in front of it.

This approach has mainly three advantages over using a custom server:

1. It requires almost **no configuration**, as we're using `local-ssl-proxy`, that does all the dirty work of generating certificates, configuring and running a proxy server and redirecting all traffic to our application's server.
2. It makes it very straightforward to host our application in [Vercel](https://vercel.com/), as [**custom servers cannot be deployed on Vercel**](https://nextjs.org/docs/advanced-features/custom-server).
3. It is closer to what we're usually going to find on productive environments, especially when using PaaS, where all our applications are actually served using HTTP (which doesn't have the overhead of SSL/TLS but are also in a secure private network) and then we slap a reverse proxy/load balancer in front of them, that actually takes care of SSL/TLS.

## Configuration

Any program can be though of a function that is called by the operating system, and in the same way functions may take parameters as input, **so do programs**.

Configuration is the set of parameters programs take as input, usually during startup, whose goal is to alter/tweak the program's behavior (pretty much the same thing parameters do to a function).

In the context of web applications, these parameters usually take the form of **environment variables** (although they might take other forms, like feature flags that are fetched in runtime).

In this template we take the following approach to deal with configuration:

- We centralize all configuration under `src/config`, where configuration values are stored in a single object.
- Our config object is divided into **public** and **server** config, where **public** config values are accessible both on the client and on the server (hence public, as they are visible to the end user) and **server** config values are accessible only on the server (this is where you probably want to put API keys, tokens, secrets).
- Trying to access **server** config values on the client throws an error, so that you'll never accidentally leak these values on the client.
- We **avoid** accessing **environment variables** directly, and access them through the config object instead, so that the origin or our configuration values are **abstracted away**, which lowers coupling and facilitates changes and testing.
- Configuration values are **validated** as soon as they're loaded (which is at the application's startup), so that if there is any missing/invalid configuration valid, we fail early, by aborting the application.
- Our config object is created using an **async function**, so that we have the flexibility of having configuration values that are fetched in runtime.
