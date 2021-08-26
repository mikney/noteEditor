import React, {useState} from 'react';
import TagItem from "../TagSelect/TagItem/TagItem";
import edit_icon from '../../assets/icon/edit_icon.svg'
import {useDispatch} from "react-redux";
import {changeNote} from "../../redux/actions/notes";
import closeIcon from "../../assets/icon/close.ico"

const NoteItem = ({title, text, tags, id, fn}) => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)


  return (
    <>
    <div onClick={() => setShowModal(true)} className='note-item'>
      <div className="note-item__title">
        {title}
        <div onClick={() => dispatch(changeNote(title,text, id, tags))} className='note-item__edit'>
          <img src={edit_icon} alt=""/>
        </div>
      </div>
      <hr />
      <div className="note-item__text">
        {text}
      </div>
      <div className="note-item__tags">
        {tags.map((tag, index) =>
          <TagItem key={index} tag={tag} />
        )}
      </div>
    </div>
      {showModal ? <div className="note-item--modal">
        <div className="note-item">
          <div className="note-item__title">
            {title}
            <div onClick={() => dispatch(changeNote(title,text, id, tags))} className='note-item__edit'>
              <img src={edit_icon} alt=""/>
            </div>
          </div>
          <hr />
          <div className="note-item__text">
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