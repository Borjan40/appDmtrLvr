# React + Vite

Перехватчики в axios добавляются с помощью методов interceptors.request.use для запросов и interceptors.response.use для ответов. Каждый раз, когда вы вызываете эти методы, добавляется новый перехватчик.

В вашем случае, в функции createApp вы добавляете перехватчик запроса с помощью http.interceptors.request.use. Если эта функция будет вызываться несколько раз, перехватчик будет добавляться заново без очистки предыдущих, что приведёт к их накоплению.

Чтобы избежать этого, можно использовать метод eject для удаления перехватчика перед добавлением нового. Этот метод принимает идентификатор перехватчика, который возвращается при его добавлении.

**Вот пример того, как это можно сделать:**
```
function createApp() {
  const rootStore = createRootStore();

  // Получаем идентификатор текущего перехватчика
  const interceptorId = http.interceptors.request.use(config => {
    console.log(1);
    return config;
  });

  api.products.all();
  const app = (
    <storeContext.Provider value={rootStore}>
      <App />
    </storeContext.Provider>
  );

  // Удаляем перехватчик перед возвратом приложения
  http.interceptors.request.eject(interceptorId);
  return app;
}
```
В этом примере мы сначала добавляем перехватчик и сохраняем его идентификатор в переменную interceptorId. Затем мы удаляем перехватчик с помощью метода eject перед возвратом приложения. Это гарантирует, что каждый раз при создании приложения будет использоваться только один перехватчик.



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
