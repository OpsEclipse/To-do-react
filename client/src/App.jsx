import { Task } from './pages/to-do';
import { Login } from './pages/login';
import "./index.css"
import {
	HashRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Navigate to="/login" replace />}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/app" element={<Task />} />
			</Routes>
		</Router>
	);
}

export default App;
