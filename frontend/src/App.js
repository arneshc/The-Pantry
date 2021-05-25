import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import './App.css';
import axios from 'axios';
import history from './history';

var globalUsername = '';

class homePage extends Component {
  constructor () {
    super();
    this.state = {
      username: '',
      password: '',
      userMatched: false,
      pwdMatched: false,
      clicked: false,
      result: '',
      page: 'Home'
    };
  }
  myGet(e){
    e.preventDefault();
    var url = 'http://localhost:4000/home';
    axios.get(url, {params: {
      username: this.state.username,
      password: this.state.password,
      page: this.state.page
    }})
    .then((userData) => {
      console.log(userData.data);
      this.setState({
        clicked: true,
        result: userData.data.map((item, index)=>{ return item.Password; })[0]
      })
      console.log(this.state.result);
      if (this.state.result === this.state.password) {
        history.push('/Find');
      }
    });
    globalUsername = this.state.username;
  };
  render() {
    return (
      <div className="App">
        <header className="App-header"> <p> The Pantry </p> </header>

        <View style = {styles.container}>
          <TextInput style = {styles.input}
                   onChangeText = {username => this.setState({username})}
                   value = {this.state.username}
                   placeholder = " Username"
                   placeholderTextColor = "dimgrey"
                   autoCapitalize = "none"/>

          {this.state.clicked && this.state.result === undefined &&
            <Text style={{position: 'absolute', top: 50, left: 780, color: 'red'}}>
              User Not Found. Please Sign up
            </Text>}

          <TextInput style = {styles.input}
                 onChangeText = {password => this.setState({password})}
                 value = {this.state.password}
                 placeholder = " Password"
                 placeholderTextColor = "dimgrey"
                 autoCapitalize = "none"/>

          {this.state.clicked
            && this.state.result !== undefined
            && this.state.result !== this.state.password
            && <Text style={{position: 'absolute', top: 120, left: 780, color: 'red'}}>
                Incorrect Password
              </Text>}

          <TouchableOpacity
              style = {styles.submitButton}
              onPress = {this.myGet.bind(this)}>
              <Text style = {styles.submitButtonText}> Log in </Text>
          </TouchableOpacity>

          <Text style={styles.createAccountText}
                onPress={() => history.push('/Signup')}>
            Don't have an account? Create one now.
          </Text>
        </View>

      </div>
    )
  }
}

export default homePage;

export {globalUsername};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 23
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
      width: 250,
      height: 40,
   },
   submitButtonText: {
      fontFamily: 'fantasy',
      fontWeight: 'bold',
      fontSize: 18,
      color: '#5c575a'
   },
   createAccountText: {
     textDecorationLine: 'underline',
     fontStyle: 'italic',
     fontSize: '15px',
     color: '#696969'
   }
})
