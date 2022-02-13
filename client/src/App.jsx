import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('/api/note');
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPost = async () => {
    try {
      await axios.post('/api/note', { note: note });
      fetchNotes();
      setNote('');
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

  const updateNote = async (id, note, done) => {
    const data = {
      note: note,
      done: done,
    };
    try {
      await axios.put(`/api/note/${id}`, data);
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
            {note.done ? (
              <input
                type='checkbox'
                checked
                onChange={() => updateNote(note.id, note.note, note.done)}
              />
            ) : (
              <input
                type='checkbox'
                onChange={() => updateNote(note.id, note.note, note.done)}
              />
            )}
            <button onClick={() => deletePost(note.id)}>Delete</button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
