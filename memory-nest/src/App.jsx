import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'
import AboutUsPage from './components/pages/AboutUsPage'
import ContactUsPage from './components/pages/ContactUsPage'
import RemindersPage from './components/pages/reminders/RemindersPage'
import MemorySpotPage from './components/pages/memoryspot/MemorySpotPage'
import EngagementCenterPage from './components/pages/engagementcenter/EngagementCenterPage'
import { useEffect, useState } from 'react'
import { fetchAlbums, fetchReminders } from './components/common/dataCollection'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [reminders, setReminders] = useState(null);
  const [memorySpotAlbums, setMemorySpotAlbums] = useState([]);

  useEffect(() => {
    const responsePromiseOne = fetchReminders();
    responsePromiseOne.then((reminders) => {
      setIsLoading(false);
      setReminders(reminders);
    })

    const responsePromiseTwo = fetchAlbums();
    responsePromiseTwo.then((albumList) => {
      setMemorySpotAlbums(albumList);
    });

  }, []);


  return (
    <BrowserRouter>
      <div id="body-container">
        <Header />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path='/reminders' element={<RemindersPage isLoading={isLoading} reminders={reminders} />} />
          <Route path='/memoryspot' element={<MemorySpotPage isLoading={isLoading} albums={memorySpotAlbums} />} />
          <Route path='/engagementcenter' element={<EngagementCenterPage />} />

        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App;
