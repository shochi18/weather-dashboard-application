import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import { Outlet } from 'react-router-dom'
import NavigationMenu from '../components/NavigationMenu';

const HomePage = () => {
  const [geolocation, setGeolocation] = useState(null);

  const updateGeolocation = (data) => {
    console.log(data);
    setGeolocation(data);
  }
  
  return (
    <>
      <SearchBar updateGeolocation={updateGeolocation}/>
      <NavigationMenu />
      <Outlet context={[geolocation, setGeolocation]}/>
    </>
  )
}

export default HomePage