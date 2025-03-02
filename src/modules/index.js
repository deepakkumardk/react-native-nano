import getDatabase from './database/RealmDatabase';
import getNotification from './notifications/Notifications';

import getPermissionInstance from './permissions/Permissions';
import getSession from './session/Session';
import {
  Dimensions,
  Alert,
  Linking,
  Share,
  Keyboard,
  Appearance,
  AppState,
  InteractionManager,
  PanResponder,
  Platform,
  PixelRatio,
  BackHandler,
  LayoutAnimation,
  UIManager,
  Animated,
  Easing,
  Systrace,
  Vibration,
  Settings,
  AccessibilityInfo,
} from 'react-native';
import ImagePicker from './imagepicker/ImagePicker';
import DeviceInfo from './deviceinfo/DeviceInfo';
import Toast from 'react-native-toast-message';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const deviceDimensions = {
  windowHeight: WINDOW_HEIGHT,
  windowWidth: WINDOW_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  screenWidth: SCREEN_WIDTH,
};

const getModuleParams = ({callBack}) => {
  const database = getDatabase(callBack);
  database.init();
  const notifications = getNotification();
  const permissions = getPermissionInstance();
  const session = getSession();

  const moduleParameters = {
    database,
    notifications,
    permissions,
    session,
    dimensions: deviceDimensions,
    deviceInfo: DeviceInfo,
    alert: Alert,
    linking: Linking,
    share: Share,
    keyboard: Keyboard,
    appearance: Appearance,
    appState: AppState,
    interactionManager: InteractionManager,
    panResponder: PanResponder,
    platform: Platform,
    pixelRatio: PixelRatio,
    backHandler: BackHandler,
    layoutAnimation: LayoutAnimation,
    uiManager: UIManager,
    animated: Animated,
    easing: Easing,
    systrace: Systrace,
    vibration: Vibration,
    settings: Settings,
    accessibilityInfo: AccessibilityInfo,
    toast: Toast,
  };
  if (ImagePicker) {
    moduleParameters['imagePicker'] = ImagePicker;
  }
  return moduleParameters;
};
export default getModuleParams;
