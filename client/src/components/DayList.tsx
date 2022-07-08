import DayListItem from './DayListItem';

const DayList: React.FC<Props> = (props) => {
  const dayListItems = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={() => props.onChange(day.name)}
    />)
  );

  return (
    <ul>
      {dayListItems}
    </ul>
  );
};

export default DayList;