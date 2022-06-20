import Header from './components/header/Header';
import Body from './components/body/Body';
import { Fragment } from 'react';
import ScrollContextProvider from './components/context/ScrollContextProvider';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Fragment>
      <ScrollContextProvider>
        <Header />
        <Body />
        <Footer />
      </ScrollContextProvider>
    </Fragment>
  );
}

export default App;
