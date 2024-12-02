import express from 'express';
import Note from '../models/Note';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.body.createdBy,
    });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
});

export default router;
