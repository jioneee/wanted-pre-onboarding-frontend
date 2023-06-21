import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignInPage from './page/SignInPage';
import SignUpPage from './page/SignUpPage';
import HomePage from './page/HomePage';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<HomePage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
