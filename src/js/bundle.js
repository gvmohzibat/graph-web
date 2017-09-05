import React from "react";
import ReactDOM from "react-dom";

require('../scss/main.scss');

import Layout from "./components/Layout";

// require('./general-scripts.js');

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);
