import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

import axios from 'axios';
import history from './history';

import {globalUsername} from './App';

class Account extends Component {
  constructor () {
    super();
    this.state = {
      recipe: '',
      newrecipe: '',
      foundRecipe: [],
      page: 'Account'
    };
  }
  myPost(e){
    e.preventDefault();
    var url = 'http://localhost:4000/add';
    axios.post(url, {
      username: globalUsername,
      recipename: this.state.recipe,
      page: this.state.page
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  myPut(e){
    e.preventDefault();
    var url = 'http://localhost:4000/update';
    axios.put(url, {
      username: globalUsername,
      recipename: this.state.recipe,
      newrecipename: this.state.newrecipe
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({recipe: this.state.newrecipe, newrecipe: ''});
  };
  myDelete(e){
    e.preventDefault();
    var url = 'http://localhost:4000/delete';
    axios.delete(url, {params: {
      username: globalUsername,
      recipename: this.state.recipe
    }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({recipe: ''});
  };

  myGet(e){
    e.preventDefault();
    var url = 'http://localhost:4000/account';
    axios.get(url, {params: {
      username: globalUsername,
      recipename: this.state.recipe,
      page: this.state.page
    }})
    .then((recipeData) => {
      console.log(recipeData.data);
      this.setState({
        foundRecipe: recipeData.data
      })
    });
  };
  render () {
    const dataMySQL = this.state.foundRecipe.map((item, index)=>{
      var arrayku = [item.Favorite].join(' ');
      return <p key={index}>{arrayku}</p>;
    })
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.logoText} onPress={() =>history.push('')}> The Pantry </Text>
        </View>

        <View style={{position: 'absolute', top: 20, left: 1050}}>
          <TouchableOpacity style = {styles.findNewButton}
                            onPress={() => history.push('/Find')}>
              <Text style = {{color: 'dimgrey', fontSize: '30px', fontFamily: 'serif'}}> Find New </Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={styles.favoriateText}> Welcome, {globalUsername} </Text>
          <Text style={styles.favoriateText}> Please Modify Your Favorite Recipes </Text>


          <View style={styles.inputContainer}>

            <TextInput style = {styles.input}
                   onChangeText={recipe => this.setState({recipe})}
                   value={this.state.recipe}
                   placeholder = " Recipe Name"
                   placeholderTextColor = "dimgrey"
                   autoCapitalize = "none"/>

           <TextInput style = {styles.input}
                  onChangeText={newrecipe => this.setState({newrecipe})}
                  value={this.state.newrecipe}
                  placeholder = " Enter Modified Recipe ..."
                  placeholderTextColor = "dimgrey"
                  autoCapitalize = "none"/>
          </View>

          <View style={{flex:1, flexDirection: 'row', paddingTop: 30}}>
            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {this.myPost.bind(this)}>
                <Text style = {styles.submitButtonText}> Add </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {this.myPut.bind(this)}>
                <Text style = {styles.submitButtonText}> Update </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {this.myDelete.bind(this)}>
                <Text style = {styles.submitButtonText}> Delete </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {this.myGet.bind(this)}>
                <Text style = {styles.submitButtonText}> Get </Text>
            </TouchableOpacity>
          </View>

          <View> {dataMySQL} </View>

        </View>

      </View>
    )
  }
}

export default Account;

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
  inputContainer: {
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems: 'center',
     paddingTop: 80
  },
  input: {
     margin: 15,
     width: 350,
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
  },
  favoriateText: {
    paddingTop: 30,
    textAlign: 'center',
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    fontSize: '35px',
    color: 'dimgrey'
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
