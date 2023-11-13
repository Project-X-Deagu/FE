import { configureStore } from '@reduxjs/toolkit'
import sentenceReducer from '../components/sentenceSlice';
export default configureStore({
  reducer: {
    sentence: sentenceReducer,
  }
});
