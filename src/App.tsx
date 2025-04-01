// import { Provider } from 'mobx-react';
import App from "./components/App";
import RootStore from "./store/index";
import storeContext from "./contexts/store";
import createHttpPlugin from "./plugins/http";
import createApi from "./api/index";
import apiContext from "./contexts/api";

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
