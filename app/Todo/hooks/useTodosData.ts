import {useState, useCallback} from 'react';
import {TaskItemData} from '../components';
import shortid from 'shortid';

const initialData: TaskItemData[] = [
  {
    id: shortid.generate(),
    subject: 'Buy movie tickets for Friday 1',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 2',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 3',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 4',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 5',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 6',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 7',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 8',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 9',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 10 ',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 11',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 12',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 13',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 14',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial 15',
    done: false,
  },
];

const useTodosData = () => {
  const [data, setData] = useState(initialData);
  const [undoData, setUndoData] = useState<
    (TaskItemData & {position: number}) | null
  >(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

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

  const handleFinishEditingTaskItem = useCallback((_item: TaskItemData) => {
    setEditingItemId(null);
  }, []);

  const handlePressTaskItemLabel = useCallback((item: TaskItemData) => {
    setEditingItemId(item.id);
  }, []);

  const handleRemoveItem = useCallback((item: TaskItemData) => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item);
      return newData;
    });
  }, []);

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

  const handleToastDisappear = useCallback(() => {
    setUndoData(null);
  }, []);

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

  const handleSetUndoData = useCallback(
    (item: TaskItemData, position: number) => {
      setUndoData(() => ({...item, position}));
    },
    [],
  );

  return {
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
  };
};
export default useTodosData;
