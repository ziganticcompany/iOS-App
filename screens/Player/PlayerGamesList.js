import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, TouchableOpacity, Image, Dimensions, ScrollView, BackHandler, RefreshControl } from 'react-native';
import { List, ListItem, SearchBar, Avatar, Header, Icon } from 'react-native-elements';
import {
  Card, Button,
  CardItem,
  Body, Left, Row
  //Header, 
  // Icon
} from 'native-base'
import { FirebaseData } from '../../providers/firebase';
import styles from '../../constants/Styles';
import logo from '../../assets/images/logo.jpg'
import Colors from "../../constants/Colors";

//use this to convert an image to uri https://onlinepngtools.com/convert-png-to-data-uri
import firebase from '../../providers/firebaseConfig';
import moment from 'moment'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import * as Progress from "react-native-progress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { progressBarFetch, setOriginalFetch } from 'react-fetch-progressbar';
import Layout from "../../constants/Layout";
import { Loader } from "../Loader";
class PlayerGamesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      gamesProfileAll: [],
      isVertialHasItems: false,
      percentageProgress: 0,
      isNoGameAvailable: false,
      isLoading: false
    };
    this.arrayholder = [];
    this.resultsAll = [];
    this.results = [];
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
  }

  static navigationOptions = {
    gesturesEnabled: false
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
  }
  handleBackButtonClick() {
    this.props.navigation.navigate("PlayerGamesList");
    return true;
  }
  componentDidMount() {
    this.listenForGames();
  }


  listenForGames = () => {

    this.setState({ loading: true });
    this.gameList()
    setTimeout(() => {
      this.setState({ percentageProgress: 0.2 }, () => {
        setTimeout(() => {
          this.setState({ percentageProgress: 0.4 }, () => {
            setTimeout(() => {
              this.setState({ percentageProgress: 0.6 }, () => {
                setTimeout(() => {
                  this.setState({ percentageProgress: 0.8 }, () => {
                    setTimeout(() => {
                      this.setState({ percentageProgress: 0.95 }, () => {
                        setTimeout(() => { this.setState({ percentageProgress: 0.99 }) }, 200);
                      })
                    }, 100);
                  })
                }, 100);
              })
            }, 100);
          })
        }, 100);
      })
    }, 100);

  }


  gameList = () => {
    try {
      var gamesRootRef = FirebaseData.getRef('games');

      //this.setState({percentageProgress:50})
      let loginUserId = firebase.auth().currentUser.uid
      gamesRootRef.on('value', (userRef) => {

        let items = [];
        userRef.forEach((eachUser) => {
          //setTimeout(() => { this.setState({percentageProgress:0.6}) },20);
          eachUser.forEach((eachGame) => {
            var isAlreadyAnswer = false;
            if (eachGame.val().answer != null && eachGame.val().answer != undefined && eachGame.val().answer != "" && eachGame.val().answer != {}) {
              // let myAnswerList = eachGame.val().answer;
              // myAnswerList.on('value', (data) => {
              //   barberSnapshot.child('queue').ref.push(newItem);
              // })
              let data = eachGame.child('answer').ref;
              var myAnswerList = firebase.database().ref(data)
              myAnswerList.on('value', (myAnswer) => {
                myAnswer.forEach((eachAnswer) => {
                  if (eachAnswer.key === loginUserId) {
                    isAlreadyAnswer = true
                  }
                })
              })
            }

            var tempUrl = eachGame.val().gameIconUrl;
            if (tempUrl === null || (tempUrl != null && tempUrl.trim() == "")) {
              tempUrl = 'https://api.adorable.io/avatars/1/';
            }
            var temp1Url = eachGame.val().gameMainUrl;
            if (temp1Url === null || (temp1Url != null && temp1Url.trim() == "")) {
              temp1Url = 'https://api.adorable.io/avatars/2/';
            }
            if (eachGame.val().gameName !== undefined && eachGame.val().developerName !== undefined && eachGame.val().genre != undefined && isAlreadyAnswer == false) {
              items.push({
                id: eachGame.key,
                gameName: eachGame.val().gameName,
                developerName: eachGame.val().developerName,
                featured: eachGame.val().featured,
                status: eachGame.val().status,
                platform: eachGame.val().platform,
                shortDes: eachGame.val().shortDes,
                longDes: eachGame.val().longDes,
                zMin: eachGame.val().zMin,
                zMax: eachGame.val().zMax,
                expirationDate: eachGame.val().expirationDate,
                instructions: eachGame.val().instructions,
                details: eachGame.val().details,
                genre: eachGame.val().genre,
                ageMin: eachGame.val().ageMin,
                ageMax: eachGame.val().ageMax,
                surveyLength: eachGame.val().surveyLength,
                downloadLink: eachGame.val().downloadLink,
                gameIconUrl: eachGame.val().gameIconUrl,
                gameScreenShot: eachGame.val().gameScreenShot,
                downloadLinkPlayStore: eachGame.val().downloadLinkPlayStore,
                downloadLinkIOS: eachGame.val().downloadLinkIOS,
                downloadLinkPC: eachGame.val().downloadLinkPC,
                userId: eachUser.key
              });
            }
            isAlreadyAnswer = false
          }); //end of user.forEach((game) => {     

          this.setState({
            data: items,
            error: null,
            loading: false,
            isVertialHasItems: false,
            isLoading: false

          });
          //setTimeout(() => { this.setState({percentageProgress:100}) },20);
          this.arrayholder = items;
          if (this.arrayholder.length > 0) {
            this.message1 = 'Featured Games';
            this.message2 = 'Just For You';
          }
          else {
            this.message1 = 'Games not available';
            this.message2 = '';
          }
        }); //end of eachUserId.forEach((user) =>
        if (items.length <= 0) {
          this.setState({
            loading: false,
            isLoading: false,
            data: items,
            isNoGameAvailable: true
          });
        }
      }); //end of gamesRootRef.on('value', (snap) =>   
    } catch (error) {
      this.setState({
        loading: false, isLoading: false
      });
      // alert(error);
    }
  }

  onItemPress = () => {

    Alert.alert(
      //title
      'Whoops…',
      //body
      'This feature is not in place yet. Try again soon!',
      [
        { text: 'Ok', onPress: () => console.log(''), style: 'cancel' },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );

  }



  searchFilterFunction = text => {
    if (!text.length) {
      this.listenForGames();
    }
    else {
      const newData = this.arrayholder.filter(item => {
        //      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
        const itemData = `${item.gameName.toUpperCase()} ${item.developerName.toUpperCase()} ${item.status.toUpperCase()} ${item.longDes.toUpperCase()} ${item.genre.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        data: newData,
        isVertialHasItems: false,
      });
    }
  };

  renderHeader = () => {
    return (
      <SearchBar
        platform="ios"
        clearIcon
        placeholder="Search for games or developers"
        cancelButtonTitle="Cancel"
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        containerStyle={{ backgroundColor: Colors.purpleColor, borderTopColor: Colors.purpleColor, borderBottomColor: Colors.purpleColor, width: SCREEN_WIDTH - 75 }}
        inputStyle={{ backgroundColor: 'white', fontSize: 14 }}
      />
    );
  };



  editGameProfile(id, gameName, gameDesc, gameInstruct, gamePlatform, gameDeveloper, gameShortDesc, gameDetails, gameGenre, gameAgeRange, gameSurveyLength, gameStatus, gameIconUrl, gameMainUrl, gameLikes, primaryContactEmail) {
    this.props.navigation.navigate('PlayerSurveyList',
      {
        gameId: id,
        gameName: gameName,
        gameDesc: gameDesc,
        gameInstruct: gameInstruct,
        gamePlatform: gamePlatform,
        gameDeveloper: gameDeveloper,
        gameShortDesc: gameShortDesc,
        gameDetails: gameDetails,
        gameGenre: gameGenre,
        gameAgeRange: gameAgeRange,
        gameSurveyLength: gameSurveyLength,
        gameStatus: gameStatus,
        gameIconUrl: gameIconUrl,
        gameMainUrl: gameMainUrl,
        gameLikes: gameLikes,
        //                                   gameVersion: gameVersion, 
        //                                   primaryContactEmail: primaryContactEmail
      });
  }


  fullInfoPage = (item) => {
    this.props.navigation.navigate('PlayerSurveyList', { gameInfo: item });
  }

  statusColor = (status) => {
    if (status === "New") {
      return "red"
    } else if (status === "Open") {
      return "green"
    } else {
      return "#E1AD01"
    }
  }



  renderItemForVertical = ({ item, index }) => {
    if (item.featured === "False") {
      if (this.state.isVertialHasItems == false) {
        this.setState({ isVertialHasItems: true })
      }

      return (
        <TouchableOpacity onPress={() => this.fullInfoPage(item)} >
          <Card style={{ marginLeft: 10, marginRight: 10 }} transparent={true}>
            <CardItem>
              <Left>
                <Image source={{ uri: item.gameIconUrl }} style={{ width: 60, height: 60 }} resizeMode={"cover"} ></Image>
                <Body>
                  <Row style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: '600', fontSize: 13, color: this.statusColor(item.status) }}>{item.status}  </Text>
                    <Icon name='circle' type='font-awesome' size={5} color='rgb(150,150,150)' />
                    <Text style={{ fontSize: 13, fontWeight: '600', color: 'rgb(125,125,125)' }}>  {item.developerName}</Text>
                  </Row>
                  <Text style={{ fontWeight: '600', fontSize: 16, color: 'rgb(100,100,100)', marginTop: 4 }}>{item.gameName} </Text>
                  <Text style={{ fontSize: 12, color: 'rgb(125,125,125)', marginTop: 4, fontWeight: '400' }}>{item.shortDes}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </TouchableOpacity>
      )
    }
  }

  renderItemForHorizontal = ({ item, index }) => {
    if (item.featured === "True") {
      return (
        <TouchableOpacity onPress={() => this.fullInfoPage(item)} >
          <Card style={{ marginLeft: 5 }} transparent={true}>
            <CardItem>
              <Body style={{ alignItems: 'center' }}>
                <Image source={{ uri: item.gameScreenShot }} style={{ height: 150, width: 200 }} />
                <View style={{ width: 70, height: 70, marginTop: -35, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                  <Image source={{ uri: item.gameIconUrl }} style={{ width: 60, height: 60 }}></Image>
                </View>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Row style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: this.statusColor(item.status) }}>{item.status} </Text>
                  <Icon name='circle' type='font-awesome' size={5} color='rgb(150,150,150)' />
                  <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgb(125,125,125)' }}>  {item.developerName}</Text>
                </Row>
                <Row style={{ alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: 'rgb(100,100,100)' }}>{item.gameName}  </Text>
                  <Icon name='circle' type='font-awesome' size={5} color='rgb(150,150,150)' />
                  <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgb(150,150,150)' }}>  {item.genre}</Text>
                </Row>
                <Text style={{ fontSize: 13, fontWeight: '600', color: 'rgb(150,150,150)', marginTop: 5 }}>Expires {moment(item.expirationDate).format('MM/DD/YYYY')}</Text>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
      )
    }
  }

  // onRetry = () => {
  //   this.setState({ isLoading: true }, () => {
    
  //   })

  // }

  _onRefresh = () => {
    this.setState({ isLoading: true },()=>{
      setTimeout(() => {
        this.gameList()
      }, 500)
    });
    // Call api fun
  };

  render() {

    if (this.state.loading) {
      return (
        <View style={{
          flex: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '600', color: '#808080' }}>Loading available games...</Text>
            <Progress.Bar
              // indeterminate={true}
              progress={this.state.percentageProgress}
              width={wp("80")}
              borderWidth={0}
              style={{ borderRadius: 5, marginTop: 15 }}
              unfilledColor={"#E7E7E7"}
              color={Colors.purpleColor}
              animationType={"timing"}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(240,240,240)' }}>

        <Header
          placement="right"
          outerContainerStyles={{ height: 105 }}
          backgroundColor={Colors.purpleColor}
          leftComponent={
            <Button transparent style={{ justifyContent: 'flex-end', marginLeft: 5 }} onPress={() => this.onItemPress()} /*onPress={() => this.props.navigation.navigate('PlayerProfile')}*/  >
              <Icon name='ios-contact' type='ionicon' color='white' size={30} />
            </Button>}
          rightComponent={
            <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginTop: 5 }}>
              <FlatList ListHeaderComponent={this.renderHeader} style={{ backgroundColor: Colors.purpleColor }} scrollEnabled={false} > </FlatList>
            </View>}
        />
       
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => this._onRefresh()}
              colors={[Colors.headerColor]}
              tintColor={Colors.headerColor}
            />
          }
        >
          {this.state.data && this.state.data.length > 0 ? <ScrollView
            showsVerticalScrollIndicator={false} style={{ marginTop: -1 }}
          >
            <FlatList
              data={this.state.data}
              renderItem={this.renderItemForHorizontal}
              horizontal
              showsHorizontalScrollIndicator={false}
            //keyExtractor={item => item.id}
            />
            {this.state.isVertialHasItems == true ? <View style={{ alignItems: 'center', marginTop: 12, marginBottom: 8 }}>
              <Text style={{ fontWeight: '500', fontSize: 16, color: 'rgb(105,105,105)' }}>Just For You</Text>
              <Text style={{ fontWeight: '400', fontSize: 16, color: 'rgb(211,211,211)', marginTop: -5 }}>_________</Text>
            </View> : null}
            <FlatList
              data={this.state.data}
              showsVerticalScrollIndicator={false}
              renderItem={this.renderItemForVertical}
              //keyExtractor={item => item.id}
              style={{ flex: 1 }}
            />
            {/* <Card style={{ marginLeft: 10, marginRight: 10, marginTop: 0 }} transparent={true}>
            <CardItem style={{ justifyContent: 'center' }} >
              <Button transparent >
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'rgb(25,180,255)' }}>See More</Text>
              </Button>
            </CardItem>
          </Card> */}


          </ScrollView> :
            <View>
              <Text style={{ fontSize: 16, margin: 15, alignSelf: 'center', textAlign: 'center', fontWeight: '500', color: 'rgb(105,105,105)', marginTop: hp("33") }}>There are no games available at this time. Check back soon!</Text>
              {/* {this.state.isNoGameAvailable ?
                <TouchableOpacity style={myStyles.retryBtn} onPress={() => this.onRetry()}>
                  <Text style={myStyles.retryText}>Retry</Text>
                </TouchableOpacity>
                : null} */}
            </View>
          }
        </ScrollView>
      </View>

    );
  }
}

const myStyles = StyleSheet.create({
  retryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 50,
    backgroundColor: Colors.purpleColor,
    width: wp("50"),
    alignSelf: 'center'
  },
  retryText: {
    color: 'rgb(255,255,255)',
    fontSize: 18,
    fontWeight: '600'
  }

});

export default PlayerGamesList;

