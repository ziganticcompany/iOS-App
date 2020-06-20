import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import { Header, Avatar, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import bgImage from '../../assets/images/LoginPageBackground.jpg';
import logo from '../../assets/images/zigantic1.png';
//import Icon from 'react-native-vector-icons/Ionicons';
//service providers
import { FirebaseData } from '../../providers/firebase';
import styles from '../../constants/Styles';

export default class GameEdit extends React.Component {  
    state = { 
        id: '',
        gameName: '',
        gameNameError: null,
        gameDesc: '',
        gameDescError:null,
        gameIconUrl: '',
        gameIconUrlError:null,
        gameVersion: '',
        gameVersionError:null,
        primaryContactEmail: '',
        primaryContactEmailError:null,
    }

    componentDidMount() {
        this.setStateFromProps();
      }

    setStateFromProps()
    {
        const {navigation} = this.props;
        const itemId = navigation.getParam('id');
        const itemGameName = navigation.getParam('gameName');
        const itemGameDesc = navigation.getParam('gameDesc');
        const itemGameIconUrl = navigation.getParam('gameIconUrl');
        const itemGameVersion = navigation.getParam('gameVersion');
        const itemGrimaryContactEmail = navigation.getParam('primaryContactEmail');
        if (this.state.id == '')
        { 
            this.setState({ 
                id: itemId,
                gameName: itemGameName,
                gameDesc: itemGameDesc,
                gameIconUrl: itemGameIconUrl,
                gameVersion: itemGameVersion,
                primaryContactEmail: itemGrimaryContactEmail,
        });
        }
    }

    handleGameUpdate = () => {
  
      const { id, gameName, gameDesc, gameIconUrl, gameVersion, primaryContactEmail } = this.state;
      
      if(gameName == "") {this.setState({gameNameError: "Game Title required"})}
      if(gameDesc == "") {this.setState({gameDescError: "Game Desc required"})}
      if(gameName == "" || gameDesc == ""){
          this.setState({errorMessage: "Game Title and Desc required"})
         alert("Game Title and Desc required");
       //   console.log("Game Title and Desc required");
        return;
      }
      try
      {
        FirebaseData.updateGameProfile(id, gameName, gameDesc, gameIconUrl, gameVersion, primaryContactEmail) 
        this.props.navigation.navigate('DeveloperGamesList');
      }
      catch(error) 
        {
            alert(error);
    //        console.log(error);
        }
    }

    //example of header https://github.com/react-native-training/react-native-elements/issues/568     
    /*Add below if we want to show Zigantic image; Add this right below ImageBackground      
    <View style = {styles.logoContainer}>
      <TouchableHighlight onPress={() => this.props.navigation.navigate('AuthDecisionScreen')}>
        <Image source = {logo} style = {styles.logo} />
        </TouchableHighlight>
      </View>
    */
//   shouldComponentUpdate() {
 //   return false
//  }

    render() {
    return (
    <View style={styles.container}>  
     <Header
        outerContainerStyles={{ zIndex: 1 }}
        backgroundColor='black'
        leftComponent={{ icon: 'menu', color: 'white', } }
        centerComponent={<View style={{alignItems: 'center'}}>
                            <Text style={{justifyContent: 'center', color: '#fff', alignContent:'center', fontSize: 20}}>Edit Game Profile</Text> 
                        </View>}
        rightComponent={<Icon name='home' color='#fff' onPress={() => this.props.navigation.navigate('DeveloperAuthDecision')}/>} 
      />
      <ImageBackground source = {bgImage} style = {styles.backgroundContainer}>
        <ScrollView contentContainerStyle={styles.contentContainerForScollView}>

        <View style = {styles.inputContainer}>
        <Text style = {styles.inputText}>  Title</Text>
            <FormInput onChangeText={(gameName) => {this.setState({ gameName: gameName }) 
                                                    this.setState({ gameNameError: null }) }}
                                                    style = {styles.input}
                                                    placeholder = {'Enter title'}
                                                    placeholderTextColor = {'gray'}   
                                                    value={this.state.gameName}                                                  
            />
            <FormValidationMessage>{this.state.gameNameError}</FormValidationMessage>
        </View>         
        <View style = {styles.inputContainer}>
        <Text style = {styles.inputText}>  Description</Text>
            <FormInput
                style = {styles.input}
                placeholder = {'Enter description'}
                placeholderTextColor = {'gray'}
                onChangeText={(gameDesc) => {this.setState({ gameDesc: gameDesc }) 
                                                    this.setState({ gameDescError: null }) }}
                value={this.state.gameDesc}                
            />
            <FormValidationMessage>{this.state.gameDescError}</FormValidationMessage>
        </View>
        <View style = {styles.inputContainer}>
        <Text style = {styles.inputText}>  URL Link to Game Icon</Text>
            <FormInput
                style = {styles.input}
                placeholder = {'Enter url link of the image/icon for the game'}
                placeholderTextColor = {'gray'}
                onChangeText={(gameIconUrl) => {this.setState({ gameIconUrl: gameIconUrl }) 
                                                    this.setState({ gameIconUrlError: null }) }}
                value={this.state.gameIconUrl}                
            />
            <FormValidationMessage>{this.state.gameIconUrlError}</FormValidationMessage>        
        </View>
        <View style = {styles.inputContainer}>
        <Text style = {styles.inputText}>  Version</Text>
            <FormInput
                style = {styles.input}
                placeholder = {'Enter version'}
                placeholderTextColor = {'gray'}
                onChangeText={(gameVersion) => {this.setState({ gameVersion: gameVersion }) 
                                                    this.setState({ gameVersionError: null }) }}
                value={this.state.gameVersion}                
            />
            <FormValidationMessage>{this.state.gameIconUrlError}</FormValidationMessage>          
        </View>
        <View style = {styles.inputContainer}>
        <Text style = {styles.inputText}>  Primary Email Contact</Text>
            <FormInput
                style = {styles.input}
                placeholder = {'Enter email contact'}
                placeholderTextColor = {'gray'}
                onChangeText={(primaryContactEmail) => {this.setState({ primaryContactEmail: primaryContactEmail }) 
                                                    this.setState({ primaryContactEmailError: null }) }}
                value={this.state.primaryContactEmail}                
            />
            <FormValidationMessage>{this.state.gameIconUrlError}</FormValidationMessage>            
        </View>
        </ScrollView>
        <View style = {styles.submitContainer}>
        <TouchableOpacity onPress={() => this.handleGameUpdate()} style = {styles.btnContainer}>
            <Text style = {styles.btnText}>Update Game Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('DeveloperSurveyList', {gameId: this.state.id})} style = {styles.btnContainer}>
            <Text style = {styles.btnText}>Manage Survey Questions</Text>
        </TouchableOpacity>        
        </View>
      </ImageBackground>
      </View>
    );
  }
}

