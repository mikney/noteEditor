import React, {createRef, useEffect, useRef, useState} from 'react';
import TagItem from "../TagSelect/TagItem/TagItem";
import {addNote, changeN, changeNote as changedNote} from "../../redux/actions/notes";
import {useDispatch, useSelector} from "react-redux";
import ContentEditable from "react-contenteditable";

let lastIndex = 0
let counter = 0
let counterArray = 1

const inputChangeTag = (string) => {
  let arrTags = string.split('#')
  const firstStr = arrTags.shift()
  arrTags = arrTags.map(substr => {
    const arrSubStr = substr.split(' ')
    let tag = `#<b>${arrSubStr.shift()}</b>`
    return `${tag}${arrSubStr}`
  })
  return firstStr + arrTags.join('')
}



const NoteInput = ({hide}) => {
  const ref = useRef()
  const [show, setShow] = useState(false)
  const [areaValue, setAreaValue] = useState("")
  const [title, setTitle] = useState("")
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

    // document.body.addEventListener('click', (event) => {
    //   if (!event.path.includes(ref.current)) {
    //     setShow(false)
    //   }
    // })
    //setAreaValue(divText.current.textContent)
  }, [])//divText.current.textContent])
  const text = useRef('');
  const [dText, setDtext] = useState('')
  useEffect(() => {
    if (Object.keys(changeNote).length) {
      setShow(true)
      setTitle(changeNote.title)
      // // console.log(divText.current.innerText = 'HI')
      // divText.current && (divText.current.innerText = 'HI')
      // console.log(divText.current)
      // const toHtmlText = changeNote.text.forEach(())
      lastIndex = divText.current.innerText.length - 1
      counterArray += changeNote.tags.length -1
      //if ( changeNote.tags && changeNote.tags.length) {
      if (changeNote.tags.length) {
        const HtmlArr = []
        let lastIndex = 0
        setTags(changeNote.tags)
        const toHtmlText = changeNote.tags.forEach((tag) => {
          const index = changeNote.text.indexOf(tag, lastIndex)
          if (index === -1) {

          }
          HtmlArr.push(changeNote.text.slice(lastIndex, index))
          lastIndex = index + tag.length
          const tagHtml = '<b>' + changeNote.text.slice(index, index + tag.length) + '</b>'
          HtmlArr.push(tagHtml)
        })
        HtmlArr.push(changeNote.text.slice(lastIndex))
        divText.current.innerHTML = HtmlArr.join('')
      } else {
         divText.current.innerText = changeNote.text
      }

    }
  }, [changeNote])

  // let counterArray = 1


  function textAreaHandler(event) {
      // const html = divText.current.innerHTML
      // const text = divText.current.textContent
      // const target = divText.current
    const value = event.target.value
    if (value === '#') {
      document.execCommand('bold')
    }
    console.log(window.getSelection())
    // if ((value[value.length -1] === ' ')) {
    //   setDtext(event.target.value)
    // } else {
    //   setDtext(inputChangeTag(event.target.value))
    // }
    // console.log(inputChangeTag(event.target.value))
    // //text.current = inputChangeTag(event.target.value)
    // console.log(value[value.length -1] === ' ')

  }

  // function textAreaHandler(event) {
  //   const value = divText.current.innerHTML
  //   const values = divText.current.textContent
  //   const target = divText.current
  //
  //   console.log(divText.current.innerHTML)
  //
  //   setAreaValue(values)
  //   console.log(value[value.length -1 ] === ';')
  //   console.log(values.includes('#'))
  //   console.log(lastIndex)
  //   console.log(value[value.length -1 ] === '#')
  //   console.log(target.selectionEnd)
  //   if (values.indexOf('#', lastIndex -1 ) !== -1) {
  //
  //     const index = value.indexOf('#', lastIndex)
  //     console.log(values.indexOf('#', lastIndex) === values.length - 1, 'DADADA')
  //     if (values.indexOf('#', lastIndex) === values.length - 1){
  //       document.execCommand('bold')
  //     }
  //
  //     console.log(value.indexOf(' ', index) !== -1)
  //     const arr = [...tags]
  //
  //     if (values[values.length -1] !== '#') {
  //
  //       console.log(counterArray, 'длина массива')
  //       console.log(arr.length, 'длина массива')
  //       if (counterArray === arr.length) {
  //         arr[counterArray -1 ] = arr[counterArray -1].concat(values[values.length -1])
  //       } else {
  //         console.log('шо блять')
  //         arr.push(values[values.length -1])
  //       }
  //     }
  //
  //     setTags(arr)
  //
  //     console.log((value[value.length - 5] === '/'), 'NYJNAYA')
  //     if ((value[value.length -1 ] === ';' || (value[value.length - 5] === ';'))  ) {
  //       document.execCommand('bold')
  //
  //       counterArray +=1
  //       console.log('rabotaet')
  //       lastIndex = values.length -1
  //
  //       console.log(lastIndex)
  //       console.log(value.slice(index + 1))
  //       console.log(tags)
  //     }
  //   }
  // }


  return (
    <>
    { !Object.keys(changeNote).length ?
    <div onClick={() => setShow(true)}  ref={ref} className="note__input">
      <div className="note__input-title">
        <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='Введите заголовок'/>
      </div>
      {/*{show ?*/}
        <>
          {/*<div className="note__input-text">*/}
          {/*  <textarea onChange={(event => textAreaHandler(event))} value={areaValue}  placeholder="Заметка..."  />*/}
          {/*</div>*/}
          {/*<div autofocus={true} ref={divText} onInput={(event => textAreaHandler(event))} className="note__input-text"  contentEditable='true' placeholder="Заметка..." >{dText}</div>*/}
          <ContentEditable
            className="note__input-text"
            tagName="pre"
            html={dText} // innerHTML of the editable div
            // disabled={!this.state.editable} // use true to disable edition
            onChange={textAreaHandler} // handle innerHTML change
            // onBlur={() => console.log('HI')}
          />
          <div className='note__input-tags'>
            {tags.map((tag, index) => <TagItem tag={tag} key={index} />)}
          </div>
          <button className='note__input-button' onClick={() => {
            dispatch(addNote(title, areaValue, tags))
            hide(false)
            lastIndex = 0
            counter = 0
            counterArray = 1
          }}>Добавить</button>
          <button className='note__input-button cancel' onClick={() => {
            hide(false)
            lastIndex = 0
            counter = 0
            counterArray = 1
          }}>Отмена</button>
        </>
      {/*: null}*/}
    </div>
      : <div onClick={() => setShow(true)}  ref={ref} className="note__input">
        <div className="note__input-title">
          <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='Введите заголовок'/>
        </div>

          <div style={show ? {display: 'block'} : {display: 'none'}}>
            {/*<div className="note__input-text">*/}
            {/*  <textarea onChange={(event => textAreaHandler(event))} value={areaValue}  placeholder="Заметка..."  />*/}
            {/*</div>*/}
            <div ref={divText} className="note__input-text"  onInput={(event => textAreaHandler(event))} contentEditable='true' placeholder="Заметка..." />
            <div className='note__input-tags'>
              {tags.map((tag, index) => <TagItem tag={tag} key={index} />)}
            </div>
            <button className='note__input-button' onClick={() => {
              dispatch(changeN(changeNote.id, title, areaValue, tags))
              hide(false)
              lastIndex = 0
              counter = 0
              counterArray = 1
            }}>Изменить</button>
            <button className='note__input-button' onClick={() => {
              hide(false)
              dispatch(changedNote())
              setTitle('')
              setAreaValue('')
              lastIndex = 0
              counter = 0
              counterArray = 1
            }}>Отмена</button>
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