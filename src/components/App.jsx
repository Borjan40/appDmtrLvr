import {observer} from 'mobx-react'
import {useState, useContext} from 'react';
import storeContext from '../contexts/store';

function App() {
    const [cnt, setCnt] = useState(0);
    const store = useContext(storeContext);

    return <div>
        <h1>Hello {cnt} react from EM room!</h1>
        <button type='button' onClick={() => setCnt(cnt + 1)}>+1</button>
        <hr />
        {store.user.id}
    </div>
}

const observedApp = observer(App)

export default observedApp;