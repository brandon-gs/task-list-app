import AsyncStorage from '@react-native-async-storage/async-storage';
import {TaskItemData} from '../components';
const TASK_KEY = 'TASK_LIST';

const getTasksFromAsyncStorage = async (): Promise<TaskItemData[]> => {
  try {
    const currentTasks = await AsyncStorage.getItem(TASK_KEY);
    return currentTasks !== null ? JSON.parse(currentTasks) : [];
  } catch (error) {
    return [];
  }
};

const setTaskOnAsyncStorage = async (tasks: TaskItemData[]) => {
  try {
    await AsyncStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  } catch (error) {
    return;
  }
};

export const getTasks = async () => {
  return await getTasksFromAsyncStorage();
};

export const syncTasks = async (tasks: TaskItemData[]) => {
  await setTaskOnAsyncStorage(tasks);
};
