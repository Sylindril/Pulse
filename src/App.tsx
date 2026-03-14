import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PatientHome } from './pages/PatientHome'
import { DoctorTimeline } from './pages/DoctorTimeline'
import { SharedView } from './pages/SharedView'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientHome />} />
        <Route path="/doctor" element={<DoctorTimeline />} />
        <Route path="/shared/:token" element={<SharedView />} />
      </Routes>
    </BrowserRouter>
  )
}
