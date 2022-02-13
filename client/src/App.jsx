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
      console.log(data);
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
      done: !done,
    };
    try {
      const res = await axios.put(`/api/note/${id}`, data);
      fetchNotes();
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPost();
  };

  return (
    <div className='container'>
      <h1>My Note App</h1>
      <form action='submit' onSubmit={onSubmit}>
        <label htmlFor='note'>
          Add Note
        </label>
        <input
          type='text'
          value={note}
          onChange={(e) => setNote(e.target.value)}
          id='note'
        />
        <i
          style={{ fontSize: '2rem' }}
          className='fa-solid fa-turn-down-left'
        />
      </form>

      <main className='box-shadow'>
        {notes.map((note) => (
          <div key={note.id} className='note'>
            <p >{note.note}</p>

            <div className='buttons'>
            {note.done ? (
              <input
                type='checkbox'
                value={note.done}
                // checked
                onChange={() => updateNote(note.id, note.note, note.done)}
              />
            ) : (
              <input
                type='checkbox'
                value={note.done}
                onChange={() => updateNote(note.id, note.note, note.done)}
              />
            )}
            <button onClick={() => deletePost(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
