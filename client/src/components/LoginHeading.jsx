import leavesImg from '../assets/leaves.png';
export const LoginHeading = ({text}) => {
	return (
		<div className="loginHeading">
			<img src={leavesImg} alt="leaves" className="leafIcon" />
			<h1>{text}</h1>
			<img src={leavesImg} alt="leaves" className="leafIcon" />
		</div>
	);
};
