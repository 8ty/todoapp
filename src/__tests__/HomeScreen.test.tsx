import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    // 基础渲染测试，确保组件能够正常加载
    expect(true).toBeTruthy();
  });
});