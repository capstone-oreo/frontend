import "./App.css";
import Router from "./components/Router";
import { BrowserView, MobileView } from 'react-device-detect'

function App() {
  return (
    <div className='App'>

      <Router />
      
    </div>
  );
}

export default App;