// import app from './app.jsx'
import createApp from "./app";
import { StaticRouter } from "react-router-dom/server";

async function createServerApp(context) {
  console.log("here");
  const app = await createApp();

  // choose activeRoute by url
  // some async oper to get data
  // e t.c.

  return <StaticRouter location={context.url}>{app}</StaticRouter>;
}

export default createServerApp;
