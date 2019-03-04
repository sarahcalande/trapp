import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class TheFourPage extends React.Component {
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
    fetch(`https://talentrecap.com/wp-json/wp/v2/media/${item.featured_media}`)
      .then(r=>r.json())
      .then((r)=>{
        return (<Image source = {{uri:r.media_details.sizes.thumbnail.source_url}}/>)})
          }
        />
      )
    }
    />
    )

  }}
