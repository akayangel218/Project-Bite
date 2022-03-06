import App from './App';
import ReactDOM from "react-dom";

test('Main app renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
