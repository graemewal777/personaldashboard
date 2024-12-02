import React, { useState } from 'react';
import { Paper, TextField, IconButton, List, ListItem, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const WidgetContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
}));

const AddNoteForm = styled('form')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const NoteItem = styled(ListItem)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  backgroundColor: '#fff9c4',
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  padding: theme.spacing(2),
  position: 'relative',
  '&:hover': {
    backgroundColor: '#fff59d',
  },
}));

const NotesWidget = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Shopping List', content: 'Milk, Bread, Eggs' },
    { id: 2, title: 'Weekend Plans', content: 'Visit the park' },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() && newContent.trim()) {
      setNotes([...notes, { id: Date.now(), title: newTitle, content: newContent }]);
      setNewTitle('');
      setNewContent('');
    }
  };

  return (
    <WidgetContainer>
      <h2>Family Notes</h2>
      <AddNoteForm onSubmit={handleAddNote}>
        <TextField
          size="small"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title..."
          variant="outlined"
        />
        <TextField
          size="small"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Note content..."
          variant="outlined"
          fullWidth
        />
        <IconButton type="submit" color="primary">
          <AddIcon />
        </IconButton>
      </AddNoteForm>
      <List>
        {notes.map((note) => (
          <NoteItem key={note.id}>
            <Typography variant="h6" gutterBottom>
              {note.title}
            </Typography>
            <Typography variant="body2">{note.content}</Typography>
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={() => setNotes(notes.filter((n) => n.id !== note.id))}
            >
              <DeleteIcon />
            </IconButton>
          </NoteItem>
        ))}
      </List>
    </WidgetContainer>
  );
};

export default NotesWidget;
