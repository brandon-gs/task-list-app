import {useDrawerProgress, useDrawerStatus} from '@react-navigation/drawer';
import {Pressable, View} from 'native-base';
import {FC} from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

const AnimatedView = Animated.createAnimatedComponent(View);

interface ButtonCreateTodoProps {
  onPress: () => void;
}

const ButtonCreateTodo: FC<ButtonCreateTodoProps> = ({onPress}) => {
  const isDrawerOpen = useDrawerStatus() === 'open';
  const progress = useDrawerProgress();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      right: interpolate(progress.value, [0, 1], [16, 40]),
    };
  }, [isDrawerOpen]);

  return (
    <Pressable onPress={onPress}>
      <AnimatedView
        borderRadius="full"
        justifyContent={'center'}
        alignItems={'center'}
        bg="blue.500"
        position={'absolute'}
        w="16"
        h="16"
        bottom={4}
        style={animatedStyle}>
        <Icon name="plus" size={32} color="white" />
        {/* <Fab
        shadow={7}
        variant="unstyled"
        _dark={{
          bg: 'blue.500',
          _hover: {
            bg: 'blue.800',
          },
          _pressed: {
            bg: 'blue.800',
          },
        }}
        _light={{
          bg: 'blue.500',
          _hover: {
            bg: 'blue.800',
          },
          _pressed: {
            bg: 'blue.800',
          },
        }}
        p={3}
        icon={<Icon name="plus" size={24} color="white" />}
        onPress={() => null}
      /> */}
      </AnimatedView>
    </Pressable>
  );
};
export default ButtonCreateTodo;
