// import app from './app.jsx'
import createApp from "./app";
import { StaticRouter } from "react-router-dom/server";
import casheContext, { Cashe } from "./contexts/cashe";

interface ServerAppContext {
  url: string;
}

async function createServerApp(context: ServerAppContext) {
  const { app, store } = await createApp();
  const cashe: Cashe = { data: {}, awaiting: {} };

  const serverApp = (
    <StaticRouter location={context.url}>
      <casheContext.Provider value={cashe}>{app}</casheContext.Provider>
    </StaticRouter>
  );
  return { app: serverApp, store, cashe };
}

export default createServerApp;
