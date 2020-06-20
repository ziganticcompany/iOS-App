import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
import { List, ListItem, SearchBar, Header, Avatar, Icon } from 'react-native-elements';
import { FirebaseData } from '../../providers/firebase';
import logo from '../../assets/images/robot-prod.png'
import bgImage from '../../assets/images/backgroundImage.jpg';
import styles from '../../constants/Styles';
//import console = require('console');

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
    //this.getListOfAllGames();  
    this.listenForGames(); 
  }
 
  getListOfAllGames() { 

    try{
    FirebaseData.getRef("games/").orderByValue().on("value", (userKeys) => {    
      var results = [];
      var i = 0;      
        userKeys.forEach((userKey) => { 
            FirebaseData.getRef("games/" + userKey.key).orderByValue().on("value", (gameKeys) => {   
                gameKeys.forEach((gameKey) => {                  
                    FirebaseData.getRef("games/" + userKey.key + "/" + gameKey.key) .orderByValue().on("value", (games) => {      
                      games.forEach((game) => {
                      var gameProfileAll = 
                      {
                        userKey: userKey.key,
                        gameKey: gameKey.key,
                        gameName: game.val().gameName,
                        gameDesc: game.val().gameDesc,
                        gameIconUrl: game.val().gameIconUrl,
                        gameVersion: game.val().gameVersion,
                        primaryContactEmail: game.val().primaryContactEmail,
                        };
                        this.resultsAll.push(gameProfileAll);
                        var gameProfile = 
                        {
                          id: gameKey.key,
                          gameName: game.val().gameName,
                          gameDesc: game.val().gameDesc,
                          gameIconUrl: game.val().gameIconUrl,
                          gameVersion: game.val().gameVersion,
                          primaryContactEmail: game.val().primaryContactEmail,
                          };                        
                          //this.results[i] = gameProfile;   
                          this.results.push(gameProfile);
                          i++;                             
                    }); 
                  });    
                });  
            });    
        }); 
        this.arrayholder = this.results;          
        this.setState({
          data: this.results,
          error: null,
          loading: false,
        });
        this.arrayholder = this.results;             
    });   
  } 
  catch(e)
        {
            //alert(e.message);
            console.log(e);
        }
} 


  listenForGames() {
    this.setState({ loading: true });
    var itemsRef = FirebaseData.getGamesRef();
    itemsRef.on('value', (snap) => { 
      let items = [];  
      snap.forEach((child) => {                 
      var tempUrl = child.val().gameIconUrl;
      if (tempUrl === null || tempUrl.trim() == "")   {
        tempUrl = 'https://api.adorable.io/avatars/285/abott@adorable.png';
      }
        items.push({
            id: child.key,
            gameName: child.val().gameName,
            gameDesc: child.val().gameDesc,
            gameIconUrl: tempUrl,
            gameVersion: child.val().gameVersion,
            primaryContactEmail: child.val().primaryContactEmail,                
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

  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

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
   // if (!text.length)
    //{
    //    this.listenForGames();
    //}
   // else
  //  {
        const newData = this.arrayholder.filter(item => {
    //      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
        const itemData = `${item.gameName.toUpperCase()} ${item.gameDesc.toUpperCase()}`; ;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        });
        this.setState({
        data: newData,
        });
  //  }
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  

  editGameProfile(id, gameName, gameDesc, gameIconUrl, gameVersion, primaryContactEmail){
    this.props.navigation.navigate('PlayerSurveyList',
                                    {   gameId: id, 
     //                                   gameName: gameName , 
     //                                   gameDesc: gameDesc, 
     //                                   gameIconUrl: gameIconUrl, 
     //                                   gameVersion: gameVersion, 
     //                                   primaryContactEmail: primaryContactEmail
                                      });
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
    <View style={styles.container}>  
    <Header
       outerContainerStyles={{ zIndex: 1 }}
       backgroundColor='black'
//       leftComponent={{ icon: 'menu', color: 'white', } }
        leftComponent={<Icon name='menu' color='#fff' onPress={() => this.props.navigation.toggleDrawer()}/>} 
       centerComponent={<View style={{alignItems: 'center'}}>
                           <Text style={{justifyContent: 'center', color: '#fff', alignContent:'center', fontSize: 20}}>Available Games</Text>
                       </View>}
//       rightComponent={<Icon name='add-circle' color='#fff' onPress={() => this.props.navigation.navigate('PlayerGameAdd')}/>} 
     />
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data} 
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              key={item.id}
              title={item.gameName}
              subtitle={item.gameDesc}
              avatar={{ uri: item.gameIconUrl } }
              containerStyle={{ borderBottomWidth: 0 }}
              onPressRightIcon={() => this.editGameProfile(item.id,item.gameName, item.gameDesc, item.gameIconUrl, item.gameVersion, item.primaryContactEmail)} 
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          //ListFooterComponent={this.renderFooter}
           
        />
      </List>     
     </View>
    );
  }
}

export default PlayerGamesList;

