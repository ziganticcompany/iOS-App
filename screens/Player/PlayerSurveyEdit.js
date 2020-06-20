import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { Header, Avatar, Icon, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import{
    Content, Item, Card, CardItem
  } from 'native-base'
import bgImage from '../../assets/images/LoginPageBackground.jpg';
import logo from '../../assets/images/zigantic1.png';
//import Icon from 'react-native-vector-icons/Ionicons';
//service providers
import { FirebaseData } from '../../providers/firebase';
import styles from '../../constants/Styles';
import Colors from "../../constants/Colors";
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class PlayerSurveyEdit extends React.Component {  
    state = { 
        id: '',
        gameId: '',
        surveyDesc: '',
        surveyResponseError:null,
        surveyResponse: '',
        gameName: 'Survey Responses',
       
        }       

    componentDidMount() {
        this.setStateFromProps();
      }

    setStateFromProps()
    {
        const {navigation} = this.props;
        const itemId = navigation.getParam('id');
        const itemGameId = navigation.getParam('gameId');
        const itemSurveyDesc = navigation.getParam('surveyDesc');
        const itemSurveyResponse = navigation.getParam('surveyResponse');
        

        if (this.state.id == '')
        { 
            this.setState({ 
                id: itemId,
                gameId: itemGameId,
                surveyDesc: itemSurveyDesc,
                surveyResponse: itemSurveyResponse,
                gameName: 'Survey Responses',
        });
        }
    }
    editGameProfile(id, gameName, gameDesc, gameIconUrl, gameMainUrl, gameLikes, primaryContactEmail){
      this.props.navigation.navigate('PlayerSurveyList',
                                      {   gameId: this.state.id, 
                                          gameName: this.state.gameName , 
                                          gameDesc: this.state.gameDesc, 
                                          gameIconUrl: this.state.gameIconUrl, 
                                          gameMainUrl: this.state.gameMainUrl,
                                          gameLikes: this.state.gameLikes,
       //                                   gameVersion: gameVersion, 
       //                                   primaryContactEmail: primaryContactEmail
                                        });
    }

    handleSurveyResponseUpdate = () => {
  
      const { id, gameId, surveyDesc, surveyResponse } = this.state;
    
      if(surveyResponse == "") {this.setState({surveyResponseError: "Survey Response required"})}
      try
      {
        FirebaseData.updateSurveyResponseProfile(id, gameId, surveyDesc, surveyResponse) 
        this.props.navigation.navigate('PlayerSurveyList', {gameId: gameId});
      }
      catch(error) 
        {
            alert(error);
        }
    }
    
    render() {
    return (
      
      <View style={{flex: 1, backgroundColor:'rgb(240,240,240)'}}>     
      <Text style = {{fontWeight:'400', fontSize: 16, color: 'rgb(211,211,211)', marginTop: 15 }}> </Text>
      <Header
        outerContainerStyles={{ zIndex: 1 }}
        backgroundColor={Colors.purpleColor}
        leftComponent={<Icon name='user-circle' type='font-awesome'  color='#fff' onPress={() => this.props.navigation.toggleDrawer()}/>} 
        centerComponent={<View style={{alignItems: 'center'}}>
                         <Text style={{justifyContent: 'center', color: '#fff', alignContent:'center', fontSize: 20}}>{this.state.gameName}</Text>
                         </View>}
        rightComponent={<Icon name='window-close' type='font-awesome'  color='#fff' onPress={() => this.props.navigation.navigate('PlayerGamesList')}/>} 
        containerStyle={{
          justifyContent: 'space-around',
        }} 
      />         

        <ScrollView contentContainerStyle={styles.contentContainerForScollView}>
         
        <Card style = {{marginBottom: 18, width: SCREEN_WIDTH - 55,  alignItems: 'center', justifyContent: 'center'}}>
            <CardItem style = {{alignItems: 'center'}}>
              <Text style = {{fontWeight: '400', fontSize: 18}}>{this.state.surveyDesc}</Text>
            </CardItem>
        </Card>
        <Content>
                <Item regular> 
        <View style = {{marginBottom: 18, width: SCREEN_WIDTH - 55}}> 
            
            <Text style = {styles.space}></Text>
            <FormInput onChangeText={(surveyResponse) => {this.setState({ surveyResponse: surveyResponse }) 
                                                    this.setState({ surveyResponseError: null }) }}
                                                   
                                                    style = {styles.input}
                                                    placeholder = {'Enter response here'}
                                                    placeholderTextColor = {'gray'}   
                                                    value={this.state.surveyResponse}     
                                                    inputStyle={{ width: '100%', color: 'black', height: 400 }}
                                                    containerStyle={{ borderBottomWidth: 0 }}                                                    
                                                    multiline={true}                
                                                    
            />         
            <FormValidationMessage>{this.state.gameSurveyError}</FormValidationMessage>
            
        </View> 
        </Item>
        </Content>        
        </ScrollView> 
        
        <View style = {styles.submitContainer}>
        <TouchableOpacity onPress={() => this.handleSurveyResponseUpdate()} style = {{width: SCREEN_WIDTH - 55,height: 45,borderRadius: 25,backgroundColor: 'rgba(100,100,100,0.4)',justifyContent: 'center',marginBottom: 50}}>
            <Text style = {{    
              color: 'rgb(255,255,255)',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center'
            }}  >Submit</Text> 
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

