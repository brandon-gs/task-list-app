import {FC, useEffect} from 'react';
import Animated, {
  Easing,
  createAnimatedPropAdapter,
  interpolateColor,
  processColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Path, Defs, ClipPath, G} from 'react-native-svg';
import AnimatedStroke from '../AnimatedStroke/AnimatedStroke';

const MARGIN = 10;
const vWidth = 64 + MARGIN;
const vHeight = 64 + MARGIN;
const checkMarkPath =
  'M15 31.1977C23.1081 36.4884 29.5946 43 29.5946 43C29.5946 43 37.5 25.5 69 1.5';
const outlineBoxPath =
  'M24 0.5H40C48.5809 0.5 54.4147 2.18067 58.117 5.88299C61.8193 9.58532 63.5 15.4191 63.5 24V40C63.5 48.5809 61.8193 54.4147 58.117 58.117C54.4147 61.8193 48.5809 63.5 40 63.5H24C15.4191 63.5 9.58532 61.8193 5.88299 58.117C2.18067 54.4147 0.5 48.5809 0.5 40V24C0.5 15.4191 2.18067 9.58532 5.88299 5.88299C9.58532 2.18067 15.4191 0.5 24 0.5Z';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CheckboxProps {
  checked: boolean;
  highlightColor?: string;
  checkmarkColor?: string;
  boxOutlineColor?: string;
}

const AnimatedCheckbox: FC<CheckboxProps> = ({
  checked,
  checkmarkColor = '#000000',
  highlightColor = '#ff0000',
  boxOutlineColor = '#000000',
}) => {
  const progress = useSharedValue<number>(0);

  const animatedBoxProps = useAnimatedProps(
    () => {
      const value = Easing.bezierFn(0.16, 1, 0.3, 1)(progress.value);
      return {
        stroke: interpolateColor(
          value,
          [0, 1],
          [boxOutlineColor, highlightColor],
          'RGB',
        ),
        fill: interpolateColor(
          value,
          [0, 1],
          ['#00000000', highlightColor],
          'RGB',
        ),
      };
    },
    [highlightColor, boxOutlineColor],
    createAnimatedPropAdapter(
      props => {
        if ('stroke' in props) {
          props.stroke = {
            type: 0,
            payload: processColor(props.stroke as number),
          };
        }
        if ('fill' in props) {
          props.fill = {type: 0, payload: processColor(props.fill as number)};
        }
      },
      ['fill', 'stroke'],
    ),
  );

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked ? 300 : 100,
      easing: Easing.linear,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <Svg
      viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN].join(' ')}>
      <Defs>
        <ClipPath id="clipPath">
          <Path
            fill="white"
            stroke="gray"
            strokeLinejoin="round"
            strokeLinecap="round"
            d={outlineBoxPath}
          />
        </ClipPath>
      </Defs>
      <AnimatedStroke
        progress={progress}
        d={checkMarkPath}
        stroke={highlightColor}
        strokeWidth={10}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeOpacity={checked || false ? 1 : 0}
      />
      <AnimatedPath
        d={outlineBoxPath}
        strokeWidth={7}
        strokeLinejoin="round"
        strokeLinecap="round"
        animatedProps={animatedBoxProps}
      />
      <G clipPath="url(#clipPath)">
        <AnimatedStroke
          progress={progress}
          d={checkMarkPath}
          stroke={checkmarkColor}
          strokeWidth={10}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeOpacity={checked || false ? 1 : 0}
        />
      </G>
    </Svg>
  );
};
export default AnimatedCheckbox;
