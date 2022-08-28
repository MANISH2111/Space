import { Provider } from 'react-redux'
import {store} from './src/store'
import { MainStack } from './src/navigation';
import LoadNavigator from './src/Setup/load-navigator';

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  return (

    <Provider store={store}>
      <SafeAreaProvider>
  
     <LoadNavigator>
       <MainStack/>
     </LoadNavigator>
   
    </SafeAreaProvider>
    </Provider>

  );
}

