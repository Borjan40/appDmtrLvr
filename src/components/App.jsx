import {useState} from 'react';

function App() {
    const [cnt, setCnt] = useState(0);

    return <div>
        <h1>Hello {cnt} react from EM room!</h1>
        <button type='button' onClick={() => setCnt(cnt + 1)}>+1</button>
    </div>
}

export default App;