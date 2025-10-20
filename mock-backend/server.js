const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Mock data
let tasks = [
  {
    id: "1",
    name: "Sample Task",
    owner: "Jishnu Snair",
    command: "echo Hello World",
    taskExecutions: [
      {
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        output: "Hello World\n"
      }
    ]
  }
];

// GET all tasks
app.get('/api/tasks', (req, res) => {
  const { id } = req.query;
  if (id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } else {
    res.json(tasks);
  }
});

// PUT create task
app.put('/api/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.json(task);
});

// DELETE task
app.delete('/api/tasks', (req, res) => {
  const { id } = req.query;
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Task deleted successfully' });
});

// GET search tasks
app.get('/api/tasks/search', (req, res) => {
  const { name } = req.query;
  const found = tasks.filter(t => 
    t.name.toLowerCase().includes(name.toLowerCase())
  );
  res.json(found);
});

// PUT execute task
app.put('/api/tasks/execute', (req, res) => {
  const { id } = req.query;
  const task = tasks.find(t => t.id === id);
  
  if (task) {
    const execution = {
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      output: `Mock execution output for: ${task.command}\nExit Code: 0\nOutput: Command executed successfully`
    };
    
    task.taskExecutions.push(execution);
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Mock backend running on http://localhost:${PORT}`);
  console.log(`📡 Endpoints available:`);
  console.log(`   GET  /api/tasks`);
  console.log(`   PUT  /api/tasks`);
  console.log(`   DEL  /api/tasks`);
  console.log(`   GET  /api/tasks/search`);
  console.log(`   PUT  /api/tasks/execute`);
});
