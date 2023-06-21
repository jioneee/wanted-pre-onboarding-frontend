import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignInPage from './page/SignInPage';
import SignUpPage from './page/SignUpPage';
import HomePage from './page/HomePage';
import TodoPage from './page/TodoPage';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<HomePage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/todo" element={<TodoPage />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
