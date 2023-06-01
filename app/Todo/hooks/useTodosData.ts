import {useState, useCallback, useEffect} from 'react';
import {TaskItemData} from '../components';
import shortid from 'shortid';
import {getTasks, syncTasks} from '../services/task';

const useTodosData = () => {
  const [data, setData] = useState<TaskItemData[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [undoData, setUndoData] = useState<
    (TaskItemData & {position: number}) | null
  >(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // CRUD opeartions
  const handleCreateItem = useCallback(() => {
    const id = shortid.generate();
    setData(prev => [
      {
        id,
        subject: '',
        done: false,
      },
      ...prev,
    ]);
    setEditingItemId(id);
  }, []);

  const handleRemoveItem = useCallback((item: TaskItemData) => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item);
      return newData;
    });
  }, []);

  const handleToggleTaskItem = useCallback((item: TaskItemData) => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done,
      };
      return newData;
    });
  }, []);

  const handleChangeTaskItemSubject = useCallback(
    (item: TaskItemData, newSubject: string) => {
      setData(prevData => {
        const newData = [...prevData];
        const index = prevData.indexOf(item);
        newData[index] = {
          ...item,
          subject: newSubject,
        };
        return newData;
      });
    },
    [],
  );

  const handleUndoRemoveItem = useCallback(() => {
    setUndoData(prevUndoData => {
      if (prevUndoData === null) {
        return null;
      }
      const {position, done, id, subject} = prevUndoData;
      setData(prevData => {
        const newData: TaskItemData[] = [
          ...prevData.slice(0, position),
          {
            done,
            id,
            subject,
          },
          ...prevData.slice(position),
        ];
        return newData;
      });
      return null;
    });
  }, []);

  // Helpers functions

  const handleFinishEditingTaskItem = useCallback((_item: TaskItemData) => {
    setEditingItemId(null);
  }, []);

  const handlePressTaskItemLabel = useCallback((item: TaskItemData) => {
    setEditingItemId(item.id);
  }, []);

  const handleToastDisappear = useCallback(() => {
    setUndoData(null);
  }, []);

  const handleSetUndoData = useCallback(
    (item: TaskItemData, position: number) => {
      setUndoData(() => ({...item, position}));
    },
    [],
  );

  /**
   * Allow us to get our initial data state with our tasks saved on Async Storage
   */
  useEffect(() => {
    (async () => {
      const initialTasks = await getTasks();
      setData(initialTasks);
      setIsDataLoaded(true);
    })();
  }, []);

  /**
   * Allow us to sync our Async Storage with every change on data state
   */
  useEffect(() => {
    if (!isDataLoaded) {
      return;
    }
    (async () => {
      syncTasks(data);
    })();
  }, [data, isDataLoaded]);

  return {
    data,
    editingItemId,
    undoData,
    isDataLoaded,
    handleToggleTaskItem,
    handleChangeTaskItemSubject,
    handleFinishEditingTaskItem,
    handlePressTaskItemLabel,
    handleRemoveItem,
    handleSetUndoData,
    handleUndoRemoveItem,
    handleCreateItem,
    handleToastDisappear,
  };
};
export default useTodosData;
