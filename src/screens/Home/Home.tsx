import { View ,FlatList,Text,StyleSheet, TouchableOpacity, Image} from 'react-native'
import React,{useEffect, useCallback} from 'react'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FlexCol, FlexRow } from '../../components/atom/Flex'
import { useAppDispatch,useAppSelector } from '../../hooks'
import { getLaunches } from '../../store/actions'
import { navigate } from '../../services'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParamList } from '../../navigation'

const Wrapper = styled(FlexCol)`
	padding: 5px;
	height: 100%;
	flex: 1;
	background-color: 'grey';
  justify-content:center;
  align-items:center;
`
const SuccessWrapper=styled(View)<{isSuccess:boolean}>`
    position:absolute;
    top:0;
    right:0;
    width:50px;
    height:15px;
    opacity:0.8;
    background-color:${(props) =>
		props.isSuccess ? '#FFA3A3' :'#90EE8F' };
    border-bottom-left-radius:8px;
    border-top-left-radius:8px
`
const SuccessText=styled(Text)`
    font-weight:bold;
    font-size:10px;
    color:#0a0a25c6 ;
    text-align:center
`

type Props = {
	navigation: StackNavigationProp<MainStackParamList, 'SpaceX_Launches'>;
}

const Home : React.ComponentType<Props>=({ navigation })=> {

const dispatch=useAppDispatch()

const data=useAppSelector(state=>state.launch.launches)

React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
   <FlexRow>
   <TouchableOpacity onPress={()=>{}} style={styles.icon} >
        <MaterialCommunityIcons name="sort" size={22} color="grey" />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}} style={styles.icon} >
            <FontAwesome name="filter" size={22} color="grey" />
        </TouchableOpacity>
        
   </FlexRow>
      ),
    });
  }, [navigation]);


const SpaceCard = ({ item}:any) => (
  <TouchableOpacity 
  onPress={() =>
    navigate('Details', 
    { mission_name: item.mission_name,
      launch_site:item.launch_site,
      details:item.details,
      date:item.launch_date_utc,
      rocket:item.rocket,
      image:item.links.mission_patch_small,
      success:item.launch_success
    })
    }style={styles.item}
    >
        <Image style={styles.image} source={{uri:item.links.mission_patch_small}}/>

        <Text style={styles.title}>{item.mission_name}</Text>

        <SuccessWrapper isSuccess={item.launch_success}>

              <SuccessText  >{item.launch_success?'success':"failure"}</SuccessText>

        </SuccessWrapper>

  </TouchableOpacity>
);


const RenderCard = useCallback(({ item }:any) => {
		return <SpaceCard item={item} />;
	}, []);

useEffect(() => {
  //@ts-ignore
  dispatch(getLaunches());
  
}, [dispatch]);

  return (
     <Wrapper>
          <FlatList data={data}
          renderItem={({ item }) => (
					<RenderCard key={item.flight_number} item={item} />
				)}
          numColumns={2}
          />
    </Wrapper>
  )
}


const styles = StyleSheet.create({
  
  item: {
    position:'relative',
    backgroundColor: '#d5e5e7c7',
    justifyContent:'center',
    alignItems:'center',
    marginVertical: 8,
    marginHorizontal: 8,
    width:150,
    height:150,
    borderRadius:8
    
  },
  title: {
    fontSize: 14,
    color:'black',
    overflow:'hidden'
  },
  image:{
    
    width:120,
    height:120
  },
icon:{
paddingRight:15
}

});

export{Home}