// import { Provider } from 'mobx-react';
import App from './components/App.jsx';
import createRootStore from './store/index.js';
import storeContext from './contexts/store.js';
import createHttpPlugin from './plugins/http.js';
import createApi from './api/index.js';

function createApp() {
    const http = createHttpPlugin('https://faceprog.ru/reactcourseapi/');
    const api = createApi(http)
    const rootStore = createRootStore();

    http.interceptors.request.use(config => {
        console.log(1);
        return config;
    })

    api.products.all();
    const app = <storeContext.Provider value={rootStore}>
        <App />
    </storeContext.Provider>;
    return app;
}



export default createApp;
