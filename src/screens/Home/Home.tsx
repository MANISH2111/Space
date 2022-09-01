import { Button, FlatList,StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React,{useEffect, useCallback,useState, useRef} from 'react'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons ,Ionicons} from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { StackNavigationProp } from '@react-navigation/stack'

import { FlexCol, FlexRow } from '../../components/atom/Flex'
import { useAppDispatch,useAppSelector } from '../../hooks'
import { getLaunches, sortLaunches } from '../../store/actions'
import { MainStackParamList } from '../../navigation'
import { SpaceCard } from './component/SpaceCard';
import { Gutter } from '../../components/atom';
import { SORT_DATA } from '../../data';
import { FilterButton } from './component/Filter';

const Wrapper = styled(FlexCol)`
	padding: 5px;
	height: 100%;
	flex: 1;
  background-color:#ffffff;
  justify-content:center;
  align-items:center;
`
const CText=styled(Text)<{isSelected?:Boolean}>`
font-size:15px;
font-weight:${(props) =>
		props.isSelected ? 'bold':'normal' };
text-align:center;
`


type Props = {
	navigation: StackNavigationProp<MainStackParamList, 'SpaceX_Launches'>;
}
type Sort={
  sort?:String
}

const Home : React.ComponentType<Props>=({ navigation })=> {

  

const SortObj:Sort={
  sort:'',
}
const FilterO={
  
  upcoming:[],
}

const [value,setValue]=useState<String>('name')
const [sortObj,setSortObj]=useState(SortObj)
const[filterObj,setFilterObj]=useState(null)

const handleSort = ( val:String) => {
  const obj = Object.assign({}, sortObj, {
      sort: val,
  });
  setSortObj(obj);
    //@ts-ignore
  dispatch(sortLaunches(obj));
  setValue(val);
}



  const bottomSortSheetModalRef = useRef<BottomSheetModal>(null);

  const bottomFilterSheetModalRef=useRef<BottomSheetModal>(null);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSortSheetModalRef.current?.present();
  }, []);
  const handleSortSheetChanges = useCallback((index: number) => {
    bottomSortSheetModalRef.current?.snapToIndex(index);
  }, []);

  const handlePresentFiterPress = useCallback(() => {
    bottomFilterSheetModalRef.current?.present();
  }, []);
  const handleFilterSheetChanges = useCallback((index: number) => {
    bottomFilterSheetModalRef.current?.snapToIndex(index);
  }, []);


const dispatch=useAppDispatch()

const data=useAppSelector(state=>state.launch.filteredLaunches)

React.useLayoutEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        
                <FlexRow>
                        <TouchableOpacity onPress={handlePresentModalPress} >
                        <MaterialCommunityIcons style={styles.icon} name="sort" size={22} color="grey" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePresentFiterPress} >
                         <FontAwesome   style={styles.icon} name="filter" size={22} color="grey" />
                         </TouchableOpacity>
                </FlexRow>
      ),
    });
  }, [navigation]);


const RenderCard = useCallback(({ item }:any) => {
		return <SpaceCard item={item} />;
	}, []);

  const renderBackdrop = useCallback(
    (    props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );


  const FilterCard=useCallback(({isSelcted}:any)=>{
        return <FilterButton />
  },[])

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

<BottomSheetModalProvider>
<BottomSheetModal
          backdropComponent={renderBackdrop}
          ref={bottomSortSheetModalRef}
          index={1}
          snapPoints={[1,'25%']}
          onChange={handleSortSheetChanges}
        >
          <View style={styles.container}>
            <CText>Sort</CText>
           <Gutter spacing={1.3}/>

            <FlexCol justifyContent='center' alignItems='center' >
            
            {SORT_DATA.map((item,index)=>{
              const name:String=item.value
              const isFocused=value===name
              return(
              <TouchableOpacity key={index} onPress={()=>handleSort(name)}>
                  <FlexRow >
                   <CText isSelected={isFocused}>{item.name}</CText>
                     <Gutter hSpacing={10}/>
                      <Ionicons name="checkmark-sharp" size={24} color={isFocused?'#148512':'gray'} />
                   </FlexRow>
                  <Gutter spacing={1.3}/>
            </TouchableOpacity>) 
             })}
            </FlexCol> 
          </View>

</BottomSheetModal>
</BottomSheetModalProvider>

<BottomSheetModalProvider>
<BottomSheetModal
          ref={bottomFilterSheetModalRef}
          backdropComponent={renderBackdrop}
          index={1}
          snapPoints={[1,'65%']}
          onChange={handleFilterSheetChanges}
        >
          <View style={styles.container}>
                <Text>Filter 🎉</Text>
                <FilterButton/>
          </View>

</BottomSheetModal>
</BottomSheetModalProvider>
      
    </Wrapper>
  )
}


const styles = StyleSheet.create({
  

icon:{
paddingRight:15
},
bottomSheet:{
  paddingHorizontal:10,
 
},
container:{
  flex:1,
  position:'relative',
  alignItems:'center',
  justifyContent:'center'
},

});

export{Home}