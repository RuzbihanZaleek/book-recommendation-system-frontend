import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

// Pages
import HomePage from "./pages/HomePage";
import MyLibraryPage from "./pages/MyLibraryPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import AddBookPage from "./pages/AddBookPage";
import AIRecommendationPage from "./pages/AIRecommendationPage";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import ProtectedRoute from "./components/Layout/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <main className="flex-1 bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute component={HomePage} />} />
          <Route
            path="/library"
            element={<ProtectedRoute component={MyLibraryPage} />}
          />
          <Route
            path="/books/:id"
            element={<ProtectedRoute component={BookDetailsPage} />}
          />
          <Route
            path="/add-book"
            element={<ProtectedRoute component={AddBookPage} />}
          />
          <Route
            path="/ai-recommendations"
            element={<ProtectedRoute component={AIRecommendationPage} />}
          />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
