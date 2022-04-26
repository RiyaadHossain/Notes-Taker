import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);
  
// 1. Function: To search Notes 
  
  const searchNote = e => {
    e.preventDefault()
    const searchText = e.target.searchText?.value
    
      fetch(`http://localhost:5000/notes?user_name=${searchText}`)
        .then((res) => res.json())
        .then((data) => setNotes(data));
    
  }

  // 2.Function: To Delete Note 

  /*
3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
 */

  /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */

  return (
    <div className="App">
      <Header searchNote={searchNote} />
      <InputForm />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default App;
