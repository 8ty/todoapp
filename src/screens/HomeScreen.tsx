import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  FAB, 
  List,
  useTheme 
} from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const tasks = [
    { id: 1, title: '完成项目报告', priority: '高', dueDate: '2023-12-31' },
    { id: 2, title: '准备周会演示', priority: '中', dueDate: '2023-12-30' },
    { id: 3, title: '回复重要邮件', priority: '低', dueDate: '2023-12-29' },
  ];

  return (
    <View style={styles.container}>
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Title>今日概览</Title>
          <Paragraph>待完成任务: 3</Paragraph>
          <Paragraph>已完成任务: 2</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.quickActions}>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Timer')}
          style={styles.actionButton}
        >
          开始专注
        </Button>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Stats')}
          style={styles.actionButton}
        >
          查看统计
        </Button>
      </View>

      <Title style={styles.listTitle}>待办任务</Title>
      {tasks.map(task => (
        <List.Item
          key={task.id}
          title={task.title}
          description={`优先级: ${task.priority} | 截止日期: ${task.dueDate}`}
          left={props => <List.Icon {...props} icon="checkbox-blank-outline" />}
          onPress={() => navigation.navigate('Task', { taskId: task.id })}
        />
      ))}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Task', { mode: 'create' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  summaryCard: {
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  listTitle: {
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;