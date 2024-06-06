// todoSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ToDoItem {
	isCompleted: boolean;
	id: number;
	task: string;
	date: Date;
	priority: number;
	collection: string;
}

interface ToDoState {
	[x: string]: any;
	toDoItems: ToDoItem[];
	editToDoItem: ToDoItem | undefined;
	sortValue: string;
	activeCollection: string;
	collections: string[];
	idCounter: number;
	toDoComponents: JSX.Element | undefined;
}

const initialState: ToDoState = {
	toDoItems: [],
	editToDoItem: undefined,
	sortValue: 'priority',
	activeCollection: 'List1',
	collections: ['List1'],
	idCounter: 0,
	toDoComponents: undefined,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
	const response = await axios.get(
		'https://todo-app-react-redux-a5sl.onrender.com/api/todos'
	);

	return response.data;
});

export const addTodo = createAsyncThunk(
	'todos/addTodo',
	async (todoItem: ToDoItem) => {
		const response = await axios.post(
			'https://todo-app-react-redux-a5sl.onrender.com/api/todos',
			todoItem
		);
		return response.data;
	}
);

export const editTodo = createAsyncThunk(
	'todos/editTodo',
	async (todoItem: ToDoItem) => {
		const response = await axios.put(
			`https://todo-app-react-redux-a5sl.onrender.com/api/todos/${todoItem.id}`,
			todoItem
		);

		return response.data;
	}
);

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodo',
	async (id: number) => {
		await axios.delete(
			`https://todo-app-react-redux-a5sl.onrender.com/api/todos/delete/${id}`
		);
		return id;
	}
);
export const deleteCollection = createAsyncThunk(
	'todos/deleteCollection',
	async (_, { getState }) => {
		const state = getState() as ToDoState;
		const activeCollection = state.activeCollection;
		await axios.delete(
			`https://todo-app-react-redux-a5sl.onrender.com/api/todos/${activeCollection}`
		);
		return activeCollection;
	}
);
export const handleSort = createAsyncThunk(
	'todos/handleSort',
	async (_, { getState }) => {
		const state = getState() as ToDoState;
		const sortValue = state.todos.sortValue;
		const response = await axios.get(
			`https://todo-app-react-redux-a5sl.onrender.com/api/todos/sort/${sortValue}`
		);
		return response.data;
	}
);
export const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		setToDoItem: (state, action: PayloadAction<ToDoItem[]>) => {
			state.toDoItems = action.payload;
		},
		setEditToDoItem: (state, action: PayloadAction<ToDoItem | undefined>) => {
			state.editToDoItem = action.payload;
		},
		setSortValue: (state, action: PayloadAction<string>) => {
			state.sortValue = action.payload;
		},
		setActiveCollection: (state, action: PayloadAction<string>) => {
			state.activeCollection = action.payload;
		},
		addCollection: (state, action: PayloadAction<string>) => {
			state.collections.push(action.payload);
		},
		setIdCounter: (state, action: PayloadAction<number>) => {
			state.idCounter = action.payload;
		},
		setToDoComponents: (
			state,
			action: PayloadAction<JSX.Element | undefined>
		) => {
			console.log('hello');
			state.toDoComponents = action.payload;
		},
		handleCheckboxClick: (state, action: PayloadAction<ToDoItem>) => {
			console.log('checked');
			const todo = action.payload;
			const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
			axios.patch(
				`https://todo-app-react-redux-a5sl.onrender.com/api/todos/${todo.id}`,
				updatedTodo
			);
			state.toDoItems = state.toDoItems.map(item =>
				item.id === todo.id ? updatedTodo : item
			);
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			state.toDoItems = action.payload;

			let maxIdCounter = 0;
			const collectionsSet = new Set<string>(); // Using Set to collect unique collections

			action.payload.forEach((item: ToDoItem) => {
				maxIdCounter = Math.max(maxIdCounter, item.id); // Find maximum idCounter
				collectionsSet.add(item.collection); // Collect all collections
			});

			state.idCounter = maxIdCounter;
			state.collections = Array.from(collectionsSet);
		});

		builder.addCase(addTodo.fulfilled, (state, action) => {
			state.toDoItems.push(action.payload);
		});
		builder.addCase(handleSort.fulfilled, (state, action) => {
			console.log(action.payload);
			state.toDoItems = action.payload;
		});
		builder.addCase(editTodo.fulfilled, (state, action) => {
			// console.log(action.payload);
			state.toDoItems = state.toDoItems.map(item =>
				item.id === action.payload.id ? action.payload : item
			);
		});
		builder.addCase(deleteTodo.fulfilled, (state, action) => {
			state.toDoItems = state.toDoItems.filter(
				item => item.id !== action.payload
			);
		});
	},
});

export const {
	setEditToDoItem,
	setSortValue,
	setActiveCollection,
	addCollection,
	setIdCounter,
	setToDoComponents,
	handleCheckboxClick,
	setToDoItem,
} = todoSlice.actions;

export default todoSlice.reducer;
