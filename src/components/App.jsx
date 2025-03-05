import { observer } from "mobx-react";
import { useState, useContext } from "react";
import storeContext from "../contexts/store";
import { Link, Route, Routes } from "react-router-dom";
import PageA from "../pages/A";
import PageB from "../pages/B";

function App() {
  const [cnt, setCnt] = useState(0);
  const store = useContext(storeContext);

  return (
    <div>
      <h1>Hello {cnt} react from EM room!</h1>
      <Link to="/">Page A</Link>
      <Link to="/b">Page B</Link>
      <hr />
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        +1
      </button>
      <hr />
      {store.user.id}
      <hr />
      {store.catalog.products.length}
      <hr />
      <Routes>
        <Route path="/" Component={PageA}></Route>
        <Route path="/b" Component={PageB}></Route>
      </Routes>
    </div>
  );
}

const observedApp = observer(App);

export default observedApp;
