import React, {createRef, useEffect, useRef, useState} from 'react';
import TagItem from "../TagSelect/TagItem/TagItem";
import {addNote, changeN, changeNote as changedNote} from "../../redux/actions/notes";
import {useDispatch, useSelector} from "react-redux";
import ContentEditable from "react-contenteditable";

let lastIndex = 0
let counter = 0
let counterArray = 0
let isBold = false

const inputChangeTag = (string) => {
  let arrTags = string.split('#')
  const firstStr = arrTags.shift()
  arrTags = arrTags.map(substr => {
    const arrSubStr = substr.split(' ')
    let tag = arrSubStr.shift()
    const newtag = `<b>#${tag}</b>`
    const str = substr.slice(tag.length )
    if (substr === tag) {
      return `${newtag}`
    }
    return `${newtag}${str}`
  })

  return firstStr + arrTags.join('')
}

const inputArrayTag = (string) => {
  let arrTags = string.split('#')
  arrTags.shift()
  arrTags = arrTags.map(substr => {
    return substr.split(' ')[0n]
  })
  return arrTags
}




function node_walk(node, func) {
  var result = func(node);
  for(node = node.firstChild; result !== false && node; node = node.nextSibling)
    result = node_walk(node, func);
  return result;
};

function getCaretPosition(elem) {
  var sel = window.getSelection();
  var cum_length = [0, 0];

  if(sel.anchorNode == elem)
    cum_length = [sel.anchorOffset, sel.extentOffset];
  else {
    var nodes_to_find = [sel.anchorNode, sel.extentNode];
    if(!elem.contains(sel.anchorNode) || !elem.contains(sel.extentNode))
      return undefined;
    else {
      var found = [0,0];
      var i;
      node_walk(elem, function(node) {
        for(i = 0; i < 2; i++) {
          if(node == nodes_to_find[i]) {
            found[i] = true;
            if(found[i == 0 ? 1 : 0])
              return false; // all done
          }
        }

        if(node.textContent && !node.firstChild) {
          for(i = 0; i < 2; i++) {
            if(!found[i])
              cum_length[i] += node.textContent.length;
          }
        }
      });
      cum_length[0] += sel.anchorOffset;
      cum_length[1] += sel.extentOffset;
    }
  }
  if(cum_length[0] <= cum_length[1])
    return cum_length;
  return [cum_length[1], cum_length[0]];
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

  // function textAreaHandler(event) {
  //   const value = event.target.value
  //
  //   const nativeValue = event.nativeEvent.target
  //
  //   setDtext(inputChangeTag(nativeValue.innerText))
  //
  //   const selectionIndex = getCaretPosition(event.nativeEvent.target)[0]
  //
  //
  //   //var tag = document.getElementById("editable");
  //
  //   // Creates range object
  //   var setpos = document.createRange();
  //
  //   // Creates object for selection
  //   var set = window.getSelection();
  //
  //
  //
  //   // Set start position of range
  //   setpos.setStart(nativeValue.childNodes[0], selectionIndex);
  //
  //   // Collapse range within its boundary points
  //   // Returns boolean
  //   setpos.collapse(true);
  //
  //   // Remove all ranges set
  //   set.removeAllRanges();
  //
  //   // Add range with respect to range object.
  //   set.addRange(setpos);
  //
  //   // Set cursor on focus
  //   nativeValue.focus();
  //
  //
  //
  //
  //
  // }


  // function textAreaHandler(event) {
  //     // const html = divText.current.innerHTML
  //     // const text = divText.current.textContent
  //     // const target = divText.current
  //   const value = event.target.value
  //   const nativeValue = event.nativeEvent.target
  //   // console.log(event.nativeEvent.target.innerText)
  //   //console.log(value)
  //   //console.log(value.slice(-4))
  //   // console.log(nativeValue.innerText[nativeValue.innerText.length - 1] === ' ')
  //   // console.log(nativeValue.innerText)
  //   // console.log(inputChangeTag(nativeValue.innerText))
  //   setDtext(inputChangeTag(nativeValue.innerText))
  //   // const index = window.getSelection().anchorOffset;
  //   // console.log(window.getSelection())
  //   // console.log(index)
  //   // if (isBold && (value[index - 1] === ' ')) {
  //   //   isBold =  false
  //   //   document.execCommand('bold')
  //   // }
  //   // if ((value[index - 1] === '#') && (!isBold)) {
  //   //   isBold = true
  //   //   document.execCommand('bold')
  //   // }
  //   // if (value.slice(-5) === ' </b>') {
  //   //   //document.execCommand('bold')
  //   //   console.log('работает')
  //   //   setDtext(value)
  //   //   // setDtext(value + '&nbsp;')
  //   // } else {
  //   //   setDtext(inputChangeTag(nativeValue.innerText))
  //   // }
  //
  //
  //
  //   //console.log(window.getSelection())
  //   // if ((value[value.length -1] === ' ')) {
  //   //   setDtext(event.target.value)
  //   // } else {
  //   //   setDtext(inputChangeTag(event.target.value))
  //   // }
  //   // console.log(inputChangeTag(event.target.value))
  //   // //text.current = inputChangeTag(event.target.value)
  //   // console.log(value[value.length -1] === ' ')
  //
  // }

  function textAreaHandler(event) {
    const value = event.target.value
    const values = event.nativeEvent.target.innerText
    const target = event.target

    //console.log(divText.current.innerHTML)
    console.log(getCaretPosition(event.nativeEvent.target));
    setDtext(value)

    const selectionIndex = getCaretPosition(event.nativeEvent.target)[0]

    if (values[selectionIndex -1] === '#') {
      console.log(isBold)
      lastIndex = selectionIndex-1
    }


    console.log(tags)

    if (values.indexOf('#', lastIndex -1 ) !== -1) {
      console.log(values[selectionIndex - 1])
      if (values[selectionIndex -1] === '#') {
        console.log(isBold)
        if (document.queryCommandState('bold')) {

        } else {
          console.log('LLLLLLLLLOEX')
          document.execCommand('bold' )
          isBold = !isBold
        }
        counterArray += 1
        console.log('ddd')
      }


      // const arr = [...tags]
      //
      // console.log(counterArray, 'длина массива')
      // console.log(arr.length, 'длина массива')
      // console.log(values[selectionIndex - 1])
      // if (values[selectionIndex - 1] !== '#') {
      //   if (counterArray === arr.length) {
      //     arr[counterArray -1 ] = arr[counterArray -1].concat(values[selectionIndex - 1])
      //   } else {
      //     console.log('шо блять')
      //     arr.push(values[selectionIndex - 1])
      //   }
      // }


        // setTags(inputArrayTag(values))

      // }

      if ((values[selectionIndex -1] === ' ' )) {
        document.execCommand('bold')
        isBold = !isBold
        console.log('rabotaet')
        lastIndex = values.length -1
        console.log(lastIndex)
        console.log(tags)
      }
    }
    setTags(inputArrayTag(values))
    if ((values[selectionIndex -1] === ' ' ) && document.queryCommandState('bold')) {
      document.execCommand('bold' )
      console.log('DADADA')
    }




    // if (values.indexOf('#', lastIndex -1 ) !== -1) {
    //
    //   const index = value.indexOf('#', lastIndex)
    //   console.log(values.indexOf('#', lastIndex) === values.length - 1, 'DADADA')
    //   if (values.indexOf('#', lastIndex) === values.length - 1){
    //     document.execCommand('bold')
    //   }
    //
    //   console.log(value.indexOf(' ', index) !== -1)
    //   const arr = [...tags]
    //
    //   if (values[values.length -1] !== '#') {
    //
    //     console.log(counterArray, 'длина массива')
    //     console.log(arr.length, 'длина массива')
    //     if (counterArray === arr.length) {
    //       arr[counterArray -1 ] = arr[counterArray -1].concat(values[values.length -1])
    //     } else {
    //       console.log('шо блять')
    //       arr.push(values[values.length -1])
    //     }
    //   }
    //
    //   setTags(arr)
    //   console.log(value)
    //   //console.log((value[value.length - 3] === '/'), 'NYJNAYA')
    //   if ((values[selectionIndex -1] === ' ' )) {
    //     document.execCommand('bold')
    //     counterArray +=1
    //     console.log('rabotaet')
    //     lastIndex = values.length -1
    //
    //     console.log(lastIndex)
    //     console.log(value.slice(index + 1))
    //     console.log(tags)
    //   }
    //
    //
    //   // if ((value[value.length -1] === ' ' || (value[value.length - 5] === ' '))  ) {
    //   //   document.execCommand('bold')
    //   //
    //   //   counterArray +=1
    //   //   console.log('rabotaet')
    //   //   lastIndex = values.length -1
    //   //
    //   //   console.log(lastIndex)
    //   //   console.log(value.slice(index + 1))
    //   //   console.log(tags)
    //   // }
    //   // if ((value[value.length -1 ] === ';' || (value[value.length - 5] === ';'))  ) {
    //   //   document.execCommand('bold')
    //   //
    //   //   counterArray +=1
    //   //   console.log('rabotaet')
    //   //   lastIndex = values.length -1
    //   //
    //   //   console.log(lastIndex)
    //   //   console.log(value.slice(index + 1))
    //   //   console.log(tags)
    //   // }
    // }
  }


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
            {tags.map((tag, index) => {
              return tag.length ? <TagItem tag={tag} key={index} /> : ''
            })}
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
              {tags.map((tag, index) => {
                return tag.length  && <TagItem tag={tag} key={index} />
              })}
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