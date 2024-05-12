import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardText } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import Heart from "../icons/Heart";
import HeartFill from "../icons/HeartFill";
import Trash from "../icons/Trash";

const CardComponent = (props) => {
  const {
    name,
    capital,
    flags,
    population,
    currencies,
    continents,
    languages,
    btnText,
    subSelectValue,
    favourites,
    addFavourites,
    removeFavourites,
    country,
    showTrash = false,
  } = props;

  const [flip, setFlip] = useState(true);

  const addComma = (lang) => {
    if (lang.length > 1) {
      return lang.join(", ");
    } else {
      return lang;
    }
  };

  const handleChange = () => {
    setFlip(!flip);
  };

  const isInFavourites = favourites.some(
    (pais) => pais.name.official === name.official
  );

  return (
    <Card className="card">
      <ReactCardFlip isFlipped={!flip} flipDirection="horizontal">
        <>
          <Card.Img style={{ height: "190px" }} src={flags.png} />
          <Card.Body className="carBodyFront">
            <Card.Title style={{ margin: "20px auto 40px auto" }}>
              {subSelectValue === "official" ? name.official : name.common}
            </Card.Title>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button variant="secondary" onClick={() => handleChange()}>
                {btnText}
              </Button>
              <div style={{ width: "25px", cursor: "pointer" }}>
                {showTrash ? (
                  <Trash
                    fill="#fff"
                    onClick={() => removeFavourites(country)}
                  />
                ) : isInFavourites ? (
                  <HeartFill
                    fill="red"
                    onClick={() => removeFavourites(country)}
                  />
                ) : (
                  <Heart fill="#fff" onClick={() => addFavourites(country)} />
                )}
              </div>
            </div>
          </Card.Body>
        </>
        <>
          <Card.Body className="carBodyBack">
            <div>
              <Card.Text style={{ textTransform: "capitalize" }}>
                <b>Capital: </b>
                {capital ? addComma(capital) : "NONE"}
              </Card.Text>
              <Card.Text style={{ textTransform: "capitalize" }}>
                <b>Continent:</b> {continents}
              </Card.Text>
              <CardText style={{ textTransform: "capitalize" }}>
                <b>Languages: </b>
                {addComma(languages) ?? "NONE"}
              </CardText>
              <Card.Text style={{ textTransform: "capitalize" }}>
                <b>Currency: </b>
                {currencies ? addComma(currencies) : "NONE"}
              </Card.Text>
              <Card.Text>
                <b>Population: </b>
                {population}
              </Card.Text>
            </div>
            <Button variant="secondary" onClick={() => handleChange()}>
              Back
            </Button>
          </Card.Body>
        </>
      </ReactCardFlip>
    </Card>
  );
};

export default CardComponent;
