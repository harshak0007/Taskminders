'use client';

import { Button } from '@/Components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { SlidersHorizontal } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setSortValue, handleSort } from '../store/todoSlice';

export function Sorting() {
	const dispatch = useDispatch<AppDispatch>();
	const sortValue = useSelector((state: RootState) => state.todos.sortValue);

	const handleSortValue = (value: string) => {
		dispatch(setSortValue(value));
		dispatch(handleSort());
		// dispatch(fetchTodos());
	};

	return (
		<div className='md:hidden mt-4'>
			<DropdownMenu>
				<DropdownMenuTrigger
					asChild
					className='bg-[#131313]  text-white '>
					<Button>
						<SlidersHorizontal className='size-5' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>Sorting </DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup
						value={sortValue}
						onValueChange={value => {
							handleSortValue(value);
						}}>
						<DropdownMenuRadioItem value='all'>None</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='priority'>
							Priority
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='date'>Date</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
