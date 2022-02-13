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
      await axios.post('/api/note', { note: note });
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/note/${id}`);
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
          <div key={note.id}>
            <p>{note.note}</p>
            <input type='checkbox' />
            <button onClick={() => deletePost(note.id)}>Delete</button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
