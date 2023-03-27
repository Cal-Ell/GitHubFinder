import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import {GithubProvider} from './context/github/GithubContext';
import {AlertContextProvider} from './context/alert/AlertContext';

function App() {
  return (
    <GithubProvider>
      <AlertContextProvider>
      <Router>  
        <div className="flex flex-col justify-betweenh-screen">
          <Navbar />
          <main className='container mx-auto px-3 pb-12'>
            <Alert />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/notfound' element={<NotFound />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      </AlertContextProvider>
    </GithubProvider>
  );
}

export default App;
