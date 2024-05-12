import React from 'react'
import CardComponent from '../components/CardComponent'

const Favoritos = (props) => {
    const {favourites, addFavourites, removeFavourites} = props
    
  return (
    <>
      {!!favourites.length ? (
          favourites.map((country, index) => (
              <CardComponent key={index} favourites={favourites} btnText={"More info"} addFavourites={addFavourites} removeFavourites={removeFavourites} showTrash={true} country={country} {...country} />
          ))
      ) : <h1 style={{color: '#fff'}}>There is not favourites yet</h1>}
    </>
  )
}

export default Favoritos