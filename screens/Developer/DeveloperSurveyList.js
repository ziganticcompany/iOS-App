import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, } from 'react-native';
import { List, ListItem, SearchBar, Header, Icon } from 'react-native-elements';
import { FirebaseData } from '../../providers/firebase';
import logo from '../../assets/images/robot-prod.png'
import bgImage from '../../assets/images/LoginPageBackground.jpg';
import styles from '../../constants/Styles';
import { Button} from "native-base";
import Layout from "../../constants/Layout";
class SurveyListScreen extends Component {
  state = {
    // gameId: '',
    loading: false,
    data: [],
    error: null,
  }
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const itemId = navigation.getParam('gameId');
    this.state = {
      gameId: itemId,
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
          answerList: child.val().answer,
          isMultiChoice: child.val().isMultiChoice,
        });
      });
      this.setState({
        data: items,
        error: null,
        loading: false,
      });
      this.arrayholder = items;
      if (!items.length) {
        this.props.navigation.navigate('DeveloperSurveyAdd', { gameId: this.state.gameId });
      }
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

  editSurveyProfile(item) {
    this.props.navigation.navigate('DeveloperSurveyAdd',
      {
        gameId: this.state.gameId,
        item: item,
        isSurveyUpdate: true,
      });
  }

  onBackPress=()=>{
      this.props.navigation.goBack()
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
          backgroundColor="black"
          leftComponent={
            <Button transparent style={{ justifyContent: 'center', alignItems: 'center', width: 25, }} onPress={() => this.onBackPress()}>
              <Icon style={{ height: 25, width: 25 }} name='ios-arrow-back' type='ionicon' color='white' size={24} />
            </Button>
          }
          centerComponent={<View style={{ alignItems: 'center' }}>
            <Text style={{ justifyContent: 'center', color: '#fff', alignContent: 'center', fontSize: 20 }}>List of Surveys</Text>
          </View>}
          rightComponent={<Icon name='add-circle' color='#fff' onPress={() => this.props.navigation.navigate('DeveloperSurveyAdd', { gameId: this.state.gameId })} />}
        />

        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                key={item.id}
                title={item.surveyDesc}
                containerStyle={{ borderBottomWidth: 0 }}
                onPressRightIcon={() => this.editSurveyProfile(item)}
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

export default SurveyListScreen;

