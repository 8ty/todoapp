import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  TextInput, 
  Button, 
  Card, 
  Title, 
  Chip,
  List,
  Divider,
  Portal,
  Dialog,
} from 'react-native-paper';

const TaskScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('中');
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [subtasks, setSubtasks] = useState([]);

  const priorities = ['低', '中', '高'];

  const handleSave = () => {
    // TODO: 保存任务到 Redux store 和后端
    navigation.goBack();
  };

  const handleAIAnalysis = () => {
    // 模拟AI分析结果
    const aiSuggestedSubtasks = [
      { id: 1, title: '收集相关资料', estimated: '30分钟' },
      { id: 2, title: '整理关键点', estimated: '45分钟' },
      { id: 3, title: '撰写初稿', estimated: '2小时' },
      { id: 4, title: '审核和修改', estimated: '1小时' },
    ];
    setSubtasks(aiSuggestedSubtasks);
    setShowAIDialog(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="任务标题"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            label="任务描述"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
          <TextInput
            label="截止日期"
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="YYYY-MM-DD"
            style={styles.input}
          />
          <Title style={styles.sectionTitle}>优先级</Title>
          <View style={styles.priorityContainer}>
            {priorities.map(p => (
              <Chip
                key={p}
                selected={priority === p}
                onPress={() => setPriority(p)}
                style={styles.chip}
              >
                {p}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleAIAnalysis}
        style={styles.aiButton}
      >
        AI任务拆分分析
      </Button>

      {subtasks.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>子任务列表</Title>
            {subtasks.map((subtask, index) => (
              <React.Fragment key={subtask.id}>
                <List.Item
                  title={subtask.title}
                  description={`预计耗时: ${subtask.estimated}`}
                  left={props => (
                    <List.Icon {...props} icon="checkbox-blank-outline" />
                  )}
                />
                {index < subtasks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card.Content>
        </Card>
      )}

      <Button
        mode="contained"
        onPress={handleSave}
        style={styles.saveButton}
      >
        保存任务
      </Button>

      <Portal>
        <Dialog
          visible={showAIDialog}
          onDismiss={() => setShowAIDialog(false)}
        >
          <Dialog.Title>AI分析完成</Dialog.Title>
          <Dialog.Content>
            <Title>任务已被拆分为{subtasks.length}个子任务</Title>
            <Title style={styles.estimateTitle}>
              预计总耗时: 4小时15分钟
            </Title>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowAIDialog(false)}>确定</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
  aiButton: {
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 16,
    marginBottom: 32,
  },
  estimateTitle: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default TaskScreen;