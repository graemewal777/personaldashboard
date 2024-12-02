import express from 'express';
import Event from '../models/Event';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ start: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

router.post('/', async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      description: req.body.description,
      createdBy: req.body.createdBy,
    });
    const savedEvent = await event.save();
    res.json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        description: req.body.description,
      },
      { new: true }
    );
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
});

export default router;
