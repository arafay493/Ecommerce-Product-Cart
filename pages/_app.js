import "@/styles/globals.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <Provider store = {store}>
      <ToastContainer />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
