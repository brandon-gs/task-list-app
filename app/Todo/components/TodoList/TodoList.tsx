import React, {FC, memo, useRef} from 'react';
import {
  AnimatedTaskItem,
  TaskItemData,
} from '../AnimatedTodoItem/AnimatedTodoItem';
import {FlatList} from 'react-native-gesture-handler';
import {AnimatePresence, MotiProps, View} from 'moti';
import {StyleSheet} from 'react-native';
import {VStack, Text, Skeleton, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import {makeStyledComponent} from '@app/Core/utils';

const StyledView = makeStyledComponent<MotiProps>(View);

const skeletonArray: number[] = [...new Array(15).keys()];

interface TaskListProps {
  data: Array<TaskItemData>;
  isLoading: boolean;
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
    isLoading,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem,
    onPrevRemoveItem,
  } = props;
  const refScrollView = useRef(null);

  // Loading State
  if (isLoading) {
    return (
      <AnimatePresence>
        <VStack px={'8px'} pt={'8px'}>
          {skeletonArray.map(item => (
            <HStack pb={'8px'} key={`skeleton-todo-item-${item}`}>
              <Skeleton w={'40px'} h={'40px'} mr={'8px'} borderRadius={'md'} />
              <Skeleton borderRadius="md" flex={1} />
            </HStack>
          ))}
        </VStack>
      </AnimatePresence>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <AnimatePresence>
        <StyledView
          from={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{opacity: 0}}
          transition={{
            type: 'timing',
            duration: 500,
          }}>
          <VStack
            justifyContent="center"
            alignItems="center"
            py={'40px'}
            px={'16px'}>
            <Icon name="meh" size={48} color="#171717" />
            <Text fontSize="2xl" mt="16px">
              Lista vacía
            </Text>
            <Text mt="4px" color="gray.500" fontSize="md" textAlign="center">
              Aún no tienes tareas creadas en este momento
            </Text>
          </VStack>
        </StyledView>
      </AnimatePresence>
    );
  }

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
