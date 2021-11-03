/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import "./ListCard.css"
import imgsrc from "../../assets/img/SampleImage.png";

function ListCard() {

  const txt = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

  return (
    
    <div class="CardContainer">
      <div className="LeftContainer">
        <div className="textContainer">
          {txt.size <= 110 ? txt: txt.slice(0,105) + "....."}
        </div>
        <div className="imageContainer">
          <img class = "image" src={imgsrc} />
        </div>
      </div>
      <div className="AddButton">
        Add
      </div>
    </div>
  )
}

export default ListCard;
