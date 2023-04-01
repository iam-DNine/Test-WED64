import LoginForm from './Components/LoginForm/LoginForm';
import LoggedIn from './Components/Loggedin/Loggedin';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <LoggedIn setIsLoggedIn={setIsLoggedIn}/>
      ) : (
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      )}
    </>

  );
}

export default App;
