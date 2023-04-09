import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';
import Form from './pages/Form';
import FormTwo from './pages/FormTwo';

function App() {
  return(
  <div className="App">
    <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={<Form/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
