import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, ProgressBar, Card, Title, Paragraph } from 'react-native-paper';

const TimerScreen = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25分钟
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (!isBreak) {
      setSessions(prev => prev + 1);
      setIsBreak(true);
      setTimeLeft(5 * 60); // 5分钟休息
    } else {
      setIsBreak(false);
      setTimeLeft(25 * 60);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? 1 - (timeLeft / (5 * 60))
    : 1 - (timeLeft / (25 * 60));

  return (
    <View style={styles.container}>
      <Card style={styles.timerCard}>
        <Card.Content>
          <Title style={styles.timerTitle}>
            {isBreak ? '休息时间' : '专注时间'}
          </Title>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          <ProgressBar progress={progress} style={styles.progress} />
          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              onPress={toggleTimer}
              style={styles.button}
            >
              {isRunning ? '暂停' : '开始'}
            </Button>
            <Button 
              mode="outlined" 
              onPress={resetTimer}
              style={styles.button}
            >
              重置
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Title>今日统计</Title>
          <Paragraph>完成专注次数: {sessions}</Paragraph>
          <Paragraph>总专注时间: {Math.floor(sessions * 25)} 分钟</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  timerCard: {
    marginBottom: 16,
  },
  timerTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  timer: {
    fontSize: 72,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  progress: {
    height: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    minWidth: 120,
  },
  statsCard: {
    marginTop: 16,
  },
});

export default TimerScreen;