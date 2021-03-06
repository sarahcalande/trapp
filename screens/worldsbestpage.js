import React from 'react';
  import {
    Image,
    FlatList,
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
  } from 'react-native';
  import { WebBrowser } from 'expo';
  import { ListItem, List } from 'react-native-elements';
  import { MonoText } from '../components/StyledText';
  import Moment from 'moment';
  import HTML from 'react-native-render-html';
  import { Container, Card, Content, CardItem, Header, Body, Title} from 'native-base';

  export default class WorldsBestPage extends React.Component {
    static navigationOptions = {
      header: null,
    };

    constructor(props){
      super(props);
    this.state = { isLoading: true }
    }



  componentDidMount(){
    return fetch('https://talentrecap.com/wp-json/wp/v2/posts?categories=3?_embed=true')
    .then((r)=>r.json())
    .then((responseJson) => {this.setState({
      isLoading: false,
      dataSource: responseJson
    });
  })
  }

  render(){
      if(this.state.isLoading){
    return(
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
      </View>
    )
  } else

  //image source = {{uri:{ item._embedded['wp:featuredmedia'][0].source_url}}}

      return (
        <Container style={styles.container,{ paddingTop: 10, paddingSide: 30, paddingBottom: 10}} >
           <Header androidStatusBarColor="white"style={{ backgroundColor:'white' }}>
  <Body style={{ flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center', }}>
  <Title style={{fontSize: 40}}>Talent Recap</Title>
  </Body>
  </Header>

           <Content>
           {this.state.dataSource.map((item, index) => (
             <Card style={{flex:0}} key={item.id}>

             <CardItem>
             {item._embedded['wp:featuredmedia'].filter( element=>element.id == item.featured_media).map((subitem, index) => (
  <Image source={{uri:subitem.media_details.sizes.medium.source_url}}style={{height:200, width:200, flex:1}}key = {item.id}/>
  ))}
             </CardItem>

             <CardItem>
             <Text style = {{ fontSize:24, fontWeight:'bold', textAlign:'center' }}>{item.title.rendered}</Text>
             </CardItem>
             <CardItem>
                         <Text note>Published on: {Moment(item.date).format('d MMM Y')}</Text>
             </CardItem>
             <CardItem>
  <HTML ignoredStyles={["font-family", 'padding','transform', 'font-weight',"letter-spacing", "display", "color"]} style={{alignSelf:'center'}}html={item.content.rendered}imagesMaxWidth={Dimensions.get('window').width }/>
  </CardItem>

             </Card>
                       ))}
             </Content>
             </Container>
      )

    }

  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    img: {
      alignSelf: 'center',
          height: 240,
          width: 200,
          margin: 10
    },

    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
  });
