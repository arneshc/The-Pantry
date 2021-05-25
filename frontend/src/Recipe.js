import React from 'react';
import { Text } from 'react-native';
import style from "./recipe.module.css";

const subtitleStyle = {
  borderRadius: 5,
  borderWidth: 2,
  borderColor: 'darkorange',
  backgroundColor : 'white',
  width: 90,
  fontSize: 15,
  margin: 10
};

const Recipe =({title, ingredients, instructions})=>{
  return(
    <div className={style.recipe}>
      <h1 >{title}</h1>

      <Text style={subtitleStyle}> Ingredients </Text>

      <ol>
      {ingredients.map(ingredient=>(
        <li>{ingredient.replace("ADVERTISEMENT", "")}</li>
      ))}</ol>

      <Text style={subtitleStyle}> Instructions </Text>

      <ol style={{width: 500}}>
      {instructions.map(ingredient=>(
        <li>{ingredient}</li>
      ))}</ol>

    </div>
  );
};

export default Recipe;
