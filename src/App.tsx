import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { BackgroundMusic } from './components/BackgroundMusic';
import { MenuProvider } from './context/MenuContext';
import './App.css';

function App() {
  return (
    <MenuProvider>
      <>
        <BackgroundMusic />
        <Navbar />
        <Hero />
        <Menu />
      </>
    </MenuProvider>
  );
}

export default App;