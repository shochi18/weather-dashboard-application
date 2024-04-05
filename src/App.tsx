import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavigationMenu from './components/NavigationMenu'
import { Outlet } from 'react-router-dom'
import SearchBar from './components/SearchBar'

function App() {
  const [geolocation, setGeolocation] = useState(null);

  const updateGeolocation = (data) => {
    console.log(data);
    setGeolocation(data);
  }

  useEffect(() => {
    console.log(geolocation);
  }, [geolocation])

  return (
    <>
      {/* <SearchBar updateGeolocation={updateGeolocation}/>
      <NavigationMenu /> */}
      <Outlet context={[geolocation, setGeolocation]}/>
    </>
  )
}

export default App
