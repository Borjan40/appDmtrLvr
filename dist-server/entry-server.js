import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
function App() {
  const [cnt, setCnt] = useState(0);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "Hello ",
      cnt,
      " react from EM room!"
    ] }),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setCnt(cnt + 1), children: "+1" })
  ] });
}
const app = /* @__PURE__ */ jsx(App, {});
export {
  app as default
};
