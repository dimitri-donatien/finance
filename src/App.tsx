import { Component, ParentProps } from "solid-js";

import Navbar from "./components/Navbar";

const App: Component<ParentProps> = props => {

  return (
    <>
      <Navbar />
      {props.children}
    </>
  )
}

export default App