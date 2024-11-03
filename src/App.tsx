import { Component, ParentProps, Show } from "solid-js";

import Login from './components/LoginForm';
import Register from './components/RegisterForm';

import { user } from './stores/authStore';

const App: Component<ParentProps> = props => {

  return (
    <>
      <Show when={user()} fallback={<><Register /><Login /></>}>
        {props.children}
      </Show>
    </>
  )
}

export default App