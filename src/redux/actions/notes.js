




export const resolveNotes = (notes) => (
  (dispatch) => {
    dispatch(resolveTags(notes))
    dispatch(resolve(notes))
    // return {
    //   type: 'RESOLVENOTES',
    //   payload: notes
    // }
  }
)
export const resolve = (notes) => ({
  type: 'RESOLVENOTES',
  payload: notes
})

const resTag = (arr) => ({
  type: 'TAGSLIST',
  payload: arr
})

export const resolveTags = (notes) => {
  const obj = {}
  notes.forEach(note => {
    note.tags.forEach((tag) => {
      obj[tag] = obj[tag] ? obj[tag] + 1 : 1
    })
  })
  console.log(obj)
  const arr = Object.keys(obj).sort((a, b) =>obj[b] - obj[a])
  console.log(arr)

  resTag(arr)
  return {
    type: 'TAGSLIST',
    payload: arr
  }
}




export const setCurrentTag = (tag) => (
  {
    type: "SETCURRENTTAG",
    payload: tag
  }
)
export const removeTag = (tag) => ({
  type: 'REMOVETAG',
  payload: tag
})

export const addNote = (title, text, tags) => ({
  type: 'ADDNOTE',
  payload: {
    title, text, tags
  },
})
export const changeNote = (title, text, id, tags) => ({
  type: "CHANGENOTE",
  payload: {
    title, text, id, tags
  }
})

export const changeN = (id, title,text, tags) => ((
  (dispatch, getState) => {
    console.log(title)
    const notes = getState().notes.notes.map((note) => {
      if (note.id === id) {
        return {
          id, title, text, tags
        }
      }
      return note
    })
    console.log(notes)
    dispatch(resolveNotes(notes))
    // notes.map((note) => {
    //   if (note.id === id) {
    //     return {
    //       id, title, text, tags
    //     }
    //   }
    //   return note
    // })
  }
))



