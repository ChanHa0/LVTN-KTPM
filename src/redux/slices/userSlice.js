import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await userApi.loginUser({
                uEmail: formData.uEmail.trim().toLowerCase(),
                uPassword: formData.uPassword
            });
            if (response.status === 'OK') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                return response.data.user;
            } else {
                return rejectWithValue(response.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Đăng nhập thất bại');
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await userApi.registerUser({
                uName: formData.uName.trim(),
                uEmail: formData.uEmail.trim().toLowerCase(),
                uPassword: formData.uPassword
            });
            if (response.status === 'OK') {
                return response.data.user;
            } else {
                return rejectWithValue(response.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Đăng ký thất bại');
        }
    }
);

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (formData, { rejectWithValue }) => {
        try {
            const userData = {
                id: formData.id,
                uName: formData.uName,
                uEmail: formData.uEmail,
                uPhone: formData.uPhone,
                uAddress: formData.uAddress,
                uRole: formData.uRole
            };

            const response = await userApi.updateProfile(userData);
            if (response.status === 'OK') {
                return response.data.user;
            } else {
                return rejectWithValue(response.message || 'Cập nhật thông tin thất bại');
            }
        } catch (error) {
            console.error('Update profile error:', error);
            return rejectWithValue(error.response?.data?.message || error.message || 'Cập nhật thông tin thất bại');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: { users: [], error: null, loading: false },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action) => {
            const { id, ...updatedUser } = action.payload;
            state.users = state.users.map(user =>
                user._id === id ? { ...user, ...updatedUser } : user
            );
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = [action.payload];
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload;
                state.users = state.users.map(user =>
                    user._id === updatedUser._id ? updatedUser : user
                );
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer; 