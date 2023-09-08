import axios from 'axios';
import React from 'react'
import {
  StatusBar,
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import {Post} from "../components/Post";


export const HomeScreen = ({navigation}) => {
  const [items, setItems] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);


  const fetchPosts = () => {
    setIsLoading(true)
    axios
      .get('https://64f94c174098a7f2fc1437c7.mockapi.io/posts')
      .then(({data}) => {
        setItems(data);
      }).catch(err => {
      console.log(err);
      Alert.alert('Ошибка', 'Не удалось получить статьи')
    }).finally(() => {
      setIsLoading(false);
    })
  }
  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <ActivityIndicator size="large"/>
        <Text style={{marginTop: 20}}>Загрузка ...</Text>
      </View>
    );
  }
  return (
    <View style={{marginTop: 20}}>

      <FlatList
        refreshControl={ <RefreshControl refreshing={isLoading} onRefresh={fetchPosts}/>}
        data={items}
        renderItem={({item}) =>(
          <TouchableOpacity onPress = {() => navigation.navigate('FullPost', {id: item.id, title: item.title})} >
            <Post title={item.title} imageUrl={item.imageUrl} createdAt={item.createdAt}/>
          </TouchableOpacity>
        )}
      />

      <StatusBar theme="auto"/>
    </View>

  );
}
