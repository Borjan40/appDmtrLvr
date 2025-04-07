// import app from './app.jsx'
import createApp from "./app";
import { StaticRouter } from "react-router-dom/server";
import casheContext from "./contexts/cashe";

interface ServerAppContext {
  url: string;
}

async function createServerApp(context: ServerAppContext) {
  const { app, store } = await createApp();
  const cashe: Record<string, unknown> = {};
  const serverApp = (
    <StaticRouter location={context.url}>
      <casheContext.Provider value={cashe}>{app}</casheContext.Provider>
    </StaticRouter>
  );
  return { app: serverApp, store };
}

export default createServerApp;
