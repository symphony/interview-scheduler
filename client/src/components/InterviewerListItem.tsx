import classNames from 'classnames';
import './styles/InterviewerListItem.scss';

// = type definitions =
interface Props {
  selected: boolean;
  name: Interviewer['name'];
  avatar: Interviewer['avatar'];
  setInterviewer: () => void;
};


const InterviewerListItem: React.FC<Props> = (props) => {
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img className={'interviewers__item-image'} src={props.avatar} alt={props.name + ' profile picture'} />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;