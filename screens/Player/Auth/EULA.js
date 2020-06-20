import React from 'react'
import { View, Dimensions, Text, ScrollView,Platform } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import {Button, Card, CardItem} from 'native-base';
import Colors from '../../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class EULA extends React.Component {


  render() {
    return (
    <View style = {{
        flex:1,
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        backgroundColor: 'rgb(245,245,245)',
    }}>
        <Header
            outerContainerStyles={{
                zIndex: 1,
                height: 90,
                borderBottomColor: Colors.purpleColor,
                backgroundColor: Colors.purpleColor
            }}
            innerContainerStyles = {{alignItems: 'center'}}
            leftComponent ={
                <Button transparent style = {{ justifyContent: 'flex-start', alignItems: 'center', width:55, marginLeft: 10, marginTop: 40}} onPress={() => this.props.navigation.navigate('PlayerSignup')}>
                    <Icon style = {{height:30, width:30}} name = 'ios-arrow-back' type='ionicon' color='white' />
                </Button>
            }
            centerComponent = {
              <Text style={{
                  color: 'white',
                  fontSize: 13,
                  fontWeight: '400',
                  textAlign: 'center',
                  justifyContent: 'center',

                  fontSize: 20,
                  fontWeight: '600',
                  marginLeft: -40,
                  marginTop: 35
              }}>EULA</Text>
            }
        >
        </Header>
        <ScrollView
            showsVerticalScrollIndicator = {true}
        >
        <View style = {{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 5,
            marginHorizontal: 10,
        }}>
            <Text style = {{color: 'rgb(25,25,25)', fontSize: 16, fontWeight: '600', alignSelf: 'flex-start', marginTop: 5, marginBottom: 5}}>Last updated 4-18-2020</Text>
        <Text style = {{color: 'rgb(50,50,50)'}}>
        Please read this Mobile Application End User License Agreement (“EULA”) carefully before using the ChapterCentral mobile application (“Mobile App”), which allows You to access ChapterCentral from Your mobile device. This EULA forms a binding legal agreement between you (and any other entity on whose behalf you accept these terms) (collectively “You” or “Your”) and ChapterCentral (each separately a “Party” and collectively the “Parties”) as of the date you download the Mobile App. With respect to the use of the Mobile App, and to the extent the Subscription Agreement conflicts with this EULA, the terms of this EULA will govern and control solely with respect to use of the Mobile App. 
        {'\n'}{'\n'}1.  License.  ChapterCentral grants You a revocable, non-exclusive, non-transferable, limited license to download, install, and use the Mobile App for Your personal and internal business purposes strictly in accordance with this EULA and the Subscription Agreement.
        {'\n'}{'\n'}2. Your Account. Your use of the Mobile App requires that You have an account with ChapterCentral and agree to the terms of ChapterCentral Agreement.
        {'\n'}{'\n'}3. Changes to this EULA. ChapterCentral reserves the right to modify this EULA at any time and for any reason. If ChapterCentral makes material changes to this EULA, You will receive notification via the Mobile App. Notwithstanding the foregoing, You are responsible for complying with the updated terms posted online at ChapterCentral website even if these updated terms appear online at ChapterCentral website before being posted on the Mobile App. Your continued use of the Mobile App after Smartsheet publishes notice of changes to this EULA indicates Your consent to the updated terms.
        {'\n'}{'\n'}4. No Included Maintenance and Support. ChapterCentral may deploy changes, updates, or enhancements to the Mobile App at any time. Smartsheet may provide maintenance and support for the Mobile App, but has no obligation whatsoever to furnish such services to You and may terminate such services at any time without notice. You acknowledge that neither Apple (for iOS Mobile App) {Platform.OS === "android" ? "nor Google (for Android Mobile App)" : ""} has an obligation to furnish any maintenance or support services in connection with the Mobile App.
 

        </Text>     

        </View>
        </ScrollView>
    </View>
    )
  }
}
