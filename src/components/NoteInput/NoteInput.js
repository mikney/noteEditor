import React, {createRef, useEffect, useRef, useState} from 'react';
import TagItem from "../TagSelect/TagItem/TagItem";
import {addNote, changeN} from "../../redux/actions/notes";
import {useDispatch, useSelector} from "react-redux";

let lastIndex = 0

const ButtonHTML = () => {

}



const NoteInput = ({state}) => {
  const ref = useRef()
  const [show, setShow] = useState(false)
  const [areaValue, setAreaValue] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const divText = createRef()

  // const [lastIndex, setLastIndex] = useState(0)

  const {changeNote} = useSelector((state) => (
    {changeNote: state.notes.changeNote}
  ))


  const dispatch = useDispatch()

  useEffect(() => {
    // state && setAreaValue(state[1])
    // state && setTitle(state[0])
    // setShow(true)

    document.body.addEventListener('click', (event) => {
      if (!event.path.includes(ref.current)) {
        setShow(false)
      }
    })
  }, [])
  useEffect(() => {
    if (Object.keys(changeNote).length) {
      setShow(true)
      setTitle(changeNote.title)
      // // console.log(divText.current.innerText = 'HI')
      // divText.current && (divText.current.innerText = 'HI')
      // console.log(divText.current)
      // const toHtmlText = changeNote.text.forEach(())

      if (changeNote.tags.length) {
        const HtmlArr = []
        let lastIndex = 0
        const toHtmlText = changeNote.tags.forEach((tag) => {
          const index = changeNote.text.indexOf(tag, lastIndex)
          if (index === -1) {

          }
          HtmlArr.push(changeNote.text.slice(lastIndex, index))
          // changeNote.slice(index, index + tag.length)
          lastIndex = index + tag.length
          const tagHtml = '<b>' + changeNote.text.slice(index, index + tag.length) + '</b>'
          HtmlArr.push(tagHtml)
          //HtmlArr.push(changeNote.text.slice(index + tag.length))
        })
        divText.current.innerHTML = HtmlArr.join('')
      } else {
        divText.current.innerText = changeNote.text
      }


      // console.log(HtmlArr)
      // //divText.current.innerText = changeNote.text
      //
      // divText.current.innerHTML = HtmlArr.join('')
    }
    // setAreaValue(changeNote.text)
  }, [changeNote])


  function textAreaHandler(event) {
    const value = event.target.innerText
    console.log(value)
    setAreaValue(value)
    if (value.indexOf('#', lastIndex) !== -1) {
      const index = value.indexOf('#', lastIndex)
      console.log(value.indexOf('#', lastIndex))
      if (value.indexOf(' ',index) !== -1) {
        lastIndex = value.indexOf(' ',index) +1
        setTags(prevState => [...prevState, value.slice(index + 1)])
        // setTags([44])
        console.log(lastIndex)
        console.log(value.slice(index))
        console.log(tags)
      }
    }
    // console.log(areaValue.indexOf('#', lastIndex) !== -1)
    // if (areaValue.indexOf('#', lastIndex) !== -1) {
    //     const index = areaValue.indexOf('#', lastIndex)
    //     // setLastIndex(areaValue.indexOf('#', index) + 1)
    //     lastIndex = (areaValue.indexOf('#', index) + 2)
    //     console.log(lastIndex)
    // }
  }


  return (
    <>
    { !Object.keys(changeNote).length ?
    <div onClick={() => setShow(true)}  ref={ref} className="note__input">
      <div className="note__input-title">
        <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='Введите заголовок'/>
      </div>
      {show ?
        <>
          {/*<div className="note__input-text">*/}
          {/*  <textarea onChange={(event => textAreaHandler(event))} value={areaValue}  placeholder="Заметка..."  />*/}
          {/*</div>*/}
          <div ref={divText} className="note__input-text" onInput={(event => textAreaHandler(event))} contentEditable='true' placeholder="Заметка..." />
          <div className='note__input-tags'>
            {tags.map((tag, index) => <TagItem tag={tag} key={index} />)}
          </div>
          <button onClick={() => dispatch(addNote(title, areaValue, tags))}>Добавить</button>
        </>
      : null}
    </div>
        : <div onClick={() => setShow(true)}  ref={ref} className="note__input">
          <div className="note__input-title">
            <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='Введите заголовок'/>
          </div>

            <div style={show ? {display: 'block'} : {display: 'none'}}>
              {/*<div className="note__input-text">*/}
              {/*  <textarea onChange={(event => textAreaHandler(event))} value={areaValue}  placeholder="Заметка..."  />*/}
              {/*</div>*/}
              <div ref={divText} className="note__input-text" onInput={(event => textAreaHandler(event))} contentEditable='true' placeholder="Заметка..." />
              <div className='note__input-tags'>
                {tags.map((tag, index) => <TagItem tag={tag} key={index} />)}
              </div>
              <button onClick={() => dispatch(changeN(changeNote.id, title, areaValue, tags))}>Изменить</button>
            </div>


        {/*{show ?*/}
        {/*  <div style={show ? {display: 'block'} : {display: 'none'}}>*/}
        {/*    /!*<div className="note__input-text">*!/*/}
        {/*    /!*  <textarea onChange={(event => textAreaHandler(event))} value={areaValue}  placeholder="Заметка..."  />*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    <div ref={divText} className="note__input-text" onInput={(event => textAreaHandler(event))} contentEditable='true' placeholder="Заметка..." />*/}
        {/*    <div className='note__input-tags'>*/}
        {/*      {tags.map((tag, index) => <TagItem tag={tag} key={index} />)}*/}
        {/*    </div>*/}
        {/*    <button onClick={() => dispatch(changeN(changeNote.id, title, areaValue, tags))}>Изменить</button>*/}
        {/*  </div>*/}
        {/*  : null}*/}

        </div>
    }
    </>

  );
};

export default NoteInput;