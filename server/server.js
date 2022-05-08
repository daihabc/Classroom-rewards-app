const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT =  process.env.PORT || 4000;

const todos = require('./todos');
const inventories = require('./inventories');
const myRewards = require('./myrewards');
const sessions = require('./sessions');
const users = require('./users');
const points = require('./points');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if (username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  const userData = users.getUserData(username);
  if (!userData) {
    users.addUserData(username, todos.makeTodoList(), inventories.makeInventoryList(), myRewards.makeMyRewardsList(), points.makePoints());
  }
  res.cookie('sid', sid);
  res.json(users.getUserData(username).getTodos());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (sid) {
    res.clearCookie('sid');
  }
  if (username) {
    sessions.deleteSession(sid);
  }
  res.json({ username });
});

app.get('/api/todos', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    req.flash('info', 'Please enter username.')
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getTodos());
});

app.post('/api/todos', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { task, point } = req.body;
  if (!task || !point) {
    res.status(400).json({ error: 'input-missing' });
    return;
  }
  const userData = users.getUserData(username);
  const id = userData.addTodo(task, point);
  res.json(userData.getTodo(id));
});

app.get('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const userData = users.getUserData(username);
  const { id } = req.params;
  if (!userData.containTodo(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  res.json(userData.getTodo(id));
});

app.put('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const userData = users.getUserData(username);
  const { id } = req.params;
  const { task, done = false } = req.body;
  if (!task) {
    res.status(400).json({ error: 'required-task' });
    return;
  }
  if (!userData.containTodo(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  userData.updateTodo(id, { task, done });
  req.flash('info', 'Task completed');
  res.json(userData.getTodo(id));
});

app.patch('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { task, done, completionCount } = req.body;
  const userData = users.getUserData(username);
  if (!userData.containTodo(id) || !userData.canCompleteTodo(id)) {
    req.flash()
    res.status(404).json({ error: `unableToCompleteTask`, message: `Unable to complete task ${id}` });
    return;
  }
  userData.updateTodo(id, { task, done, completionCount });
  res.json(userData.getTodo(id));
});

app.get('/api/inventory', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getInventories());
});

app.get('/api/rewards', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getEarnedRewards());
});

app.post('/api/rewards', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { name, point } = req.body;
  const userData = users.getUserData(username);
  if (userData.getPoints() < point) {
    res.status(403).json({ error: 'insufficent points' });
    return;
  }
  const id = userData.addEarnedRewards(name, point);
  res.json(userData.getEarnedReward(id));
});

app.put('/api/rewards/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  if (!users.getUserData(username).containEarnedReward(id)) {
    res.status(403).json({ error: `noSuchReward` });
    return;
  }
  const usedRewardID = users.getUserData(username).useReward(id);
  res.json(users.getUserData(username).getUsedReward(usedRewardID));
});

app.get('/api/points', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getPoints());
});

app.put('/api/points', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { pointUpdate } = req.body;
  const availablePoints = users.getUserData(username).getPoints();
  if (availablePoints + pointUpdate < 0) {
    res.status(403).json({ error: 'insufficent points' });
    return;
  }
  users.getUserData(username).changePoints(pointUpdate);
  res.json(users.getUserData(username).getPoints());
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

