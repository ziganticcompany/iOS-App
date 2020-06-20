import React from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import {
  Header,
  Avatar,
  Icon,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from "react-native-elements";
import bgImage from "../../assets/images/LoginPageBackground.jpg";
import logo from "../../assets/images/zigantic1.png";
//import Icon from 'react-native-vector-icons/Ionicons';
//service providers
import { FirebaseData } from "../../providers/firebase";
import styles from "../../constants/Styles";
import { Button} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlatList } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Layout from "../../constants/Layout";
export default class SurveyAddScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: "",
      gameId: "",
      surveyDesc: "",
      surveyDescError: null,
      isSurveyUpdate: false,
      id: "",
      questionsList: "",
      answerList: [
        {
          input: "",
        },
      ],
      isFreeResponse: true,
      multiQuestions: "",
      multiQuestionsError: "",
      answerA: "",
      answerAError: "",
      answerB: "",
      answerBError: "",
      answerC: "",
      answerCError: "",
      answerD: "",
      answerDError: "",
    };
  }

  componentDidMount() {
    let data = this.props.navigation.state.params;
    if (data !== "" && data !== null && data !== undefined) {
      const {
        gameId,
        isSurveyUpdate,
        item,
      } = this.props.navigation.state.params;
      this.setState(
        {
          gameId:
            gameId !== null && gameId !== "" && gameId !== undefined
              ? gameId
              : "",
          isSurveyUpdate:
            isSurveyUpdate !== null &&
            isSurveyUpdate !== "" &&
            isSurveyUpdate !== undefined
              ? isSurveyUpdate
              : false,
        },
        () => {
          if (this.state.isSurveyUpdate == true) {
            this.setState(
              {
                id:
                  item.id !== null && item.id !== "" && item.id !== undefined
                    ? item.id
                    : "",
                surveyDesc:
                  item.surveyDesc !== null &&
                  item.surveyDesc !== "" &&
                  item.surveyDesc !== undefined
                    ? item.surveyDesc
                    : "",
                isFreeResponse:
                  item.isMultiChoice !== null &&
                  item.isMultiChoice !== "" &&
                  item.isMultiChoice !== undefined
                    ? !item.isMultiChoice
                    : true,
              },
              () => {
                if (this.state.isFreeResponse == false) {
                  this.setState({
                    multiQuestions:
                      item.surveyDesc !== null &&
                      item.surveyDesc !== "" &&
                      item.surveyDesc !== undefined
                        ? item.surveyDesc
                        : "",
                    answerA:
                      item.answerList[0].answer !== null &&
                      item.answerList[0].answer !== "" &&
                      item.answerList[0].answer !== undefined
                        ? item.answerList[0].answer
                        : "",
                    answerB:
                      item.answerList[1].answer !== null &&
                      item.answerList[1].answer !== "" &&
                      item.answerList[1].answer !== undefined
                        ? item.answerList[1].answer
                        : "",
                    answerC:
                      item.answerList[2].answer !== null &&
                      item.answerList[2].answer !== "" &&
                      item.answerList[2].answer !== undefined
                        ? item.answerList[2].answer
                        : "",
                    answerD:
                      item.answerList[3].answer !== null &&
                      item.answerList[3].answer !== "" &&
                      item.answerList[3].answer !== undefined
                        ? item.answerList[3].answer
                        : "",
                  });
                }
              }
            );
          }
        }
      );
    }
  }

  // componentWillReceiveProps(newProps) {
  // let data = newProps.navigation.state.params;
  // if (data !== "" && data !== null && data !== undefined) {
  // const { gameId, isSurveyUpdate, surveyDesc, id } = newProps.navigation.state.params;
  // this.setState({
  // gameId: gameId !== null && gameId !== "" && gameId !== undefined ? gameId : "",
  // isSurveyUpdate: isSurveyUpdate !== null && isSurveyUpdate !== "" && isSurveyUpdate !== undefined ? isSurveyUpdate : false,
  // surveyDesc: surveyDesc !== null && surveyDesc !== "" && surveyDesc !== undefined ? surveyDesc : "",
  // id: id !== null && id !== "" && id !== undefined ? id : "",
  // })
  // }
  // }

  handleSurveyCreate = () => {
    const {
      gameId,
      surveyDesc,
      isSurveyUpdate,
      id,
      multiQuestions,
      answerA,
      answerB,
      answerC,
      answerD,
      isFreeResponse,
    } = this.state;

    if (isFreeResponse === false) {
      if (multiQuestions === "") {
        this.setState({ multiQuestionsError: "Survey Question required" });
        return;
      }
      if (answerA === "") {
        this.setState({ answerAError: "Survey Answer required" });
        return;
      }
      if (answerB === "") {
        this.setState({ answerBError: "Survey Answer required" });
        return;
      }
      if (answerC === "") {
        this.setState({ answerCError: "Survey Answer required" });
        return;
      }
      if (answerD === "") {
        this.setState({ answerDError: "Survey Answer required" });
        return;
      }
    } else {
      if (surveyDesc === "") {
        this.setState({ surveyDescError: "Survey description required" });
        return;
      }
    }
    try {
      var surveyQuestions = "";
      if (isFreeResponse === false) {
        let answerList = [
          {
            isSelected: false,
            answer: answerA,
            selectedValue: "A",
          },
          {
            isSelected: false,
            answer: answerB,
            selectedValue: "B",
          },
          {
            isSelected: false,
            answer: answerC,
            selectedValue: "C",
          },
          {
            isSelected: false,
            answer: answerD,
            selectedValue: "D",
          },
        ];
        surveyQuestions = {
          surveyQuestion: multiQuestions,
          isMultiChoice: true,
          answer: answerList,
        };
      } else {
        surveyQuestions = {
          surveyQuestion: surveyDesc,
          isMultiChoice: false,
        };
      }

      if (isSurveyUpdate == false) {
        FirebaseData.createSurveyProfile(gameId, surveyQuestions);
      } else {
        FirebaseData.updateSurveyProfile(id, gameId, surveyQuestions);
      }
      this.props.navigation.navigate("DeveloperSurveyList", { gameId: gameId });
    } catch (error) {
      alert(error + gameId);
    }
  };
  horizontalLineForInput = () => {
    return (
      <View
        style={{ backgroundColor: "#ccc", height: 1, marginTop: -hp("1.4") }}
      />
    );
  };

  renderAnswer = ({ item, index }) => {
    return (
      <View style={[myStyles.inputContainer, { marginTop: hp("2") }]}>
        <Text style={myStyles.formTextStyles}>First answer</Text>
        <FormInput
          containerStyle={myStyles.input}
          placeholder={"Enter first answer"}
          placeholderTextColor={"gray"}
          onChangeText={(surveyDesc) => {
            this.setState({ surveyDesc: surveyDesc });
            this.setState({ surveyDescError: null });
          }}
          value={this.state.surveyDesc}
        />
        {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
        {this.state.surveyDescError !== "" &&
        this.state.surveyDescError !== null ? (
          <Text style={[myStyles.errorMessage]}>
            {this.state.surveyDescError}
          </Text>
        ) : null}
      </View>
    );
  };

  setQuestionsType = (value) => {
    this.setState({ isFreeResponse: value });
  };

  deleteSurveyQuestions = () => {
    try {
      FirebaseData.deleteSurveyProfile(this.state.id, this.state.gameId);
      this.props.navigation.navigate("DeveloperSurveyList");
    } catch (error) {
      alert(error);
    }
  };

  onBackPress=()=>{
      this.props.navigation.navigate("DeveloperSurveyList")
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Header
          outerContainerStyles={{ zIndex: 1, height: Layout.headerHeight }}
          innerContainerStyles={{ alignItems: 'center',paddingTop:Layout.paddingTop }}
          backgroundColor="black"
          leftComponent={
            <Button transparent style={{ justifyContent: 'center', alignItems: 'center', width: 25,  }} onPress={() => this.onBackPress()}>
              <Icon style={{ height: 25, width: 25 }} name='ios-arrow-back' type='ionicon' color='white' size={24} />
            </Button>
          }
          centerComponent={
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  justifyContent: "center",
                  color: "#fff",
                  alignContent: "center",
                  fontSize: 20,
                }}
              >
                {this.state.isSurveyUpdate == true
                  ? "Update Survey Question"
                  : "Add a new Survey Question"}
              </Text>
            </View>
          }
          rightComponent={
            <Icon
              name="home"
              color="#fff"
              onPress={() =>
                this.props.navigation.navigate("Settings")
              }
            />
          }
        />
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <KeyboardAwareScrollView enableOnAndroid={true}>
            <View>
              {this.state.isSurveyUpdate == false ? (
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      height: 50,
                      backgroundColor: this.state.isFreeResponse
                        ? "red"
                        : "gray",
                      alignContent: "center",
                      alignItems: "center",
                      marginRight: 5,
                    }}
                    onPress={() => {
                      this.setQuestionsType(true);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: this.state.isFreeResponse ? "white" : "black",
                        textAlign: "center",
                        textAlignVertical: "center",
                        marginTop: 15,
                      }}
                    >
                      Free Reponse
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      height: 50,
                      backgroundColor: this.state.isFreeResponse
                        ? "gray"
                        : "red",
                      marginLeft: 5,
                    }}
                    onPress={() => {
                      this.setQuestionsType(false);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: this.state.isFreeResponse ? "black" : "white",
                        textAlign: "center",
                        textAlignVertical: "center",
                        marginTop: 15,
                      }}
                    >
                      Multiple Choice
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {this.state.isFreeResponse === true ? (
                <View style={myStyles.inputContainer}>
                  <Text style={myStyles.formTextStyles}>
                    Survey Description
                  </Text>
                  <FormInput
                    containerStyle={myStyles.input}
                    placeholder={"Enter description"}
                    placeholderTextColor={"gray"}
                    onChangeText={(surveyDesc) => {
                      this.setState({ surveyDesc: surveyDesc });
                      this.setState({ surveyDescError: "" });
                    }}
                    value={this.state.surveyDesc}
                  />
                  {Platform.OS !== "ios" ? (
                    <this.horizontalLineForInput />
                  ) : null}
                  {this.state.surveyDescError !== "" &&
                  this.state.surveyDescError !== null ? (
                    <Text style={[myStyles.errorMessage]}>
                      {this.state.surveyDescError}
                    </Text>
                  ) : null}
                </View>
              ) : (
                <View>
                  <View style={myStyles.inputContainer}>
                    <Text style={myStyles.formTextStyles}>
                      Survey Questions
                    </Text>
                    <FormInput
                      containerStyle={myStyles.input}
                      placeholder={"Enter Question"}
                      placeholderTextColor={"gray"}
                      onChangeText={(multiQuestions) => {
                        this.setState({ multiQuestions: multiQuestions });
                        this.setState({ multiQuestionsError: "" });
                      }}
                      value={this.state.multiQuestions}
                    />
                    {Platform.OS !== "ios" ? (
                      <this.horizontalLineForInput />
                    ) : null}
                    {this.state.multiQuestionsError !== "" &&
                    this.state.multiQuestionsError !== null ? (
                      <Text style={[myStyles.errorMessage]}>
                        {this.state.multiQuestionsError}
                      </Text>
                    ) : null}
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      textAlign: "center",
                      marginTop: 10,
                    }}
                  >
                    Set Answer
                  </Text>
                  <View style={myStyles.inputContainer}>
                    <Text style={myStyles.formTextStyles}>Answer A:</Text>
                    <FormInput
                      containerStyle={myStyles.input}
                      placeholder={"Enter Answer"}
                      placeholderTextColor={"gray"}
                      onChangeText={(answerA) => {
                        this.setState({ answerA: answerA });
                        this.setState({ answerAError: "" });
                      }}
                      value={this.state.answerA}
                    />
                    {Platform.OS !== "ios" ? (
                      <this.horizontalLineForInput />
                    ) : null}
                    {this.state.answerAError !== "" &&
                    this.state.answerAError !== null ? (
                      <Text style={[myStyles.errorMessage]}>
                        {this.state.answerAError}
                      </Text>
                    ) : null}
                  </View>
                  <View style={myStyles.inputContainer}>
                    <Text style={myStyles.formTextStyles}>Answer B:</Text>
                    <FormInput
                      containerStyle={myStyles.input}
                      placeholder={"Enter Answer"}
                      placeholderTextColor={"gray"}
                      onChangeText={(answerB) => {
                        this.setState({ answerB: answerB });
                        this.setState({ answerBError: "" });
                      }}
                      value={this.state.answerB}
                    />
                    {Platform.OS !== "ios" ? (
                      <this.horizontalLineForInput />
                    ) : null}
                    {this.state.answerBError !== "" &&
                    this.state.answerBError !== null ? (
                      <Text style={[myStyles.errorMessage]}>
                        {this.state.answerBError}
                      </Text>
                    ) : null}
                  </View>
                  <View style={myStyles.inputContainer}>
                    <Text style={myStyles.formTextStyles}>Answer C:</Text>
                    <FormInput
                      containerStyle={myStyles.input}
                      placeholder={"Enter Answer"}
                      placeholderTextColor={"gray"}
                      onChangeText={(answerC) => {
                        this.setState({ answerC: answerC });
                        this.setState({ answerCError: "" });
                      }}
                      value={this.state.answerC}
                    />
                    {Platform.OS !== "ios" ? (
                      <this.horizontalLineForInput />
                    ) : null}
                    {this.state.answerCError !== "" &&
                    this.state.answerCError !== null ? (
                      <Text style={[myStyles.errorMessage]}>
                        {this.state.answerCError}
                      </Text>
                    ) : null}
                  </View>
                  <View style={myStyles.inputContainer}>
                    <Text style={myStyles.formTextStyles}>Answer D:</Text>
                    <FormInput
                      containerStyle={myStyles.input}
                      placeholder={"Enter Answer"}
                      placeholderTextColor={"gray"}
                      onChangeText={(answerD) => {
                        this.setState({ answerD: answerD });
                        this.setState({ surveyDescError: "" });
                      }}
                      value={this.state.answerD}
                    />
                    {Platform.OS !== "ios" ? (
                      <this.horizontalLineForInput />
                    ) : null}
                    {this.state.answerDError !== "" &&
                    this.state.answerDError !== null ? (
                      <Text style={[myStyles.errorMessage]}>
                        {this.state.answerDError}
                      </Text>
                    ) : null}
                  </View>
                </View>
              )}
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.submitContainer}>
            <TouchableOpacity
              onPress={() => this.handleSurveyCreate()}
              style={styles.btnContainer}
            >
              <Text style={styles.btnText}>
                {this.state.isSurveyUpdate == true
                  ? "Update Survey Profile"
                  : "Add Survey Question"}
              </Text>
            </TouchableOpacity>
            {this.state.isSurveyUpdate == true ? (
              <TouchableOpacity
                onPress={() => this.deleteSurveyQuestions()}
                style={styles.deleteButtonContainer}
              >
                <Text style={styles.btnText}>Delete Survey</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  inputText: {
    fontSize: 15,
    //marginHorizontal: 10,
    color: "white",
    marginTop: 5,
  },
  input: {
    fontSize: 15,
    color: "gray",
    marginLeft: 0,
    width: wp("100"),
  },
  inputContainer: {
    width: wp("90"),
    marginTop: hp("2"),
  },
  formTextStyles: {
    fontSize: 13,
    color: "rgb(150,150,150)",
    fontWeight: "600",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  presetStyles: {
    marginTop: 10,
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  answerList: {},
});
