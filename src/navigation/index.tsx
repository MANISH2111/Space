import React from 'react';
import { Home,Details } from '../screens';

import { createStackNavigator } from '@react-navigation/stack';

export type MainStackParamList ={
    SpaceX_Launches:undefined;
    Details:undefined
}


const Stack=createStackNavigator<MainStackParamList>()

const MainStack=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name='SpaceX_Launches' component={Home} />
            <Stack.Screen name='Details' component={Details} />
        </Stack.Navigator>
    )
}

export {MainStack}