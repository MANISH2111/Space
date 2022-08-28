import React from 'react';
import { ScrollView, StyleSheet,Image ,Text} from 'react-native'
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import moment from 'moment';

import { MainStackParamList } from '../navigation';
import type { RouteProp } from '@react-navigation/native';
import { useAppSelector } from '../hooks';

type Props = {
	route: RouteProp<MainStackParamList, 'Details'>;
};
const  Details: React.ComponentType<Props>=({route})=> {

  const data=useAppSelector(state=>state.launch.launches)

  return (
    <ScrollView>
      <Text>Details</Text>
    </ScrollView>
  )
}

export {Details}