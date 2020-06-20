import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, FlatList, Image, Dimensions, TextInput, Platform } from 'react-native';
import { Header, Avatar, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Button } from "native-base";
import bgImage from '../../assets/images/LoginPageBackground.jpg';
import logo from '../../assets/images/zigantic1.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import Icon from 'react-native-vector-icons/Ionicons';
//service providers
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FirebaseData } from '../../providers/firebase';
import styles from '../../constants/Styles';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import DateTimePicker from "react-native-modal-datetime-picker";
import ModalDropdown from 'react-native-modal-dropdown';
import { SafeAreaView } from 'react-navigation';
import firebase from '../../providers/firebaseConfig';
import uuid from 'uuid';
const width = Dimensions.get('window').width;
import moment from 'moment';
import Layout from "../../constants/Layout";
export default class DeveloperGameAdd extends React.Component {
    state = {
        gameName: '',
        gameNameError: null,
        developerName: "",
        developerError: "",
        selectedFeatured: "Enter featured",
        featuredError: "",
        selectedStatus: "Enter status",
        statusError: "",
        selectedPlatform: "Enter Platform",
        platformError: "",
        selectedShortDes: "",
        shortDesError: "",
        selectedLongDes: "",
        longDesError: "",
        instructions: "",
        instructionsError: "",
        details: "",
        detailsError: "",
        surveyLength: "",
        surveyLengthError: "",
        downloadLength: "",
        downloadLengthError: "",
        gameDesc: '',
        gameDescError: null,
        gameIconUrl: '',
        gameIconUrlError: null,
        gameVersion: '',
        gameVersionError: null,
        primaryContactEmail: '',
        primaryContactEmailError: null,
        optionList: ["True", "False"],
        statusList: ["New", "Open", "Expiring", "10 days left!", "5 days left!", "3 days left!", "2 days left!", "1 day left!", "5 responses left!", "4 responses left!", "3 responses left!", "2 responses left!", "1 response left!"],
        platformList: ["Mobile", "Mobile (IOS only)", "Mobile (Android only)", "PC", "Console", "All platforms"],
        genreList: ["Action", "Adventure", "Casual", "Role-playing", "Simulation", "Strategy", "Educational", "Sports", "Shooter", "Fighting", "Horror", "Musical", "Racing", "Puzzle"],
        gameScreenShot: '',
        companyLogo: "",
        isDateTimePickerVisible: false,
        expiryDay: "No expiration date",
        expiryDayError: "",
        genre: "Enter genre",
        genreError: "",
        zMinPoint: "",
        zMaxPoint: "",
        ageMin: "",
        ageMax: "",
        zPointError: "",
        ageError: "",
        isUpdate: false,
        id: '',
        gameIconUrl: "",
        gameScreenShot: "",
        downloadLinkPlayStore: "",
        downloadLinkPlayStoreError: "",
        downloadLinkIOS: "This game is not available on IOS App Store",
        downloadLinkIOSError: "",

    }

    async uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const ref = firebase
            .storage()
            .ref()
            .child(uuid.v4());
        const snapshot = await ref.put(blob);

        // We're done with the blob, close and release it
        blob.close();

        return await snapshot.ref.getDownloadURL();
    }

    // uploadImage = async (uri) => {
    //     //Create a storage ref
    //     var storageRef = firebase.storage().ref();
    //     //Upload file
    //     storageRef.child("my-image111");
    // }

    // uploadImage = (imageUri) => {
    //     const ext = imageUri.split('.').pop(); // Extract image extension
    //     const filename = `mydemo.${ext}`; // Generate unique name
    //     this.setState({ uploading: true });
    //     firebase
    //         .storage()
    //         .ref(`tutorials/images/${filename}`)
    //         .on(
    //             firebase.storage.TaskEvent.STATE_CHANGED,
    //             snapshot => {
    //                 // let state = {};
    //                 // state = {
    //                 //     ...state,
    //                 //     progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
    //                 // };
    //                 if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
    //                     const allImages = this.state.images;
    //                     console.log("My image url --- > ", snapshot.downloadURL)
    //                     // allImages.push(snapshot.downloadURL);
    //                     // state = {
    //                     //     ...state,
    //                     //     uploading: false,
    //                     //     imgSource: '',
    //                     //     imageUri: '',
    //                     //     progress: 0,
    //                     //     images: allImages
    //                     // };
    //                     // AsyncStorage.setItem('images', JSON.stringify(allImages));
    //                 }
    //                 this.setState(state);
    //             },
    //             error => {
    //                 console.log("Mu image url error --- > ")
    //                 //alert('Sorry, Try again.');
    //             }
    //         );
    // };
    handleGameCreate = () => {
        let isAllValid = true;
        const { gameName, gameDesc, gameVersion, primaryContactEmail, developerName, selectedFeatured, selectedStatus, selectedPlatform, selectedShortDes, selectedLongDes, expiryDay, genre, surveyLength, downloadLength, instructions, details, zMinPoint, zMaxPoint, ageMin, ageMax, gameIconUrl, gameScreenShot, downloadLinkPlayStoreError, downloadLinkPlayStore, downloadLinkIOS, downloadLinkIOSError } = this.state;
        if (gameScreenShot == "" || gameIconUrl == "") { alert("Game screen shot and Company logo required"); isAllValid = false; }
        // if () { alert("Company logo required"); isAllValid = false; }
        if (gameName == "") { this.setState({ gameNameError: "Game name required" }); isAllValid = false; }
        if (gameName == "") { this.setState({ gameNameError: "Game name required" }); isAllValid = false; }
        if (developerName == "") { this.setState({ developerError: "Developer name required" }); isAllValid = false; }
        //if (selectedFeatured == "") { this.setState({ featuredError: "Developer name required" }) }
        if (selectedShortDes == "") { this.setState({ shortDesError: "Short description required" }); isAllValid = false; }
        if (selectedLongDes == "") { this.setState({ longDesError: "Long description required" }); isAllValid = false; }
        if (selectedLongDes == "") { this.setState({ longDesError: "Long description required" }); isAllValid = false; }
        if (zMinPoint == "" || zMaxPoint == "") { this.setState({ zPointError: "Z-Point range required" }); isAllValid = false; }
        //if (zMinPoint == 0 || zMaxPoint == "") { this.setState({ zPointError: "Z-Point range required" }) }
        if (zMinPoint == 0 || parseInt(zMinPoint) > parseInt(zMaxPoint)) { this.setState({ zPointError: "Z-Point range not valid" }); isAllValid = false; }
        if (expiryDay === "Enter expiration date") { this.setState({ expiryDayError: "Expiration date required" }); isAllValid = false; }
        if (instructions == "") { this.setState({ instructionsError: "Instructions required" }); isAllValid = false; }
        if (details == "") { this.setState({ detailsError: "Details required" }); isAllValid = false; }
        if (genre == "Enter genre") { this.setState({ genreError: "Genre required" }); isAllValid = false; }
        if (ageMin == "" || ageMax == "") { this.setState({ ageError: "Age range required" }); isAllValid = false; }
        if (ageMin == 0 || parseInt(ageMin) > parseInt(ageMax)) { this.setState({ ageError: "Age range not valid" }); isAllValid = false; }
        if (surveyLength == "") { this.setState({ surveyLengthError: "Survey length required" }); isAllValid = false; }
        if (downloadLength == "") { this.setState({ downloadLengthError: "Download link required" }); isAllValid = false; }
        if (downloadLinkPlayStore == "") { this.setState({ downloadLinkPlayStoreError: "Download link required" }); isAllValid = false; }
        if (downloadLinkIOS == "") { this.setState({ downloadLinkIOSError: "Download link required" }); isAllValid = false; }

        // if (selectedFeatured == "") { this.setState({ featuredError: "Developer name required" }) }

        if (isAllValid == false) {
            //this.setState({ errorMessage: "Game Title and Desc required" })
            //  alert("Game Title and Desc required");
            //  console.log("Field not valid");
            return;
        }
        try {
            var gameProfile = {
                gameName: gameName,
                developerName: developerName,
                featured: selectedFeatured,
                status: selectedStatus,
                platform: selectedPlatform,
                shortDes: selectedShortDes,
                longDes: selectedLongDes,
                zMin: zMinPoint,
                zMax: zMaxPoint,
                expirationDate: expiryDay,
                instructions: instructions,
                details: details,
                genre: genre,
                ageMin: ageMin,
                ageMax: ageMax,
                surveyLength: surveyLength,
                downloadLink: downloadLength,
                downloadLinkPlayStore: downloadLinkPlayStore,
                downloadLinkIOS: downloadLinkIOS,
                gameIconUrl: gameIconUrl,
                gameScreenShot: gameScreenShot
            }
            if (this.state.isUpdate === false) {
                FirebaseData.createGameProfile(gameProfile)
            } else {
                FirebaseData.updateGameProfile(gameProfile, this.state.id)
            }
            this.props.navigation.navigate('DeveloperGamesList');
        }
        catch (error) {
            alert(error);
            //            console.log("Error to add firebase", error);
        }
    }
    componentWillReceiveProps(newProps) {
        let data = newProps.navigation.state.params;
        if (data !== "" && data !== null && data !== undefined) {
            let myAllData = newProps.navigation.state.params.myAllData;
            this.setState({
                gameName: myAllData.gameName !== "" && myAllData.gameName !== null && myAllData.gameName !== undefined ? myAllData.gameName : "",
                developerName: myAllData.developerName !== "" && myAllData.developerName !== null && myAllData.developerName !== undefined ? myAllData.developerName : "",
                selectedFeatured: myAllData.featured !== "" && myAllData.featured !== null && myAllData.featured !== undefined ? myAllData.featured : "Enter featured",
                selectedStatus: myAllData.status !== "" && myAllData.status !== null && myAllData.status !== undefined ? myAllData.status : "Enter status",
                selectedPlatform: myAllData.platform !== "" && myAllData.platform !== null && myAllData.platform !== undefined ? myAllData.platform : "Enter Platform",
                selectedShortDes: myAllData.shortDes !== "" && myAllData.shortDes !== null && myAllData.shortDes !== undefined ? myAllData.shortDes : "",
                selectedLongDes: myAllData.longDes !== "" && myAllData.longDes !== null && myAllData.longDes !== undefined ? myAllData.longDes : "",
                zMaxPoint: myAllData.zMax !== "" && myAllData.zMax !== null && myAllData.zMax !== undefined ? myAllData.zMax : "",
                zMinPoint: myAllData.zMin !== "" && myAllData.zMin !== null && myAllData.zMin !== undefined ? myAllData.zMin : "",
                expiryDay: myAllData.expirationDate !== "" && myAllData.expirationDate !== null && myAllData.expirationDate !== undefined ? myAllData.expirationDate : "Enter expiration date",
                instructions: myAllData.instructions !== "" && myAllData.instructions !== null && myAllData.instructions !== undefined ? myAllData.instructions : "",
                details: myAllData.details !== "" && myAllData.details !== null && myAllData.details !== undefined ? myAllData.details : "",
                genre: myAllData.genre !== "" && myAllData.genre !== null && myAllData.genre !== undefined ? myAllData.genre : "Enter genre",
                ageMin: myAllData.ageMin !== "" && myAllData.ageMin !== null && myAllData.ageMin !== undefined ? myAllData.ageMin : "",
                ageMax: myAllData.ageMax !== "" && myAllData.ageMax !== null && myAllData.ageMax !== undefined ? myAllData.ageMax : "",
                surveyLength: myAllData.surveyLength !== "" && myAllData.surveyLength !== null && myAllData.surveyLength !== undefined ? myAllData.surveyLength : "",
                downloadLength: myAllData.downloadLink !== "" && myAllData.downloadLink !== null && myAllData.downloadLink !== undefined ? myAllData.downloadLink : "",
                isUpdate: myAllData.isUpdate !== "" && myAllData.isUpdate !== null && myAllData.isUpdate !== undefined ? myAllData.isUpdate : false,
                id: myAllData.id !== "" && myAllData.id !== null && myAllData.id !== undefined ? myAllData.id : false,
                gameScreenShot: myAllData.gameScreenShot !== "" && myAllData.gameScreenShot !== null && myAllData.gameScreenShot !== undefined ? myAllData.gameScreenShot : "",
                gameIconUrl: myAllData.gameIconUrl !== "" && myAllData.gameIconUrl !== null && myAllData.gameIconUrl !== undefined ? myAllData.gameIconUrl : "",
                downloadLinkPlayStore: myAllData.downloadLinkPlayStore !== "" && myAllData.downloadLinkPlayStore !== null && myAllData.downloadLinkPlayStore !== undefined ? myAllData.downloadLinkPlayStore : "",
                downloadLinkIOS: myAllData.downloadLinkIOS !== "" && myAllData.downloadLinkIOS !== null && myAllData.downloadLinkIOS !== undefined ? myAllData.downloadLinkIOS : "",

            })
        }
    }
    componentDidMount() {
        this.getPermissionAsync();
        let data = this.props.navigation.state.params;
        if (data !== "" && data !== null && data !== undefined) {
            let myAllData = this.props.navigation.state.params.myAllData;
            this.setState({
                gameName: myAllData.gameName !== "" && myAllData.gameName !== null && myAllData.gameName !== undefined ? myAllData.gameName : "",
                developerName: myAllData.developerName !== "" && myAllData.developerName !== null && myAllData.developerName !== undefined ? myAllData.developerName : "",
                selectedFeatured: myAllData.featured !== "" && myAllData.featured !== null && myAllData.featured !== undefined ? myAllData.featured : "Enter featured",
                selectedStatus: myAllData.status !== "" && myAllData.status !== null && myAllData.status !== undefined ? myAllData.status : "Enter status",
                selectedPlatform: myAllData.platform !== "" && myAllData.platform !== null && myAllData.platform !== undefined ? myAllData.platform : "Enter Platform",
                selectedShortDes: myAllData.shortDes !== "" && myAllData.shortDes !== null && myAllData.shortDes !== undefined ? myAllData.shortDes : "",
                selectedLongDes: myAllData.longDes !== "" && myAllData.longDes !== null && myAllData.longDes !== undefined ? myAllData.longDes : "",
                zMaxPoint: myAllData.zMax !== "" && myAllData.zMax !== null && myAllData.zMax !== undefined ? myAllData.zMax : "",
                zMinPoint: myAllData.zMin !== "" && myAllData.zMin !== null && myAllData.zMin !== undefined ? myAllData.zMin : "",
                expiryDay: myAllData.expirationDate !== "" && myAllData.expirationDate !== null && myAllData.expirationDate !== undefined ? myAllData.expirationDate : "Enter expiration date",
                instructions: myAllData.instructions !== "" && myAllData.instructions !== null && myAllData.instructions !== undefined ? myAllData.instructions : "",
                details: myAllData.details !== "" && myAllData.details !== null && myAllData.details !== undefined ? myAllData.details : "",
                genre: myAllData.genre !== "" && myAllData.genre !== null && myAllData.genre !== undefined ? myAllData.genre : "Enter genre",
                ageMin: myAllData.ageMin !== "" && myAllData.ageMin !== null && myAllData.ageMin !== undefined ? myAllData.ageMin : "",
                ageMax: myAllData.ageMax !== "" && myAllData.ageMax !== null && myAllData.ageMax !== undefined ? myAllData.ageMax : "",
                surveyLength: myAllData.surveyLength !== "" && myAllData.surveyLength !== null && myAllData.surveyLength !== undefined ? myAllData.surveyLength : "",
                downloadLength: myAllData.downloadLink !== "" && myAllData.downloadLink !== null && myAllData.downloadLink !== undefined ? myAllData.downloadLink : "",
                isUpdate: myAllData.isUpdate !== "" && myAllData.isUpdate !== null && myAllData.isUpdate !== undefined ? myAllData.isUpdate : false,
                id: myAllData.id !== "" && myAllData.id !== null && myAllData.id !== undefined ? myAllData.id : false,
                gameScreenShot: myAllData.gameScreenShot !== "" && myAllData.gameScreenShot !== null && myAllData.gameScreenShot !== undefined ? myAllData.gameScreenShot : "",
                gameIconUrl: myAllData.gameIconUrl !== "" && myAllData.gameIconUrl !== null && myAllData.gameIconUrl !== undefined ? myAllData.gameIconUrl : "",
                downloadLinkPlayStore: myAllData.downloadLinkPlayStore !== "" && myAllData.downloadLinkPlayStore !== null && myAllData.downloadLinkPlayStore !== undefined ? myAllData.downloadLinkPlayStore : "",
                downloadLinkIOS: myAllData.downloadLinkIOS !== "" && myAllData.downloadLinkIOS !== null && myAllData.downloadLinkIOS !== undefined ? myAllData.downloadLinkIOS : "",
            })
        }
    }
    _pickImage = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            if (type == 0) {

                this.setState({ gameScreenShot: result.uri });

                let data = await this.uploadImageAsync(result.uri);
                this.setState({ gameScreenShot: data })
            } else {
                this.setState({ gameIconUrl: result.uri });
                let data = await this.uploadImageAsync(result.uri);
                this.setState({ gameIconUrl: data })
            }

        }
    };
    //example of header https://github.com/react-native-training/react-native-elements/issues/568     
    /*Add below if we want to show Zigantic image; Add this right below ImageBackground      
    <View style = {styles.logoContainer}>
      <TouchableHighlight onPress={() => this.props.navigation.navigate('AuthDecisionScreen')}>
        <Image source = {logo} style = {styles.logo} />
        </TouchableHighlight>
      </View>
    */

    horizontalLine = () => {
        return (
            <View style={{ backgroundColor: "#ccc", height: 1, marginTop: 5 }} />
        )
    }
    horizontalLineForInput = () => {
        return (
            <View style={{ backgroundColor: "#ccc", height: 1, marginTop: -hp("1.4") }} />
        )
    }
    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ height: 20 }}>
                <Text style={{ color: 'white' }}>{item}</Text>
            </TouchableOpacity>
        )
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = birthDay => {

        //    console.log("My birthday ---- > ", birthDay)
        // utc = birthDay.getTime() + (birthDay.getTimezoneOffset() * 60000);
        // offset = 17;
        // nd = new Date(utc + (3600000 * offset));
        //this.setState({ expiryDay: nd.toISOString().split('T')[0], expiryDayError: "" })
        this.setState({ expiryDay: moment(birthDay).format('YYYY-MM-DD'), expiryDayError: "" })
        // this.setState({ birthDayError: null })
        //   console.log("A date has been picked: ", nd, nd.toISOString().split('T')[0]);
        this.hideDateTimePicker();
    };
    renderRow = (option, index, isSelected) => {
        return (
            <View style={{ height: hp("5") }}>
                <Text style={{ color: "white", flex: 1, textAlignVertical: 'center', marginStart: 5, marginTop: 5 }}>{option}</Text>
            </View>
        )
    }
    onGameNameChange = (value) => {
        this.setState({ gameName: value, gameNameError: "" })
    }
    onDeveloperNameChange = (value) => {
        this.setState({ developerName: value, developerError: "" })
    }
    onShortDescChange = (value) => {
        this.setState({ selectedShortDes: value, shortDesError: "" })
    }
    onLongerDesChange = (value) => {
        this.setState({ selectedLongDes: value, longDesError: "" })
    }
    onInstructionsChanged = (value) => {
        this.setState({ instructions: value, instructionsError: "" })
    }
    onDetailsChange = (value) => {
        this.setState({ details: value, detailsError: "" })
    }
    onSurveyLengthChange = (value) => {
        this.setState({ surveyLength: value, surveyLengthError: "" })
    }
    onDownloadChange = (value) => {
        this.setState({ downloadLength: value, downloadLengthError: "" })
    }
    onDownloadGoogleChange = (value) => {
        this.setState({ downloadLinkPlayStore: value, downloadLinkPlayStoreError: "" })
    }
    onDownloadIOSChange = (value) => {
        this.setState({ downloadLinkIOS: value, downloadLinkIOSError: "" })
    }
    onZminChanged = (value) => {
        this.setState({ zMinPoint: value, zPointError: "" })
    }
    onZmaxChanged = (value) => {
        this.setState({ zMaxPoint: value, zPointError: "" })
    }
    onMinAgeChanged = (value) => {
        this.setState({ ageMin: value, ageError: "" })
    }
    onMaxAgeChanged = (value) => {
        this.setState({ ageMax: value, ageError: "" })
    }
    onSelectFeatured = (value, index) => {
        this.setState({ selectedFeatured: this.state.optionList[value].slice(), featuredError: "" })
    }
    onSelectStatus = (value, index) => {
        this.setState({ selectedStatus: this.state.statusList[value].slice(), statusError: "" })
    }
    onSelectPlatform = (value, index) => {
        this.setState({ selectedPlatform: this.state.platformList[value].slice(), platformError: "" })
    }
    onGenreSelected = (value, index) => {
        this.setState({ genre: this.state.genreList[value].slice(), genreError: "" })
    }
    deleteGame = () => {
        try {
            FirebaseData.deleteGameProfile(this.state.id)
            this.props.navigation.navigate('DeveloperGamesList')
        } catch (error) {
            alert(error);
        }
    }
    onBackPress = () => {
        this.props.navigation.navigate('DeveloperGamesList')
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    outerContainerStyles={{ zIndex: 1, height: Layout.headerHeight }}
                    innerContainerStyles={{ alignItems: 'center', paddingTop: Layout.paddingTop }}
                    backgroundColor='black'
                    leftComponent={
                        <Button transparent style={{ justifyContent: 'center', alignItems: 'center', width: 25 }} onPress={() => this.onBackPress()}>
                            <Icon style={{ height: 25, width: 25 }} name='ios-arrow-back' type='ionicon' color='white' size={24} />
                        </Button>
                    }
                    centerComponent={<View style={{ alignItems: 'center' }}>
                        <Text style={{ justifyContent: 'center', color: '#fff', alignContent: 'center', fontSize: 20 }}>{this.state.isUpdate === false ? "Add New Game" : "Edit Game Profile"}</Text>
                    </View>}
                />
                <View style={{
                    flex: 1,
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    backgroundColor: 'white'
                }}>
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        //extraHeight = {175}
                        contentContainerStyle={styles.contentContainerForScollView}>
                        <View style={{ flex: 1, width: wp("90") }}>
                            <TouchableOpacity
                                style={[myStyles.imgStyle, { backgroundColor: '#ccc' }]}
                                onPress={() => { this._pickImage(0) }} >
                                {this.state.gameScreenShot !== "" && this.state.gameScreenShot !== null && this.state.gameScreenShot !== undefined ?
                                    <Image
                                        source={{ uri: this.state.gameScreenShot }}
                                        style={myStyles.imgStyle} /> :

                                    <Text style={myStyles.gameScreenShotTextStyle}>Game ScreenShot</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this._pickImage(1) }}
                                style={myStyles.companyLogoStyles}
                            >
                                {this.state.gameIconUrl !== "" && this.state.gameIconUrl !== null && this.state.gameIconUrl !== undefined ?
                                    <Image
                                        source={{ uri: this.state.gameIconUrl }}
                                        style={myStyles.logoStyles} />
                                    :
                                    <Text style={myStyles.logoTextStyles}>Company Logo</Text>
                                }
                            </TouchableOpacity>
                            <View style={myStyles.inputContainer}>
                                <Text style={myStyles.formTextStyles}>Name of game</Text>
                                <FormInput
                                    onChangeText={this.onGameNameChange}
                                    containerStyle={myStyles.input}
                                    placeholder={'Enter name of game'}
                                    placeholderTextColor={'gray'}
                                    value={this.state.gameName}
                                />
                                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                                {this.state.gameNameError !== "" && this.state.gameNameError !== null ? <Text style={myStyles.errorMessage}>{this.state.gameNameError}</Text> : null}
                            </View>
                            <View style={myStyles.inputContainer}>
                                <Text style={myStyles.formTextStyles}>Name of developer</Text>
                                <FormInput
                                    containerStyle={myStyles.input}
                                    placeholder={'Enter name of developer'}
                                    placeholderTextColor={'gray'}
                                    onChangeText={this.onDeveloperNameChange}
                                    value={this.state.developerName}
                                />
                                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                                {this.state.developerError !== "" && this.state.developerError !== null ? <Text style={myStyles.errorMessage}>{this.state.developerError}</Text> : null}
                            </View>

                            <View style={myStyles.inputContainer} >
                                <Text style={myStyles.formTextStyles}>Featured</Text>
                                <ModalDropdown
                                    textStyle={myStyles.dropDownTextStyle}
                                    renderRow={this.renderRow}
                                    defaultValue={this.state.selectedFeatured}
                                    onSelect={this.onSelectFeatured}
                                    options={this.state.optionList}
                                    style={myStyles.dropDownMainStyle}
                                    dropdownStyle={myStyles.dropDownStyle}
                                />

                                <this.horizontalLine />

                                {this.state.featuredError !== "" && this.state.featuredError !== null ? <Text style={myStyles.errorMessage}>{this.state.featuredError}</Text> : null}

                            </View>

                            <View style={myStyles.inputContainer} >
                                <Text style={myStyles.formTextStyles}>Status</Text>
                                <ModalDropdown
                                    textStyle={myStyles.dropDownTextStyle}
                                    renderRow={this.renderRow}
                                    defaultValue={this.state.selectedStatus}
                                    options={this.state.statusList}
                                    onSelect={this.onSelectStatus}
                                    style={myStyles.dropDownMainStyle}
                                    dropdownStyle={[myStyles.dropDownStyle, { height: hp("15") }]}
                                />

                                <this.horizontalLine />
                                {this.state.statusError !== "" && this.state.statusError !== null ? <Text style={myStyles.errorMessage}>{this.state.statusError}</Text> : null}

                            </View>
                            <View style={myStyles.inputContainer} >
                                <Text style={myStyles.formTextStyles}>Platform</Text>
                                <ModalDropdown
                                    textStyle={myStyles.dropDownTextStyle}
                                    style={myStyles.dropDownMainStyle}
                                    renderRow={this.renderRow}
                                    defaultValue={this.state.selectedPlatform}
                                    options={this.state.platformList}
                                    onSelect={this.onSelectPlatform}
                                    dropdownStyle={[myStyles.dropDownStyle]}
                                />

                                <this.horizontalLine />
                                {this.state.platformError !== "" && this.state.platformError !== null ? <Text style={myStyles.errorMessage}>{this.state.platformError}</Text> : null}

                            </View>

                            <View style={myStyles.inputContainer} >
                                <Text style={myStyles.formTextStyles}>Short description</Text>
                                <TextInput
                                    style={myStyles.textInputStyles}
                                    multiline={true}
                                    placeholder={"Write short description here"}
                                    placeholderTextColor={"gray"}
                                    numberOfLines={5}
                                    onChangeText={this.onShortDescChange}
                                    value={this.state.selectedShortDes}
                                />
                                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                                {this.state.shortDesError !== "" && this.state.shortDesError !== null ? <Text style={myStyles.errorMessage}>{this.state.shortDesError}</Text> : null}

                            </View>
                            <View style={myStyles.inputContainer}>
                                <Text style={myStyles.formTextStyles}>Longer description</Text>
                                <TextInput
                                    style={myStyles.textInputStyles}
                                    multiline={true}
                                    placeholder={"Write long description here"}
                                    placeholderTextColor={"gray"}
                                    numberOfLines={5}
                                    onChangeText={this.onLongerDesChange}
                                    value={this.state.selectedLongDes}
                                />
                                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                                {this.state.longDesError !== "" && this.state.longDesError !== null ? <Text style={myStyles.errorMessage}>{this.state.longDesError}</Text> : null}
                            </View>
                            <View style={myStyles.inputContainer}>
                                <Text style={myStyles.formTextStyles}>Z-Point</Text>
                                <View style={{ flexDirection: 'row', width: wp("90") }}>
                                    <Text style={[myStyles.textStyles, { alignSelf: 'center' }]} placeholderTextColor={'gray'}>Z-Point Range</Text>
                                    <TextInput
                                        style={myStyles.zPointRangeStyle}
                                        placeholder={"Min"}
                                        keyboardType={"number-pad"}
                                        value={this.state.zMinPoint}
                                        onChangeText={this.onZminChanged}
                                        placeholderTextColor={'gray'}
                                    />
                                    <TextInput
                                        style={myStyles.zPointRangeStyle}
                                        placeholder={"Max"}
                                        keyboardType={"number-pad"}
                                        value={this.state.zMaxPoint}
                                        onChangeText={this.onZmaxChanged}
                                        placeholderTextColor={'gray'}
                                    />

                                </View>
                                {this.state.zPointError !== "" && this.state.zPointError !== null ? <Text style={myStyles.errorMessage}>{this.state.zPointError}</Text> : null}
                            </View>
                            <View style={myStyles.inputContainer} >
                                <Text style={myStyles.formTextStyles}>Expiration date</Text>
                                <Text onPress={this.showDateTimePicker}
                                    style={myStyles.textStyles}
                                    placeholderTextColor={'gray'}
                                >
                                    {this.state.expiryDay}
                                </Text>
                                <this.horizontalLine />
                                <DateTimePicker
                                    // pickerContainerStyleIOS={{height:500}}
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                //style={styles.input}
                                />
                                {this.state.expiryDayError !== "" && this.state.expiryDayError !== null ? <Text style={myStyles.errorMessage}>{this.state.expiryDayError}</Text> : null}

                            </View>
                            <View style={myStyles.inputContainer}>
                                <Text style={myStyles.formTextStyles}>Instructions</Text>
                                <TextInput
                                    style={myStyles.textInputStyles}
                                    multiline={true}
                                    placeholder={"Write instructions here"}
                                    placeholderTextColor={"gray"}
                                    numberOfLines={5}
                                    onChangeText={this.onInstructionsChanged}
                                    value={this.state.instructions}
                                />
                                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                                {this.state.instructionsError !== "" && this.state.instructionsError !== null ? <Text style={myStyles.errorMessage}>{this.state.instructionsError}</Text> : null}
                            </View>
                            <View style={myStyles.inputContainer}>
                                <Text style={myStyles.formTextStyles}>Details</Text>
                                <TextInput
                                    style={myStyles.textInputStyles}
                                    multiline={true}
                                    placeholder={"Write details here"}
                                    placeholderTextColor={"gray"}
                                    numberOfLines={5}
                                    onChangeText={this.onDetailsChange}
                                    value={this.state.details}
                                />
                                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                                {this.state.detailsError !== "" && this.state.detailsError !== null ? <Text style={myStyles.errorMessage}>{this.state.detailsError}</Text> : null}
                            </View>
                            <View style={myStyles.inputContainer} >
                                <Text style={myStyles.formTextStyles}>Genre</Text>
                                <ModalDropdown
                                    textStyle={myStyles.dropDownTextStyle}
                                    renderRow={this.renderRow}
                                    style={myStyles.dropDownMainStyle}
                                    defaultValue={this.state.genre}
                                    onSelect={this.onGenreSelected}
                                    options={this.state.genreList}
                                    dropdownStyle={[myStyles.dropDownStyle, { height: hp("20") }]}
                                />
                                <this.horizontalLine />
                                {this.state.genreError !== "" && this.state.genreError !== null ? <Text style={myStyles.errorMessage}>{this.state.genreError}</Text> : null}
                            </View>
                            <View style={myStyles.inputContainer}>
                                <Text style={myStyles.formTextStyles}>Age</Text>
                                <View style={{ flexDirection: 'row', width: wp("90") }}>
                                    <Text style={[myStyles.textStyles, { alignSelf: 'center' }]} placeholderTextColor={'gray'}>Age range</Text>
                                    <TextInput
                                        style={myStyles.zPointRangeStyle}
                                        placeholder={"Min"}
                                        placeholderTextColor={'gray'}
                                        value={this.state.ageMin}
                                        onChangeText={this.onMinAgeChanged}

                                    />
                                    <TextInput
                                        style={myStyles.zPointRangeStyle}
                                        placeholder={"Max"}
                                        placeholderTextColor={'gray'}
                                        value={this.state.ageMax}
                                        onChangeText={this.onMaxAgeChanged}

                                    />

                                </View>
                                {this.state.ageError !== "" && this.state.ageError !== null ? <Text style={myStyles.errorMessage}>{this.state.ageError}</Text> : null}
                            </View>
                            <View style={myStyles.inputContainer}>
                                <Text style={myStyles.formTextStyles}>Survey length</Text>
                                <FormInput
                                    containerStyle={myStyles.input}
                                    placeholder={'Enter survey length'}
                                    placeholderTextColor={'gray'}
                                    onChangeText={this.onSurveyLengthChange}
                                    value={this.state.surveyLength}
                                />
                                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                                {this.state.surveyLengthError !== "" && this.state.surveyLengthError !== null ? <Text style={myStyles.errorMessage}>{this.state.surveyLengthError}</Text> : null}
                            </View>

                            <View style={myStyles.inputContainer}>
                                <Text style={myStyles.formTextStyles}>Download Link (PC)</Text>
                                <FormInput
                                    containerStyle={myStyles.input}
                                    placeholder={'Enter download link'}
                                    placeholderTextColor={'gray'}
                                    onChangeText={this.onDownloadChange}
                                    value={this.state.downloadLength}
                                />
                                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                                {this.state.downloadLengthError !== "" && this.state.downloadLengthError !== null ? <Text style={myStyles.errorMessage}>{this.state.downloadLengthError}</Text> : null}
                            </View>

                            <View style={myStyles.inputContainer}>
                                <Text style={myStyles.formTextStyles}>Download Link {Platform.OS === "ios" ? "" : "(Google Play)"}</Text>
                                <FormInput
                                    containerStyle={myStyles.input}
                                    placeholder={Platform.OS === "ios" ? "Enter download link" : 'Enter download link Google Play'}
                                    placeholderTextColor={'gray'}
                                    onChangeText={this.onDownloadGoogleChange}
                                    value={this.state.downloadLinkPlayStore}
                                />
                                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                                {this.state.downloadLinkPlayStoreError !== "" && this.state.downloadLinkPlayStoreError !== null ? <Text style={myStyles.errorMessage}>{this.state.downloadLinkPlayStoreError}</Text> : null}
                            </View>
                            <View style={myStyles.inputContainer}>
                                <Text style={myStyles.formTextStyles}>Download Link (IOS)</Text>
                                <FormInput
                                    containerStyle={myStyles.input}
                                    placeholder={'Enter download link IOS'}
                                    placeholderTextColor={'gray'}
                                    onChangeText={this.onDownloadIOSChange}
                                    value={this.state.downloadLinkIOS}
                                />
                                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                                {this.state.downloadLinkIOSError !== "" && this.state.downloadLinkIOSError !== null ? <Text style={myStyles.errorMessage}>{this.state.downloadLinkIOSError}</Text> : null}
                            </View>
                        </View>
                        {this.state.isUpdate === false ? <View style={styles.submitContainer}>
                            <TouchableOpacity onPress={() => this.handleGameCreate()} style={styles.btnContainer}>
                                <Text style={styles.btnText}>Add Game Profile</Text>
                            </TouchableOpacity>
                        </View> :
                            <View style={styles.submitContainer}>
                                <TouchableOpacity onPress={() => this.handleGameCreate()} style={styles.btnContainer}>
                                    <Text style={styles.btnText}>Update Game Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DeveloperSurveyList', { gameId: this.state.id })} style={styles.btnContainer}>
                                    <Text style={styles.btnText}>Manage Survey Questions</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.deleteGame()} style={styles.deleteButtonContainer}>
                                    <Text style={styles.btnText}>Delete Game</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </KeyboardAwareScrollView>

                </View>
            </View>
        );
    }
}


const myStyles = StyleSheet.create({
    inputContainer: {
        marginBottom: 25,
        //backgroundColor: 'white',  
        width: wp("100"),
    },
    errorMessage: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        // marginHorizontal: wp("5"),
    },
    textStyles: {
        fontSize: 16,
        //  marginHorizontal: wp("5"),
        marginTop: 5,
        color: 'gray',
    },
    imgStyle: {
        height: hp("20"),
        width: wp("50"),
        alignSelf: 'center'
    },
    companyLogoStyles: {
        height: hp("9"),
        width: wp("20"),
        alignSelf: 'center',
        backgroundColor: '#000',
        marginTop: -hp("5")
    },
    gameScreenShotTextStyle: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        marginTop: hp("5")
    },
    logoTextStyles: {
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
        marginTop: 10,
        alignSelf: 'center'
    },
    logoStyles: {
        height: hp("9"),
        width: wp("20"),
    },
    zPointRangeStyle: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 2,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 3,
        color: "black",
        fontSize: 16
    },
    dropDownStyle: {
        width: wp("90"),
        height: hp("10"),
        backgroundColor: "#000",
        borderColor: "#000",
        // marginHorizontal: wp("5"),
        marginTop: -hp("2")
    },
    dropDownTextStyle: {
        color: 'gray',
        fontSize: 18,
        //marginHorizontal: 20
    },
    input: {
        color: 'gray',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
    },
    textLabel: {
        fontSize: 19,
        //marginHorizontal: 20,
        color: 'white',
        marginTop: 2,

    },
    formTextStyles: {
        fontSize: 16,
        color: 'rgb(50,50,50)',
        fontWeight: '600'
    },
    dropDownMainStyle: {
        marginTop: 10
    },
    textInputStyles: {
        fontSize: 14,
        marginTop: 10,
        color: "gray",
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        width: width - 50,
        height: 100,
        textAlignVertical: 'top'
    }
})