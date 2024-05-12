import React from 'react'
import CardComponent from './CardComponent'

const Filtered = (props) => {
    const {filter, subSelectValue, addFavourites, removeFavourites, favourites, loading} = props

  return (
        //si es "FALSE" en la primer condicion de "<Flags/>" muestro filter.map() pero debo tener en cuenta las 2 posibilidades: que encuentre o no datos
    <> 
      {!!filter.length ? (
          filter.map((country, index) => (
              <CardComponent key={index} btnText={"More info"} subSelectValue={subSelectValue} addFavourites={addFavourites} removeFavourites={removeFavourites} favourites={favourites} country={country} {...country} />
          ))
      ) : <h1 style={{color: '#fff'}}>No results</h1>}
    </>
  )
}

export default Filtered