import React, {useEffect, useState} from 'react';
import NoteInput from "../../components/NoteInput/NoteInput";
import TagSelect from "../../components/TagSelect/TagSelect";
import NoteItem from "../../components/NoteItem/NoteItem";
import notesJson from "../../notes.json"
import {useDispatch, useSelector} from "react-redux";
import {resolveNotes} from "../../redux/actions/notes";
// import dbJson from "../../../public/db.json"





const Home = () => {


  const dispatch = useDispatch()
  const {notes, currentTags, changeNote} = useSelector((state) => ({
    notes: state.notes.notes,
    currentTags: state.notes.currentTags,
    changeNote: state.notes.changeNote
  }))
  useEffect( () => {
    dispatch(resolveNotes(notesJson))

  }, [])


  const itemEditHandler = (title, text) => {
    setState([title, text])
  }
  const [state, setState] = useState([])

  const notesFiltered = notes.filter(note => {
    let counter = 0
    currentTags.forEach(tag => {
      if(note.tags.includes(tag)) {
        counter++
      }
    })
    return currentTags.length === counter
   // return note.tags.includes(...currentTags)
    //return true
  })
  document.execCommand('bold')

  const [show, setShow] = useState(false)

  console.log(show, 'HOme show')
  console.log(Object.keys(changeNote).length, 'chanheNote length')
  console.log({...changeNote})
  return (
    <div className='home'>
      <div onClick={() => setShow(true)} className='home__button-input'>
        <img src="https://img.icons8.com/ios/50/000000/add--v1.png"/>
      </div>
      {(show || !!Object.keys({...changeNote}).length) && <NoteInput hide={setShow} state={state}/>}
      <TagSelect  />
      <div className='notes'>
        {currentTags.length ? notesFiltered.map((obj, index) =>
          <NoteItem
            key={index + obj.id}
            id={obj.id}
            title={obj.title}
            text={obj.text}
            tags={obj.tags}
            fn={itemEditHandler}
          />
        )
        : notes.map((obj, index) =>
            <NoteItem
              id={obj.id}
              key={index}
              title={obj.title}
              text={obj.text}
              tags={obj.tags}
              fn={itemEditHandler}
            />
          )
        }
      </div>
    </div>
  );
};

export default Home;