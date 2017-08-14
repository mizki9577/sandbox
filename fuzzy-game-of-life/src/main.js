import Inferno from 'inferno'

import FuzzyGameOfLife from './FuzzyGameOfLife.js'

Inferno.render(
  <FuzzyGameOfLife width={ 100 } height={ 100 } style={{ width: '800px', height: '800px'}} />,
  document.getElementsByTagName('main')[0]
)
// vim: set ts=2 sw=2 et:
