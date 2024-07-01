import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./apps/store";
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
    <Provider store={store}>
        <Toaster />
        <App />
    </Provider>
)
