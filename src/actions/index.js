import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from "lodash";

export const fetchPostsAndUsers = () =>
    async (dispatch, getState) => {
        await dispatch(fetchPosts());

        // const userIds = _.uniq(_.map(getState().posts, "userId"));
        // //forEach can't be used with async
        // userIds.forEach((id) => dispatch(fetchUser(id)));

        //previous result is always the first parameter
        _.chain(getState().posts)
            .map("userId")
            .uniq()
            .forEach(id => dispatch(fetchUser(id)))
            .value()
    }


export const fetchPosts = () =>
    async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts')

        dispatch({
            type: "FETCH_POSTS",
            payload: response.data
        })
    }

export const fetchUser = (id) =>
    async (dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`)

        dispatch({
            type: "FETCH_USER",
            payload: response.data
        })
    }


//memoization method //has issues with update //steps: make a separate memoized function with action  and call it inside the  action creator 
// export const fetchUser = (id) =>
//     (dispatch) => {
//         return _fetchUser(id, dispatch)
//     }


// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`)
//     dispatch({
//         type: "FETCH_USER",
//         payload: response.data
//     })
// })

