import { useContext } from 'react';
import { Context } from '../context/Context';

export const Submit = ({ handleClick }) => {
	const { isVerificationError } = useContext(Context);
	return (
		<div style={{"display":"flex", "alignItems": "center", "flexDirection":"column"}}>
			{isVerificationError ? (
				<p className="error">
					Looks like you don't have an account.{' '}
					<span style={{ textDecoration: 'underline' }}>
						Sign Up
					</span>
				</p>
			) : null}

			<button className="submit-btn" onClick={handleClick}>
				Submit
			</button>
		</div>
	);
};
