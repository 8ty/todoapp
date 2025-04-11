import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store';

// 导入页面组件
import HomeScreen from './src/screens/HomeScreen';
import TaskScreen from './src/screens/TaskScreen';
import TimerScreen from './src/screens/TimerScreen';
import StatsScreen from './src/screens/StatsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: '任务管理' }} 
            />
            <Stack.Screen 
              name="Task" 
              component={TaskScreen} 
              options={{ title: '任务详情' }} 
            />
            <Stack.Screen 
              name="Timer" 
              component={TimerScreen} 
              options={{ title: '番茄钟' }} 
            />
            <Stack.Screen 
              name="Stats" 
              component={StatsScreen} 
              options={{ title: '统计分析' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}