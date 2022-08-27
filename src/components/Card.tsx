import React from 'react'
import {ViewStyle} from 'react-native'
import styled from 'styled-components/native'

export type CardProps={
    style?:ViewStyle,
    isSuccess:boolean,   
}

export type Props={
    image:String,
}

const Container =styled.View`
width:150px ;
height:150px;
position:absolute;
flex:1;
border-radius:15px;
overflow:hidden;
`

const Image=styled.Image`
 position:absolute;
 height:100%;
 width:100%
`
const  SpaceCard:React.ComponentType<Props>=({image,...rest})=>{
    return(
        <Container {...rest}>
        <Image source={{uri:image}} />
        </Container>
    )
}

export {SpaceCard}

