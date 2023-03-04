/* eslint-disable jsx-a11y/alt-text */
import './App.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormArtist from '../components/Form';

function App() {  

  return (
    <div className="App container mt-3 badge bg-secondary">
        {/*-------------- Header -----------*/}
        <Header />
        
        {/*-------------- Form -----------*/}
        <FormArtist />

        {/*-------------- Footer -----------*/}
        <Footer />
    </div>
  );
}

export default App;
