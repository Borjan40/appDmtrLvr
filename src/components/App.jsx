import {observer} from 'mobx-react'
import {useState} from 'react';
import rootStore from '../store';

function App() {
    const [cnt, setCnt] = useState(0);

    return <div>
        <h1>Hello {cnt} react from EM room!</h1>
        <button type='button' onClick={() => setCnt(cnt + 1)}>+1</button>
        <hr />
        {rootStore.user.id}
    </div>
}

const observedApp = observer(App)

export default observedApp;