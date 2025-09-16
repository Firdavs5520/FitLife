import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Fitness from "./pages/Fitness";
import Nutrition from "./pages/Nutrition";
import Mental from "./pages/Mental";
import Blog from "./pages/Blog";
import Bmi from "./pages/Bmi";
import WaterTracker from "./pages/WaterTracker";
import Planner from "./pages/Planner";
import CalorieTracker from "./pages/CalorieTracker";
import HealthNotifications from "./components/HealthNotifications";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className=" ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calorie" element={<CalorieTracker />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/mental" element={<Mental />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/bmi" element={<Bmi />} />
            <Route path="/water" element={<WaterTracker />} />
            <Route path="/planner" element={<Planner />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
