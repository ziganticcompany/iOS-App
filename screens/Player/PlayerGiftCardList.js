import React, { Component } from "react";
import { StyleSheet, Platform, View, Text, Image, Dimensions, FlatList, ActivityIndicator, Picker, Linking } from "react-native";
import { Header, Icon } from "react-native-elements";
import { EvilIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";
import Colors from "../../constants/Colors";
import { Button } from "native-base"
import { restApiGet } from "../../api";
import { getCatalogs_url } from "../../apiUrls";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Footer } from "native-base";
import * as Progress from "react-native-progress";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

let WIDTH = Dimensions.get("screen").width;
let HEIGHT = Dimensions.get("screen").height;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const axios = require('axios');
const headers = {
    'Authorization': 'Basic UUFQbGF0Zm9ybTI6YXBZUGZUNkhOT05wRFJVajNDTEdXWXQ3Z3ZJSE9OcERSVVlQZlQ2SGo='
}
import Layout from "../../constants/Layout";

export default class PlayerGiftCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
            percentageProgress: 0,
            totalLength: 601086,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.request({
            method: "get",
            responseType: 'json',
            url: "https://integration-api.tangocard.com/raas/v2/catalogs?verbose=true",
            headers: headers,
            onDownloadProgress: (progressEvent) => {
                let percentCompleted = Math.floor((Number(progressEvent.target._response.length) * 100) / Number(this.state.totalLength));
                let finalPercentage = Number(percentCompleted) / 100;
                this.setState({ percentageProgress: finalPercentage })
            }

        }).then(response => {
            this.setState({ percentageProgress: 1 })
            setTimeout(() => {
                const { data } = response
                const responseData = data['brands'];
                let finalData = []
                for (let i = 0; i < responseData.length; i++) {
                    let items = responseData[i].items;
                    let countryList = items[0].countries;
                    for (let k = 0; k < countryList.length; k++) {
                        if (countryList[k] === "US") {
                            if (responseData[i].brandKey !== "B246594" && responseData[i].brandKey !== "B478354" && responseData[i].brandKey !== "B862537" && responseData[i].brandKey !== "B356718" && responseData[i].brandKey !== "B385888" && responseData[i].brandKey !== "B379266" && responseData[i].brandKey !== "B757699" && responseData[i].brandKey !== "B159536" && responseData[i].brandKey !== "B099184" && responseData[i].brandKey !== "B845228" && responseData[i].brandKey !== "B688727") {
                                finalData.push(responseData[i])
                            }
                        }
                    }
                }
                this.setState({
                    data: finalData,
                    error: null,
                    loading: false,
                });
            }, 500);


        })
            .catch((error) => {
            })


    }
    _giftCardClickHandle = item => {
        //Navigation with passing selected data
        this.props.navigation.navigate("PlayerGiftCardsDetails", {
            dataItem: item
            // itemImg: item.imageUrls['300w-326ppi'],
            // rewardName: item.items[0].rewardName,
            // description: item.description
        });
    };

    removePrice(value){
        return value.replace(/\$.*\d+/g, '');
    }

    _rowRender = ({ item }) => {
   // var dollar= (item.items[0].rewardName.match(/\$.*?\$/g)||[]).join(',');
    var dollar= item.items[0].rewardName.replace(/\$.*\d+/g, '');
    
        return (
            <TouchableOpacity
                style={styles.mainRow}
                onPress={() => this._giftCardClickHandle(item)}
            >
                <Image
                    style={styles.giftImage}
                    source={{ uri: item.imageUrls["300w-326ppi"] }}
                />

                <View style={{ alignItems:"center" }}>
                    <Text style={styles.giftText}>
                        {/* <Text style={[styles.brandNameText, { fontSize: 20 }]}>•</Text> */}
                        <Text style={styles.brandNameText}>{item.brandName}</Text>
                    </Text>
                    <Text style={styles.offerText}>{this.removePrice(item.items[0].rewardName)}</Text>
                    {/* <Text style={styles.verifiedText}>Offer {item.status}</Text> */}

                </View>

                <View style={{ marginTop: 10, flexDirection: 'row', alignSelf: 'center' }}>
                    <Text style={{ fontSize: 16, color: Colors.purpleColor, marginHorizontal: 8, fontWeight: "bold", alignSelf: "center" }}>REDEEM REWARD</Text>
                    <Icon name='ios-arrow-forward' type='ionicon' color={Colors.purpleColor} size={20} />
                </View>
                {/* <FontAwesome name="star-o" size={20} color={Colors.greyColor} /> */}
            </TouchableOpacity>
        );
    };

    render() {
        const { data } = this.state;

        if (this.state.loading) {
            return (
                <View style={styles.indicatorView}>
                    <View style={styles.indicatorSubView}>
                        <Text style={styles.loadingText}>
                            Loading gift cards...
            </Text>
                        <Progress.Bar
                            progress={this.state.percentageProgress}
                            width={wp("70")}
                            borderWidth={0}
                            style={{ borderRadius: 5, marginTop: 15 }}
                            unfilledColor={"#E7E7E7"}
                            color={Colors.purpleColor}
                            animationType={"timing"}
                        />

                    </View>
                </View>
            );
        }

        return (
            <View style={styles.mainContainer}>
                <Header
              outerContainerStyles={{ zIndex: 1, height:Layout.headerHeight, borderBottomColor: Colors.purpleColor, backgroundColor:Colors.purpleColor}}
              innerContainerStyles = {{alignItems: 'center',paddingTop:Layout.paddingTop}}
              leftComponent ={
                <Button transparent style = {{ justifyContent: 'center', alignItems: 'center', width: 25,}} onPress={() => this.props.navigation.goBack()}>
                  <Icon size={25} name = 'ios-arrow-back' type='ionicon' color='white' />
                </Button>
              }
              centerComponent = {
                <View style = {{alignItems: 'center'}}>
                    <Text style = {{fontSize: 20, fontWeight: '700', color: 'white'}}>Gift Cards</Text>
                </View>
              }
              containerStyle={{
                justifyContent: 'space-around',
              }}
            />


                <View style={styles.mainView}>
                    <View style={styles.filterMainView}>
                        <Text style={styles.countText}>{data.length} Gift Cards Available</Text>
                        {/* <View style={styles.filterView}>
                            <Ionicons name="ios-options" size={20} color={Colors.black} />
                            <Text style={styles.filterText}>Filters</Text>
                        </View> */}
                    </View>

                    <View style={styles.listBg}>
                        <FlatList
                            data={data}

                            keyExtractor={item => item.brandKey}
                            renderItem={this._rowRender}

                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
     
    },
    headerText: {
        color: Colors.white,
        fontSize: 20,
        marginBottom: 5
    },
    mainView: {
        backgroundColor: Colors.backgroundColor,
        flex: 1
    },
    filterMainView: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    filterView: {
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 2,
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 5
    },
    countText: {
        fontSize: 15,
        fontWeight: "600"
    },
    filterText: {
        marginLeft: 10,
        fontWeight: "400"
    },
    mainRow: {
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: Colors.white,
        // flexDirection: "row",
        padding: 25
    },
    giftImage: {
        height: 170,
        width: 300,
        resizeMode: "contain",
        // marginRight: 10,
        alignSelf: "center"
    },
    giftText: {
        margin: 5,
        width: 300,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500",
        color: Colors.giftTextColor
    },
    brandNameText: {
        margin: 5,
        width: 300,
        textAlign: "center",
        fontSize: 18,
        color: Colors.greyColor,
        fontWeight: "300"
    },
    offerText: {
        margin: 5,
        width: 300,
        textAlign: "center",
        fontSize: 22,
        color: Colors.black
    },
    verifiedText: {
        margin: 5,
        fontSize: 12,
        fontWeight: "500",
        width: 300,
        textAlign: "center",
        color: Colors.greyColor
        // paddingTop: 30
    },
    listBg: {
        backgroundColor: Colors.listBackgroundColor,
        flex: 1
    },
    indicatorView: {
        flex: 1,
        width: WIDTH,
        height: HEIGHT,
        justifyContent: "center",
        backgroundColor: 'white'
    },
    indicatorSubView: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20
    },
    loadingText: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600",
        color: '#808080'
    },
});
