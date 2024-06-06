import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Zap, CircleChevronDown } from 'lucide-react';
import {
	fetchTodos,
	addCollection,
	setActiveCollection,
	deleteCollection,
} from '../store/todoSlice';

const LeftSidebar = () => {
	const dispatch = useDispatch<AppDispatch>();
	const collections = useSelector(
		(state: RootState) => state.todos.collections
	);
	const activeCollection = useSelector(
		(state: RootState) => state.todos.activeCollection
	);

	const [newCollectionInput, setNewCollectionInput] = useState('');
	const [isClicked, setIsClicked] = useState(false);

	const handleAddCollection = () => {
		if (newCollectionInput.trim() !== '') {
			dispatch(addCollection(newCollectionInput.trim()));
			setNewCollectionInput('');
		}
		setIsClicked(false);
	};
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	useEffect(() => {
		dispatch(fetchTodos());
	}, [activeCollection, dispatch]);

	return (
		<div className='left-sidebar bg-[#252525] p-4  md:col-span-1'>
			<div className=' flex justify-between items-center md:mb-8'>
				<h1 className='font-bold text-xl md:text-2xl  flex items-center gap-x-2'>
					<Zap />
					<span>TaskMinder</span>
				</h1>
				<CircleChevronDown
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className={`${
						isMenuOpen ? 'rotate-180' : ''
					} md:hidden transition-transform`}
				/>
			</div>
			{isMenuOpen && (
				<div
					className={`mt-6 ${
						isMenuOpen ? 'translate-y-0' : '-translate-y-full'
					}`}>
					<div className='list-container'>
						<h2 className=' font-semibold tracking-wider'>My Lists</h2>
						<ul className='mt-4 mb-2'>
							{collections.map(collection => (
								<li
									className={`px-2 py-2 flex justify-between text-[1.05rem] cursor-pointer text-white transition-colors rounded-lg ${
										collection === activeCollection
											? 'bg-[#f6c76c] font-semibold text-black '
											: ''
									}`}
									key={collection}
									onClick={() => dispatch(setActiveCollection(collection))}>
									{collection}
									{collection === activeCollection &&
									activeCollection !== 'List1' ? (
										<span
											className='text-xl'
											onClick={() => dispatch(deleteCollection())}>
											×
										</span>
									) : (
										''
									)}
								</li>
							))}
						</ul>
					</div>
					<div>
						{isClicked ? (
							<div className='flex justify-between items-center rounded-lg overflow-hidden'>
								<input
									className='px-4 py-2 outline-none w-[95%] text-white bg-white/5'
									type='text'
									value={newCollectionInput}
									onChange={e => setNewCollectionInput(e.target.value)}
									placeholder='New collection'
								/>
								<button
									className='bg-white/5 hover:bg-white/10 border-s-2 border-white/20 px-3 py-1.5 text-center text-white/80 font-bold text-xl hover:text-white/75'
									onClick={handleAddCollection}>
									+
								</button>
							</div>
						) : (
							<button
								className='block hover:bg-white/5 border border-dashed border-white/0 hover:border-white/20 px-4 py-2 mb-2 rounded-md w-full text-left text-white/50 hover:text-white/75'
								onClick={() => setIsClicked(true)}>
								+ New List
							</button>
						)}
					</div>
				</div>
			)}
			<div className={`hidden md:block`}>
				<div className='list-container'>
					<h2 className=' font-semibold tracking-wider'>My Lists</h2>
					<ul className='mt-4 mb-2'>
						{collections.map(collection => (
							<li
								className={`px-2 py-2 flex justify-between text-[1.05rem] cursor-pointer text-white transition-colors rounded-lg ${
									collection === activeCollection
										? 'bg-[#f6c76c] font-semibold text-black '
										: ''
								}`}
								key={collection}
								onClick={() => dispatch(setActiveCollection(collection))}>
								{collection}
								{collection === activeCollection &&
								activeCollection !== 'List1' ? (
									<span
										className='text-xl'
										onClick={() => dispatch(deleteCollection())}>
										×
									</span>
								) : (
									''
								)}
							</li>
						))}
					</ul>
				</div>
				<div>
					{isClicked ? (
						<div className='flex justify-between items-center rounded-lg overflow-hidden'>
							<input
								className='px-4 py-2 outline-none w-[95%] text-white bg-white/5'
								type='text'
								value={newCollectionInput}
								onChange={e => setNewCollectionInput(e.target.value)}
								placeholder='New collection'
							/>
							<button
								className='bg-white/5 hover:bg-white/10 border-s-2 border-white/20 px-3 py-1.5 text-center text-white/80 font-bold text-xl hover:text-white/75'
								onClick={handleAddCollection}>
								+
							</button>
						</div>
					) : (
						<button
							className='block hover:bg-white/5 border border-dashed border-white/0 hover:border-white/20 px-4 py-2 mb-2 rounded-md w-full text-left text-white/50 hover:text-white/75'
							onClick={() => setIsClicked(true)}>
							+ New List
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default LeftSidebar;
