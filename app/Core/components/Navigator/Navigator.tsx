import {StyleSheet} from 'react-native';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Sidebar from '../Sidebar/Sidebar';
import {ScreenAbout} from '@app/About/screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ScreenMain} from '@app/Todo/screens';

const Drawer = createDrawerNavigator();

type SidebarProps = DrawerContentComponentProps;

const SidebarProp: React.FC<SidebarProps> = props => {
  return <Sidebar {...props} />;
};

const Navigator = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer.Navigator
        initialRouteName="Main"
        drawerContent={SidebarProp}
        screenOptions={{
          headerShown: false,
          drawerType: 'back',
          overlayColor: '#00000000',
        }}>
        <Drawer.Screen name="Main" component={ScreenMain} />
        <Drawer.Screen name="About" component={ScreenAbout} />
      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Navigator;
