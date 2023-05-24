import React, {FC, memo, useRef} from 'react';
import {
  AnimatedTaskItem,
  TaskItemData,
} from '../AnimatedTodoItem/AnimatedTodoItem';
import {FlatList} from 'react-native-gesture-handler';
import {AnimatePresence} from 'moti';
import {StyleSheet} from 'react-native';

interface TaskListProps {
  data: Array<TaskItemData>;
  editingItemId: string | null;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, newSubject: string) => void;
  onFinishEditing: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
  onRemoveItem: (item: TaskItemData) => void;
  onPrevRemoveItem: (item: TaskItemData, position: number) => void;
}

const TodoList: FC<TaskListProps> = props => {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem,
    onPrevRemoveItem,
  } = props;
  const refScrollView = useRef(null);

  return (
    <AnimatePresence>
      <FlatList
        ref={refScrollView}
        data={data}
        initialNumToRender={20}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <AnimatedTaskItem
            key={item.id}
            data={item}
            position={index}
            simultaneousHandlers={refScrollView}
            isEditing={item.id === editingItemId}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
            onPrevRemove={onPrevRemoveItem}
          />
        )}
      />
    </AnimatePresence>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 88,
  },
});

export default memo(TodoList);
