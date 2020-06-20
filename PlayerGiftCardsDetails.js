import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Image, Dimensions, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import Colors from "../../constants/Colors";
import { CheckBox } from "react-native-elements";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class PlayerGiftCardsDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.mainContainer}>
        <Header
          backgroundColor={Colors.secondHeaderColor}
          leftComponent={<Icon type='ionicon' name='ios-arrow-back' color='#fff' size={30}
            onPress={() => this.props.navigation.goBack()} />}
          centerComponent={
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.headerText}>Rewards</Text>
            </View>
          }
        />

        <ScrollView style={styles.containerScrollView}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.giftCardImg}
              source={{ uri: navigation.getParam('itemImg') }}
            />
            <Text style={styles.titleText}>{navigation.getParam('rewardName')}</Text>

            <Text style={{ marginTop: 30 }}>Select Value</Text>
            <View style={styles.optionView}>
              <CheckBox
                center
                title={"My radio"}
                containerStyle={{ borderWidth: 0 }}
                checkedIcon={<Icon name="check-square" size={20} color="#0984e3" />}
                uncheckedIcon={<Icon name="square" size={20} color="#b2bec3" />}
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })}
              />
              <Icon type='entypo' name='chevron-small-down' color={Colors.black} size={25} />
            </View>

            <Text style={{ marginVertical: 20 }}><Text style={{ textDecorationLine: 'line-through' }}>1,700</Text> 1,600 points   Level 2 discount: 100</Text>

            <TouchableOpacity style={styles.btnBg}>
              <Text style={{ color: Colors.white, marginRight: 10 }}>REDEEM REWARD</Text>
              <Icon type='evilIcons' name='chevron-right' color={Colors.white} size={30} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnBg, { marginTop: 10, width: WIDTH * 0.5 }]}>
              <Text style={{ color: Colors.white, marginRight: 10 }}>SET AS GOAL</Text>
              <Icon type='evilIcons' name='chevron-right' color={Colors.white} size={30} />
            </TouchableOpacity>

            <Text style={styles.rewardText}>NEW! Microsoft Rewards han enabled direct deposit. Now when you redeem points for an Xbox Gift Card</Text>
          </View>
        </ScrollView>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    ...Platform.select({
      android: {
        marginTop: 28
      }
    })
  },
  headerText: {
    color: Colors.white,
    fontSize: 20,
    marginBottom: 5
  },
  containerScrollView: {
    flex: 1,
    paddingHorizontal: 15
  },
  giftCardImg: {
    marginVertical: 20,
    width: WIDTH,
    height: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },
  titleText: {
    color: Colors.black,
    fontSize: 22
  },
  btnBg: {
    backgroundColor: Colors.btnBg,
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH * 0.6,
    justifyContent: "center",
    paddingVertical: 5
  },
  rewardText: {
    fontSize: 15,
    color: Colors.greyColor,
    marginTop: 30,
    marginBottom: 20
  },
  optionView: {
    flexDirection: "row",
    paddingVertical: 2,
    width: wp("60"),
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  }
});