//This is a version of PlayerSurveyList that has the questions at the bottom of the screen

import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import { List, ListItem, SearchBar, Avatar, Header, Icon  } from 'react-native-elements';
import { FirebaseData } from '../../providers/firebase';
import logo from '../../assets/images/robot-prod.png'
import bgImage from '../../assets/images/LoginPageBackground.jpg';
import styles from '../../constants/Styles';
import{
  Card,
  CardItem,
  Body, Left, Right, Button
} from 'native-base'
import { ACTION_SHOW_REMOTE_BUGREPORT_DIALOG } from 'expo/build/IntentLauncherAndroid/IntentLauncherAndroid';

class PlayerSurveyList extends Component {
    state = { 
        gameId: '',
        loading: false,
        data: [],
        error: null,
    }
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const itemId = navigation.getParam('gameId');  
    const itemGameName = navigation.getParam('gameName');
    const itemGameDesc = navigation.getParam('gameDesc'); 
    const itemGameInstruct = navigation.getParam('gameInstruct'); 
    const itemGamePlatform = navigation.getParam('gamePlatform'); 
    const itemGameDeveloper = navigation.getParam('gameDeveloper'); 
    const itemGameShortDesc = navigation.getParam('gameShortDesc'); 
    const itemGameDetails = navigation.getParam('gameDetails'); 
    const itemGameGenre = navigation.getParam('gameGenre'); 
    const itemGameAgeRange = navigation.getParam('gameAgeRange'); 
    const itemGameSurveyLength = navigation.getParam('gameSurveyLength'); 
    const itemGameStatus = navigation.getParam('gameStatus'); 

    const itemGameIconUrl = navigation.getParam('gameIconUrl');
    const itemGameMainUrl = navigation.getParam('gameMainUrl');    
    const itemGameLikes = navigation.getParam('gameLikes'); 
    this.state = {
      gameId: itemId,   
      gameName:  itemGameName,
      gameDesc: itemGameDesc,
      gameInstruct: itemGameInstruct,
      gamePlatform: itemGamePlatform,
      gameDeveloper: itemGameDeveloper,
      gameShortDesc: itemGameShortDesc,
      gameDetails: itemGameDetails,
      gameGenre: itemGameGenre,
      gameAgeRange: itemGameAgeRange,
      gameSurveyLength: itemGameSurveyLength,
      gameStatus: itemGameStatus,
      gameIconUrl: itemGameIconUrl,
      gameMainUrl: itemGameMainUrl,
      gameLikes: itemGameLikes,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.listenForSurveys();
  }

  listenForSurveys() {
    this.setState({ loading: true });
    var itemsRef = FirebaseData.getSurveyRef(this.state.gameId);
    itemsRef.on('value', (snap) => { 
      let items = [];  
      snap.forEach((child) => {                 
        items.push({
            id: child.key,
            surveyDesc: child.val().surveyQuestion,
            surveyResponse: child.val().surveyResponse,
        });
      });
      this.setState({
        data: items,
        error: null,
        loading: false,
      });
      this.arrayholder = items;
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

  

  editSurveyProfile(id, surveyDesc, surveyResponse){
    this.props.navigation.navigate('PlayerSurveyEdit',
                                    {   id: id, 
                                        gameId: this.state.gameId , 
                                        surveyDesc: surveyDesc,
                                        surveyResponse: surveyResponse});
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
      <View style={{flex: 1, backgroundColor:'rgb(240,240,240)'}}>     
        
        <Header
          outerContainerStyles={{ zIndex: 1, height:90 }}
          backgroundColor='rgb(100,45,110)'
          innerContainerStyles = {{alignItems: 'center'}}
          leftComponent ={
          <Button transparent style = {{ justifyContent: 'center', alignItems: 'center', width:25, marginTop: 40}} onPress={() => this.props.navigation.navigate('PlayerGamesList')}>
            <Icon style = {{height:25, width:25}} name = 'ios-arrow-back' type='ionicon' color='white' />
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
            <CardItem bordered style = {{marginTop: 15}}>
              <Body style = {{alignItems:'center'}}>
                <Image source = {{ uri : this.state.gameMainUrl}} style = {{height:150,width:200}}/>
                <View style = {{width:70,height:70,marginTop:-35, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 5, shadowColor: "#000", shadowOffset: {width:0,height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                  <Image source = {{ uri: this.state.gameIconUrl } } style = {{width:60,height:60}}></Image>
                </View>
                <Text style = {{fontWeight: '500', fontSize:26, alignItems:'center', marginTop:12, color: 'rgb(10,10,10)'}}>{this.state.gameName}</Text>
                <Text style = {{fontWeight: '500', fontSize:18, alignItems:'center', marginTop:6, color: 'rgb(80,80,80)'}}>{this.state.gameDeveloper}</Text>
              </Body>
            </CardItem>
          
            <CardItem bordered>
              <Body>
                <View style = {{flexDirection: 'row'}}>
                  <View style = {{flex:1, alignItems: 'center'}}>
                    <Icon name='ios-information-circle-outline' type='ionicon' color = 'rgb(175,175,175)'/>
                  </View>
                  
                  <View style = {{flex:1, alignItems: 'center'}}>
                    <Icon name='ios-search' type='ionicon'  color = 'rgb(175,175,175)'/>                
                  </View>
                  <View style = {{flex:1, alignItems: 'center'}}>
                    <Icon name='ios-hourglass' type='ionicon'  color = 'rgb(175,175,175)'/>
                  </View>
                </View>
                <View style = {{flexDirection: 'row', marginTop: 3}}>
                  <View style = {{flex:1, alignItems: 'center'}}>
                    <Text style = {{fontWeight: '600', color:'rgb(175,175,175)'}}>{this.state.gamePlatform}</Text>
                  </View>
                  <View style = {{flex:1, alignItems: 'center'}}>
                    <Text style = {{fontWeight: '600', color:'rgb(175,175,175)'}}>{this.state.gameGenre}</Text>
                  </View>
                  <View style = {{flex:1, alignItems: 'center'}}>
                    <Text style = {{fontWeight: '600', color:'rgb(175,175,175)'}}>{this.state.gameSurveyLength} minutes</Text>
                  </View>
                </View>
              </Body>
            </CardItem>
            <View style = {{height: 12}}></View>
            <CardItem >
              <Text style = {{fontSize:15, fontWeight: '500', color: 'rgb(80,80,80)'}}>Details</Text>
            </CardItem>
            <CardItem bordered style = {{}}>
              <Body>
                <Text style = {{fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)'}}>{this.state.gameDetails}</Text>
              </Body>
            </CardItem>
            <View style = {{height: 12}}></View>
            <CardItem >
              <Text style = {{fontSize:15, fontWeight: '500', color: 'rgb(80,80,80)'}}>Description</Text>
            </CardItem>
            <CardItem bordered style = {{}}>
              <Body>
                <Text style = {{fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)'}}>{this.state.gameDesc}</Text>
              </Body>
            </CardItem>
            <View style = {{height: 12}}></View>
            <CardItem >
              <Text style = {{fontSize:15, fontWeight: '500', color: 'rgb(80,80,80)'}}>Instructions</Text>
            </CardItem>
            <CardItem bordered style = {{}}>
              <Body>
                <Text style = {{fontSize: 14, marginBottom: 10, textAlign: 'left', color: 'rgb(105,105,105)'}}>{this.state.gameInstruct}</Text>
              </Body>
            </CardItem>
            <CardItem button onPress={() => this.props.navigation.navigate('PlayerSurveyWarning')} >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 18, fontWeight:'500', color: 'rgb(80,80,80)'}}>Begin Survey</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)'  />
              </View>
              </Right>
             </CardItem>
          </Card>

          

          
          <View style = {{alignItems: 'center', marginTop: 12, marginBottom:8}}>
            <Text style = {{fontWeight:'500', fontSize: 16, color: 'rgb(105,105,105)' }}>Survey Questions</Text>
            <Text style = {{fontWeight:'400', fontSize: 16, color: 'rgb(211,211,211)', marginTop: -5 }}>_________</Text>
          </View> 

          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <ListItem
                  roundAvatar
                  key={item.id}
                  title={item.surveyDesc}
                  containerStyle={{ borderBottomWidth: 0 }}
                  onPressRightIcon={() => this.editSurveyProfile(item.id, item.surveyDesc, item.surveyResponse)} 
                />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.renderSeparator}
              //ListHeaderComponent={this.renderHeader}
              //ListFooterComponent={this.renderFooter}
              
            />
          </List>

        </ScrollView>
      </View>
    
    );
  }
}

export default PlayerSurveyList;