import Ads from './comps/Ads';
import Footer from './comps/Footer';
import Header from './comps/Header';
import ListUrls from './comps/ListUrls';
import NewUrlForm from './comps/NewUrlForm';

const App = () => {
  return (
    <div className="app container grid gap-2 m-auto">
      <Header />
      <div className="main gap-2 grid md:grid-cols-3 md:grid-rows-2">
        <NewUrlForm />
        <Ads className="md:row-start-2" />
        <ListUrls className="bg-blue-200 md:col-span-2 md:row-span-2" />
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default App;
