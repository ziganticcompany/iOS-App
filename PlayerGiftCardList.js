import React, { Component } from "react";
import { StyleSheet, Platform, View, Text, Image, Dimensions, FlatList, ActivityIndicator, Picker } from "react-native";
import { Header, Icon } from "react-native-elements";
import { EvilIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";
import Colors from "../../constants/Colors";

import { restApiGet } from "../../api";
import { getCatalogs_url } from "../../apiUrls";
import { TouchableOpacity } from "react-native-gesture-handler";

let WIDTH = Dimensions.get("screen").width;
let HEIGHT = Dimensions.get("screen").height;

export default class PlayerGiftCardList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        //Get service call from TANGO Card Gift API
        restApiGet(getCatalogs_url)
            .then(({ data }) => {
                const responseData = data['brands'];

                this.setState({
                    data: responseData,
                    error: null,
                    loading: false,
                });

            })
            .catch(error => {
                console.log("error catch ", error);
            });
    }

    _giftCardClickHandle = (item) => {
        //Navigation with passing selected data
        this.props.navigation.navigate("PlayerGiftCardsDetails", {
            itemImg: item.imageUrls['300w-326ppi'],
            rewardName: item.items[0].rewardName,
            description: item.description
        })
    }

    _rowRender = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.mainRow}
                onPress={() => this._giftCardClickHandle(item)}>
                <Image
                    style={styles.giftImage}
                    source={{ uri: item.imageUrls['300w-326ppi'] }} />

                <View style={{ width: WIDTH * 0.57 }}>
                    <Text style={styles.giftText}>
                        Gift Card Deal
                                <Text style={[styles.brandNameText, { fontSize: 20, }]}> • </Text>
                        <Text style={styles.brandNameText}>{item.brandName}</Text>
                    </Text>
                    <Text style={styles.offerText}>{item.items[0].rewardName}</Text>
                    <Text style={styles.verifiedText}>Offer {item.status}</Text>
                </View>

                <FontAwesome name="star-o" size={20} color={Colors.greyColor} />
            </TouchableOpacity>
        );
    }

    render() {
        const { data } = this.state;

        if (this.state.loading) {
            return (
                <View style={styles.indicatorView}>
                    <View style={styles.indicatorSubView}>
                        <Text style={styles.loadingText}>Please give us a moment for load your gift Cards...</Text>
                        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
                    </View>
                </View>
            );
        }

        return (
            <SafeAreaView style={styles.mainContainer}>
                <Header
                    backgroundColor={Colors.headerColor}
                    leftComponent={
                        <Icon type='ionicon' name='ios-arrow-back' color='#fff' size={30}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    centerComponent={
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.headerText}>Gift Cards</Text>
                        </View>
                    }
                />

                <View style={styles.mainView}>
                    <View style={styles.filterMainView}>
                        <Text style={styles.countText}>{data.length} Offers Available</Text>
                        <View style={styles.filterView}>
                            <Ionicons name="ios-options" size={20} color={Colors.black} />
                            <Text style={styles.filterText}>Filters</Text>
                        </View>
                    </View>

                    <View style={styles.listBg}>
                        <FlatList
                            data={data}
                            keyExtractor={item => item.brandKey}
                            renderItem={this._rowRender} />
                    </View>
                </View>
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
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: Colors.white,
        flexDirection: "row",
        padding: 10
    },
    giftImage: {
        height: 50,
        width: 80,
        resizeMode: "contain",
        marginRight: 10,
        alignSelf: "center"
    },
    giftText: {
        fontSize: 13,
        fontWeight: '500',
        color: Colors.giftTextColor
    },
    brandNameText: {
        color: Colors.greyColor,
        fontWeight: '300'
    },
    offerText: {
        fontSize: 18,
        color: Colors.black
    },
    verifiedText: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.greyColor,
        paddingTop: 30
    },
    listBg: {
        backgroundColor: Colors.listBackgroundColor,
        flex: 1
    },
    indicatorView: {
        flex: 1,
        width: WIDTH,
        height: HEIGHT,
        justifyContent: 'center',
        backgroundColor: Colors.headerColor
    },
    indicatorSubView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
        color: Colors.white
    }
})