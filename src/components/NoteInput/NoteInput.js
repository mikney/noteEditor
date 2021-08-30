import React, {createRef, useEffect, useRef, useState} from 'react';
import TagItem from "../TagSelect/TagItem/TagItem";
import {addNote, changeN, changeNote as changedNote} from "../../redux/actions/notes";
import {useDispatch, useSelector} from "react-redux";
import ContentEditable from "react-contenteditable";
import {inputArrayTag} from '../../utils/noteInput';
import {inputChangeTag} from '../../utils/noteInput';
import {getCaretPosition} from '../../utils/noteInput';



const NoteInput = ({hide}) => {
  const ref = useRef()
  const [areaValue, setAreaValue] = useState("")
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState([])

  const {changeNote} = useSelector((state) => (
    {changeNote: state.notes.changeNote}
  ))


  const dispatch = useDispatch()


  const text = useRef('');
  useEffect(() => {
    if (Object.keys(changeNote).length) {
      setTitle(changeNote.title)
      text.current = inputChangeTag(changeNote.text)
      setAreaValue(changeNote.text)
      setTags(changeNote.tags)
    }
  }, [changeNote])


  let counterArray = 0
  let lastIndex = 0
  function textAreaHandler(event) {
    const value = event.target.value
    const values = event.nativeEvent.target.innerText
    const target = event.target

    text.current = value
    setAreaValue(values)
    const selectionIndex = getCaretPosition(event.nativeEvent.target)[0]

    if (values[selectionIndex -1] === '#') {
      lastIndex = selectionIndex-1
    }
    if (values.indexOf('#', lastIndex -1 ) !== -1) {

      if (values[selectionIndex -1] === '#') {
        if (document.queryCommandState('bold')) {

        } else {
          document.execCommand('bold' )

        }
        counterArray += 1
      }
      if ((values[selectionIndex -1] === ' ' )) {
       document.execCommand('bold')
        lastIndex = values.length -1
      }
    }
    setTags(inputArrayTag(values))
    if ((values[selectionIndex -1] === ' ' ) && document.queryCommandState('bold')) {
      document.execCommand('bold' )
    }
  }


  return (
    <div ref={ref} className="note__input">
      <div className="note__input-title">
        <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='Введите заголовок'/>
      </div>
          <ContentEditable
            className="note__input-text"
            tagName="pre"
            html={text.current}
            onChange={textAreaHandler}
          />
          <div className='note__input-tags'>
            {tags.map((tag, index) => {
              return tag.length ? <TagItem classnames='input' tag={tag} key={index} /> : ''
            })}
          </div>
          {!Object.keys(changeNote).length ?
            <button className='note__input-button' onClick={() => {
              dispatch(addNote(title, areaValue, tags))
              hide(false)
            }}>Добавить</button>
            :
            <button className='note__input-button' onClick={() => {
              dispatch(changeN(changeNote.id, title, areaValue, tags))
              hide(false)
              setTitle('')
              setAreaValue('')
              dispatch(changedNote())
            }}>Изменить</button>
          }
          <button className='note__input-button' onClick={() => {
            hide(false)
            dispatch(changedNote())
            setTitle('')
            setAreaValue('')
          }}>Отмена</button>
    </div>

  );
};

export default NoteInput;