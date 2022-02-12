import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('/api/note');
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addPost = async () => {
    try {
      const res = await axios.post('/api/note', { note: note });
      console.log(res);
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPost();
  };

  console.log(notes);
  return (
    <div className='App'>
      <form action='submit' onSubmit={onSubmit}>
        <label className='block' htmlFor='note'>
          Add Note
        </label>
        <input
          className='border-2 border-black rounded h-10'
          type='text'
          value={note}
          onChange={(e) => setNote(e.target.value)}
          id='note'
        />
      </form>

      <main>
        {notes.map((note) => (
          <p key={note.id}>{note.note}</p>
        ))}
      </main>
    </div>
  );
}

export default App;
