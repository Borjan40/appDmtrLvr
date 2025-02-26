# React + Vite

- отключили раздачу статики в файле server.js ---> //server.use(express.static('dist')) HTML ответ приходит и в нем сгенерированный бандл JS из dist/assets/index-dac0ddbf.js не загружается;

- сделали стор с помощью mobx;
- в компоненте APP делаем прямой импорт  rootStore из ...store (при условии, что App по сути модуль синглтон);

В результате вышеописанного при запуске серверной сборки с SSR у разных юзеров при выводе на экран {rootStore.user.id} генерируется одинаковый(а он генериться с пом. Math.random, и на dev сборке id при каждом запуске страницы меняется)

Проблема заключается в том, что в файл server.js один раз берет собранный бандл 
--> import app from './dist-server/entry-server.js';
При этом rootStore в файле src/store/index.js общий, и сделан как синглтон.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
