import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Recipe from "./Recipe";
import './SearchRes.css';
import history from './history';

import {globalRecipes} from './Find';

class SearchResults extends Component {
  render () {
    return(
      <div >
        <View style={styles.container}>
          <Text style={styles.logoText} onPress={() =>history.push('')}> The Pantry </Text>
        </View>

        <View style={{position: 'absolute', top: 20, left: 550}}>
          <TouchableOpacity style = {styles.findNewButton}
                            onPress={() => history.push('/Find')}>
              <Text style = {{color: 'dimgrey', fontSize: '30px', fontFamily: 'serif'}}> Find New </Text>
          </TouchableOpacity>
        </View>

        <View style = {{position: 'absolute', top: 40, left: 1110}}>
          <Text style={styles.accountText}
                onPress={() =>history.push('/Account')}>
            My Account
          </Text>
        </View>

        <div className="recipes">
          {globalRecipes.map(recipe=>(
            <Recipe
              key = {recipe._id}
              title={recipe.title}
              ingredients={recipe.ingredients.slice(0, -1)}
              instructions={recipe.instructions.split(".").slice(0, -1)}
            />
          ))}
        </div>
      </div>);
  }
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    height: 80,
    paddingTop: 23,
    paddingLeft: 20
  },
  logoText: {
    fontFamily:'fantasy',
    fontWeight: 'bold',
    fontSize: '30px',
    fontStyle: 'italic'
  },
  accountText: {
    fontWeight: 'bold',
    fontSize: '18px'
  },
  findNewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: '#dad8da',
    backgroundColor: '#dad8da',
    width: 180,
    height: 50,
    textAlign: 'center'
  }
});
