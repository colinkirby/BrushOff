import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet, Text, TextInput, Picker, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';

export default class LobbyScreen extends React.Component {
  static navigationOptions = {
    title: 'Lobby'
  };

  constructor(props) {
    super(props)
    //const { navigate } = this.props.navigation;
    this.state = {
      numPlayers: '',
      emptyPlayer: {'name':'', 'img':'', 'isJudge': false, 'score': 0},
      playerNames: [{'name':''},{'name':''},{'name':''}], // preset to 3 since we need at least 3
      enteredPlayerNames: false,
    }
  }

  checkIfPlayerNamesEntered(){
    this.state.playerNames.map((playerName, idx)=> {
      if (playerName['name'].length == 0){
        namesEntered = false;
      }else{
        namesEntered = true;
      }
    })
    return namesEntered
  }

  startGame() {
    const namesEntered = this.checkIfPlayerNamesEntered();

    if (namesEntered) {
      this.props.navigation.navigate('Categories', {playerList: this.state.playerNames});
      LobbyScreen.names = this.state.playerNames;
    }else{
      Alert.alert(
        'Please fill out all the inputs with names',
        '',
        [
          {text: 'Okay', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      )
    }
  }

  handleAddPlayer () {
    this.setState({
      playerNames: this.state.playerNames.concat([this.state.emptyPlayer])
    });
  }

  handleRemovePlayer = (idx) => () => {
    this.setState({
      playerNames: this.state.playerNames.filter((s, sidx) => idx !== sidx)
    });

  }

  handlePlayerNameChange = (idx) => (evt) => {
    const newPlayerNames = this.state.playerNames.map((playerName, sidx) => {
      if (idx !== sidx) {
        return playerName;
      }
      return { ...playerName, name: evt };
    });
    this.setState({ playerNames: newPlayerNames });
  }

  render() {
    return (
      <ImageBackground
        source={require('./img/paint_splatters.jpg')}
        imageStyle={{resizeMode: 'stretch'}}
        style={{flex: 1}}
      >
        <View style = {styles.container}>
          <View style={{padding: 140}}>
            <Text style= {{fontSize:20, fontWeight:'bold',textAlign:'center'}}> Enter Player Names</Text>

            {this.state.playerNames.map((playerName, idx)=> (
              <TextInput
                type='text'
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                placeholder = {'Player '+idx}
                value = {playerName.name}
                onChangeText={this.handlePlayerNameChange(idx)}
              />
            ))}

            <Button
              title="Add Player"
              color="green"
              accessibilityLabel= ""
              onPress={() => {this.handleAddPlayer()}}
            />

            <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{width: 140, height: 50}} >
                <Button
                  title="Start Game"
                  color="blue"
                  accessibilityLabel="Start the game with the given player names!"
                  onPress={() => { this.startGame() }}
                />
              </View>

            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
