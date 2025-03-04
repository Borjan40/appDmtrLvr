// import { Provider } from 'mobx-react';
import App from './components/App.jsx';
import createRootStore from './store/index.js';
import storeContext from './contexts/store.js';
import http from './plugins/http.js';
import api from './api/index.js';

function createApp(){
const rootStore = createRootStore();


http.interceptors.request.use(config =>{
    console.log(1);
    return config;
})

api.products.all();
    const app = <storeContext.Provider value={rootStore}>
        <App/>
    </storeContext.Provider>;
    return app;
}

export default createApp;
