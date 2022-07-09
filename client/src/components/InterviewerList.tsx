import "./styles/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

// = type definitions =
interface Props {
  interviewers: Interviewer[];
  value: Interviewer['id'] | null;
  student?: Student;
  handleChange: (id: Interviewer['id']) => void;
};

const InterviewerList: React.FC<Props> = (props) => {
  const interviewers = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.handleChange(interviewer.id)}
    />)
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
};

export default InterviewerList;