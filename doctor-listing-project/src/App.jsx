import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoctorList from './pages/DoctorList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DoctorList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;