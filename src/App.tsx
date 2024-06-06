import { useEffect } from 'react';
import { fetchTodos } from './store/todoSlice';
import MainContent from './Components/MainContent';
import LeftSidebar from './Components/LeftSideBar';
import RightSidebar from './Components/RightSidebar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store'; // adjust the path as necessary

const App = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	return (
		<div className='grid lg:grid-cols-[.6fr_2fr_1fr] md:grid-cols-[.8fr_2fr] h-full md:overflow-hidden md:h-dvh md:max-h-dvh min-w-[290px] text-white'>
			<LeftSidebar />
			<MainContent />
			<RightSidebar />
		</div>
	);
};

export default App;
