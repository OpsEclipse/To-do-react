import { Task } from './pages/to-do';
import { Login } from './pages/login';
import './index.css';
import {
	HashRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
	const { user } = useContext(Context);
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Navigate to="/login" replace />}
				/>
				<Route path="/login" element={<Login />} />
				{user !== '' ? (
					<Route path="/app" element={<Task />} />
				) : (
					<Route
						path="/app"
						element={<Navigate to="/login" replace />}
					/>
				)}
			</Routes>
		</Router>
	);
}

export default App;
