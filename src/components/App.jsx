//import React from "react";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
//import notes from "../notes";
import CreateArea from "./CreateArea";
import { listItemIconClasses } from "@mui/material";

function App() {
  //defining STORAGE
  const STORAGE = 'MYKEEPER_APP';

  //1.3 Add new note to an array.
  const [notes, setNotes] = useState(()=>{
    return JSON.parse(localStorage.getItem(STORAGE)) || []
  });

  //add storage
  useEffect(()=>{
    localStorage.setItem(STORAGE, JSON.stringify(notes));
  },[notes])

  // 1.2 Pass the new note back to the App.
  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  //1.5 Take array and render seperate Note components for each item.

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
        <Note
          //key={noteItem.key}
          key={index}
          id={index}          
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          /> 
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
