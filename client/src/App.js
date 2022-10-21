import "./App.css";
import Time from "./components/Time";
import Metrics from "./components/Metrics";

const App = () => {
  return (
    <div className="App">
      <header className="App-body">
        <div className="half">
          <Time />
        </div>
        <div className="half">
          <Metrics />
        </div>
      </header>
    </div>
  );
};

export default App;
