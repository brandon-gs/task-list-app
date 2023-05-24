import {memo, useCallback} from 'react';
import {PanGestureHandlerProps} from 'react-native-gesture-handler';
import TodoItem from '../TodoItem/TodoItem';
import {makeStyledComponent} from '@app/Core/utils';
import {View, MotiProps} from 'moti';

const StyledView = makeStyledComponent<MotiProps>(View);

export interface TaskItemData {
  id: string;
  subject: string;
  done: boolean;
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData;
  position: number;
  isEditing: boolean;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, newSubject: string) => void;
  onFinishEditing: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
  onRemove: (item: TaskItemData) => void;
  onPrevRemove: (item: TaskItemData, position: number) => void;
}

export const AnimatedTaskItemPure = (props: TaskItemProps) => {
  const {
    position,
    simultaneousHandlers,
    data,
    isEditing,
    onPrevRemove,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove,
  } = props;

  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data);
  }, [data, onToggleItem]);

  const handleChangeSubject = useCallback(
    (subject: string) => {
      onChangeSubject(data, subject);
    },
    [data, onChangeSubject],
  );

  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data);
  }, [data, onFinishEditing]);

  const handlePressLabel = useCallback(() => {
    onPressLabel(data);
  }, [data, onPressLabel]);

  const handleRemove = useCallback(() => {
    onRemove(data);
  }, [data, onRemove]);

  const handlePrevRemove = useCallback(() => {
    onPrevRemove(data, position);
  }, [data, position, onPrevRemove]);

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}>
      <TodoItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
        onPrevRemove={handlePrevRemove}
      />
    </StyledView>
  );
};

export const AnimatedTaskItem = memo(AnimatedTaskItemPure);
