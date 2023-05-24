import 'react-native-reanimated';
import 'react-native-gesture-handler';
import AppContainer from '@app/Core/components/AppContainer';
import {Navigator} from '@app/Core/components';

function App(): JSX.Element {
  return (
    <AppContainer>
      <Navigator />
    </AppContainer>
  );
}

export default App;
