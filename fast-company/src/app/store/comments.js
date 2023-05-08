import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";


const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentRemove: (state, action) => {
            state.entities.filter((el) => el._id !== action.payload._id);
        },
        commentCreate: (state, action) => {
            state.entities.push(action.payload);
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestFailed, commentRemove, commentCreate } = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const createCommentFailed = createAction("comments/createCommentFailed");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const removeCommentFailed = createAction("comments/removeCommentFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const removeComments = (id) => async (dispatch) => {
    dispatch(commentRemoveRequested())
    try {
        const { content } = await commentService.removeComment(id);
          dispatch(commentRemove(content));
    } catch (error) {
       dispatch(removeCommentFailed(error.message))
    }
};

export const createComments = (data) => async (dispatch) => {
    console.log("dataNew", data);
 
    // const comment = {
    //     ...data,
    //     _id: nanoid(),
    //     pageId: userId,
    //     created_at: Date.now(),
    //     userId: currentUserId
    // };
    dispatch(commentCreateRequested())
    try {
        const { content } = await commentService.createComment(data);
          dispatch(commentCreate(content));
    } catch (error) {
     dispatch(createCommentFailed(error.message))
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
