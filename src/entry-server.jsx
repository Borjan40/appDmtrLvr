// import app from './app.jsx'
import createApp from "./app";

function createServerApp(){
    console.log('here');
    const app = createApp();

        // choose activeRoute by url
        // some async oper to get data
        // e t.c.

    return app;
}

export default createServerApp;