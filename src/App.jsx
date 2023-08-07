import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './styles.scss';
import LoginPage from './Pages/LoginPage';
import OrdersPage from './Pages/OrdersPage';
import EmptyPage from './Pages/EmptyPage';
import Show from './Pages/Show';
import Declaration from './Declaration/Declaration';
import { Header } from './Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  const ref = React.useRef();
  function handleSuccesLogin() {
    setIsLoggedIn(true);
    const targetUrl = ref.current || '/';
    navigate(targetUrl);
  }
  React.useEffect(() => {
    if (isLoading) {
      return;
    }
    const currentUrl = window.location.pathname;
    if (isLoggedIn) {
      if (currentUrl === '/') {
        navigate('/orders');
      }
    } else if (currentUrl !== '/login') {
      ref.current = currentUrl;
      navigate('/login');
    }
  }, [isLoggedIn, navigate, isLoading]);
  React.useEffect(() => {
    fetch('/api/sessions/me')
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      })
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsLoading(false));
  }, []);
  if (isLoading) {
    return 'The page is loading';
  }
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/orders"
          element={
            <OrdersPage />
        }
        />
        <Route
          path="/login"
          element={(
            <LoginPage
              handleSuccessLogin={handleSuccesLogin}
            />
        )}
        />
        <Route
          path="/orders/:orderId/show"
          element={
            <Show />
          }
        />
        <Route
          path="*"
          element={(
            <EmptyPage />
        )}
        />
        <Route
          path="/declaration-orders/new"
          element={(
            <Declaration />
        )}
        />

      </Routes>
    </div>
  );
}

export default App;
