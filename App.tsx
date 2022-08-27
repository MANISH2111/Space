import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import {store} from './src/store'
import { MainStack } from './src/navigation';

export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Text>SpaceX</Text>
      <StatusBar style="auto" />
           <MainStack/>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
