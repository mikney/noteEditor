import React, {useEffect, useRef, useState} from 'react';
import TagItem from "../TagSelect/TagItem/TagItem";
import edit_icon from '../../assets/icon/edit_icon.svg'
import {useDispatch} from "react-redux";
import {changeNote, deleteNote, setCurrentTag} from "../../redux/actions/notes";
import closeIcon from "../../assets/icon/close.ico"

const NoteItem = ({title, text, tags, id, fn}) => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)
  const modalItemRef = useRef(null)


  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      // const path = event.path || (event.composedPath && event.composedPath());
      if (!event.path.includes(menuRef.current)) {
        setShowMenu(false)
      }
      if (showModal) {
        event.target === modalItemRef.current && setShowModal(false)
      }

    })
  }, [showModal])


  return (
    <>
    <div  className='note-item'>
      <div onClick={() => setShowModal(true)} className="note-item__title">
        {title}

      </div>
      <div ref={menuRef} style={showMenu ? {opacity: 1} : null} className='note-item__edit'>
        <img style={{}} onClick={() => setShowMenu(!showMenu)} alt={'Меню'}  src="https://img.icons8.com/material-outlined/24/000000/menu-2.png"/>
         <div style={showMenu ? {display: 'block'} : {display: 'none'}}  className='note-item__menu'>
          <li onClick={() => {
            dispatch(changeNote(title, text, id, tags))
            setShowMenu(false)
          }} > <img src={edit_icon} />Редактировать</li>
          <li onClick={() => {
            dispatch(deleteNote(id))
            setShowMenu(false)
          }}  > <img src="https://img.icons8.com/material-outlined/24/000000/delete-trash.png" />Удалить</li>
        </div>
      </div>
      <hr />
      <div className="note-item__text">
        {text}
      </div>
      <div className="note-item__tags">
        {tags.map((tag, index) =>
          <TagItem fn={() => dispatch(setCurrentTag(tag))} key={index} tag={tag} />
        )}
      </div>
    </div>
      {showModal ? <div ref={modalItemRef} className="note-item--modal">
        <div className="note-item">
          <div spellCheck={true} className="note-item__title">
            {title}
            <div onClick={() => {
              dispatch(changeNote(title,text, id, tags))
              setShowModal(false)
            }} className='note-item__edit'>
              <img src={edit_icon} alt=""/>
            </div>
          </div>
          <hr />
          <div spellCheck={true} className="note-item__text">
            {text}
          </div>
          <div className="note-item__tags">
            {tags.map((tag, index) =>
              <TagItem key={index} tag={tag} />
            )}
          </div>
          <img onClick={() => {setShowModal(false)}} className='note-item__close' src={closeIcon} alt=""/>
        </div>
      </div> : null }
    </>
  );
};

export default NoteItem;