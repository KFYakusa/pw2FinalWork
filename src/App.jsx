
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Routes from './routes';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
        <SnackbarProvider maxSnack={3}>
          <Routes/>
          </SnackbarProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
