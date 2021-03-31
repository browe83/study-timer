import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Timer from './components/Timer';
import theme from './theme';

console.log('theme:', theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Timer />
    </ThemeProvider>
  );
}

export default App;
