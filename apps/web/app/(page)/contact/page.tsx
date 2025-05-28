import React from 'react'
import HomeHero from './components/Hero'
import Footer from '@/components/home/Footer'
import ContactForm from './components/ContactForm'
import MapSection from './components/Map'
import Agents from './components/Agents'
import BecomeAnAgent from './components/BecomeAnAgent'

function page() {
  return (
    <div className='bg-[#fafafa]'>
      <HomeHero />
      <ContactForm />
      <BecomeAnAgent/>
      <MapSection />
      {/* <Agents /> */}
         <Footer />
    </div>
  )
}

export default page
