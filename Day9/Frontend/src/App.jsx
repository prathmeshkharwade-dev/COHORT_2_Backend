import { useState, useEffect } from 'react'
import axios from "axios"

function App() {

  const [ notes, setNotes ] = useState([])

  function fetchNotes(){
     axios.get('https://cohort-2-backend-1-zam7.onrender.com/api/notes')
      .then((res)=>{
        setNotes(res.data.notes)
       })
  }

  useEffect(() => {
    fetchNotes()
  },  [])


  function handleSubmit(e){
    e.preventDefault()

    const {title ,description} = e.target.elements

    console.log (title.value, description.value)

    axios.post("https://cohort-2-backend-1-zam7.onrender.com/api/notes",{
      title: title.value,
      description: description.value
    })
    .then(res=>{
      console.log(res.data)

      fetchNotes()
      
    })
  }

  function handleDeleteNote(noteID){
      axios.delete('https://cohort-2-backend-1-zam7.onrender.com/api/notes/' + noteID)
      .then(res=> {
        console.log(res.data);
        fetchNotes()
        
      })
  }
  function handleUpdateNote(noteID){
    axios.update('https://cohort-2-backend-1-zam7.onrender.com/api/notes/' + noteID)

  }

  return (
    <>

    <form className ='note-create-form' onSubmit={handleSubmit} >
      <input name='title'  type="text" placeholder='Enter Title' />
      <input  name='description'  type="text" placeholder='Enter description'  />
      <button> Create Note </button>
    </form>

      <div className="notes">
        {
          notes.map(note => {
           return <div className="note" key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={ ()=> {handleDeleteNote(note._id)}} >Delete</button>
              <button onClick={ ()=> {handleUpdateNote(note._id)}}> Update</button>
            </div>
          })
        }

      </div>
    </>
  )
}

export default App
