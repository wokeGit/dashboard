import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    users: [],
    error: ''
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios
        .get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
        .then((response) => response.data)
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        editUser: (state, action) => {
            const deepCopyUsers = [...state.users]
            const indexnUserToEdit = deepCopyUsers.findIndex(user => user.id === action.payload.id)
            deepCopyUsers[indexnUserToEdit] = action.payload
            state.users = deepCopyUsers;
        },
        deleteUser: (state, action) => {
            const deepCopyUsers = [...state.users]
            state.users = deepCopyUsers.filter(user => user.id !== action.payload.id)
        },
        sortByUserName: (state, action) => {
            const sortOrder = action.payload === 'ASC'
            const deepCopyUsers = [...state.users]
            const sortedUsers = deepCopyUsers.sort((a, b) => {
                if (a.username < b.username)
                    return sortOrder ? -1 : 1;
                if (a.username > b.username)
                    return sortOrder ? 1 : -1;
                return 0;
            })
            state.users = sortedUsers
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message
        })
    }
})

export const { addUser, editUser, deleteUser, sortByUserName } = userSlice.actions

export default userSlice.reducer