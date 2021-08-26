import {combineReducers} from "redux";
import {notesReducer} from "./reducers/notes";

export default combineReducers({
  notes: notesReducer
})