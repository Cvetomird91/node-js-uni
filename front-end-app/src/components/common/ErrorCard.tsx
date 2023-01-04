import ErrorCardProps from "../../types/common/ErrorCardProps";

function ErrorCard(props: ErrorCardProps) {
    return (
        <>
            {props.error && (
                <div className="row">
                    <div className="card large error">
                    <section>
                        <p>
                        <span className="icon-alert inverse "></span>
                        {props.error}
                        </p>
                    </section>
                    </div>
                </div>
            )}
        </>
    );
}

export default ErrorCard;