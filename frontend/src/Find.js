import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import history from './history';

var globalRecipes = [];

class SingleSelect extends Component {
  constructor () {
    super();
    this.state = {
      foundRecipes: [],
      inputCalorie: '',
      inputSugar: '',
      inputFat: '',
      inputIngredient: '',
      vegeOnly: false,
      hasMeat: false,
      username: '',
      recipename: '',
      page: 'Find'
    };
  }

  handleVegeCheck(){
    this.setState({
      vegeOnly: !(this.state.vegeOnly)
    });
  }

  handleMeatCheck(){
    this.setState({
      hasMeat: !(this.state.hasMeat)
    });
  }

  myGet(e){
    e.preventDefault();
    var url = 'http://localhost:4000/find';
    axios.get(url, {params: {
      calories: this.state.inputCalorie,
      sugar: this.state.inputSugar,
      fat: this.state.inputFat,
      vege: this.state.vegeOnly,
      meat: this.state.hasMeat,
      ingredient: this.state.inputIngredient,
      page: this.state.page
    }})
    .then((recipeData) => {
      console.log(recipeData.data);
      this.setState({
        foundRecipes: recipeData.data
      })
      globalRecipes = this.state.foundRecipes;
      console.log(globalRecipes);
      console.log(typeof globalRecipes);
      history.push('/SearchResults');
    });
  };

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <View style = {styles.container}>
          <View style = {{paddingLeft: 20}}>
            <Text style={styles.logoText} onPress={() =>history.push('')}>
              The Pantry
            </Text>
          </View>
          <View style = {{paddingLeft: 950}}>
            <Text style={styles.accountText}
                  onPress={() =>history.push('/Account')}>
              My Account
            </Text>
          </View>
        </View>

        <Text style={styles.instructionText}> Please set your nutrient limit... </Text>

        <View style={styles.inputContainer}>
          <TextInput style = {styles.input}
                   onChangeText={inputCalorie => this.setState({inputCalorie})}
                   value={this.state.inputCalorie}
                   placeholder = " Calorie Limit"
                   placeholderTextColor = "dimgrey"
                   autoCapitalize = "none"/>

          <TextInput style = {styles.input}
                 onChangeText={inputSugar => this.setState({inputSugar})}
                 value={this.state.inputSugar}
                 placeholder = " Sugar"
                 placeholderTextColor = "dimgrey"
                 autoCapitalize = "none"/>

         <TextInput style = {styles.input}
                onChangeText={inputFat => this.setState({inputFat})}
                value={this.state.inputFat}
                placeholder = " Fat"
                placeholderTextColor = "dimgrey"
                autoCapitalize = "none"/>
        </View>

        <Text style={styles.instructionText2}> Please set your ingredient requirement... </Text>

        <View style={styles.inputContainer}>
          <TextInput style = {styles.input}
                   onChangeText={inputIngredient => this.setState({inputIngredient})}
                   value={this.state.inputIngredient}
                   placeholder = " Ingredient"
                   placeholderTextColor = "dimgrey"
                   autoCapitalize = "none"/>
        </View>

        <View style={styles.inputContainer2}>
          <label>
            <input type="checkbox"
                   checked={this.state.vegeOnly}
                   onChange={()=>this.handleVegeCheck()}/> Vegetable Only
          </label>

          <label>
            <input type="checkbox"
                   checked={this.state.hasMeat}
                   onChange={()=>this.handleMeatCheck()}/> Has Meat
          </label>

        </View>

        <View style={{paddingTop: 60}}>
          <TouchableOpacity
              style = {styles.submitButton}
              onPress = {this.myGet.bind(this)}>
              <Text style = {styles.submitButtonText}> Find </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SingleSelect;

export {globalRecipes};

const styles = StyleSheet.create({
   container: {
     backgroundColor: 'orange',
     flex: 1,
     flexDirection: 'row',
     alignItems: 'center',
     paddingTop: 23,
     height: 80,
     width: 1300
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
   instructionText: {
     paddingTop: 30,
     textAlign: 'center',
     fontFamily: 'Cochin',
     fontWeight: 'bold',
     fontSize: '35px',
     color: 'dimgrey'
   },
   instructionText2: {
     paddingTop: 50,
     textAlign: 'center',
     fontFamily: 'Cochin',
     fontWeight: 'bold',
     fontSize: '35px',
     color: 'dimgrey'
   },
   inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50
   },
   inputContainer2: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50
   },
   input: {
      margin: 15,
      width: 250,
      height: 40,
      borderColor: 'dimgrey',
      borderWidth: 2
   },
   submitButton: {
      borderRadius: 10,
      backgroundColor: 'orange',
      padding: 10,
      margin: 15,
      width: 200,
      height: 40
   },
   submitButtonText: {
      textAlign: 'center',
      fontFamily: 'fantasy',
      fontWeight: 'bold',
      fontSize: 20,
      color: 'black'
   }
});
