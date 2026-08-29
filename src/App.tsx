import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { Home, Experience } from "./pages";
import { ProjectsPage } from "./pages/Projects";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
