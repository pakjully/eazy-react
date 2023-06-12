import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './styles.scss';
import LoginPage from './Pages/LoginPage';
import OrdersPage from './Pages/OrdersPage';
import { Header } from './Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const navigate = useNavigate();
  function handleSuccesLogin() {
    setIsLoggedIn(true);
  }
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
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
      </Routes>
    </div>
  );
}

export default App;
