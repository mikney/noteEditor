import React, {useState} from 'react';
import TagItem from "./TagItem/TagItem";
import {useDispatch, useSelector} from "react-redux";
import {removeTag, setCurrentTag} from "../../redux/actions/notes";

const TagSelect = () => {
  const arr = ['hi', 'morning', 'belarus', 'russia', 'night', 'relax']


  const dispatch = useDispatch()
  const {currentTags, tagsList} = useSelector((state) => ({
    currentTags: state.notes.currentTags,
    tagsList: state.notes.tagsList
  }))
  const [inputTag, setInputTag] = useState('')

  function clickTagHandler(tag, className) {
    // setTag([...selectedTags, tag ])
    if (className === 'selected') {
      dispatch(removeTag(tag))
      console.log('AGA')

    } else {
      dispatch(setCurrentTag(tag))
    }
  }

  function onKeyHandler(e) {
    console.log(e.key === 'Enter')
      if(e.key === 'Enter') {
        let value = ''
        const index = e.target.value.indexOf('#')
        if (index !== -1) {
          value = e.target.value.slice(index + 1)
          console.log(value)
        } else {
          value = e.target.value
        }
        setInputTag('')
        dispatch(setCurrentTag(value))
      }
  }

  return (
    <>

      <div className='tag-selected'>
          <input onKeyPress={e => {onKeyHandler(e)}} onChange={(e) => setInputTag(e.target.value)} value={inputTag} placeholder='Поиск по тегу' className='tag-selected__input' />
          {/*{currentTags.length > 0 && currentTags.map((tag, index) =>*/}
          {/*  <TagItem fn={clickTagHandler} key={index} tag={tag} classnames={'selected'}/>*/}
          {/*)}*/}
      </div>
      <div className='tag-list'>
        {currentTags.length > 0 ? currentTags.map((tag, index) =>
          <TagItem fn={clickTagHandler} key={index} tag={tag} classnames={'selected'}/>
        )
        : tagsList && tagsList.map((tag, index) =>
          <TagItem key={index} tag={tag} classnames={''} fn={clickTagHandler}/>
        )
        }
        {/*<div className='tag-list' style={{display: 'flex', }}>*/}
        {/*  {tagsList && tagsList.map((tag, index) =>*/}
        {/*    <TagItem key={index} tag={tag} classnames={''} fn={clickTagHandler}/>*/}
        {/*  )}*/}
      </div>
    </>
  );
};

export default TagSelect;