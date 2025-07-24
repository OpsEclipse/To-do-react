import { useContext } from 'react';
import { LoginHeading } from '../components/LoginHeading';
import { LoginInput } from '../components/LoginInput';
import { Submit } from '../components/Submit';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const { setUser, setPassword, userAuth, user, password } =
		useContext(Context);
    const navigate = useNavigate();
	const handleUserChange = (e) => {
		e.preventDefault();
		setUser(e.target.value);
	};
	const handlePasswordChange = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	};
	return (
		<div className="login app">
			<div className="login-container">
				<LoginHeading />
				<LoginInput
					placeholder="Username"
					handleChange={(e) => handleUserChange(e)}
					value={user}
					type="text"
				/>
				<LoginInput
					placeholder="Password"
					handleChange={(e) => handlePasswordChange(e)}
					value={password}
					type="password"
				/>
				<Submit
					handleClick={async () => {
						let success = await userAuth(user, password);
                        if (success) {
							navigate('/app');
						}
					}}
				/>
				<p>
					Don't have an account?{' '}
					<span style={{ textDecoration: 'underline' }}>
						Sign Up
					</span>
				</p>
			</div>
		</div>
	);
};
