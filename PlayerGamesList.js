import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, ImageBackground, TouchableOpacity, Image, Dimensions,ScrollView } from 'react-native';
import { List, ListItem, SearchBar, Avatar, Header, Icon } from 'react-native-elements';
import{
  Card,Button,
  CardItem,
  Body, Left, Row
  //Header, 
 // Icon
} from 'native-base'
import { FirebaseData } from '../../providers/firebase';
import styles from '../../constants/Styles';
import logo from '../../assets/images/logo.jpg'

//use this to convert an image to uri https://onlinepngtools.com/convert-png-to-data-uri

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
class PlayerGamesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      gamesProfileAll:[],
    };
    this.arrayholder = [];
    this.resultsAll = [];
    this.results = [];
  }


  componentDidMount() {
    this.listenForGames(); 
  }
 
  
listenForGames() {

  this.setState({ loading: true });
  var gamesRootRef = FirebaseData.getRef('games');
  let items = []; 
  gamesRootRef.on('value', (userRef) => { 
    userRef.forEach((eachUser) => { 
      eachUser.forEach((eachGame) => {                
          var tempUrl = eachGame.val().gameIconUrl;
          if (tempUrl === null || (tempUrl != null && tempUrl.trim() == ""))   {
            tempUrl = 'https://api.adorable.io/avatars/1/';
          }
          var temp1Url = eachGame.val().gameMainUrl;
          if (temp1Url === null || (temp1Url != null && temp1Url.trim() == ""))   {
            temp1Url = 'https://api.adorable.io/avatars/2/';
          }      
          
          if (eachGame.val().gameStatus != null && eachGame.val().gameStatus.trim() != "" && eachGame.val().gameStatus != "UnderReview")
          {
            items.push({
                id: eachGame.key,
                gameName: eachGame.val().gameName,
                gameDesc: eachGame.val().gameDesc,
                gameInstruct: eachGame.val().gameInstruct,
                gamePlatform: eachGame.val().gamePlatform,
                gameDeveloper: eachGame.val().gameDeveloper,
                gameDesc: eachGame.val().gameDesc,
                gameShortDesc: eachGame.val().gameShortDesc,
                gameDetails: eachGame.val().gameDetails,          
                gameGenre: eachGame.val().gameGenre,
                gameAgeRange: eachGame.val().gameAgeRange,
                gameSurveyLength: eachGame.val().gameSurveyLength,
                gameStatus: eachGame.val().gameStatus,            
                gameIconUrl: tempUrl,
                gameLikes: eachGame.val().gameLikes,
                primaryContactEmail: eachGame.val().primaryContactEmail,  
                gameMainUrl: temp1Url,              
        }); 
      }
        }); //end of user.forEach((game) => {        
          this.setState({
            data: items,
            error: null,
            loading: false,
          });
          this.arrayholder = items;
          if (this.arrayholder.length > 0)
          {
            this.message1 = 'Featured Games';
            this.message2 = 'Just For You';
          }
          else{
            this.message1 = 'Games not available';
            this.message2 = '';
          }
        }); //end of eachUserId.forEach((user) =>
      }); //end of gamesRootRef.on('value', (snap) =>   
}


  searchFilterFunction = text => {
    if (!text.length)
    {
        this.listenForGames();
    }
    else
    {
        const newData = this.arrayholder.filter(item => {
    //      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
        const itemData = `${item.gameName.toUpperCase()} ${item.gameDesc.toUpperCase()}`; 
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
        });
    }
  };

  renderHeader = () => {
    return (
      <SearchBar
        platform="ios"
        clearIcon
        placeholder= "Search for games, developers, or genres"
        cancelButtonTitle="Cancel"        
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        containerStyle= {{backgroundColor:'rgb(91,41,114)',borderTopColor:'rgb(91,41,114)', borderBottomColor:'rgb(91,41,114)', width: SCREEN_WIDTH-75}}
        inputStyle={{ backgroundColor: 'white', fontSize: 14}}
      />
    );
  };

  

  editGameProfile(id, gameName, gameDesc, gameInstruct, gamePlatform, gameDeveloper, gameShortDesc, gameDetails, gameGenre, gameAgeRange, gameSurveyLength, gameStatus, gameIconUrl, gameMainUrl, gameLikes, primaryContactEmail){
    this.props.navigation.navigate('PlayerSurveyList',
                                    {   gameId: id, 
                                        gameName: gameName , 
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

  render() {
    console.log("this.state.data", this.state.data);
    
    if (this.state.loading) {
      return (
        <View style = {{
          flex:1,
          width:SCREEN_WIDTH,
          height:SCREEN_HEIGHT,
          justifyContent: 'center',
          backgroundColor: 'rgb(91,41,114)'
        }}>
            <View style = {{alignItems: 'center', justifyContent: 'center', marginHorizontal: 20}}>
              <Text style = {{fontSize: 18, textAlign: 'center', fontWeight: '600', color: 'white'}}>Please give us a moment while we gather your games...</Text>
              <ActivityIndicator style = {{marginTop: 20}} size="large" />
            </View>
        </View>
      );
    }
    return (
    <View style={{flex: 1, backgroundColor:'rgb(240,240,240)'}}>     
     <Header
        placement="right"
        outerContainerStyles={{ height: 105}}
        backgroundColor='rgb(91,41,114)'
        leftComponent ={
          
          <Button transparent style={{justifyContent: 'flex-end'}} onPress={() => this.props.navigation.navigate('PlayerProfile')}>
            <Icon name='ios-contact' type='ionicon' color='white' size = {30} /> 
          </Button>}
        
        rightComponent={
          <View style={{alignItems: 'center', justifyContent:'flex-end', marginTop: 5}}>
            <FlatList ListHeaderComponent={this.renderHeader} style = {{backgroundColor:'rgb(100,45,110)'}} scrollEnabled = {false} > </FlatList>  
          </View>}
                        /*
        rightComponent={<Avatar
          small
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          />}
        containerStyle={{
          justifyContent: 'space-around',
        }}
        */
      />          
      <ScrollView 
      showsVerticalScrollIndicator = {false} style = {{marginTop: -1}}
      >
      <FlatList
        data={this.state.data} 
        renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.editGameProfile(item.id,item.gameName, item.gameDesc, item.gameInstruct, item.gamePlatform, item.gameDeveloper, item.gameShortDesc, item.gameDetails, item.gameGenre, item.gameAgeRange, item.gameSurveyLength, item.gameStatus,item.gameIconUrl, item.gameMainUrl, item.gameLikes, item.primaryContactEmail)} >
              <Card style = {{marginLeft: 5}} transparent = {true}>
                <CardItem>
                  <Body style = {{alignItems:'center'}}>
                    <Image source = {{ uri : item.gameMainUrl}} style = {{height:150,width:200}}/>
                    <View style = {{width:70,height:70,marginTop:-35, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 5, shadowColor: "#000", shadowOffset: {width:0,height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                      <Image source = {{ uri: item.gameIconUrl } } style = {{width:60,height:60}}></Image>
                    </View>
                  </Body>
                </CardItem>

                <CardItem>
                  <Body>
                    <Row style = {{alignItems: 'center'}}>
                      <Text style = {{fontSize: 15, fontWeight: '600', color: 'red'}}>{item.gameStatus}  </Text>
                      <Icon name='circle' type='font-awesome' size = {5} color='rgb(150,150,150)' /> 
                      <Text style = {{fontSize: 15, fontWeight: '600', color: 'rgb(125,125,125)'}}>  {item.gameDeveloper}</Text>
                    </Row>
                    <Row style = {{alignItems: 'center', marginTop: 5}}>
                      <Text style = {{fontSize: 18, fontWeight: '600', color: 'rgb(100,100,100)'}}>{item.gameName}  </Text>
                      <Icon name='circle' type='font-awesome' size = {5} color='rgb(150,150,150)' /> 
                      <Text style = {{fontSize: 13, fontWeight: '600', color: 'rgb(150,150,150)'}}>  {item.gameGenre}</Text>
                    </Row>
                    <Text style = {{fontSize: 13, fontWeight: '600', color: 'rgb(150,150,150)', marginTop: 5}}>Expires 8/21/19</Text>
                  </Body>  
                </CardItem>
              </Card>
            </TouchableOpacity>            
        )}
        horizontal
        showsHorizontalScrollIndicator = {false}
        keyExtractor={item => item.id}       
      />       
            <View style = {{alignItems: 'center', marginTop: 12, marginBottom:8}}>
              <Text style = {{fontWeight:'500', fontSize: 16, color: 'rgb(105,105,105)' }}>Just For You</Text>
              <Text style = {{fontWeight:'400', fontSize: 16, color: 'rgb(211,211,211)', marginTop: -5 }}>_________</Text>
            </View> 

            <FlatList
              data={this.state.data} 
              showsVerticalScrollIndicator = {false}
              renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => this.editGameProfile(item.id,item.gameName, item.gameDesc, item.gameInstruct, item.gamePlatform, item.gameDeveloper, item.gameShortDesc, item.gameDetails, item.gameGenre, item.gameAgeRange, item.gameSurveyLength, item.gameStatus,item.gameIconUrl, item.gameMainUrl, item.gameLikes, item.primaryContactEmail)} >
                    <Card style = {{marginLeft:10, marginRight:10}} transparent = {true}>
                      <CardItem>
                        <Left>
                          <Image source = {{ uri: item.gameIconUrl } } style = {{width:60,height:60}}></Image>
                          <Body>
                            <Row style = {{alignItems: 'center'}}>
                              <Text style = {{fontWeight:'600', fontSize: 13, color: 'red' }}>{item.gameStatus}  </Text>
                              <Icon name='circle' type='font-awesome' size = {5} color='rgb(150,150,150)' /> 
                              <Text style = {{fontSize: 13, fontWeight: '600', color: 'rgb(125,125,125)'}}>  {item.gameDeveloper}</Text>
                            </Row>
                            <Text style = {{fontWeight:'600', fontSize: 16, color: 'rgb(100,100,100)', marginTop: 4 }}>{item.gameName} </Text>
                            <Text style = {{fontSize: 12, color: 'rgb(125,125,125)', marginTop: 4, fontWeight: '400'}}>{item.gameShortDesc}</Text>
                          </Body>                             
                        </Left>                 
                      </CardItem>
                    </Card>               
                  </TouchableOpacity>            
              )}
              keyExtractor={item => item.id}       
            /> 
              <Card style = {{marginLeft:10, marginRight:10,marginTop:0}} transparent = {true}>
                <CardItem style = {{justifyContent: 'center'}} >
                  <Button transparent >
                    <Text style = {{fontSize: 16, fontWeight: '600',color:'rgb(25,180,255)'}}>See More</Text>
                  </Button>
                </CardItem>
              </Card>  

           
              </ScrollView>     
     </View>

    );
  }
}

export default PlayerGamesList;

