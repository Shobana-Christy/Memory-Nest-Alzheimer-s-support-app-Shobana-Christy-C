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
import Reminder from './components/pages/reminders/reminder'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [reminders, setReminders] = useState(null);

  const fetchReminders = async () => {
    let reminders = [];

    try {
      const response = await fetch('https://docs.google.com/document/d/1hykF7_GYKqlKKoJn-qs7RdOI5MBj8TIgVG-JQ_zIO2k/export?format=txt');
      console.log("reminderdata", response);

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `ERROR - status ${response.status}`);
      } else {
        const data = await response.json()
        reminders = data.map((reminder) => {
          let newReminder = new Reminder(
            reminder.id,
            reminder.name,
            reminder.date,
            reminder.time,
            reminder.recurring,
            reminder.notes
          )
          return newReminder;
        })
      }
    } catch (error) {
      console.error(error.message)
    } finally {
      setReminders(reminders)
    };
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  useEffect(() => {
    if (isLoading && reminders !== null) {
      setIsLoading(false);
    }
  }, [isLoading, reminders]);

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
          <Route path='/memoryspot' element={<MemorySpotPage />} />
          <Route path='/engagementcenter' element={<EngagementCenterPage />} />

        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App
