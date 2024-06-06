import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar } from '@/Components/ui/calendar';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/Components/ui/select';
import { Button } from './ui/button';
import { RootState, AppDispatch } from '../store/store';
import { setSortValue, handleSort } from '../store/todoSlice';

const RightSidebar = () => {
	const dispatch = useDispatch<AppDispatch>();
	const sortValue = useSelector((state: RootState) => state.todos.sortValue);

	const [date, setDate] = useState<Date | undefined>(new Date());

	useEffect(() => {
		console.log(sortValue);
	}, [sortValue, dispatch]);

	const handleSortTodo = () => {
		dispatch(handleSort());
		// dispatch(fetchTodos());
	};

	return (
		<div className='right-sidebar lg:block bg-[#252525] p-4 col-span-1 hidden '>
			<Calendar
				mode='single'
				selected={date}
				onSelect={setDate}
				className='w-min mx-auto h-3/5'
			/>
			<section className='mt-8 sort-todos flex gap-x-4 justify-start items-center mb-8'>
				<h2 className='font-semibold '>Sort</h2>

				<Select
					onValueChange={(value: string) => dispatch(setSortValue(value))}
					defaultValue='priority'>
					<SelectTrigger className='w-[180px] p-2'>
						<SelectValue placeholder='All' />
					</SelectTrigger>
					<SelectContent className='text-white'>
						<SelectItem value='all'>All</SelectItem>
						<SelectItem value='date'>Date</SelectItem>
						<SelectItem value='priority'>Priority</SelectItem>
					</SelectContent>
				</Select>
			</section>
			<Button onClick={handleSortTodo}>Sort</Button>
		</div>
	);
};

export default RightSidebar;
