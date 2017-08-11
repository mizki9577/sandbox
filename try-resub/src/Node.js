import React from 'react'
import store from './store.js'

const Node = ({ node, selectedNode }) => (
  <div style={{ fontFamily: 'monospace', border: 'thin solid black', textAlign: 'center', flexGrow: 1 }}>
    <div onClick={ () => store.selectNode(node) } style={{ background: node === selectedNode ? 'pink' : 'white' }}>
      { node.value }
    </div>
    <div style={{ display: 'flex' }}>
      { node.left  !== null ? <Node node={ node.left  } selectedNode={ selectedNode } /> : null }
      { node.right !== null ? <Node node={ node.right } selectedNode={ selectedNode } /> : null }
    </div>
  </div>
)

export default Node
// vim: ts=2 sw=2 et:
