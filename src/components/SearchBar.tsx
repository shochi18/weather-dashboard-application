import React, { useState, useEffect } from 'react'
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import axios from 'axios';

const SearchBar = ({updateGeolocation}) => {
  const [places, setPlaces] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handleSelectionChange = (id) => {
    updateGeolocation(places.filter((place) => place.id == id).pop());
  }

  const handleInputChange = (value) => {
    setSearchInput(value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
        params: {
          name: searchInput,
          limit: 20,
          forecast_days: 5,

        }
      });
      console.log(response);
      if (response.data.results) {
        setPlaces(response.data.results);
      }
    }
    
    if (searchInput.trim()) {
      fetchData();
    }
  }, [searchInput])

  return (
    <div className="container w-full py-4">
      <Autocomplete 
        label="Search for city" 
        className="w-full"
        onSelectionChange={handleSelectionChange}
        onInputChange={handleInputChange}
      >
        {places.length > 0 ? 
          places.map((place) => (
          <AutocompleteItem key={place.id} value={place.id}>
            {`${place.name}, ${place.country}`}
          </AutocompleteItem>
        )) : (
          <AutocompleteItem key={0} value={0}>None</AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  )
}

export default SearchBar