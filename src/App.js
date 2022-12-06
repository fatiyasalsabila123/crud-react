import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navigation from './Component/Navigation';
import Home from './Pages/Home';
import Edit from './Pages/Edit';

function App() {
  return (
    <div className="App">
        <Navigation />
        <BrowserRouter>
          <main>
            <Switch>
              <Route path="/" component={Home} exact/>
                <Route path="/edit/:id" component={Edit} exact/>
            </Switch>
          </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
