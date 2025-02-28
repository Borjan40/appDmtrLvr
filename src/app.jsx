import { Provider } from 'mobx-react';
import App from './components/App.jsx';
import createRootStore from './store/index.js';
import storeContext from './contexts/store.js';

// const app = <App />;
// export default app;

function createApp(){
const rootStore = createRootStore();


    const app = 
    <storeContext.Provider>
        <App/>;
    </storeContext.Provider>
    return app;
}

export default createApp;
