import { Routes, Route, Navigate } from "react-router-dom"
import { HomePage } from "./views/HomePage"
import { DocsPage } from "./views/docs/DocsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
      <Route path="/docs/:section" element={<DocsPage />} />
    </Routes>
  )
}

export default App
