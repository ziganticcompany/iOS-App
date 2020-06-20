import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, ScrollView, } from 'react-native';
import { Header, Avatar, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import bgImage from '../../assets/images/LoginPageBackground.jpg';
import logo from '../../assets/images/zigantic1.png';
//import Icon from 'react-native-vector-icons/Ionicons';
//service providers
import { FirebaseData } from '../../providers/firebase';
import styles from '../../constants/Styles';

export default class SurveyEditScreen extends React.Component {  
    state = { 
        id: '',
        gameId: '',
        surveyDesc: '',
        surveyDescError:null,
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
        if (this.state.id == '')
        { 
            this.setState({ 
                id: itemId,
                gameId: itemGameId,
                surveyDesc: itemSurveyDesc,
        });
        }
    }

    handleSurveyUpdate = () => {
  
      const { id, gameId, surveyDesc } = this.state;
    
      if(surveyDesc == "") {this.setState({surveyDescError: "Survey Desc required"})}
      try
      {
        FirebaseData.updateSurveyProfile(id, gameId, surveyDesc) 
        this.props.navigation.navigate('DeveloperSurveyList', {gameId: gameId});
      }
      catch(error) 
        {
            alert(error);
        }
    }

    render() {
    return (
    <View style={styles.container}>  
     <Header
        outerContainerStyles={{ zIndex: 1 }}
        backgroundColor='black'
        leftComponent={{ icon: 'menu', color: 'white', } }
        centerComponent={<View style={{alignItems: 'center'}}>
                            <Text style={{justifyContent: 'center', color: '#fff', alignContent:'center', fontSize: 20}}>Update Survey Question</Text> 
                        </View>}
        rightComponent={<Icon name='home' color='#fff' onPress={() => this.props.navigation.navigate('DeveloperAuthDecision')}/>} 
      />
      <ImageBackground source = {bgImage} style = {styles.backgroundContainer}>
        <ScrollView contentContainerStyle={styles.contentContainerForScollView}>

        <View style = {styles.inputContainer}>
            <FormLabel style = {styles.inputText}>Survey Question</FormLabel>
            <FormInput onChangeText={(surveyDesc) => {this.setState({ surveyDesc: surveyDesc }) 
                                                    this.setState({ surveyDescError: null }) }}
                                                    style = {styles.input}
                                                    placeholder = {'enter survey question'}
                                                    placeholderTextColor = {'gray'}   
                                                    value={this.state.surveyDesc}                                                  
            />
            <FormValidationMessage>{this.state.gameNameError}</FormValidationMessage>
        </View>         
        </ScrollView>
        <View style = {styles.submitContainer}>
        <TouchableOpacity onPress={() => this.handleSurveyUpdate()} style = {styles.btnContainer}>
            <Text style = {styles.btnText}>Update Survey Profile</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
      </View>
    );
  }
}

