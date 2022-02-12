import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios.get('/api/note');
      setNotes(data);
    };
    fetchNotes();
  }, []);
  console.log(notes);
  return (
    <div className='App'>
      <form action='submit'>
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
    </div>
  );
}

export default App;

