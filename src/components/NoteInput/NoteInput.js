import React, {createRef, useEffect, useRef, useState} from 'react';
import TagItem from "../TagSelect/TagItem/TagItem";
import {addNote, changeN, changeNote as changedNote} from "../../redux/actions/notes";
import {useDispatch, useSelector} from "react-redux";

let lastIndex = 0
let counter = 0
let counterArray = 1

const ButtonHTML = () => {

}



const NoteInput = ({hide}) => {
  const ref = useRef()
  const [show, setShow] = useState(false)
  const [areaValue, setAreaValue] = useState("")
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

    // document.body.addEventListener('click', (event) => {
    //   if (!event.path.includes(ref.current)) {
    //     setShow(false)
    //   }
    // })
    //setAreaValue(divText.current.textContent)
  }, [])//divText.current.textContent])


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
          // changeNote.slice(index, index + tag.length)
          lastIndex = index + tag.length
          const tagHtml = '<b>' + changeNote.text.slice(index, index + tag.length) + '</b>'
          HtmlArr.push(tagHtml)
          //HtmlArr.push(changeNote.text.slice(index + tag.length))
        })
        HtmlArr.push(changeNote.text.slice(lastIndex))
        divText.current.innerHTML = HtmlArr.join('')
      } else {
        //  divText.current.innerText = changeNote.text
        //setAreaValue(changeNote.text)
      }


      // console.log(HtmlArr)
      // //divText.current.innerText = changeNote.text
      //
      // divText.current.innerHTML = HtmlArr.join('')
    }
    // setAreaValue(changeNote.text)
  }, [changeNote])

  // let counterArray = 1

  function textAreaHandler(event) {
    const value = divText.current.innerHTML
    const values = divText.current.textContent
    const target = divText.current
    //const values = event.target.textContent
    // console.log(values)
    console.log(divText.current.innerHTML)

    // document.execCommand('bold')
    // target.focus()



    setAreaValue(values)
    console.log(value[value.length -1 ] === ';')
    //console.log(values.indexOf('#', lastIndex) !== -1)
    console.log(values.includes('#'))
    console.log(lastIndex)
    // console.log(values.includes('#', lastIndex))
    console.log(value[value.length -1 ] === '#')
    const position = divText.current.selectionStart;
    console.log(target.selectionEnd)
    // if (values.indexOf('#') === values.length - 1) {
    //   divText.current.innerHTML = divText.current.innerHTML + '<b>'
    //   divText.current.selectionEnd = position;
    //   console.log(divText.current.selectionStart = 2);
    // }
    if (values.indexOf('#', lastIndex -1 ) !== -1) {

    // if (value[value.length -1 ] === '#' || values.indexOf('#', lastIndex -2 ) !== -1) {
      const index = value.indexOf('#', lastIndex)
      console.log(values.indexOf('#', lastIndex) === values.length - 1, 'DADADA')
      if (values.indexOf('#', lastIndex) === values.length - 1){
        document.execCommand('bold')
      }

      // console.log(value.indexOf('#', lastIndex))
      console.log(value.indexOf(' ', index) !== -1)
      //setTags(prevState => [...prevState, ...value.slice(index + 1, value.length - 6)])
      const arr = [...tags]

      // if (arr[counterArray] === '') {
      //   arr[counterArray] = arr[counterArray].concat(values[values.length -1])
      //   console.log('hi suyka')
      // } else {
      //   //arr.push(values[values.length -1])
      //   arr[counterArray] = arr[counterArray].concat(values[values.length -1])
      // }
      // console.log(arr[counterArray].split('#'))
      // //arr[counterArray] = arr[counterArray].concat(values[values.length -1])
      // setTags(arr[counterArray].split('#'))
      if (values[values.length -1] !== '#') {
        // if (arr.length === 0) {
        //   arr.push(values[values.length -1])
        // } else {
        // }
        // const lastChar = divText.current.textContent[divText.current.innerHTML.length - 1]
        // divText.current.innerHTML = divText.current.innerHTML.slice(0, divText.current.innerHTML.length - 1) + lastChar ? lastChar.bold() : ''
        // divText.current.focus()
        console.log(counterArray, 'длина массива')
        console.log(arr.length, 'длина массива')
        if (counterArray === arr.length) {
          arr[counterArray -1 ] = arr[counterArray -1].concat(values[values.length -1])
        } else {
          console.log('шо блять')
          arr.push(values[values.length -1])
        }
      }

      setTags(arr)



      // arr[counterArray] = values.slice(index)
      // setTags(arr)


      // setTags(prevState => [...prevState, ...values[values.length -1]])


      // || (value[value.length - 3] === '/')
      console.log((value[value.length - 5] === '/'), 'NYJNAYA')
      if ((value[value.length -1 ] === ';' || (value[value.length - 5] === ';'))  ) {
        document.execCommand('bold')
        //const length = divText.current.innerHTML.length
        //divText.current.innerHTML = divText.current.innerHTML.slice(0,length - 6) + '</b>'
        //divText.current.innerHTML = divText.current.textContent + '</b>'
        counterArray +=1
        console.log('rabotaet')
        lastIndex = values.length -1
        // setTags(prevState => [...prevState, value.slice(index + 1, value.length - 6)])
        // setTags([44])
        console.log(lastIndex)
        console.log(value.slice(index + 1))
        console.log(tags)
      }
    }









    // console.log(event)
    // console.log(value.lastIndexOf(' '))
    // console.log(typeof value)
    // // setAreaValue(value)
    // console.log(value.indexOf('w'))
    // console.log(value.split(' '))
    //  console.log(value.split(' ')[0].empty)
    // if (value[value.length -1 ] === ';') {
    //   console.log('NY SHO SYKA')
    //   console.log(value[value.length -1 ])
    // }

    // const array = value.split(' ')
    // const lastElem = array[array.length- 1]
    // console.log(lastElem[lastElem.length - 1].indexOf(' '));

    // console.log(value[value.length - 1] === ' ');
    // if (value.indexOf('#', lastIndex) !== -1) {
    //   const index = value.indexOf('#', lastIndex)
    //   console.log(value.indexOf('#', lastIndex))
    //   console.log(value.indexOf(' ', index) !== -1)
    //   if (value.indexOf(' ', index) !== -1) {
    //     console.log('rabotaet')
    //     lastIndex = value.indexOf(' ', index)
    //     setTags(prevState => [...prevState, value.slice(index + 1)])
    //     // setTags([44])
    //     console.log(lastIndex)
    //     console.log(value.slice(index + 1))
    //     console.log(tags)
    //   }
    // }





    // console.log(values[0] === ' ')
    // console.log(' '.indexOf(' '))
    // console.log(event)
    // console.log(value.includes(' '))
    // console.log(value.indexOf(" "))
    // console.log(value.indexOf(' ', 0) !== -1)
    // if (value.indexOf('#', lastIndex) !== -1) {
    //   const index = value.indexOf('#', lastIndex)
    //   const arr  = value.split(' ')
      // const substr = arr[arr.length - 1].slice(0)
      // console.log(substr)
      // lastIndex = index + substr.length + 1



      // console.log(value.slice(index).split(' '));
      // console.log(lastIndex, 'last index')
      // const substr = arr[arr.length - 1].slice(0)
      // console.log(substr)
      // lastIndex = index + substr.length + 1
      // if (counter < value.split(' ').length ) {
      //
      //   setTags(prevState => [...prevState, substr])
      //
      // }
      // // console.log(value.indexOf('#', 0))
      // // console.log(value.indexOf(' ', index) !== -1)
      // // console.log(value.length, 'длина')
      //
      // console.log(arr[arr.length - 1]);

      // if (areaValue.includes(' ', index )) {
      //   console.log('rabotaet')
      //   lastIndex = value.indexOf(' ', index)
      //   setTags(prevState => [...prevState, value.slice(index + 1)])
      //   // setTags([44])
      //   console.log(lastIndex)
      //   console.log(value.slice(index))
      //   console.log(tags)
      // }
    // }
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
          <div ref={divText} onInput={(event => textAreaHandler(event))} className="note__input-text"  contentEditable='true' placeholder="Заметка..." />
          <div className='note__input-tags'>
            {tags.map((tag, index) => <TagItem tag={tag} key={index} />)}
          </div>
          <button onClick={() => dispatch(addNote(title, areaValue, tags))}>Добавить</button>
          <button onClick={() => hide(false)}>Отмена</button>
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
              <div ref={divText} className="note__input-text"  onInput={(event => textAreaHandler(event))} contentEditable='true' placeholder="Заметка..." />
              <div className='note__input-tags'>
                {tags.map((tag, index) => <TagItem tag={tag} key={index} />)}
              </div>
              <button onClick={() => dispatch(changeN(changeNote.id, title, areaValue, tags))}>Изменить</button>
              <button onClick={() => {
                hide(false)
                dispatch(changedNote())
                setTitle('')
                setAreaValue('')
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