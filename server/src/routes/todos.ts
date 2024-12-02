import express from 'express';
import Todo from '../models/Todo';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      createdBy: req.body.createdBy,
    });
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

export default router;
