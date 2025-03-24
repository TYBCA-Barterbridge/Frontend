import { createSlice } from "@reduxjs/toolkit";
import { userApiSlice } from "./userApiSlice";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        friends: [],
        friendRequests: [],
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        addFriend(state, action) {
            state.friends.push(action.payload);
        },
        setFriendRequests(state, action) {
            state.friendRequests = action.payload;
        },
        setFriends(state, action) {
            state.friends = action.payload;
        },
        updateBio(state, action) {
            if (state.user) {
                state.user.bio = action.payload;
            }
        },
        updateProfile(state, action) {
            if (state.user) {
                state.user.profile = action.payload;
            }
        },
        updateUsername(state, action) {
            if (state.user) {
                state.user.username = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userApiSlice.endpoints.updateBio.matchFulfilled,
                (state, action) => {
                    if (state.user) {
                        state.user.bio = action.payload.bio;
                    }
                }
            )
            .addMatcher(
                userApiSlice.endpoints.updateProfile.matchFulfilled,
                (state, action) => {
                    if (state.user) {
                        state.user.profile = action.payload.profile;
                    }
                }
            )
            .addMatcher(
                userApiSlice.endpoints.updateUsername.matchFulfilled,
                (state, action) => {
                    if (state.user) {
                        state.user.username = action.payload.username;
                    }
                }
            );
    },
});

export const {
    setUser,
    addFriend,
    setFriends,
    setFriendRequests,
    updateBio,
    updateProfile,
    updateUsername,
} = userSlice.actions;

export default userSlice.reducer;  