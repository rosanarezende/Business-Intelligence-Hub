import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { NewDiscoveryPage } from './pages/NewDiscoveryPage';
import { HistoryPage } from './pages/HistoryPage';
import { TemplatesPage } from './pages/TemplatesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/discovery/new" element={<NewDiscoveryPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

