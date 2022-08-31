import React from 'react';
import { StyleSheet,Image ,Text,  View,TouchableOpacity} from 'react-native'
import styled from 'styled-components/native';
import { navigate } from '../../../services'


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

const styles=StyleSheet.create({
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
})

export {SpaceCard}