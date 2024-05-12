import React, { useEffect, useState } from "react";
import selects from '../config/select.json'
import { returnFiltered, subSelectDecider } from "../helper";
import HeartFill from "../icons/HeartFill";
import Favoritos from "./Favoritos";
import Filtered from "../components/Filtered";
import { NavLink } from "react-router-dom";
import Home from "../icons/Home";

const Flags = () => {
  const [flags, setFlags] = useState([]);
  const [filter, setFilter] = useState([]);
  const [titles, setTitles] = useState([]);
  const [selectValue, setSelectValue] = useState(selects.general[0]);
  const [subSelectValue, setSubSelectValue] = useState('')
  const [subSelect, setSubSelect] = useState(null)
  const [inputValue, setInputValue] = useState("");
  const [favourites, setFavourites] = useState([])
  const [showFavs, setShowFavs] = useState(false)
  const [loading, setLoading] = useState(true)

  const getFlags = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      let data = await response.json();
      data = data.filter((pais) => pais.languages && pais.currencies).map((country) => ({
        ...country,
        capital: country.capital?.map((cap) => cap.toLowerCase()),
        population: `${country.population}`,
        continents: country.continents?.map((cont) => cont.toLowerCase()),
        languages: Object.values(country.languages).map((lang) => lang.toLowerCase()),
        currencies: Object.values(country.currencies).map((obj) => {
          return Object.values(obj)[0]
          }).map((currency) => currency.toLowerCase())
      }));
      console.log(data);
      setFlags(data);
      setFilter(data);
      setTitles(selects.general);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    setSelectValue(value);
    const options = subSelectDecider(value)
    console.log(options)
    if (options) {
      setSubSelect(options)
    } else {
      setSubSelect(null)
    }
  };

  const handleSubSelect = (e) => {
    const {value} = e.target
    setSubSelectValue(value)
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (subSelectValue) {
      setFilter(flags.filter((country) => country[selectValue][subSelectValue].toLowerCase().includes(value.toLowerCase())))
    } else {
      const filtered = returnFiltered(selectValue, value, flags)
      setFilter(filtered)
    }
  };  
    
  const addFavourites = (obj) => {
    const isInFavourites = favourites.some((isInFav) => isInFav.name.official === obj.name.official)
    if (isInFavourites) {
      return 
    } else {
      setFavourites([...favourites, obj]) 
    }         
  }

  const removeFavourites = (obj) => {
    setFavourites(favourites.filter((country) => country.name.official !== obj.name.official)) 
  }

  const mostrarFavoritos = () => {
    setShowFavs(!showFavs)
  }

  useEffect(() => {
    setTimeout(() => {
      getFlags();
    }, 2000);
  }, []);

  useEffect(() => {
    if (selectValue !== 'name') {
      setSubSelectValue('')
    }
    setInputValue('') //para que no se quede "pegajoso" el valor del input
    setFilter(flags) //para que se resetee el renderizado al cambiar de un select a otro
  }, [selectValue])

  return (
    <div>
      {loading 
        ? (<div className="mainLoader">
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>) 
        : <>
            <header>
              <h1>Flags of the world</h1>      
              <h5 style={{ margin: "20px 0 30px 0", textAlign: 'center' }}>Press "more info" to get some data</h5>
              <div style={{height: '40px', background: '#404040', padding: '5px', display: 'flex', alignItems: 'center'}}>
                  <NavLink className='nav-fav' to={'/'} onClick={() => mostrarFavoritos()}>Home
                    <div style={{marginLeft: '5px'}}>
                      <Home fill={'#fff'} height={'16px'}/>
                    </div>
                  </NavLink>
                  <NavLink className='nav-fav' to={'/favourites'} onClick={() => mostrarFavoritos()}>Favourites
                    <div style={{marginLeft: '5px'}}>
                      <HeartFill fill='#fff' height={'16px'}/>
                    </div>
                  </NavLink>
                
              </div>
            </header>
            <div className="main-container">
              <div style={{color: '#fff', display: 'flex', justifyContent: 'flex-end', textAlign: 'end', margin: '20px'}}>
                <div style={{width: '400px'}}>
                  <p>Sort by</p>
                  <form action="">
                    <select name="" id="" onChange={handleSelect}>
                      {titles.map((title, index) => (
                        <option key={index} value={title}>
                          {title.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    {subSelect && 
                    <select onChange={handleSubSelect}>
                      {subSelect.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>}
                    {selectValue === 'name' ? null : <input type="text" placeholder="Search..." value={inputValue} onChange={handleChange}/>}
                  </form>
                </div>
              </div>
            <div className="card-container">
                {showFavs 
                  ? <Favoritos favourites={favourites} showFavs={showFavs} removeFavourites={removeFavourites}/>
                  : //si es "FALSE" muestro filter.map() pero debo tener en cuenta las 2 posibilidades: que encuentre o no datos
                    <Filtered loading={loading} filter={filter} subSelectValue={subSelectValue} addFavourites={addFavourites} removeFavourites={removeFavourites} favourites={favourites}/>
                  }  
              </div>
            </div>
          </>
      }
    </div>
    
  );
};

export default Flags;
