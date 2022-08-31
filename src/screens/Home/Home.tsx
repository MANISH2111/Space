import { Button, FlatList,StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React,{useEffect, useCallback,useState, useRef, useMemo} from 'react'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FlexCol, FlexRow } from '../../components/atom/Flex'
import { useAppDispatch,useAppSelector } from '../../hooks'
import { getLaunches } from '../../store/actions'
import { MainStackParamList } from '../../navigation'
import { SpaceCard } from './component/SpaceCard';

import { StackNavigationProp } from '@react-navigation/stack'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Gutter } from '../../components/atom';
import { SortModal } from './component/sortModal';

const Wrapper = styled(FlexCol)`
	padding: 5px;
	height: 100%;
	flex: 1;
	background-color: 'grey';
  justify-content:center;
  align-items:center;
`


type Props = {
	navigation: StackNavigationProp<MainStackParamList, 'SpaceX_Launches'>;
}

const Home : React.ComponentType<Props>=({ navigation })=> {

const [sortShow,setShortShow]=useState(false)
const [filterShow,setFilterShow]=useState(false)

const bottomSheetRef = useRef<BottomSheet>(null);

const onSortShow=useCallback(async()=>{
  bottomSheetRef.current?.expand();
},[])
const handleClosePress = useCallback(() => {
  bottomSheetRef.current?.close();
}, []);
const snapPoints = useMemo(() => ['25%', '50%'], []);



const dispatch=useAppDispatch()

const data=useAppSelector(state=>state.launch.launches)

React.useLayoutEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        
                <FlexRow>
                  <TouchableOpacity onPress={onSortShow} style={styles.icon} >
                        <MaterialCommunityIcons name="sort" size={22} color="grey" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{}} style={styles.icon} >
                         <FontAwesome name="filter" size={22} color="grey" />
                  </TouchableOpacity>
                      
                </FlexRow>
      ),
    });
  }, [navigation]);


const RenderCard = useCallback(({ item }:any) => {
		return <SpaceCard item={item} />;
	}, []);

useEffect(() => {
  //@ts-ignore
  dispatch(getLaunches());
  
}, [dispatch]);

  return (
     <Wrapper>
          <FlatList 
          data={data}
          renderItem={({ item }) => (
                      <RenderCard 
                      key={item.flight_number}
                      item={item} />)}              
                      numColumns={2}
          />

<BottomSheet
					ref={bottomSheetRef}
					index={1}
					snapPoints={snapPoints}
					enableContentPanningGesture={false}
					enableHandlePanningGesture={false}
					enableOverDrag={false}
					enablePanDownToClose={false}
					handleIndicatorStyle={{
						width: 0,
					}}
					style={styles.bottomSheet}
				>
					<View style={styles.bottomSheet}>
        
					</View>
				</BottomSheet>

    </Wrapper>
  )
}


const styles = StyleSheet.create({
  

icon:{
paddingRight:15
},
bottomSheet:{
  paddingHorizontal:32
},
container:{
  flex:1
}
});

export{Home}