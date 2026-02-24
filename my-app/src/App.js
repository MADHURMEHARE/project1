
import './App.css';
import Register from './components/Register';
import { Toaster } from "react-hot-toast";

function App() {
  return (
 <>
      <Toaster position="top-right" />
      <Register />
    </>
  );
}

export default App;
