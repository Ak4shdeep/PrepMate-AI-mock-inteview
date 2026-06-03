import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PublicLayout } from "./layouts/public-layout"
import HomePage from "./routes/home"
import AuthenticationLayout from "./layouts/auth-layout"
import SignInPage from "./routes/signin"
import SignUpPage from "./routes/signup"
import ProtectRoutes from "./layouts/protected-routes"
import { MainLayout } from "./layouts/main-layout"
import { Generate } from "./components/ui/Generate"
import { Dashboard } from "./routes/dashboard"
import { CreateEditPage } from "./routes/create-edit-page"
import { MockLoadPage } from "./routes/mock-loadpage"
import { MockInterviewPage } from "./routes/mock-interview-page"
import { Feedback } from "./routes/feedback"
import AboutUs from "./routes/about-us"
import ContactUs from "./routes/contact-us"
import Services from "./routes/services"
import  SmartSearchAssistant from "./routes/SmartSearchAssistant.tsx" 
import  AiFileAnalyser from "./routes/AiFileAnalyser.tsx" 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />} >
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
        </Route>
        <Route element={<AuthenticationLayout />} >
          <Route path='/signin/*' element={<SignInPage />} />
          <Route path='/signup/*' element={<SignUpPage />} />
        </Route>
        <Route element={<ProtectRoutes> <MainLayout /></ProtectRoutes>}>
        
          <Route element={<Generate />} path='/generate' >
            <Route index element={<Dashboard />} />
            <Route path=":interviewId" element={<CreateEditPage />} />
             <Route path="interview/:interviewId" element={<MockLoadPage />} />
             <Route
              path="interview/:interviewId/start"
              element={<MockInterviewPage />}
            />
             <Route path="feedback/:interviewId" element={<Feedback />} />
          </Route>

          <Route path="/smart-search" element={<SmartSearchAssistant />} />
          <Route path="/file-analyser" element={<AiFileAnalyser />} />
          
        </Route>
      </Routes>
    </Router>
  )
}

export default App