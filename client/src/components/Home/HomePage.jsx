import React from 'react'
import HomeCarousel from './HomeCarousel'
import HomePropertis from './HomePropertis'
import Footer from '../Footer'
import NavBar from '../NavBar'
import FloatingUpButton from '../FloatingUpButton'

const HomePage = () => {
  return (
    <>
      <NavBar />

      <div>
        <HomeCarousel />
        <hr></hr>
        <div className='' align='center'>
          <h1>Propertis for you</h1>
        </div>
        <HomePropertis />
      </div>
      <FloatingUpButton/>
      <Footer />
    </>
  )
}

export default HomePage
