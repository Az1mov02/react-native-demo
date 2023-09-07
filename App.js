import axios from 'axios';
import React from 'react'
import {Post} from "./components/Post";
import {FullPostScreen} from './screens/FullPost'
import  {View, StatusBar} from 'react-native'
import {HomeScreen} from "./screens/Home";

export default function App() {
  return (
    <View style={{marginTop: 20}}>
      <FullPostScreen />
      <StatusBar theme="auto"/>
    </View>
  );
}
