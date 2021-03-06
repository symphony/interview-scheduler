interface Props {
  status: string;
};

const Status: React.FC<Props> = (props) => {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.status}</h1>
    </main>
  );
};

export default Status;