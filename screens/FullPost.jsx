import React from 'react';
import {ActivityIndicator, Alert, Text, View} from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import {Loading} from "../components/Loading";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export const FullPostScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();

  React.useEffect(() => {
    axios
      .get('https://64f94c174098a7f2fc1437c7.mockapi.io/posts/2')
      .then(({data}) => {
        setData(data);
      }).catch(err => {
      console.log(err);
      Alert.alert('Ошибка', 'Не удалось получить статьи')
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems:  'center'}}
      ><Loading/></View>
    );
  }

  return (
    <View style={{padding: 20}}>
      <PostImage source={{uri: data.imageUrl}}/>
      <PostText>
        {data.text}
      </PostText>
    </View>
  )
}