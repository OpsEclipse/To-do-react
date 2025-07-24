import leavesImg from '../assets/leaves.png';
export const LoginHeading = () => {
	return (
		<div className="loginHeading">
			<img src={leavesImg} alt="leaves" className="leafIcon" />
			<h1>Login</h1>
			<img src={leavesImg} alt="leaves" className="leafIcon" />
		</div>
	);
};
