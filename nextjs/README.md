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
