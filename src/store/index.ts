import { configureStore } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义任务类型
interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
  subtasks?: {
    id: number;
    title: string;
    estimated: string;
    completed: boolean;
  }[];
}

// 定义计时器状态
interface TimerState {
  isRunning: boolean;
  timeLeft: number;
  isBreak: boolean;
  sessions: number;
}

// 定义统计数据
interface Stats {
  totalTasks: number;
  completedTasks: number;
  totalFocusTime: number;
  dailyStats: {
    date: string;
    focusTime: number;
    completedTasks: number;
  }[];
}

// 定义根状态
interface RootState {
  tasks: Task[];
  timer: TimerState;
  stats: Stats;
}

// 创建任务切片
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    toggleTaskComplete: (state, action: PayloadAction<number>) => {
      const task = state.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

// 创建计时器切片
const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    isRunning: false,
    timeLeft: 25 * 60,
    isBreak: false,
    sessions: 0,
  } as TimerState,
  reducers: {
    setTimerRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
    toggleBreak: (state) => {
      state.isBreak = !state.isBreak;
      state.timeLeft = state.isBreak ? 5 * 60 : 25 * 60;
    },
    incrementSessions: (state) => {
      state.sessions += 1;
    },
  },
});

// 创建统计切片
const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    totalTasks: 0,
    completedTasks: 0,
    totalFocusTime: 0,
    dailyStats: [],
  } as Stats,
  reducers: {
    updateStats: (state, action: PayloadAction<Partial<Stats>>) => {
      return { ...state, ...action.payload };
    },
    addFocusTime: (state, action: PayloadAction<number>) => {
      state.totalFocusTime += action.payload;
    },
    addDailyStats: (state, action: PayloadAction<{
      date: string;
      focusTime: number;
      completedTasks: number;
    }>) => {
      const existingIndex = state.dailyStats.findIndex(
        stat => stat.date === action.payload.date
      );
      if (existingIndex !== -1) {
        state.dailyStats[existingIndex] = action.payload;
      } else {
        state.dailyStats.push(action.payload);
      }
    },
  },
});

// 导出 actions
export const { addTask, updateTask, toggleTaskComplete } = tasksSlice.actions;
export const { setTimerRunning, setTimeLeft, toggleBreak, incrementSessions } = timerSlice.actions;
export const { updateStats, addFocusTime, addDailyStats } = statsSlice.actions;

// 创建 store
export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    timer: timerSlice.reducer,
    stats: statsSlice.reducer,
  },
});

// 导出类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;