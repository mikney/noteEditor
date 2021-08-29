

const initialState = {
  notes: [],
  currentTags: [],
  changeNote: {},
  tagsList: []
}

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESOLVENOTES': return  {
      ...state, notes: [...action.payload]

    }
    case 'SETCURRENTTAG': return {
      ...state, currentTags: [...state.currentTags, action.payload]
    }
    case 'REMOVETAG': return {

      ...state, currentTags: [...state.currentTags.filter(tag => tag !== action.payload)]
    }
    case "ADDNOTE": return {
      ...state, notes: [...state.notes, action.payload]
    }
    case "CHANGENOTE": return {
      ...state, changeNote: action.payload.title ? {...action.payload} : {}
    }
    case "TAGSLIST": return {
      ...state, tagsList: action.payload
    }
    case "DELETENOTE": return {
      ...state, notes: [...state.notes.filter(note => note.id !== action.payload)]
    }
    default: return  state
  }
}