import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  AppRegistry,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  AsyncStorage
} from "react-native";
// import { withNativeAd } from 'expo/build/facebook-ads';
import { CheckBox } from "native-base";
import {
  Header,
  Avatar,
  Icon,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import { Card, CardItem, Body, Left, Right, Button } from "native-base";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import Carousel from "react-native-snap-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { FlatList } from "react-native-gesture-handler";
import * as Progress from "react-native-progress";
import { FirebaseData } from "../../providers/firebase";
import firebase from '../../providers/firebaseConfig';

import moment from 'moment'
import axios from 'axios';
import { Loader } from "../Loader";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
export default class PlayerSurveyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyQuestion: [
        // {
        //     text: "Was level 3 too challenging or at a proper difficulty?",
        //     type: "radioButton",
        //     options: [
        //         {
        //             value: "I thought the dragons were easy and should be more difficult",
        //             isSelect: false
        //         },
        //         {
        //             value: "I think the dragons should be removed from the game because they made the game overly complicated",
        //             isSelect: false
        //         },
        //         {
        //             value: "I think there should be more dragons added to the game to increase the difficulty",
        //             isSelect: false
        //         },
        //     ]
        // },
        // {
        //     text: "What was your favorite part of the game?",
        //     type: "radioButton",
        //     options: [
        //         {
        //             value: "I thought the dragons were scary and annoying but I would not change anything because they made the game more complicated",
        //             isSelect: false
        //         },
        //         {
        //             value: "I thought the dragons were easy and should be more difficult",
        //             isSelect: false
        //         },
        //         {
        //             value: "I think the dragons should be removed from the game because they made the game overly complicated",
        //             isSelect: false
        //         },
        //         {
        //             value: "I think there should be more dragons added to the game to increase the difficulty",
        //             isSelect: false
        //         },
        //     ]
        // },
        // {
        //     text: "If you were to play this game again, what would you change about level 13?",
        //     type: "radioButton",
        //     options: [
        //         {
        //             value: "I thought the dragons were scary and annoying but I would not change anything because they made the game more complicated",
        //             isSelect: false
        //         },
        //         {
        //             value: "I thought the dragons were easy and should be more difficult",
        //             isSelect: false
        //         },
        //         {
        //             value: "I think the dragons should be removed from the game because they made the game overly complicated",
        //             isSelect: false
        //         },
        //         {
        //             value: "I think there should be more dragons added to the game to increase the difficulty",
        //             isSelect: false
        //         },
        //     ]
        // },
      ],
      myAllData: [],
      selectedItem: 0,
      totalLength: 0,
      screenIndex: 1,
      index: 0,
      currentIndex: 0,
      developerId: "",
      gameId: "",
      lastName: "",
      firstName: "",
      userEmail: "",
      developerName: "",
      gameName: "",
      userId: "",
      isLoading: false,
      zMinPoint: "",
      zMaxPoint: "",

    };
  }


  componentWillReceiveProps(newProps) {

    let data = newProps.navigation.state.params;
    if (data !== "" && data !== null && data !== undefined) {
      this.setState({
        isContinue: data.isContinue !== "" && data.isContinue !== null && data.isContinue !== undefined ? data.isContinue : false,
        screenIndex: data.screenIndex !== "" && data.screenIndex !== null && data.screenIndex !== undefined ? data.screenIndex : "",
        currentIndex: data.currentIndex !== "" && data.currentIndex !== null && data.currentIndex !== undefined ? data.currentIndex : 0,
        selectedItem: data.selectedItem !== "" && data.selectedItem !== null && data.selectedItem !== undefined ? data.selectedItem : 0,
      }, () => {
        if (this.state.currentIndex != 0) {
          //   this._carousel.snapToItem(2)
          // setTimeout(() => { this._carousel.snapToItem(2,false); },500);
        }
      })
    }
  }

  componentWillMount() {
    let data = this.props.navigation.state.params;
    if (data !== "" && data !== null && data !== undefined) {
      let Data = {
        answer: "",
        id: "",
        isMultiChoice: false,
        surveyDesc: "",
        surveyResponse: ""
      };
      let myAllData = [];
      myAllData.push(Data);
      this.props.navigation.state.params.surveyQuestion.map((item, index) => {
        myAllData.push(item);
      })
      myAllData.push(Data);
      let developerId = this.props.navigation.state.params.developerId;
      let gameId = this.props.navigation.state.params.gameId;
      let developerName = this.props.navigation.state.params.developerName;
      let gameName = this.props.navigation.state.params.gameName;
      let zMinPoint = this.props.navigation.state.params.zMinPoint;
      let zMaxPoint = this.props.navigation.state.params.zMaxPoint;
      let currentIndex = this.props.navigation.state.params.currentIndex;
      let screenIndex = this.props.navigation.state.params.screenIndex;
      let selectedItem = this.props.navigation.state.params.selectedItem;

      this.setState({
        surveyQuestion:
          myAllData !== "" && myAllData !== null && myAllData !== undefined
            ? myAllData
            : [],
        totalLength: myAllData.length,
        gameId:
          gameId !== "" && gameId !== null && gameId !== undefined
            ? gameId
            : "",
        developerId:
          developerId !== "" &&
            developerId !== null &&
            developerId !== undefined
            ? developerId
            : "",
        developerName:
          developerName !== "" &&
            developerName !== null &&
            developerName !== undefined
            ? developerName
            : "",
        gameName:
          gameName !== "" &&
            gameName !== null &&
            gameName !== undefined
            ? gameName
            : "",
        zMinPoint:
          zMinPoint !== "" &&
            zMinPoint !== null &&
            zMinPoint !== undefined
            ? zMinPoint
            : "",
        zMaxPoint:
          zMaxPoint !== "" &&
            zMaxPoint !== null &&
            zMaxPoint !== undefined
            ? zMaxPoint
            : "",
        currentIndex:
          currentIndex !== "" &&
            currentIndex !== null &&
            currentIndex !== undefined
            ? currentIndex
            : 0,
        selectedItem:
          selectedItem !== "" &&
            selectedItem !== null &&
            selectedItem !== undefined
            ? selectedItem
            : 0,
        screenIndex:
          screenIndex !== "" &&
            screenIndex !== null &&
            screenIndex !== undefined
            ? screenIndex
            : 1,
      }, () => {
        //  setTimeout(() => { this._carousel.snapToItem(2,false); },500); 
      });


      this.getTesterUserProfile()
    }
  }


  componentDidMount() {
    let data = this.props.navigation.state.params;
    if (data !== "" && data !== null && data !== undefined) {
      let Data = {
        answer: "",
        id: "",
        isMultiChoice: false,
        surveyDesc: "",
        surveyResponse: ""
      };
      let myAllData = [];
      myAllData.push(Data);
      this.props.navigation.state.params.surveyQuestion.map((item, index) => {
        myAllData.push(item);
      })
      myAllData.push(Data);
      let developerId = this.props.navigation.state.params.developerId;
      let gameId = this.props.navigation.state.params.gameId;
      let developerName = this.props.navigation.state.params.developerName;
      let gameName = this.props.navigation.state.params.gameName;
      let zMinPoint = this.props.navigation.state.params.zMinPoint;
      let zMaxPoint = this.props.navigation.state.params.zMaxPoint;
      let currentIndex = this.props.navigation.state.params.currentIndex;
      let screenIndex = this.props.navigation.state.params.screenIndex;
      let selectedItem = this.props.navigation.state.params.selectedItem;

      this.setState({
        surveyQuestion:
          myAllData !== "" && myAllData !== null && myAllData !== undefined
            ? myAllData
            : [],
        totalLength: myAllData.length,
        gameId:
          gameId !== "" && gameId !== null && gameId !== undefined
            ? gameId
            : "",
        developerId:
          developerId !== "" &&
            developerId !== null &&
            developerId !== undefined
            ? developerId
            : "",
        developerName:
          developerName !== "" &&
            developerName !== null &&
            developerName !== undefined
            ? developerName
            : "",
        gameName:
          gameName !== "" &&
            gameName !== null &&
            gameName !== undefined
            ? gameName
            : "",
        zMinPoint:
          zMinPoint !== "" &&
            zMinPoint !== null &&
            zMinPoint !== undefined
            ? zMinPoint
            : "",
        zMaxPoint:
          zMaxPoint !== "" &&
            zMaxPoint !== null &&
            zMaxPoint !== undefined
            ? zMaxPoint
            : "",
        currentIndex:
          currentIndex !== "" &&
            currentIndex !== null &&
            currentIndex !== undefined
            ? currentIndex
            : 0,
        selectedItem:
          selectedItem !== "" &&
            selectedItem !== null &&
            selectedItem !== undefined
            ? selectedItem
            : 0,
        screenIndex:
          screenIndex !== "" &&
            screenIndex !== null &&
            screenIndex !== undefined
            ? screenIndex
            : 1,
      }, () => {
        //setTimeout(() => { this._carousel.snapToItem(2,false); },500); 
      });


      this.getTesterUserProfile()
    }
  }
  getTesterUserProfile() {

    try {
      var ref = FirebaseData.getUserRef().child("TesterProfile");

      ref.on('value', (snap) => {

        snap.forEach((child) => {
          this.setState({
            firstName: child.val().firstName,
            lastName: child.val().lastName,
            userEmail: child.val().email,
            userId: child.key
          });
        });
      });
    }
    catch (e) {
      //alert(e.message);
      return null;
    }
  }

  storeData = async (email, password) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    } catch (e) {
      // saving error
    }
  }


  onAnswerChanged = (item, index) => {
    let data = this.state.surveyQuestion.slice();
    let optionsItem = data[this.state.selectedItem].answerList;
    for (let i = 0; i < optionsItem.length; i++) {
      optionsItem[i].isSelected = false;
    }
    optionsItem[index].isSelected = !optionsItem.isSelected;
    data[this.state.selectedItem].answer = optionsItem[index].answer;
    data[this.state.selectedItem].selectedValue = optionsItem[index].selectedValue;
    this.setState({ surveyQuestion: data });
  };
  horizontalLineForInput = () => {
    return (
      <View
        style={{
          backgroundColor: "#ccc",
          height: 1,
          marginTop: -hp("1.4"),
          marginRight: wp("10")
        }}
      />
    );
  };
  onValueChanged = (value, item, index) => {
    let data = this.state.surveyQuestion.slice();
    data[index].answer = value;
    this.setState({ surveyQuestion: data });
  };

  renderOptions = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row", marginTop: 10, width: wp("90") }}>
        {/* <CheckBox
          checked={item.isSelected}
          style={{
            marginRight: 20,
            borderColor: "rgb(105,105,105)",
            borderRadius: 10,
            alignSelf: "center"
          }}
          onPress={() => {
            this.onAnswerChanged(item, index);
          }}
        ></CheckBox> */}

        <TouchableOpacity style={{ marginRight: 20, alignItems: "center", justifyContent: "center" }} onPress={() => { this.onAnswerChanged(item, index); }} >
          <Icon type='record' name={item.isSelected === false ? 'radio-button-unchecked' : 'radio-button-checked'} color={item.isSelected === false ? "#808080" : "#000"} size={20} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            color: "rgb(105,105,105)",
            fontWeight: "500",
            marginRight: 35
          }}
          onPress={() => {
            this.onAnswerChanged(item, index);
          }}
        >
          {item.answer}
        </Text>
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    () => {
    }

    if (index == 0) {
      return (
        <View
          style={{
            alignItems: "flex-start",
            marginHorizontal: 10,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "rgb(50,50,50)",
              fontWeight: "500",
            }}
          >
            You are about to begin the survey for {this.state.gameName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "rgb(125,125,125)",
              fontWeight: "400",
              marginTop: 10
            }}
          >
            To ensure that we are collecting the highest quality of responses
            and feedback, we ask that you answer the following questions
            honestly. If we suspect that you a) have NOT completed all the
            instructions and tested the specified features or b) are NOT
            answering the questions to the best of your abilities, we may be
            forced to terminate your account and confiscate any acquired
            ZPoints.
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: "rgb(50,50,50)",
              fontWeight: "600",
              marginTop: 10
            }}
          >
            By continuing, you are agreeing to answer every question truthfully
            and to the best of your ability.
          </Text>
          <Button
            style={{
              marginTop: 30,
              padding: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => { this.onSurveyBegin(1) }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
              Begin Survey
            </Text>
          </Button>
        </View>
      );
    }
    else {

      if (item.isMultiChoice == true) {
        return (
          <View>
            <Text
              style={{ fontSize: 16, marginTop: 10, color: "#000", fontWeight: "600" }}
            >
              {item.surveyDesc}
            </Text>
            <FlatList
              data={item.answerList}
              bounces={false}
              bouncesZoom={false}
              renderItem={this.renderOptions}
              keyExtractor={(item, index) => index}
            />
          </View>
        );
      } else {
        return (
          <View style={{ flex: 1, width: wp("90") }}>
            {/* <Text style={{ fontSize: 18, color: '#000', }}>
                        {item.text}
                    </Text> */}
            {index === this.state.surveyQuestion.length - 1 ?
              <View style={{ flex: 1, alignItems: 'center', justifyContent: "center", width: wp("90") }}>
                {/* <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                > */}
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    color: "rgb(50,50,50)",
                    fontWeight: "500",
                    //  marginTop: 15
                  }}
                >
                  You have reached the end of this survey
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center",
                    color: "rgb(125,125,125)",
                    fontWeight: "400",
                    marginTop: 15
                  }}
                >
                  Any unanswered or poorly answered questions may result in a
                  lowered number of ZPoints rewarded.
                </Text>
                {/* </View> */}
              </View>
              :
              <View>
                <Text
                  style={{ fontSize: 16, marginTop: 10, color: "#000", fontWeight: "600" }}
                >
                  {item.surveyDesc}
                </Text>
                <TextInput
                  onChangeText={value => {
                    this.onValueChanged(value, item, index);
                  }}
                  style={{
                    fontSize: 14,
                    marginTop: 10,
                    color: "gray",
                    marginLeft: 0,
                    borderColor: 'gray',
                    borderWidth: 1,
                    padding: 5,
                    height: 180,
                    textAlignVertical: 'top'
                    //width:undefined
                  }}
                  multiline={true}
                  placeholder={"Write your answer here..."}
                  placeholderTextColor={"gray"}
                  numberOfLines={5}
                  value={item.answer}
                />
                {/* {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null} */}
                {this.state.emailError !== "" &&
                  this.state.emailError !== null ? (
                    <Text style={{ color: "red", fontSize: 14, marginTop: 5 }}>
                      {this.state.emailError}
                    </Text>
                  ) : null}
              </View>
            }
          </View>
        );
      }
    }
  };

  onPageChanged = (index, data) => {
    this.setState({ selectedItem: index, currentIndex: index });
  };

  onNext = () => {
    this._carousel.snapToNext();
    this.setState({ index: this.state.index + 1 });
  };

  onPrev = () => {
    this._carousel.snapToPrev();
    if (this.state.currentIndex == 1) {
      this.setState({ currentIndex: 0, selectedItem: 0 })
    }
    //this.setState({  currentIndex: 0 });
    // if (this.state.index != 0) {
    //   this.setState({ index: this.state.index - 1 });
    // } else {
    //   this.setState({ screenIndex: 1, currentIndex: 0 });
    // }
  };
  onSubmitPrev = () => {
    this.setState({
      screenIndex: 1,
      index: this.state.totalLength - 1,
      currentIndex: this.state.totalLength - 1,
      selectedItem: this.state.totalLength
    });
    //this._carousel.onSnapToItem((this.state.totalLength-1));
  };

  onSubmitSurvey = () => {
    this.setState({ isLoading: true })
    let data = this.state.surveyQuestion.slice();

    let answer = [];
    // data.map(item => {

    // if(item.surveyDesc !== ""){     

    // }
    // });
    for (let i = 1; i < (data.length - 1); i++) {
      answer.push({
        question: data[i].surveyDesc,
        answer: data[i].answer,
        gameId: this.state.gameId,
        isMultiChoice: data[i].isMultiChoice !== undefined ? data[i].isMultiChoice : false,
        selectedValue: data[i].selectedValue
      });
    }
    let surveyQuestionsAnswer = ""

    for (let i = 1; i <= answer.length; i++) {
      var QuestionsType = data[i].isMultiChoice == true ? 'Multiple Choice' : 'Free Response';
      var answerSelection = data[i].selectedValue !== "" ? data[i].selectedValue + ')' : "";
      surveyQuestionsAnswer += `
      <div>
        <p>Questions ${i}:</p>
        <p>Type: ${QuestionsType}</p>
        <p>Questions: ${data[i].surveyDesc}</p>
        <p>Answer:${answerSelection} ${data[i].answer}</p>
        <br/>
      </div>`;
    }
    let myDate = moment(new Date()).format('MMM DD, YYYY - hh:mm A');
    let htmlFormat = `
      <div>
          <p style="font-size:16px">User Information:</p>
          <p>User Name: ${this.state.firstName} ${this.state.lastName}</p>
          <p>User Email Address: ${this.state.userEmail}</p>
          <p>User Firebase ID: ${firebase.auth().currentUser.uid}</p>
          <p>Date and Time of Submission: ${myDate}</p>
          </br>
          </br>
          <p style="font-size:16px">Game Information:</p>
          <p>Game Name: ${this.state.gameName}</p>
          <p>Game Developer Name: ${this.state.developerName}</p>
          <p>Game Z-Points Value Range:  ${this.state.zMinPoint} - ${this.state.zMaxPoint}</p>
          </br>
          </br>
          <p style="font-size:16px">Questions and Responses:</p>
          </br>
          <div>${surveyQuestionsAnswer}</div>
      </div>
    `
    try {
      this.sendMail(htmlFormat, answer);
      //this.props.navigation.navigate('DeveloperGamesList');
    } catch (error) {
      alert(error);
    }
  };


  sendMail = (htmlFormat, answer) => {
    let url = "https://us-central1-myfirsttestproject-c712f.cloudfunctions.net/sendMail/"
    axios({
      method: 'post',
      url: url,
      headers: {},
      data: {
        dest: 'zigantic.a@gmail.com', // This is the body part
        subject: "Game Survey",
        htmlFormat: htmlFormat,
      }
    })
      .then((response) => {
        var surveyAnswer = {
          surveyAnswer: answer
        };
        FirebaseData.addAnswer(
          this.state.developerId,
          this.state.gameId,
          surveyAnswer
        );
        FirebaseData.addAnswerToUserProfile(
          this.state.developerId,
          this.state.gameId,
          surveyAnswer
        );

        this.setState({ screenIndex: 3, isLoading: false });

      })
      .catch((error) => {
        this.setState({ isLoading: false });

      });

  }

  onSurveyBegin = (value) => {
    this._carousel.snapToItem(value);
    this.setState({ currentIndex: value, selectedItem: value });
  };
  screen = () => {
    if (this.state.screenIndex == 0) {
      // return (
      //   <View
      //     style={{
      //       alignItems: "flex-start",
      //       marginHorizontal: 20,
      //       justifyContent: "center",
      //       marginTop: 15
      //     }}
      //   >
      //     <Text
      //       style={{
      //         fontSize: 20,
      //         color: "rgb(50,50,50)",
      //         fontWeight: "500",
      //         marginTop: 15
      //       }}
      //     >
      //       You are about to begin the survey for {this.state.gameName}
      //     </Text>
      //     <Text
      //       style={{
      //         fontSize: 15,
      //         color: "rgb(125,125,125)",
      //         fontWeight: "400",
      //         marginTop: 10
      //       }}
      //     >
      //       To ensure that we are collecting the highest quality of responses
      //       and feedback, we ask that you answer the following questions
      //       honestly. If we suspect that you a) have NOT completed all the
      //       instructions and tested the specified features or b) are NOT
      //       answering the questions to the best of your abilities, we may be
      //       forced to terminate your account and confiscate any acquired
      //       ZPoints.
      //     </Text>
      //     <Text
      //       style={{
      //         fontSize: 17,
      //         color: "rgb(50,50,50)",
      //         fontWeight: "600",
      //         marginTop: 10
      //       }}
      //     >
      //       By continuing, you are agreeing to answer every question truthfully
      //       and to the best of your ability.
      //     </Text>
      //     <Button
      //       style={{
      //         marginTop: 30,
      //         padding: 10,
      //         justifyContent: "center",
      //         alignItems: "center"
      //       }}
      //       onPress={() => this.onSurveyBegin()}
      //     >
      //       <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
      //         Begin Survey
      //       </Text>
      //     </Button>
      //   </View>
      // );
    } else if (this.state.screenIndex == 1) {
      return (
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: -1
            }}
          >
            <Progress.Bar
              progress={this.state.selectedItem / (this.state.totalLength - 1)}
              width={wp("100")}
              borderWidth={0}
              style={{ borderRadius: 0 }}
              unfilledColor={"rgba(107,194,130,0.4)"}
              color={"green"}
            />
          </View>
          <ScrollView bounces={false} bouncesZoom={false}>
            <View
              style={{
                alignItems: "flex-start",
                marginHorizontal: 20,
                justifyContent: "center",
                marginTop: 15
              }}
            >

              {this.state.currentIndex != 0 ? <Text
                style={{
                  fontSize: 14,
                  marinBottom: 10,
                  color: this.state.selectedItem === (this.state.surveyQuestion.length - 1) ? 'transparent' : "rgb(150,150,150)",
                  fontWeight: "600"
                }}
              >
                Question {(this.state.currentIndex)} of {this.state.totalLength - 2}:
            </Text> : null}
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={this.state.surveyQuestion}
                renderItem={this._renderItem}
                sliderWidth={wp("90")}
                itemWidth={wp("90")}
                firstItem={parseInt(this.state.currentIndex)}
                enableMomentum={true}
                removeClippedSubviews={false}
                useScrollView={true}
                //   initialNumToRender={this.state.surveyQuestion.length}             
                // currentIndex={2}
                //  initialNumToRender={this.state.surveyQuestion.length}
                onSnapToItem={this.onPageChanged}
                scrollEnabled={false}
                extraData={this.state.surveyQuestion}
              />
            </View>



            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40
              }}
            >
              <Button
                style={{
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 25
                }}
                onPress={() => {
                  this.onPrev();
                }}
              >
                <Icon
                  style={{ height: 25, width: 25, marginRight: 5 }}
                  name="ios-arrow-back"
                  type="ionicon"
                  color="white"
                />
                <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>{" "}Prev</Text>
              </Button>
              <View style={{ width: SCREEN_WIDTH - 260 }}></View>
              <Button
                style={{
                  backgroundColor: "green",
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 25
                }}
                onPress={() => {
                  this.onSubmitSurvey();
                }}
              >
                <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>Submit Survey</Text>
              </Button>
            </View> : */}
            {this.state.currentIndex != 0 ?
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 20,
                  marginTop: this.state.selectedItem === this.state.surveyQuestion.length ? 20 : 20
                }}
              >
                <Button
                  style={{
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    this.onPrev();
                  }}
                >
                  <Icon
                    style={{ height: 25, width: 25, marginRight: 5 }}
                    name="ios-arrow-back"
                    type="ionicon"
                    color="white"
                  />
                  <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
                    {" "}
                  Prev
                </Text>
                </Button>
                <View style={{ flex: 1 }}></View>
                {this.state.selectedItem === (this.state.surveyQuestion.length - 1) ?

                  <Button
                    style={{
                      backgroundColor: "green",
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      this.onSubmitSurvey();
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>Submit Survey</Text>

                  </Button>
                  :
                  <Button
                    ref={c => {
                      this.Mybutton = c;
                    }}
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      //marginRight: 25
                    }}
                    onPress={() => {
                      this.onNext();
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
                      Next{" "}
                    </Text>
                    <Icon
                      style={{ height: 25, width: 25, marginRight: 10 }}
                      name="ios-arrow-forward"
                      type="ionicon"
                      color="white"
                    />
                  </Button>
                }
              </View>
              : null}

          </ScrollView>
        </View>
      );
    } else if (this.state.screenIndex == 2) {
      return (
        <View>
          <View
            style={{
              alignItems: "center",
              marginHorizontal: 20,
              justifyContent: "center",
              marginTop: 15
            }}
          >
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: "rgb(50,50,50)",
                fontWeight: "500",
                marginTop: 15
              }}
            >
              You have reached the end of this survey
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "rgb(125,125,125)",
                fontWeight: "400",
                marginTop: 15
              }}
            >
              Any unanswered or poorly answered questions may result in a
              lowered number of ZPoints rewarded.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40
            }}
          >
            <Button
              style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 25
              }}
              onPress={() => {
                this.onSubmitPrev();
              }}
            >
              <Icon
                style={{ height: 25, width: 25, marginRight: 5 }}
                name="ios-arrow-back"
                type="ionicon"
                color="white"
              />
              <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
                {" "}
                Prev
              </Text>
            </Button>
            <View style={{ width: SCREEN_WIDTH - 260 }}></View>

            <Button
              style={{
                backgroundColor: "green",
                padding: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 25
              }}
              onPress={() => {
                this.onSubmitSurvey();
              }}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
                Submit Survey
              </Text>
            </Button>

          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            alignItems: "center",
            marginHorizontal: 20,
            justifyContent: "center",
            marginTop: 15
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "rgb(50,50,50)",
              fontWeight: "500",
              marginTop: 15
            }}
          >
            You have finished surveying '{this.state.gameName}'!
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              color: "rgb(125,125,125)",
              fontWeight: "400",
              marginTop: 15
            }}
          >
            Please give us a few days to review your submission. You will
            receive a notification when ZPoints have been added to your account.
          </Text>
          <Button
            style={{
              alignSelf: "center",
              marginTop: 30,
              padding: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => this.props.navigation.navigate("PlayerGamesList")}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
              Return to Home
            </Text>
          </Button>
        </View>
      );
    }
  };

  onBackPress = () => {
    Alert.alert(
      //title
      'Are you sure?',
      //body
      'If you exit, your progress will be saved. Are you sure you want to exit?',
      [
        { text: 'Yes', onPress: () => this.onGoGameDetatilsScreen(), style: 'cancel' },
        { text: 'No', onPress: () => console.log('') },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );

  }

  onGoGameDetatilsScreen = () => {
    this.props.navigation.navigate("PlayerSurveyList", { isContinue: true, screenIndex: this.state.screenIndex, currentIndex: this.state.currentIndex, selectedItem: this.state.selectedItem, onSurveyBegin: this.onSurveyBegin.bind(this) })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{ height: Layout.headerHeight }}
          backgroundColor={Colors.purpleColor}
          innerContainerStyles={{ alignItems: "center",paddingTop:Layout.paddingTop }}
          leftComponent={
            this.state.screenIndex <= 2 ?
              <Button
                transparent
                style={{
                  justifyContent: 'center', alignItems: 'center', width: 25,
                }}
                onPress={() => this.onBackPress()}
              >
                <Icon
                  style={{ height: 25, width: 25 }}
                  name="ios-arrow-back"
                  type="ionicon"
                  color="white"
                />
              </Button> : null
          }
        />
        {/* To display survey and survey submit */}
        <Loader loading={this.state.isLoading} message='Submitting...' />
        <this.screen />
      </View>
    );
  }
}
