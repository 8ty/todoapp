import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, List, Divider } from 'react-native-paper';

const StatsScreen = () => {
  // 模拟统计数据
  const weeklyStats = {
    totalTasks: 15,
    completedTasks: 10,
    totalFocusTime: 720, // 分钟
    averageFocusTime: 45, // 分钟
    mostProductiveDay: '周三',
  };

  const recentSessions = [
    { id: 1, task: '项目报告', duration: 25, date: '2023-12-28' },
    { id: 2, task: '周会演示', duration: 50, date: '2023-12-28' },
    { id: 3, task: '邮件处理', duration: 25, date: '2023-12-27' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>本周概览</Title>
          <View style={styles.statsGrid}>
            <View style={styles.statsItem}>
              <Title>{weeklyStats.totalTasks}</Title>
              <Paragraph>总任务数</Paragraph>
            </View>
            <View style={styles.statsItem}>
              <Title>{weeklyStats.completedTasks}</Title>
              <Paragraph>已完成</Paragraph>
            </View>
            <View style={styles.statsItem}>
              <Title>{Math.floor(weeklyStats.totalFocusTime / 60)}h</Title>
              <Paragraph>专注时间</Paragraph>
            </View>
            <View style={styles.statsItem}>
              <Title>{weeklyStats.averageFocusTime}m</Title>
              <Paragraph>平均专注</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>效率分析</Title>
          <Paragraph style={styles.highlight}>
            本周最高效的日期是{weeklyStats.mostProductiveDay}
          </Paragraph>
          <Paragraph>
            任务完成率: {Math.round((weeklyStats.completedTasks / weeklyStats.totalTasks) * 100)}%
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>近期专注记录</Title>
          {recentSessions.map((session, index) => (
            <React.Fragment key={session.id}>
              <List.Item
                title={session.task}
                description={`${session.duration}分钟 · ${session.date}`}
                left={props => <List.Icon {...props} icon="clock-outline" />}
              />
              {index < recentSessions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>建议</Title>
          <List.Item
            title="提高专注时间"
            description="尝试增加每次专注时长到30分钟"
            left={props => <List.Icon {...props} icon="lightbulb-outline" />}
          />
          <Divider />
          <List.Item
            title="合理安排休息"
            description="每2-3个专注周期后安排较长休息"
            left={props => <List.Icon {...props} icon="coffee-outline" />}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  statsItem: {
    width: '50%',
    paddingVertical: 8,
    alignItems: 'center',
  },
  highlight: {
    marginVertical: 8,
    fontWeight: 'bold',
  },
});

export default StatsScreen;