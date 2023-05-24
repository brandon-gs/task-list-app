import React from 'react';
import {Dimensions, ViewProps} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  AnimateProps,
  FadeIn,
} from 'react-native-reanimated';
import {makeStyledComponent} from '@app/Core/utils';

const StyledView = makeStyledComponent<AnimateProps<ViewProps>>(Animated.View);

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  children: React.ReactNode;
  backView?: React.ReactNode;
  onSwipeLeft?: () => void;
  onPrevDeleteAnimation?: () => void;
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2;

const SwipeView = (props: Props) => {
  const {
    children,
    backView,
    onSwipeLeft,
    onPrevDeleteAnimation,
    simultaneousHandlers,
  } = props;
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(46.5);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = Math.max(-128, Math.min(0, event.translationX));
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH, {}, () => {
          onPrevDeleteAnimation && runOnJS(onPrevDeleteAnimation)();
          itemHeight.value = withTiming(
            0,
            {
              duration: 250,
            },
            () => {
              onSwipeLeft && runOnJS(onSwipeLeft)();
            },
          );
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const facadeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
    };
  });

  return (
    <StyledView w="full" style={containerStyle}>
      {backView && (
        <StyledView
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          entering={FadeIn.delay(350).duration(0)}>
          {backView}
        </StyledView>
      )}
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}>
        <StyledView style={facadeStyle}>{children}</StyledView>
      </PanGestureHandler>
    </StyledView>
  );
};

export default SwipeView;
