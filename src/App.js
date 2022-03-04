import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setloading] = useState(true);
  
  useEffect(() => {
    setloading(true) //sets the loading variable to true... 
    //This cuases the program to display "Loading" while the Pokemon are still loading.

    let cancel 
    //creates a API call to get the pokemon info.
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(results =>{

      setloading(false)//Setting the loading variable to false so that it is hidden

      setNextPageUrl(results.data.next)//filters the result to get the next 20 pokemon
      setPrevPageUrl(results.data.previous)//filters the result to get the previous 20 pokemon


      //runs through the results from the API call and only...
      //gets the required info which are the names in this case.
      setPokemon(results.data.results.map(p => p.name))
    })

    return() => cancel()
  }, [currentPageUrl])

  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage(){
     setCurrentPageUrl(prevPageUrl)
  }

  if (loading) {
    return "Loading.."
  }

  
  return (
    <div>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        gotoNextPage={nextPageUrl? gotoNextPage : null}
        gotoPrevPage={prevPageUrl? gotoPrevPage : null}
      />
    </div>
  );
}

export default App;
