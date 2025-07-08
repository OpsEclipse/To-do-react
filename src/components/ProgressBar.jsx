import "../index.css";
export const ProgressBar = ({ progress = 0 }) => {
    return (
        <div className="progressBar">
            <div
                className="progress"
                style={{ width: `${progress * 100}%`}}
            ></div>
        </div>
    )
}