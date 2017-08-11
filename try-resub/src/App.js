import React from 'react'
import { ComponentBase } from 'resub'
import store from './store.js'
import Node from './Node.js'

class App extends ComponentBase {
  _buildState(props, initialBuild) {
    return {
      tree: store.getTree(),
      selectedNode: store.getSelectedNode(),
    }
  }

  render() {
    return (
      <Node node={ this.state.tree } selectedNode={ this.state.selectedNode } />
    )
  }
}

export default App
// vim: ts=2 sw=2 et:
