import {FC, memo, useCallback} from 'react';
import {PanGestureHandlerProps} from 'react-native-gesture-handler';
import {
  AnimatedCheckbox,
  AnimatedLabel,
  SwipeableView,
} from '@app/Shared/components';
import {
  Box,
  HStack,
  Input,
  Pressable,
  useColorModeValue,
  useToken,
} from 'native-base';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface TodoItemProps extends PanGestureHandlerProps {
  isEditing: boolean;
  isDone: boolean;
  onToggleCheckbox?: () => void;
  onPressLabel?: () => void;
  onRemove?: () => void;
  onPrevRemove?: () => void;
  onChangeSubject?: (subject: string) => void;
  onFinishEditing?: () => void;
  subject: string;
}

const TodoItem: FC<TodoItemProps> = props => {
  const {
    isEditing,
    isDone,
    subject,
    simultaneousHandlers,
    onToggleCheckbox,
    onPressLabel,
    onRemove,
    onPrevRemove,
    onChangeSubject,
    onFinishEditing,
  } = props;

  const highlightColor = useToken<string>(
    'colors',
    useColorModeValue('blue.500', 'blue.400'),
  );
  const boxStroke = useToken<string>(
    'colors',
    useColorModeValue('muted.300', 'muted.500'),
  );

  const checkmarkColor = useToken<string>(
    'colors',
    useColorModeValue('white', 'white'),
  );

  const activeTextColor = useToken<string>(
    'colors',
    useColorModeValue('darkText', 'lightText'),
  );
  const doneTextColor = useToken<string>(
    'colors',
    useColorModeValue('muted.400', 'muted.600'),
  );

  const handleChangeSubject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text);
    },
    [onChangeSubject],
  );

  return (
    <SwipeableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      onPrevDeleteAnimation={onPrevRemove}
      backView={
        <Box
          w="full"
          h="full"
          maxH={'46.3px'}
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
          pr={4}>
          <Icon color="white" name="trash-2" size={24} />
        </Box>
      }>
      <HStack
        alignItems="center"
        w="full"
        h={'46.5px'}
        px={4}
        py={2}
        bg={useColorModeValue('warmGray.50', 'primary.900')}>
        <Box w={30} h={30} mr={2}>
          <Pressable onPress={onToggleCheckbox} android_disableSound>
            <AnimatedCheckbox
              highlightColor={highlightColor}
              checkmarkColor={checkmarkColor}
              boxOutlineColor={boxStroke}
              checked={isDone}
            />
          </Pressable>
        </Box>
        {isEditing ? (
          <Input
            placeholder="Task"
            value={subject}
            variant="unstyled"
            fontSize={19}
            px={1}
            py={0}
            autoFocus
            blurOnSubmit
            onChange={handleChangeSubject}
            onBlur={onFinishEditing}
          />
        ) : (
          <AnimatedLabel
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            strikethrough={isDone}
            onPress={onPressLabel}>
            {subject}
          </AnimatedLabel>
        )}
      </HStack>
    </SwipeableView>
  );
};

export default memo(TodoItem);
