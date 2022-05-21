import React, { useState } from 'react';
import './styles.scss';

import useVisualMode from 'hooks/useVisualMode';

import Confirm from './Confirm';
import Empty from './Empty';
import Error from './Error';
import Form from './Form';
import Header from './Header';
import Show from './Show';
import Status from './Status';


const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';


export default (props) => {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  return (
    <article className='appointment'>
      {props.time && <Header time={props.time} />}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...props.interview} />}
      {mode === CREATE &&
        <Form
          {...props}
          onCancel={() => transition(EMPTY)}
          onSave={() => { console.log('hello saveed'); }}
        />}

    </article>
  );
};