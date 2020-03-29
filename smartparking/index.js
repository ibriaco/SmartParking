import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';

import configureStore from './store/store';

const store = configureStore()

const RNRedux = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);

//AppRegistry.registerComponent('smartparking', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('smartparking', { rootTag });
}
