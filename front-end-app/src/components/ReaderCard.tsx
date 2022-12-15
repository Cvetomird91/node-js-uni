import ReaderCardProps from "../types/ReaderCardProps";

function ReaderCard(props: ReaderCardProps) {
    const { reader } = props;
    return (
        <div className="card">
          <section className="section dark">
            <div><i>{reader.firstName}</i></div>
            <div><i>{reader.lastName}</i></div>
            <div><i>{reader.status == 0 ? "" : "" }</i></div>
          </section>
        </div>
      )
}

export default ReaderCard;