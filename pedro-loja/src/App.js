import './App.css';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Produsts from './components/Products.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div >
        <Produsts />
      </div>

      <div className='footer'>
        <Footer />
      </div>
    </div >
  );
}

export default App;
