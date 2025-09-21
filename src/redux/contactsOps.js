import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// 👉 ЗАМІНИ на свій URL з mockapi.io (ресурс /contacts)
axios.defaults.baseURL = 'https://68d041c2ec1a5ff33826e0d2.mockapi.io/';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/contacts');
      return data; // масив контактів
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const { data } = await axios.post('/contacts', { name, number });
      return data; // об'єкт контакту від бекенду з id
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id; // повертаємо id, щоб видалити на клієнті
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
