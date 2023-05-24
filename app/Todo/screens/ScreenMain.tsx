import {Masthead, TodoList} from '../components';
import {Fab, VStack, useColorModeValue} from 'native-base';
import {AnimatedColorBox, CusotmToast} from '@app/Shared/components';
import {Navbar} from '@app/Core/components';
import Icon from 'react-native-vector-icons/Feather';
import {useTodosData} from '../hooks';

const ScreenMain = () => {
  const {
    data,
    editingItemId,
    undoData,
    handleToggleTaskItem,
    handleChangeTaskItemSubject,
    handleFinishEditingTaskItem,
    handlePressTaskItemLabel,
    handleRemoveItem,
    handleSetUndoData,
    handleUndoRemoveItem,
    handleCreateItem,
    handleToastDisappear,
  } = useTodosData();

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full">
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-25px"
        position="relative"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px">
        <Masthead
          title="What's up, Brandon!"
          image={require('../../Core/assets/masthead.png')}>
          <Navbar />
        </Masthead>
        <TodoList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          onPrevRemoveItem={handleSetUndoData}
          editingItemId={editingItemId}
        />
      </VStack>
      {undoData && (
        <CusotmToast
          onUndo={handleUndoRemoveItem}
          onDisappear={handleToastDisappear}
        />
      )}
      <Fab
        position="absolute"
        renderInPortal={false}
        zIndex={9000}
        size="sm"
        icon={<Icon name="plus" size={32} color="white" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={handleCreateItem}
      />
    </AnimatedColorBox>
  );
};
export default ScreenMain;
