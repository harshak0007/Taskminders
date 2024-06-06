import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/Components/ui/accordion';
import { Checkbox } from '@/Components/ui/checkbox';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import {
	fetchTodos,
	setToDoItem,
	deleteTodo,
	setEditToDoItem,
	setToDoComponents,
	handleCheckboxClick,
	setIdCounter,
} from '../store/todoSlice';
import ToDoComponent from '../Components/TodoComponent';
import EditTodoForm from '../Components/EditTodoForm';
import { ToDoItem } from '@/context/types';
import { Sorting } from './Sorting';

const MainContent = () => {
	const dispatch: AppDispatch = useDispatch();
	const {
		toDoItems,
		editToDoItem,
		idCounter,
		activeCollection,
		toDoComponents,
	} = useSelector((state: RootState) => state.todos);

	const handleAddTodo = () => {
		dispatch(setToDoComponents(<ToDoComponent />));
		dispatch(setIdCounter(idCounter + 1));
	};

	const handleCheckbox = (item: ToDoItem) => {
		console.log(item);
		if (item) {
			dispatch(handleCheckboxClick(item));
		}
	};

	const handleDeleteTodo = (id: number) => {
		dispatch(deleteTodo(id));
	};

	const handleEditTodo = async (items: ToDoItem) => {
		dispatch(setEditToDoItem(items));
		if (editToDoItem) {
			dispatch(setToDoComponents(<EditTodoForm />));
			const data = toDoItems.filter(item => item.id !== editToDoItem.id);
			console.log(data);
			dispatch(setToDoItem(data));
		}
	};

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch, activeCollection]);

	return (
		<div className='main-content bg-[#131313] p-6 md:p-12 md:overflow-y-scroll h-full'>
			<h2 className='block leading-[1.25] text-2xl md:text-5xl font-bold text-white/85 tracking-normal'>
				Good Afternoon.
				<span className='block  text-white/50'>
					What's your plan for today?
				</span>
			</h2>

			<section className='todos mt-8 md:mt-12'>
				<button
					className={`bg-white/5 border border-dashed border-white/0 px-6 py-4 rounded-md w-full text-left text-white/50 hover:text-white/75 outline-none`}
					onClick={handleAddTodo}>
					Add Todo
				</button>
				<Sorting/>
				<div className='todo-components'>{toDoComponents}</div>

				<div className='todo-list mt-4'>
					{toDoItems.map(item => (
						<Accordion
							key={item.id}
							type='single'
							collapsible>
							<AccordionItem
								value={`item-${item.id}`}
								className=''>
								<AccordionTrigger>
									<div className='flex items-center gap-x-4'>
										<Checkbox
											checked={item.isCompleted}
											onClick={() => handleCheckbox(item)}
										/>
										<div className='flex flex-col justify-between items-start gap-y-2'>
											<h3>{item.task}</h3>
											<small className='text-white/50 text-xs'>
												{item.date.toString().substring(0, 10)}
											</small>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent className='ml-7 mt-2 flex justify-between  items-center'>
									<Badge
										className='self-start'
										variant='default'>
										{item.priority === 1
											? 'High'
											: item.priority === 0
											? 'Normal'
											: 'Low'}
									</Badge>
									<div className='self-end inline-flex mt-8 gap-x-4'>
										<Button onClick={() => handleEditTodo(item)}>Edit</Button>
										<Button onClick={() => handleDeleteTodo(item.id)}>
											Delete
										</Button>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</section>
		</div>
	);
};

export default MainContent;
