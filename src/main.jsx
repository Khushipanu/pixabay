import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router"
import './index.css'
import { SavedImagesProvider } from "./context/savedImagesContext.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <SavedImagesProvider>
    <App/>
  </SavedImagesProvider>
</BrowserRouter>

)
