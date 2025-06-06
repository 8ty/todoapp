# TaskMaster Pro - 智能任务管理应用

## 项目简介

TaskMaster Pro 是一个功能丰富的任务管理应用，集成了日程管理、待办事项、番茄钟、时间统计和AI辅助等功能，帮助用户更高效地管理时间和任务。

## 主要功能

- 📝 任务管理
  - 待办事项清单
  - AI辅助任务拆分
  - 智能任务分类
  - 优先级管理

- ⏰ 时间管理
  - 番茄钟计时器
  - 时间统计分析
  - 专注度追踪
  - 休息提醒

- 🤖 AI助手
  - 任务拆分建议
  - 时间管理优化
  - 智能提醒

## 技术栈

- 前端：React Native
- 状态管理：Redux Toolkit
- UI组件：React Native Paper
- 后端：Firebase
- AI集成：OpenAI API
- 数据库：Cloud Firestore
- CI/CD：GitHub Actions

## 项目结构

```
src/
  ├── components/       # 可复用组件
  ├── screens/          # 页面组件
  ├── navigation/       # 导航配置
  ├── services/         # API服务
  ├── store/            # Redux状态管理
  ├── utils/            # 工具函数
  └── theme/            # 主题配置
```

## 开发环境设置

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run start
```

3. 运行iOS/Android模拟器
```bash
npm run ios
# 或
npm run android
```

## GitHub Actions 工作流

本项目使用GitHub Actions进行自动化构建和部署：

- 代码提交时自动运行测试
- 合并到main分支时自动构建
- 发布新版本时自动部署到应用商店

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件