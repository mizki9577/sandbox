import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub'

const node = (value, left=null, right=null) => ({
  value, left, right,
})

@AutoSubscribeStore
class Store extends StoreBase {
  constructor() {
    super()
    this._tree = node(5, node(3, node(1), node(2)), node(2))
    this._selectedNode = this._tree
  }

  selectNode(targetNode) {
    this._selectedNode = targetNode
    this.trigger()
  }

  @autoSubscribe
  getTree() {
    return this._tree
  }

  @autoSubscribe
  getSelectedNode() {
    return this._selectedNode
  }
}

export default new Store()
// vim: ts=2 sw=2 et:
