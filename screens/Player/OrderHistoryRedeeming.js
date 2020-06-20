import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, SafeAreaView,
  Platform,
  FlatList,
  Linking
} from "react-native";
import {
  Header,
  Avatar,
  Icon,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

import{
  Button
} from "native-base"
import Colors from "../../constants/Colors";
import { FirebaseData } from '../../providers/firebase';
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";
import 'firebase/functions';
import axios from 'axios';

import Layout from "../../constants/Layout";

export default class OrderHistoryRedeeming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeIndex: 0,
    };
  }

  componentDidMount() {
    this.getRedeem()
  }


  getRedeem = () => {
    var gamesRootRef = FirebaseData.getRedeem();
    let items = [];
    gamesRootRef.on('value', (userRef) => {
      userRef.forEach((eachUser) => {

        items.push({
          status: eachUser.val().isStatus,
          rewards: eachUser.val().rewardName,
          points: eachUser.val().points,
          date: eachUser.val().date,
          brandKey: eachUser.val().brandKey,
          price: eachUser.val().price,
          isOrderDetailsDisplay: false

        })
      });
      this.setState({ totalRedeem: userRef.numChildren(), data: items.reverse() })
    }); //end of gamesRootRef.on('value', (snap) =>   
  }
  orderDetails = (item, index) => {
    let copyData = this.state.data.slice()
    copyData[index].isOrderDetailsDisplay = true
    this.setState({ data: copyData })
  }

  
  formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
  }
};
  
  renderItem = ({ item, index }) => {
    return (

      <View style={{ backgroundColor: index % 2 === 0 ? "#f5f6fa" : "#FFFFFF" }}>
        <View style={styles.subContainerStyles}>
          <Text style={styles.statusStyles}>{item.status == true ? "Sent" : "Not Sent"}</Text>
          <Text style={styles.dateStyles}>{item.date}</Text>
          <Text style={styles.rewardStyles}>{item.rewards}</Text>
          <Text style={styles.pointsStyles}>{item.points}</Text>
          <Text style={styles.pointsStyles}>${this.formatMoney(item.price)}</Text>
        </View>
      </View>

    );
  };
  FlatListHeader = () => {
    return (
      <View style={styles.headerMainView}>
        <Text style={styles.statusStyles}>Status</Text>
        <Text style={styles.dateStyles}>Date</Text>
        <Text style={styles.rewardStyles}>Reward</Text>
        <Text style={styles.pointsStyles}>ZPoints</Text>
        <Text style={styles.pointsStyles}>Value</Text>
      </View>

    );
  };

  openLink=(value)=>{	
    if(value !== undefined && value !=="" && value !== null){	
        Linking.openURL(value);	
    }	
  }


  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <Header
              outerContainerStyles={{ zIndex: 1, height:Layout.headerHeight, borderBottomColor: Colors.purpleColor, backgroundColor:Colors.purpleColor}}
              innerContainerStyles = {{alignItems: 'center',paddingTop:Layout.paddingTop}}
              leftComponent ={
                <Button transparent style={{ justifyContent: 'center', alignItems: 'center', width: 25, }} onPress={() => this.props.navigation.goBack()}>
                  <Icon size={25} name = 'ios-arrow-back' type='ionicon' color='white' />
                </Button>
              }
              centerComponent = {
                <View style = {{alignItems: 'center'}}>
                    <Text style = {{fontSize: 20, fontWeight: '700', color: 'white'}}>Order History</Text>
                </View>
              }
              containerStyle={{
                justifyContent: 'space-around',
              }}
            />

        <ScrollView>
          <View style={styles.childContainer}>
            <View style = {{marginTop: 20, marginLeft: 10, marginRight: 15}}>
              <Text style={{fontWeight: '600', fontSize: 22, color: 'rgb(25,25,25)'}}>
                Order History
              </Text>
              <Text style = {{marginTop: 10, fontWeight: '500', fontSize: 16, color: 'rgb(105,105,105)'}}>
              You should receive a confirmation email within 24 hours of
              redeeming. If there was an issue with the redeeming of your reward, please contact Zigantic Customer Service at 
              <Text style = {{color: Colors.purpleColor, fontWeight: '600'}} onPress={ ()=>{ this.openLink('https://zigantic.com/')}}> www.zigantic.com</Text>
              .
              </Text>
              
            </View>
            {this.state.data && this.state.data.length && Platform.OS === "android" ?

              <ScrollView horizontal={true} >
                <FlatList
                  data={data}
                  renderItem={this.renderItem}
                  ListHeaderComponent={this.FlatListHeader}
                  keyExtractor={(item, index) => index.toString()}
                // nestedScrollEnabled={true}
                />
              </ScrollView>
              : null}
            {this.state.data && this.state.data.length && Platform.OS === "ios" ?
              <FlatList
                data={data}
                renderItem={this.renderItem}
                ListHeaderComponent={this.FlatListHeader}
                keyExtractor={(item, index) => index.toString()}
              // nestedScrollEnabled={true}
              />
              : null}
            {this.state.data && this.state.data.length ? null : <Text style={{ marginTop: 10, alignSelf: 'center', fontSize: 18, color: '#000' }}>No Order History</Text>}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  childContainer: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginStart: 10
  },
  
  customerFontStyle: {
    color: "#0984e3"
  },
  ResendButtonStyle: {
    color: "#FFFFFF",
    marginTop: 8,

  },
  ResendButtonContainer: {
    width: 100,
    height: 35,
    backgroundColor: "#0984e3",
    marginTop: 10,
    alignItems: 'center',

  },
  // flatListHeadingContainer: {
  //   marginBottom: 15,
  //   marginTop: 15,
  //   flexDirection: "row",
  //   justifyContent: "space-between"
  // },
  headingFontStyle: {
    // textAlign: "center"
  },
  headerText: {
    color: Colors.white,
    fontSize: 26,
    marginBottom: 5
  },
  statusStyles: {
    fontWeight: "500",
    // flex: 1,
    //textAlign: "center",
    width: 80,
    marginStart: 10,
    marginTop: 10
  },
  headerMainView:
  {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderColor: "black",
  },
  dateStyles: {
    fontWeight: "500",
    marginTop: 10,
    width: 90
  },
  rewardStyles: {
    fontWeight: "500",
    marginTop: 10,
    width: 300
  },
  pointsStyles: {
    fontWeight: "500",
    marginTop: 10,
    width: 150
  },
  resendStyles: {
    fontWeight: "500",
    marginTop: 10,
    width: 150
  },
  subContainerStyles: {
    flexDirection: "row",
    height: 100,
    width: "100%"
  },
  claimCode: {
    color: "#808080",
    fontSize: 12,
    marginTop: 5
  }

});
