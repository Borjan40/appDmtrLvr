// import { Provider } from 'mobx-react';
import App from './components/App.jsx';
import createRootStore from './store/index.js';
import storeContext from './contexts/store.js';

function createApp(){
const rootStore = createRootStore();
    const app = <storeContext.Provider value={rootStore}>
        <App/>
    </storeContext.Provider>;
    return app;
}

export default createApp;
