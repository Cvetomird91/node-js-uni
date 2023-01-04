import LoadingSpinnerProps from "../../types/common/LoadingSpinnerProps";

function LoadingSpinner(props: LoadingSpinnerProps) {
    return (
        <>
            {props.loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
        </>
    );
}

export default LoadingSpinner;