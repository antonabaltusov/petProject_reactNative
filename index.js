/**
 * @format
 */

import {AppRegistry} from 'react-native';
import notifee, {EventType, TriggerType} from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';
notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log(detail);
  if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'later') {
    console.log('User pressed the "later" action.');
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 5000,
    };
    await notifee.createTriggerNotification(
      {...detail.notification, id: undefined},
      trigger,
    );
  }
});

AppRegistry.registerComponent(appName, () => App);
