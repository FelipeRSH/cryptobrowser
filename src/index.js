import React from "react";
import {createRoot} from "react-dom/client"
import App from './App.js';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import 'antd/dist/reset.css'
import store from "./app/store";

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<Router><Provider store={store}><App /></Provider></Router>);