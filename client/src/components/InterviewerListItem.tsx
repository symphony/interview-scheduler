import './styles/InterviewerListItem.scss';
import classNames from 'classnames';

// = type declarations =
interface Props {
  selected: boolean;
  name: Interviewer['name'];
  avatar: Interviewer['avatar'];
  setInterviewer: Function;
};


const InterviewerListItem: React.FC<Props> = (props) => {
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  return (
    <li className={interviewerClass} selected={props.selected} onClick={props.setInterviewer}>
      <img className={'interviewers__item-image'} src={props.avatar} alt={props.name + ' profile picture'} />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;