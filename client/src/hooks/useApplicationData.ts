import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

// = local helpers =
const updateSpots = (state: IState, appointments: IState['appointments']) => {
  // count null interviews for day
  const day = state.days.find((day) => day.name === state.day);
  const spots = day?.appointments.filter((id) => !appointments[id].interview).length;

  // copy days array and update selected day spots
  return state.days.map((day) => day.name === state.day ? { ...day, spots } : { ...day });
};


// = main hook function =
const useApplicationData = () => {
  // = App state =
  const [state, setState] = useState<IState>({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const [dark, setDark] = useState(true);

  // = effects =
  // get interview data from database on initial page load
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then((res) => {
        setState((prev) => ({
          ...prev,
          days: res[0].data,
          appointments: { ...res[1].data },
          interviewers: { ...res[2].data },
        }));
      })
      .catch((e) => { console.error(e); });
  }, []);

  const classes = useMemo((() => dark ? 'dark' : ''), [dark])

  // = exported helpers =
  const setDay = useCallback((day: IDay['name']) => { setState((prev) => ({ ...prev, day })); }, []);
  const toggleDark = useCallback(() => { setDark((prev) => !prev) }, []);

  /**
   * @param {number} id id of appointment component
   * @param {object?} interview if no interview is given a delete request will be made, otherwise a put request will be made to update the existing appointment
   */
  const updateAppointment: UpdateAppointment = useCallback(async (id, interview) => {
    // update db with new interview or delete interview
    return await (interview
      ? axios.put('/api/appointments/' + id, { interview })
      : axios.delete('/api/appointments/' + id)
    )
      // add or remove interview and recount spots
      .then((res) => {
        const appointment = { ...state.appointments[id], interview };
        const appointments = { ...state.appointments, [id]: appointment };
        const days = updateSpots(state, appointments);

        setState((prev) => ({ ...prev, appointments, days }));
      });
  }, [state]);

  return { state, classes, toggleDark, setDay, updateAppointment };
};

export default useApplicationData;
