# React + Vite

rootstore:
-сделан в виде класса, у него как поля есть ссылки на модули
-в каждый из конкретных модулей отправить ссылку на rootstore
-и при создании каждого модуля внутрь модуля передать this

модуль:

- в своем конструкторе хранит ссылку на конструкцию class RootStore
- через rootStore может дотянуться до другого модуля

такой подход "плоской структуы" (без иерархии) имеет отношение к информационным модулям, к сущностным таким как store, todo, не относится.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
