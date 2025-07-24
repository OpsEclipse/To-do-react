export const LoginInput = ({placeholder, handleChange, value, type}) => {
    return (
		<div className="textInput login">
			<input
				type={type}
				className="search"
                placeholder={placeholder}
				onChange={handleChange}
				value = {value}
			/>
		</div>
	);
}