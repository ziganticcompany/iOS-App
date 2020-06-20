import React from 'react'
import { View, Dimensions, Text, ScrollView } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import {Button, Card, CardItem} from 'native-base';
import Colors from '../../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class NDA extends React.Component {


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
                <Button transparent style = {{ justifyContent: 'flex-start', alignItems: 'center', width:55, marginLeft: 10, marginTop: 40}} onPress={() => this.props.navigation.goBack()}>
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

                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: -40,
                  marginTop: 35
              }}>NON-DISCLOSURE AGREEMENT</Text>
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
            <Text style = {{color: 'rgb(25,25,25)', fontSize: 16, fontWeight: '600', alignSelf: 'flex-start', marginTop: 5, marginBottom: 5}}>Last updated 6-5-2020</Text>
        <Text style = {{color: 'rgb(50,50,50)'}}>
            This Agreement is made by and between each of Zigantic’s customers (“Customer”), which represent individuals or corporations requiring feedback regarding mobile and PC games, and Zigantic’s end users (“End User”), individuals who provide feedback regarding the mobile or PC games of the above Customer. Zigantic LLC has no liability regarding the disclosure of confidential information regarding these games subsequent to the signing of this agreement. {"\n"}{"\n"}
            1.	Definition of Confidentiality. As used in this Agreement, "Confidential Information" refers to any information which has commercial value and is either (i) technical information, including patent, copyright, trade secret, and other proprietary information, techniques, sketches, drawings, models, inventions, know-how, processes, apparatus, equipment, algorithms, software programs, software source documents, formulae, music, art and animation, and game design related to the current, future and proposed products and services of Customer, or (ii) non-technical information relating to Customer products, including without limitation pricing, margins, merchandising plans and strategies, finances, financial and accounting data and information, suppliers, Customer, customer lists, purchasing data, sales and marketing plans, future business plans and any other information which is proprietary and confidential to Customer.
2.	Nondisclosure and Nonuse Obligations. End User will maintain in confidence and will not disclose, disseminate or use any Confidential Information belonging to Customer, whether or not in written form.  End User agrees that End User shall treat all Confidential Information of Customer with at least the same degree of care as End User accords its own confidential information.  End User further represents that End User exercises at least reasonable care to protect its own confidential information.  If End User is not an individual, End User agrees that End User shall disclose Confidential Information only to those of its employees who need to know such information, and certifies that such employees have previously signed a copy of this Agreement.
3.	Survival.  This Agreement shall govern all communications between the parties.  End User understands that its obligations under Paragraph 2 ("Nondisclosure and Nonuse Obligations") shall survive the termination of any other relationship between the parties.
4.	Governing Law.  This Agreement shall be governed in all respects by the laws of the United States of America. In the event that this agreement is breached, any and all disputes must be settled in a court of competent jurisdiction.
5.	Injunctive Relief.  A breach of any of the promises or agreements contained herein will result in irreparable and continuing damage to Customer for which there will be no adequate remedy at law, and Customer shall be entitled to injunctive relief and/or a decree for specific performance, and such other relief as may be proper (including monetary damages if appropriate).
6.	Entire Agreement.  This Agreement constitutes the entire agreement with respect to the Confidential Information disclosed herein and supersedes all prior or contemporaneous oral or written agreements concerning such Confidential Information.  This Agreement may only be changed by mutual agreement of authorized representatives of the parties in writing. {"\n"}{"\n"}

WHEREFORE, End User acknowledges that they have read and understand this Agreement and voluntarily accept the duties and obligations set forth herein.   
        </Text>     

        </View>
        </ScrollView>
    </View>
    )
  }
}
