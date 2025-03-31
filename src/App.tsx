// import { Provider } from 'mobx-react';
import App from "./components/App.jsx";
import RootStore from "./store/index.js";
import storeContext from "./contexts/store.js";
import createHttpPlugin from "./plugins/http.js";
import createApi from "./api/index.js";
import apiContext from "./contexts/api.js";

async function createApp() {
  const http = createHttpPlugin("https://faceprog.ru/reactcourseapi/");
  const api = createApi(http);
  const store = new RootStore(api);

  console.log("app.jsx store", store);
  await store.catalog.load();
  const app = (
    <apiContext.Provider value={api}>
      <storeContext.Provider value={store}>
        <App />
      </storeContext.Provider>
    </apiContext.Provider>
  );

  return { app, store };
}

export default createApp;
