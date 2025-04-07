// import app from './app.jsx'
import { matchRoutes } from "react-router";
import createApp from "./app";
import { StaticRouter } from "react-router-dom/server";
import routes from "./router";
import casheContext from "./contexts/cashe";

interface ServerAppContext {
  url: string;
}


async function createServerApp(context: ServerAppContext) {
  const { app, store, api } = await createApp();
  const activeRoutes = matchRoutes(routes, context.url);
  const cashe: Record<string, unknown> = {};

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
    responses.forEach((response) => {
      if (response !== false) {
        cashe[response[0]] = response[1];
      }
    });
  }

  // console.log(cashe);

  const serverApp = (
    <StaticRouter location={context.url}>
      <casheContext.Provider value={cashe}>{app}</casheContext.Provider>
    </StaticRouter>
  );

  return { app: serverApp, store };
}

export default createServerApp;
