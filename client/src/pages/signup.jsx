import { useContext, useEffect, useState } from 'react';
import { LoginHeading } from '../components/LoginHeading';
import { LoginInput } from '../components/LoginInput';
import { Submit } from '../components/Submit';
import { Context } from '../context/Context';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Signup = () => {
	const {
		setUser,
		setPassword,
		postUser,
		user,
		password,
		displayName,
		setDisplayName,
		setMismatch,
        setIsVerificationError,
	} = useContext(Context);
	const [confirmPass, setConfirmPass] = useState('');
	const navigate = useNavigate();
	const handleUserChange = (e) => {
		e.preventDefault();
		setUser(e.target.value);
	};
	const handleDisplayNameChange = (e) => {
		e.preventDefault();
		setDisplayName(e.target.value);
	};
	const handlePasswordChange = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	};
	const handleConfirmPasswordChange = (e) => {
		e.preventDefault();
		setConfirmPass(e.target.value);
	};
	useEffect(() => {
		setIsVerificationError(false);
	}, []);
	return (
		<div className="login app">
			<div className="login-container">
				<LoginHeading text="Sign Up" />
				<LoginInput
					placeholder="Username"
					handleChange={(e) => handleUserChange(e)}
					value={user}
					type="text"
				/>
				<LoginInput
					placeholder="Display Name ( Optional )"
					handleChange={(e) => handleDisplayNameChange(e)}
					value={displayName}
					type="text"
				/>
				<LoginInput
					placeholder="Password"
					handleChange={(e) => handlePasswordChange(e)}
					value={password}
					type="password"
				/>

				<LoginInput
					placeholder="Confirm Password"
					handleChange={(e) =>
						handleConfirmPasswordChange(e)
					}
					value={confirmPass}
					type="password"
				/>

				<Submit
					verifyErrorText="signup"
					handleClick={async () => {
						if (password === confirmPass) {
							let success = await postUser();
							if (success) {
								navigate('/app');
							}
						} else {
							setMismatch(true);
						}
					}}
				/>
				<p>
					Already have an account?{' '}
					<span style={{ textDecoration: 'underline' }}>
						<Link to={'/login'}>Login</Link>
					</span>{' '}
				</p>
			</div>
		</div>
	);
};
