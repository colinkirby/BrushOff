import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Image, Button, Platform, AppState, StyleSheet, Text, View, TouchableHighlight, BackHandler} from 'react-native';
import Swiper from 'react-native-swiper'

{/*
  This class displays the players drawings from the current round.
  The judge will swipe through the drawings and pick their favorite.
  Once the judge has decided, this screen navigates to winner.js.
*/}

export default class Voting extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = {
    title: 'Voting',
    headerStyle: {
    backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    gesturesEnabled:false
  };


  navigateToWinner(image, playerName, playerInfo) {
    this.props.navigation.navigate('Winner', {
       winningImage: image,
       winnerName: playerName,
       playerInfo: playerInfo
     })
  }

  /*
  * Following three functions disable android back button
  */
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  render() {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const playerInfo = this.props.navigation.getParam('playerInfo', 'nothing passed');
    return (

      <Swiper
        loop={false}
        showsPagination={true}
        paginationStyle={{ bottom: 55 }}

        index={0}>

        {/*
          Loops through the players who aren't the judge and displayers there
          drawing within a React Swiper object. The swiper object allows the
          user to swipe between images.
        */}
        {playerInfo.filter((player) => !player.isJudge).map((player, idx)=> (
          <View
            key = {idx}
            style = {styles.drawingDisplay}
          >
            <Image
              style={
                  {height: Dimensions.get('window').height* 0.85,
                  width: Dimensions.get('window').width * 0.975 ,
                  alignSelf: 'center',
                  // Set border width.
                  borderWidth: 1,
                  borderTopWidth:200,
                  // Set border color.
                  borderColor: 'transparent'}
              }
              source={{uri: player.img}}
            />
            <View style={styles.voteButton}>
              <Button
                style = {styles.button}
                title="Vote for this drawing"
                color="grey"
                onPress={() => {
                  {this.navigateToWinner(player.img, player.name, playerInfo)}
                }}
              />
            </View>
          </View>

        ))}


      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  voteButton: {
    borderRadius:10,
    borderColor: 'grey',
    borderWidth: 2,
    marginTop: 2,
    marginHorizontal:20
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawingDisplay: {
    borderTopWidth: Dimensions.get('window').height* 0.075,
    borderColor: 'transparent',
  }
});
