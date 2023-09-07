import './App.css';
import Nav from "./components/Nav";
import PartnerRoutes from './components/PartnerRoutes'
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <PartnerRoutes />
      <Footer />
    </div>
  );
}

export default App;
