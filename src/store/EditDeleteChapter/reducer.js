import { createReducer } from "@reduxjs/toolkit"
import actions from './actions'

const { captureAllChapter, captureManga } = actions

const initialstate = {
    manga:[],
    chapters:[],
 }

 const reducer = createReducer(
    initialstate,
    (builder)=>builder
    .addCase(
        captureAllChapter.fulfilled,
        (state,action)=>{
            let newState={
                ...state,
                chapters:action.payload.chapters
            }
            return newState
        }
    )
    .addCase(
        captureManga.fulfilled,
        (state, action) => {
            let newState = {
                ...state,
                manga: action.payload.manga
            }
            return newState
        }        
    )
 )
 export default reducer  