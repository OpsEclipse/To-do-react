import { useContext } from 'react';
import { Context } from '../context/Context';
import { Link } from 'react-router-dom';

export const Submit = ({ handleClick, verifyErrorText }) => {
	const { isVerificationError, mismatch } = useContext(Context);
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			{isVerificationError && verifyErrorText === 'login' ? (
				<p className="error">
					Looks like you don't have an account.{' '}
					<span style={{ textDecoration: 'underline' }}>
						<Link to={'/signup'}>Sign Up</Link>
					</span>{' '}
				</p>
			) : null}
			{isVerificationError && verifyErrorText === 'signup' ? (
				<p className="error">
					Looks like the username is taken, either{' '}
					<span style={{ textDecoration: 'underline' }}>
						<Link to={'/login'}>Login</Link>
					</span>{' '}
					or try with a different username.{' '}
				</p>
			) : null}
			{mismatch ? (
				<p className="error">passwords don't match. </p>
			) : null}

			<button className="submit-btn" onClick={handleClick}>
				Submit
			</button>
		</div>
	);
};
