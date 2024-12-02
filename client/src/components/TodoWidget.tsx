import React, { useState } from 'react';
import { Paper, TextField, Checkbox, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const WidgetContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
}));

const AddTodoForm = styled('form')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Plan weekend', completed: true },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  return (
    <WidgetContainer>
      <h2>Family Todo List</h2>
      <AddTodoForm onSubmit={handleAddTodo}>
        <TextField
          fullWidth
          size="small"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
          variant="outlined"
        />
        <IconButton type="submit" color="primary">
          <AddIcon />
        </IconButton>
      </AddTodoForm>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            dense
            sx={{
              borderRadius: '8px',
              mb: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => {
                setTodos(
                  todos.map((t) =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                  )
                );
              }}
            />
            <ListItemText
              primary={todo.text}
              sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'text.secondary' : 'text.primary',
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => {
                  setTodos(todos.filter((t) => t.id !== todo.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </WidgetContainer>
  );
};

export default TodoList;
