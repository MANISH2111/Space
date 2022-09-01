import React from "react";
import styled from 'styled-components/native'
import {  Text, TouchableOpacity,} from 'react-native'

type Props={
    isSelected?:Boolean
    onPres?:()=>void
}

const Select=styled(TouchableOpacity)<{isSelected?:Boolean}> `
    width:110px;
    height:40px;
    border:1px solid grey;
    text-align:center;
    justify-content:center;
    border-radius:20px;
`

const CText=styled(Text)<{isSelected?:Boolean}>`
font-size:15px;
font-weight:${(props) =>
		props.isSelected ? 'bold':'normal' };
text-align:center;
`
const FilterButton:React.ComponentType<Props>=({isSelected})=>{

    return(
        <Select  isSelected={isSelected}> 
            <CText>UPCOMING</CText>
        </Select>
    )
}

export {FilterButton}