import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { List, ListItem, SearchBar, Header, Avatar, Icon } from 'react-native-elements';
import { FirebaseData } from '../../providers/firebase';
import logo from '../../assets/images/robot-prod.png'
import bgImage from '../../assets/images/LoginPageBackground.jpg';
import styles from '../../constants/Styles';
import firebase from '../../providers/firebaseConfig';
import { Button } from "native-base";
import Layout from "../../constants/Layout";
class GamesListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      myAllData: ""
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.listenForGames();
  }

  listenForGames() {
    this.setState({ loading: true });
    var itemsRef = FirebaseData.getGamesRef();
    itemsRef.on('value', (snap) => {

      let items = [];
      let myAllDataList = [];
      snap.forEach((child) => {

        //let myAllData
        // this.setState({ myAllData: child })
        myAllDataList.push({
          items: child
        })
        var tempUrl = child.val().gameIconUrl;
        if (tempUrl === null || tempUrl == "") {
          tempUrl = 'https://api.adorable.io/avatars/285/abott@adorable.png';
        }
        items.push({
          id: child.key,
          gameName: child.val().gameName,
          gameDesc: child.val().gameDesc,
          gameIconUrl: tempUrl,
          gameVersion: child.val().gameVersion,
          primaryContactEmail: child.val().primaryContactEmail,
          ageMax: child.val().ageMax,
          ageMin: child.val().ageMin,
          details: child.val().details,
          developerName: child.val().developerName,
          downloadLink: child.val().downloadLink,
          expirationDate: child.val().expirationDate,
          featured: child.val().featured,
          gameName: child.val().gameName,
          genre: child.val().genre,
          longDes: child.val().longDes,
          platform: child.val().platform,
          shortDes: child.val().shortDes,
          status: child.val().status,
          surveyLength: child.val().surveyLength,
          zMax: child.val().zMax,
          zMin: child.val().zMin,
          instructions: child.val().instructions,
          isUpdate: true,
          gameScreenShot: child.val().gameScreenShot,
          gameIconUrl: child.val().gameIconUrl,
          downloadLinkIOS: child.val().downloadLinkIOS,
          downloadLinkPlayStore: child.val().downloadLinkPlayStore,

        });
      });
      this.setState({
        data: items,
        error: null,
        loading: false,
      });
      this.arrayholder = items;
      //if(!this.state.data.length)
      //{
      //  this.props.navigation.navigate('DeveloperGameAdd');
      //}
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
      const itemData = `${item.gameName.toUpperCase()} ${item.shortDes !== undefined ? item.shortDes.toUpperCase() : ""}`;;
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



  editGameProfile = (item) => {
    this.props.navigation.navigate("DeveloperGameAdd", { myAllData: item })
  }

  onBackPress = () => {
    this.props.navigation.navigate('Settings')
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
          outerContainerStyles={{ zIndex: 1, height: Layout.headerHeight }}
          innerContainerStyles={{ alignItems: 'center',paddingTop:Layout.paddingTop }}
          backgroundColor='black'
          leftComponent={
            <Button transparent style={{ justifyContent: 'center', alignItems: 'center', width: 25,  }} onPress={() => this.onBackPress()}>
              <Icon style={{ height: 25, width: 25 }} name='home' color='white' size={24} />
            </Button>
          }
          centerComponent={<View style={{ alignItems: 'center' }}>
            <Text style={{ justifyContent: 'center', color: '#fff', alignContent: 'center', fontSize: 20 }}>Your Games</Text>
          </View>}
          rightComponent={<Icon name='add-circle' color='#fff' onPress={() => this.props.navigation.navigate('DeveloperGameAdd')} />}
        />

        {/* <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginBottom: 10 }}> */}
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              key={item.id}
              // title={`${item.gameName} Version:${item.gameVersion !== undefined ? item.gameVersion : ""}`}
              title={item.gameName}
              subtitle={item.shortDes}
              avatar={{ uri: item.gameIconUrl }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPressRightIcon={() => this.editGameProfile(item)}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        //ListFooterComponent={this.renderFooter}

        />
        {/* </List> */}
      </View>
    );
  }
}

export default GamesListScreen;

