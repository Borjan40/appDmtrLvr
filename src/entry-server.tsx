// import app from './app.jsx'
import { matchRoutes } from "react-router";
import createApp from "./app";
import { StaticRouter } from "react-router-dom/server";
import routes from "./router";

interface ServerAppContext {
  url: string;
}

async function createServerApp(context: ServerAppContext) {
  const { app, store, api } = await createApp();

  const activeRoutes = matchRoutes(routes, context.url);

  if (activeRoutes) {
    const dataRequests = activeRoutes?.map(
      (i) =>
        i.route.data != undefined &&
        i.route.data({
          store,
          api,
          params: i.params,
        })
    );

    const responses = await Promise.all(dataRequests);
    console.log(responses);
  }

  const serverApp = <StaticRouter location={context.url}>{app}</StaticRouter>;
  return { app: serverApp, store };
}

export default createServerApp;
