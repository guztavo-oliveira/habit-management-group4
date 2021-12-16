
import { ToastContainer } from "react-toastify";

import Routes from "./routes";
// import Login from "./pages/Login";
import GlobalStyles from "./styles/globalStyles";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      {/* <Login /> */}
      <GlobalStyles />
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
