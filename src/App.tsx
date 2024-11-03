import { Component, ParentProps, Show } from "solid-js";

import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';

import { user } from './stores/authStore';

const App: Component<ParentProps> = props => {

  return (
    <>
      <Show when={user()} fallback={<><Signup /><Login /></>}>
        <p>Welcome, {user()?.email}</p>
        {props.children}
        <Logout />
      </Show>
    </>
  )
}

export default App