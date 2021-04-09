import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Timer from './components/Timer';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Timer />
    </ThemeProvider>
  );
}

export default App;
