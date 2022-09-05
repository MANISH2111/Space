import {  FlatList,StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React,{useEffect, useCallback,useState, useRef} from 'react'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons ,Ionicons} from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { StackNavigationProp } from '@react-navigation/stack'

import { FlexCol, FlexRow } from '../../components/atom/Flex'
import { useAppDispatch,useAppSelector } from '../../hooks'
import { filteredLaunches, getLaunches, sortLaunches } from '../../store/actions'
import { MainStackParamList } from '../../navigation'
import { SpaceCard } from './component/SpaceCard';
import { Gutter } from '../../components/atom';
import { SORT_DATA, } from '../../data';
import { FilterButton } from './component/Filter';


const CText=styled(Text)<{isSelected?:Boolean}>`
font-size:15px;
font-weight:${(props) =>
		props.isSelected ? 'bold':'normal' };
text-align:center;
`
const RocketButton=styled(FlexRow)`
  width:65%;
  justify-content:space-between;
  flex-wrap:wrap;
  margin-left:10px;
`
const NText=styled(Text)<{fSize?:number,fWeight?:string,align?:string}>`
  font-size:${props=>props.fSize?`${props.fSize}px`:`14px`};
  font-weight:${props=>props.fWeight?`${props.fWeight}`:`normal`};
  text-align:${props=>props.align?props.align:`center`};
`


type Props = {
	navigation: StackNavigationProp<MainStackParamList, 'SpaceX_Launches'>;
}
type Sort={
  sort?:String
}
type Filter={
  rockets?:[]
}

const Home : React.ComponentType<Props>=({ navigation })=> {

      const dispatch=useAppDispatch()

      const data=useAppSelector(state=>state.launch.filteredLaunches)

const rocketData=(data: { rocket: { rocket_name: String; }; }[])=>{
      const x=data.map(y=>y.rocket.rocket_name) 
  return x
  }

 
  const rocketArray=rocketData(data)
  let x=Array.from (new Set(rocketArray))
 
console.log("CCCCCCCCCCCCCCCCCCCCC",x)
  
var rocketsDataArray = x.map(function (item:any,i) {
    return{
      id:i,
      name:item,
      selected:false
    }
  });
  console.log("VVVVVVVVVV",rocketsDataArray)
  
const SortObj:Sort={
  sort:'',
}

const FObj:Filter={
  rockets:[]
}

//const [rocketsFilter,setRocketsFilter]=useState(rocketsDataArray)


const [value,setValue]=useState<String>('date')

const [sortObj,setSortObj]=useState(SortObj)

const[isSelected,setIsSelected]=useState(false)

const[filterObj,setFilterObj]=useState(FObj)


const handleFilterSelect=(val: any,index: any)=>{

  let temp=rocketsDataArray.map((item: any,i: any)=>{
    return index===i?{...item,selected:val}:item
  })
 
  // setRocketsFilter(temp)
  // console.log('PPPPPPPPPPPPPPPP',rocketsFilter)
  setIsSelected(!isSelected)
  
  const newRocketFilters=temp.filter((x: { selected: Boolean; })=>x.selected===true).map((x: { name: any; })=>x.name)
  const obj=Object.assign({},filterObj,{
    rockets:newRocketFilters
 
  })
  setFilterObj(obj)
  console.log('NNNNNNNNNNN',newRocketFilters)
  dispatch(filteredLaunches(obj))
}


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

  useEffect(() => {
    //@ts-ignore
    dispatch(getLaunches());
    
  }, [dispatch]);


  return (
 
      <>
          <FlatList 
          data={data}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <SpaceCard 
            item={item} 
            key={item.flight_number} />
              )}              
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
          <View >
            <NText fSize={16} fWeight='bold'>Sort</NText>
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
                  
                      <Ionicons name="checkmark-sharp" size={24} color={isFocused?'#148512':'white'} />
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
          <View  >
          <NText fSize={16} fWeight='bold'>Filter</NText>
                <RocketButton>
                  {rocketsDataArray.map((item: { name: String; selected: Boolean ; },index:number)=>{
                    return ( 
                        <FilterButton
                        key={index} 
                        name={item.name} 
                        isSelected={rocketsDataArray[index].selected}
                        onPress={()=>handleFilterSelect(!item.selected,index)}
                        />
                        )
                   
                      })}
                  
                   </RocketButton>
                
          </View>

</BottomSheetModal>
</BottomSheetModalProvider>
</>
  
  )
}


const styles = StyleSheet.create({
icon:{
 paddingRight:15
},
bottomSheet:{
  paddingHorizontal:10,
 
},
rockets:{
  flexDirection:'row'
},
container:{

  justifyContent:'center',
  alignItems:'center',
  
}
});

export{Home}