import { createTheme, Snackbar, ThemeProvider } from '@mui/material';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

//redux imports
import { useDispatch, useSelector } from 'react-redux';

// Auth imoports
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';

// Dashboard imports
import Dashboard from './pages/Dashboard/Dashboard';
import Report from './pages/Dashboard/Report/Report';
import Quiz from './pages/Dashboard/Quiz/Quiz';
import { hideAlert } from './redux/alert-reducer';

// App wide Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#25bf77',
      contrastText: '#E8E6E6',
    },
    secondary: {
      main: '#da4088',
      contrastText: '#fff',
    },
    btnWhiteOutlined: {
      main: '#ccc',
      contrastText: '#ccc',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const { open, message } = useSelector(state => state.alert);
  const auth = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(hideAlert());
  };

  const router = createBrowserRouter([
    // Auth route
    {
      path: '/login',
      element: !auth ? <Login /> : <Navigate to={'/'} replace={true} />,
    },
    {
      path: '/register',
      element: !auth ? <SignUp /> : <Navigate to={'/'} replace={true} />,
    },

    // Dashboard route
    {
      path: '/',
      element: !auth ? (
        <Dashboard />
      ) : (
        <Navigate to={'/login'} replace={true} />
      ),
    },
    {
      path: '/quiz',
      element: <Quiz />,
    },
    {
      path: '/report',
      element: <Report />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={open}
        onClose={closeHandler}
        message={message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
