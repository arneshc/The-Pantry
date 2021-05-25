import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

import history from './history';
import axios from 'axios';

class Signup extends Component {
  constructor () {
    super();
    this.state = { showLoginTest: false,
                   firstname: '',
                   lastname: '',
                   username: '',
                   password: '',
                   page: 'Signup'
                 };
               }
  myPost(e){
    e.preventDefault();
    var url = 'http://localhost:4000/add';
    axios.post(url, {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      password: this.state.password,
      page: this.state.page
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({showLoginTest: true});
  };
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.logoText} onPress={() =>history.push('')}> The Pantry </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={styles.enterInfoText}> Enter Your Information Here </Text>

          <View style={styles.inputContainer}>
            <TextInput style = {styles.input}
                     onChangeText={firstname => this.setState({firstname})}
                     value={this.state.firstname}
                     placeholder = " First Name"
                     placeholderTextColor = "dimgrey"
                     autoCapitalize = "none"/>

            <TextInput style = {styles.input}
                   onChangeText={lastname => this.setState({lastname})}
                   value={this.state.lastname}
                   placeholder = " Last Name"
                   placeholderTextColor = "dimgrey"
                   autoCapitalize = "none"/>

           <TextInput style = {styles.input}
                  onChangeText={username => this.setState({username})}
                  value={this.state.username}
                  placeholder = " Username"
                  placeholderTextColor = "dimgrey"
                  autoCapitalize = "none"/>

          <TextInput style = {styles.input}
                 onChangeText={password => this.setState({password})}
                 value={this.state.password}
                 placeholder = " Password"
                 placeholderTextColor = "dimgrey"
                 autoCapitalize = "none"/>
          </View>

          <View style={{paddingTop: 30, alignItems: 'center'}}>
            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {this.myPost.bind(this)}>
                <Text style = {styles.submitButtonText}> Sign up </Text>
            </TouchableOpacity>

            {this.state.showLoginTest &&
            <Text style={styles.createAccountText}
                  onPress={() =>history.push('')}>
              Click Here to Log in.
            </Text>}
          </View>

        </View>

      </View>
    )
  }

}

export default Signup;

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
     paddingTop: 50
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
  enterInfoText: {
    paddingTop: 30,
    textAlign: 'center',
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    fontSize: '35px',
    color: 'dimgrey'
  },
  createAccountText: {
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    fontSize: '15px',
    color: '#696969'
  }
});
