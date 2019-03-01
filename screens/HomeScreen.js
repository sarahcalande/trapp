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
} from 'react-native';
import { WebBrowser } from 'expo';
import { ListItem, List } from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import HTML from 'react-native-render-html'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
  this.state = { isLoading: true }
  }



componentDidMount(){
  return fetch('https://talentrecap.com/wp-json/wp/v2/posts?_embed=true')
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
          <FlatList style={{ paddingTop: 40, paddingSide: 30}}
                  data={this.state.dataSource}
                  renderItem={({item}) => (
              <ListItem
            title={<HTML html={`${item.title.rendered}`}/>}

    avatar = {
<Image source = {{uri: item._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url}} />}
        />
            )}
            />
    );


  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

}
