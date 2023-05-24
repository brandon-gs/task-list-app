import {Alert, Pressable, Text} from 'native-base';
import {FC, useCallback, useEffect} from 'react';
import {Dimensions} from 'react-native';
import Animated, {
  FadeIn,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedAlert = Animated.createAnimatedComponent(Alert);

const SCREEN_WIDTH = Dimensions.get('screen').width - 16;

interface CustomToastProps {
  onUndo: () => void;
  onDisappear: () => void;
}

const CustomToast: FC<CustomToastProps> = ({onUndo, onDisappear}) => {
  const opacity = useSharedValue(1);

  const animatedAlertStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      zIndex: 100000,
    };
  });

  const handleOnUndo = useCallback(() => {
    opacity.value = withTiming(0, {duration: 150}, () => {
      runOnJS(onUndo)();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onUndo]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timeout) {
        clearTimeout(timeout);
      }
      opacity.value = withTiming(0, {duration: 150}, () => {
        runOnJS(onDisappear)();
      });
    }, 10 * 1000);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDisappear]);

  return (
    <AnimatedAlert
      entering={FadeIn.duration(350)}
      position={'absolute'}
      bottom={'10px'}
      right={'0px'}
      zIndex={100000}
      style={animatedAlertStyles}
      mb={'8px'}
      mx={'8px'}
      w={SCREEN_WIDTH}
      maxW="100%"
      flexDirection="row"
      justifyContent="space-between"
      bgColor="gray.700">
      <Text color="white">1 Tarea eliminada</Text>
      <Pressable
        onPress={handleOnUndo}
        px={'16px'}
        py={'8px'}
        _hover={{
          bg: 'gray.600',
        }}
        _pressed={{
          bg: 'gray.600',
        }}>
        <Text color="blue.400" fontWeight={'bold'}>
          Deshacer
        </Text>
      </Pressable>
    </AnimatedAlert>
  );
};
export default CustomToast;
