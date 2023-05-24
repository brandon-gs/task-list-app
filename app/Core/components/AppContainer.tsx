import {theme} from '@app/Core/utils';
import {NativeBaseProvider} from 'native-base';
import {FC, PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const AppContainer: FC<PropsWithChildren> = ({children}) => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>{children}</NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
