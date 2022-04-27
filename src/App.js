import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [isReload]);

  // 1. Function: To search Notes

  const searchNote = (e) => {
    e.preventDefault();
    const searchText = e.target.searchText?.value;

    fetch(`http://localhost:5000/notes?user_name=${searchText}`)
      .then((res) => res.json())
      .then((data) => setNotes(data));
  };

  // 2.Function: To Delete Note

  const deleteNote = (id) => {
    fetch(`http://localhost:5000/note/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsReload(!isReload)
      });
  };

  // 3.Function: To Update Note
  const updateNote = (e,id, closeModal) => {
    e.preventDefault()
    const user_name = e.target.user_name.value
    const text = e.target.text.value
    
    if (user_name, text) {
      fetch(`http://localhost:5000/note/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({user_name, text}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsReload(!isReload)
        closeModal()
      });
    }
  }

  // 4.Function: To POST Note

  const insertNote = (e) => {
    e.preventDefault();
    const user_name = e.target.user_name.value;
    const text = e.target.text.value;
    fetch("http://localhost:5000/note", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ user_name, text }),
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.reset();
        setIsReload(!isReload);
      });
  };

  return (
    <div className="App">
      <Header searchNote={searchNote} />
      <InputForm insertNote={insertNote} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard key={note._id} updateNote={updateNote} note={note} deleteNote={deleteNote} />
        ))}
      </div>
    </div>
  );
}

export default App;
