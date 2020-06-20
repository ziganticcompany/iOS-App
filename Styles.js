import { StyleSheet, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
//Understanding FlexBox https://blog.reactnativecoach.com/understanding-flex-in-react-native-b34dfb4b16d1
//Styles guide: https://doc.ebichu.cc/react-native/releases/0.44/docs/text.html
//const styles = StyleSheet.create({
    export default StyleSheet.create({
    container: {
      flex: 1, 
    },
      backgroundContainer: {
          flex:1,
          width:SCREEN_WIDTH,
          height:SCREEN_HEIGHT ,
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: 'rgb(50,50,50)'
        },
        logoContainer:{
          alignItems: 'center',
          marginBottom: 20,
        },
        logo: {
            width:150,
            height:150,
            marginTop: 20
          },
        logoText:{
          color: 'white',
          fontSize: 30,
          fontWeight: '700',
          marginTop: 15,
        },
        contentContainerForScollView: {
            paddingVertical: 20, 
            alignItems: 'center'
        },    
        btnLogin: {
          width: SCREEN_WIDTH-55,
          height: 40,
          borderRadius: 25,
          fontSize: 16,
          backgroundColor: 'rgb(100,150,215)',
          justifyContent: 'center',
          marginHorizontal:25,
          marginBottom:15 
        },
        decision: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        logIn:{
          textAlign: 'center',
          fontSize: 18,
          color: 'white',
          fontWeight: '700',
          marginRight: 60,
        },
        signUp: {
          textAlign: 'center',
          fontSize: 18,
          color: 'white',
          fontWeight: '700',
          marginLeft: 60,
        },
     
        bottom:{
          marginTop:75,
          alignItems: 'center'
        },
        bottomText:{
          fontSize:14,
          fontWeight: '800',
          color: 'white',
        },
        bottomTextWithMargin:{
          fontSize:14,
          fontWeight: '800',
          color: 'white',
          marginTop: 5,
          marginBottom: 25,
        },        
        textLabel:{
        fontSize: 19,
        marginHorizontal: 20,
        color: 'white',
        marginTop: 2
          },
          inputText:{
            fontSize: 15,
            marginHorizontal: 10,
            color: 'white',
            marginTop: 5
            
          },
          submitContainer:{
              marginTop: 5,
              width: SCREEN_WIDTH, //375,
              //height: 100,
              alignItems: 'center'
          },
          input: {
            fontSize: 15,
            marginHorizontal: 10,
            marginTop: 5,
            color: 'gray'
          },        
            inputContainer:{
              marginBottom: 18,
           
              //backgroundColor: 'white',  
              width: SCREEN_WIDTH - 55,
              height: 55,                 
            },
            or:{
              textAlign: 'center',
              fontSize: 14,
              color: 'white',
              fontWeight: '600',
              //padding: 7
            },     
            straightLine: {
              textAlign: 'center',
              fontSize: 10,
              color: 'white',
              fontWeight: '500',
              marginHorizontal: 20,
              opacity: 0.5
            },                   
            btnContainer:{
              width: SCREEN_WIDTH - 55,
              height: 45,
              borderRadius: 25,
              backgroundColor: 'rgb(255,200,0)',
              justifyContent: 'center',
              marginBottom: 50,
            },
            btnContainerNoBottomMargin:{
              width: SCREEN_WIDTH - 55,
              height: 45,
              borderRadius: 25,
              backgroundColor: 'rgb(255,200,0)',
              justifyContent: 'center',
              marginBottom: 5,
            },            
            btnText:{       
              color: 'rgb(255,255,255)',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center'
            },
              inputContainerStyle:{
//                borderRadius: 30, 
                backgroundColor: 'gray', 
                borderWidth: 1,
                borderColor: "transparent", 
                height: SCREEN_HEIGHT / 22, 
                width: SCREEN_WIDTH / 1.4, 
                marginVertical: 7 //bottom padding
                                
            },
  });
  