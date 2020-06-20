import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, ScrollView, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import { List, ListItem, SearchBar, Avatar, Header, Icon } from 'react-native-elements';
import { FirebaseData } from '../../providers/firebase';
import logo from '../../assets/images/robot-prod.png'
import bgImage from '../../assets/images/LoginPageBackground.jpg';
import styles from '../../constants/Styles';
import {
  Card,
  CardItem,
  Body, Left, Right, Button,
} from 'native-base'
import Colors from "../../constants/Colors";
// import { ACTION_SHOW_REMOTE_BUGREPORT_DIALOG } from 'expo/build/IntentLauncherAndroid/IntentLauncherAndroid';
import moment from 'moment'
import Layout from "../../constants/Layout";
class PlayerSurveyList extends Component {
  state = {
    gameId: '',
    loading: false,
    data: [],
    error: null,
  }
  constructor(props) {
    super(props);
    // const {navigation} = this.props;
    // const itemId = navigation.getParam('gameId');  
    // const itemGameName = navigation.getParam('gameName');
    // const itemGameDesc = navigation.getParam('gameDesc'); 
    // const itemGameInstruct = navigation.getParam('gameInstruct'); 
    // const itemGamePlatform = navigation.getParam('gamePlatform'); 
    // const itemGameDeveloper = navigation.getParam('gameDeveloper'); 
    // const itemGameShortDesc = navigation.getParam('gameShortDesc'); 
    // const itemGameDetails = navigation.getParam('gameDetails'); 
    // const itemGameGenre = navigation.getParam('gameGenre'); 
    // const itemGameAgeRange = navigation.getParam('gameAgeRange'); 
    // const itemGameSurveyLength = navigation.getParam('gameSurveyLength'); 
    // const itemGameStatus = navigation.getParam('gameStatus'); 

    // const itemGameIconUrl = navigation.getParam('gameIconUrl');
    // const itemGameMainUrl = navigation.getParam('gameMainUrl');    
    // const itemGameLikes = navigation.getParam('gameLikes'); 
    // this.state = {
    //   gameId: itemId,   
    //   gameName:  itemGameName,
    //   gameDesc: itemGameDesc,
    //   gameInstruct: itemGameInstruct,
    //   gamePlatform: itemGamePlatform,
    //   gameDeveloper: itemGameDeveloper,
    //   gameShortDesc: itemGameShortDesc,
    //   gameDetails: itemGameDetails,
    //   gameGenre: itemGameGenre,
    //   gameAgeRange: itemGameAgeRange,
    //   gameSurveyLength: itemGameSurveyLength,
    //   gameStatus: itemGameStatus,
    //   gameIconUrl: itemGameIconUrl,
    //   gameMainUrl: itemGameMainUrl,
    //   gameLikes: itemGameLikes,
    // };

    this.state = {
      gameName: "",
      developerName: "",
      selectedFeatured: "",
      selectedStatus: "",
      selectedPlatform: "",
      selectedShortDes: "",
      selectedLongDes: "",
      zMaxPoint: "",
      zMinPoint: "",
      expiryDay: "",
      instructions: "",
      details: "",
      genre: "",
      ageMin: "",
      ageMax: "",
      surveyLength: "",
      downloadLink: "",
      isUpdate: false,
      id: "",
      gameIconUrl: "",
      gameScreenShot: "",
      userId: "",
      downloadLinkPlayStore: "",
      downloadLinkIOS: "",
      downloadLinkPC: "",
      isContinue: false,
      screenIndex: 1,
      currentIndex: 0,
      selectedItem: 0,
    }

    this.arrayholder = [];
  }


  componentWillReceiveProps(newProps) {

    let data = newProps.navigation.state.params;
    if (data !== "" && data !== null && data !== undefined) {
      this.setState({
        isContinue: data.isContinue !== "" && data.isContinue !== null && data.isContinue !== undefined ? data.isContinue : false,
        screenIndex: data.screenIndex !== "" && data.screenIndex !== null && data.screenIndex !== undefined ? data.screenIndex : 1,
        currentIndex: data.currentIndex !== "" && data.currentIndex !== null && data.currentIndex !== undefined ? data.currentIndex : 0,
        selectedItem: data.selectedItem !== "" && data.selectedItem !== null && data.selectedItem !== undefined ? data.selectedItem : 0,
      })
    }
  }
  componentDidMount() {

    let data = this.props.navigation.state.params;
    if (data !== "" && data !== null && data !== undefined) {
      let myAllData = this.props.navigation.state.params.gameInfo;
      this.setState({
        gameName: myAllData.gameName !== "" && myAllData.gameName !== null && myAllData.gameName !== undefined ? myAllData.gameName : "",
        developerName: myAllData.developerName !== "" && myAllData.developerName !== null && myAllData.developerName !== undefined ? myAllData.developerName : "",
        selectedFeatured: myAllData.featured !== "" && myAllData.featured !== null && myAllData.featured !== undefined ? myAllData.featured : "",
        selectedStatus: myAllData.status !== "" && myAllData.status !== null && myAllData.status !== undefined ? myAllData.status : "",
        selectedPlatform: myAllData.platform !== "" && myAllData.platform !== null && myAllData.platform !== undefined ? myAllData.platform : "",
        selectedShortDes: myAllData.shortDes !== "" && myAllData.shortDes !== null && myAllData.shortDes !== undefined ? myAllData.shortDes : "",
        selectedLongDes: myAllData.longDes !== "" && myAllData.longDes !== null && myAllData.longDes !== undefined ? myAllData.longDes : "",
        zMaxPoint: myAllData.zMax !== "" && myAllData.zMax !== null && myAllData.zMax !== undefined ? myAllData.zMax : "",
        zMinPoint: myAllData.zMin !== "" && myAllData.zMin !== null && myAllData.zMin !== undefined ? myAllData.zMin : "",
        expiryDay: myAllData.expirationDate !== "" && myAllData.expirationDate !== null && myAllData.expirationDate !== undefined ? myAllData.expirationDate : "",
        instructions: myAllData.instructions !== "" && myAllData.instructions !== null && myAllData.instructions !== undefined ? myAllData.instructions : "",
        details: myAllData.details !== "" && myAllData.details !== null && myAllData.details !== undefined ? myAllData.details : "",
        genre: myAllData.genre !== "" && myAllData.genre !== null && myAllData.genre !== undefined ? myAllData.genre : "",
        ageMin: myAllData.ageMin !== "" && myAllData.ageMin !== null && myAllData.ageMin !== undefined ? myAllData.ageMin : "",
        ageMax: myAllData.ageMax !== "" && myAllData.ageMax !== null && myAllData.ageMax !== undefined ? myAllData.ageMax : "",
        surveyLength: myAllData.surveyLength !== "" && myAllData.surveyLength !== null && myAllData.surveyLength !== undefined ? myAllData.surveyLength : "",
        downloadLink: myAllData.downloadLink !== "" && myAllData.downloadLink !== null && myAllData.downloadLink !== undefined ? myAllData.downloadLink : "",
        isUpdate: myAllData.isUpdate !== "" && myAllData.isUpdate !== null && myAllData.isUpdate !== undefined ? myAllData.isUpdate : false,
        id: myAllData.id !== "" && myAllData.id !== null && myAllData.id !== undefined ? myAllData.id : false,
        gameIconUrl: myAllData.gameIconUrl !== "" && myAllData.gameIconUrl !== null && myAllData.gameIconUrl !== undefined ? myAllData.gameIconUrl : "",
        gameScreenShot: myAllData.gameScreenShot !== "" && myAllData.gameScreenShot !== null && myAllData.gameScreenShot !== undefined ? myAllData.gameScreenShot : "",
        userId: myAllData.userId !== "" && myAllData.userId !== null && myAllData.userId !== undefined ? myAllData.userId : "",
        downloadLinkPlayStore: myAllData.downloadLinkPlayStore !== "" && myAllData.downloadLinkPlayStore !== null && myAllData.downloadLinkPlayStore !== undefined ? myAllData.downloadLinkPlayStore : "",
        downloadLinkIOS: myAllData.downloadLinkIOS !== "" && myAllData.downloadLinkIOS !== null && myAllData.downloadLinkIOS !== undefined ? myAllData.downloadLinkIOS : "",
        downloadLinkPC: myAllData.downloadLinkPC !== "" && myAllData.downloadLinkPC !== null && myAllData.downloadLinkPC !== undefined ? myAllData.downloadLinkPC : "",

      }, () => {
        this.listenForSurveys();
      })

    }
  }


  listenForSurveys() {
    // this.setState({ loading: true });
    var itemsRef = FirebaseData.getSurvey(this.state.userId, this.state.id);
    itemsRef.on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          id: child.key,
          surveyDesc: child.val().surveyQuestion,
          answerList: child.val().answer,
          isMultiChoice: child.val().isMultiChoice,
          selectedValue: "",
          answer: ""
        });
      });
      this.setState({
        data: items,
        error: null,
        loading: false,
      });
      // this.arrayholder = items;
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.surveyDesc.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
    //  }
  };



  editSurveyProfile(id, surveyDesc, surveyResponse) {
    this.props.navigation.navigate('PlayerSurveyEdit');
  }

  renderItem = ({ item, index }) => {
    return (
      <CardItem button bordered>
        <Body style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, color: 'rgb(105,105,105)' }}>{item.surveyDesc}</Text>
        </Body>
        <Right>
          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Icon name='ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
          </View>
        </Right>
      </CardItem>
    )
  }

  onSurveyScreen = () => {
    if (this.state.data && this.state.data.length > 0) {
      this.props.navigation.navigate('PlayerSurveyScreen', { surveyQuestion: this.state.data, developerId: this.state.userId, gameId: this.state.id, gameName: this.state.gameName, developerName: this.state.developerName, zMinPoint: this.state.zMinPoint, zMaxPoint: this.state.zMaxPoint, screenIndex: this.state.screenIndex, currentIndex: this.state.currentIndex, selectedItem: this.state.selectedItem })
    } else {
      // alert("Survey questions not found")
      Alert.alert(
        //title
        'Whoops…',
        //body
        'This survey is not available yet. Please retry soon.',
        [
          { text: 'Ok', onPress: () => console.log(''), style: 'cancel' },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );

    }
  }

  onBackPress = () => {
    Alert.alert(
      //title
      'Are you sure?',
      //body
      'Are you sure you want to exit?',
      [
        { text: 'Ok', onPress: () => this.props.navigation.navigate("PlayerGamesList"), style: 'cancel' },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );

  }

  onClickingDownload = () => {
    //Linking.openURL('http://aboutreact.com');
  }
  openLink = (value) => {
    if (value !== undefined && value !== "" && value !== null) {
      // Linking.canOpenURL(value)
      Linking.canOpenURL(value).then(supported => {
        if (supported) {
          Linking.openURL(value);
        } else {
          alert("Invalid link")
        }
      })


    }
  }

  isValidURL = (value) => {
    if (value !== undefined && value !== "" && value !== null) {
      var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);

      if (value.match(regex)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(240,240,240)' }}>

        <Header
          outerContainerStyles={{ zIndex: 1, height: Layout.headerHeight, borderBottomColor: Colors.purpleColor }}
          backgroundColor={Colors.purpleColor}
          innerContainerStyles={{ alignItems: 'center', paddingTop: Layout.paddingTop }}
          leftComponent={
            <Button transparent style={{ justifyContent: 'center', alignItems: 'center', width: 25, }} onPress={() => this.props.navigation.goBack()}>
              <Icon size={25} name='ios-arrow-back' type='ionicon' color='white' />
            </Button>
          }
          /*centerComponent={<View style={{alignItems: 'center'}}>
                           <Text style={{justifyContent: 'center', color: '#fff', alignContent:'center', fontSize: 20}}>{this.state.gameName}</Text>
                           </View>}
          <View style = {{alignItems: 'center', marginTop: 20, marginBottom: 10}}>
                  <Button style = {{width: 150, height:40, backgroundColor: 'rgb(135,206,250)'}} ></Button>
          </View>                  
          */
          //rightComponent={<Icon name='window-close' type='font-ayarn add @ant-design/icons-reactwesome'  color='#fff' onPress={() => this.props.navigation.navigate('PlayerGamesList')}/>} //
          containerStyle={{
            justifyContent: 'space-around',
          }}
        />

        <ScrollView>
          <Card>
            <CardItem bordered style={{ marginTop: 15 }}>
              <Body style={{ alignItems: 'center' }}>
                <Image source={{ uri: this.state.gameScreenShot }} style={{ height: 150, width: 200 }} />
                <View style={{ width: 70, height: 70, marginTop: -35, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                  <Image source={{ uri: this.state.gameIconUrl }} style={{ width: 60, height: 60 }}></Image>
                </View>
                <Text style={{ fontWeight: '500', fontSize: 26, alignItems: 'center', marginTop: 12, color: 'rgb(10,10,10)',textAlign:'center' }}>{this.state.gameName}</Text>
                <Text style={{ fontWeight: '500', fontSize: 18, alignItems: 'center', marginTop: 6, color: 'rgb(80,80,80)' }}>{this.state.developerName}</Text>
              </Body>
            </CardItem>

            <CardItem bordered>
              <Body>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Icon name='ios-information-circle-outline' type='ionicon' color='rgb(175,175,175)' />
                  </View>

                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Icon name='ios-search' type='ionicon' color='rgb(175,175,175)' />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Icon name='ios-hourglass' type='ionicon' color='rgb(175,175,175)' />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 3 }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontWeight: '600', color: 'rgb(175,175,175)', textAlign: 'center' }}>{this.state.selectedPlatform}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontWeight: '600', color: 'rgb(175,175,175)', textAlign: "center" }}>{this.state.genre}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontWeight: '600', color: 'rgb(175,175,175)' }}>{this.state.surveyLength} minutes</Text>
                  </View>
                </View>
              </Body>
            </CardItem>


            <View style={{ height: 12 }}></View>
            <CardItem >
              <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Description</Text>
            </CardItem>
            <CardItem bordered style={{}}>
              <Body>
                <Text style={{ fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)' }}>{this.state.selectedLongDes}</Text>
              </Body>
            </CardItem>

            <View style={{ height: 12 }}></View>
            <CardItem bordered>
              <Body style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)', marginBottom: 10 }}>Rewards</Text>
              </Body>
              <Right>
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <Text onPress={() => { this.onClickingDownload() }} style={{ fontSize: 15, marginBottom: 10, fontWeight: '400', textAlign: 'left', color: 'rgb(105,105,105)' }}>{this.state.zMinPoint}-{this.state.zMaxPoint} ZPoints</Text>
                </View>
              </Right>
            </CardItem>

            <View style={{ height: 12 }}></View>
            <CardItem bordered>
              <Body style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)', marginBottom: 10 }}>Age Rating</Text>
              </Body>
              <Right>
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <Text onPress={() => { this.onClickingDownload() }} style={{ fontSize: 15, marginBottom: 10, fontWeight: '400', textAlign: 'left', color: 'rgb(105,105,105)' }}>{this.state.ageMin}+</Text>
                </View>
              </Right>
            </CardItem>

            <View style={{ height: 12 }}></View>
            <CardItem bordered  >
              <Body style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)', marginBottom: 10 }}>Expires</Text>
              </Body>
              <Right>
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <Text onPress={() => { this.onClickingDownload() }} style={{ fontSize: 15, marginBottom: 10, fontWeight: '400', textAlign: 'left', color: 'rgb(105,105,105)' }}>{moment(this.state.expiryDay).format('MM/DD/YYYY')}</Text>
                </View>
              </Right>
            </CardItem>



            <View style={{ height: 12 }}></View>
            <CardItem >
              <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Details</Text>
            </CardItem>
            <CardItem bordered style={{}}>
              <Body>
                <Text style={{ fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)' }}>{this.state.details}</Text>
              </Body>
            </CardItem>

            <View style={{ height: 12 }}></View>
            <CardItem >
              <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Instructions</Text>
            </CardItem>
            <CardItem bordered style={{}}>
              <Body>
                <Text style={{ fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)' }}>{this.state.instructions}</Text>
              </Body>
            </CardItem>

            <View style={{ height: 12 }}></View>

            <CardItem >
              <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Download Link (IOS App Store)</Text>
            </CardItem>
            {this.isValidURL(this.state.downloadLinkIOS) ?
              <CardItem button bordered style={{}} onPress={() => { this.openLink(this.state.downloadLinkIOS) }} >
                <Body>
                  <Text style={{ fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)' }}>{this.state.downloadLinkIOS}</Text>
                </Body>
              </CardItem> :
              <CardItem bordered style={{}} >
                <Body>
                  <Text style={{ fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)' }}>{this.state.downloadLinkIOS}</Text>
                </Body>
              </CardItem>
            }

            <View style={{ height: 12 }}></View>
            
            { Platform.OS === "android"? <View>
              <CardItem >
                <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Download Link (Google Play Store)</Text>
              </CardItem>
              {this.isValidURL(this.state.downloadLinkPlayStore) ?
                <CardItem bordered button style={{}} onPress={() => { this.openLink(this.state.downloadLinkPlayStore) }}>
                  <Body>
                    <Text style={{ fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)' }}>{this.state.downloadLinkPlayStore}</Text>
                  </Body>

                </CardItem>
                :
                <CardItem bordered style={{}} >
                  <Body>
                    <Text style={{ fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)' }}>{this.state.downloadLinkPlayStore}</Text>
                  </Body>

                </CardItem>
              }
              <View style={{ height: 12 }}></View>
            </View>:null}
            <CardItem >
              <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Download Link (PC)</Text>
            </CardItem>
            {this.isValidURL(this.state.downloadLink) ?
              <CardItem bordered button style={{}} onPress={() => { this.openLink(this.state.downloadLink) }}>
                <Body>
                  <Text style={{ fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)' }}>{this.state.downloadLink}</Text>
                </Body>

              </CardItem>
              : <CardItem bordered style={{}} >
                <Body>
                  <Text style={{ fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)' }}>{this.state.downloadLink}</Text>
                </Body>

              </CardItem>
            }
            <CardItem button onPress={() => this.onSurveyScreen()} >
              <Body style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: 'rgb(80,80,80)' }}>{this.state.isContinue ? "Continue Survey" : "Begin Survey"}</Text>
              </Body>
              <Right>
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <Icon name='ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
                </View>
              </Right>
            </CardItem>

          </Card>

          {/* {this.state.data && this.state.data.length > 0 ?
            <View>
              <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Survey Question</Text>
              <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
              />
            </View>
            : null} */}
        </ScrollView>
      </View>

    );
  }
}

export default PlayerSurveyList;