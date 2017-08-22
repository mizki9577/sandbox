import React from 'react'

const CENTS = [
  0     , 200   , 300   , 500   , 700   , 800   , 1000  ,
  1200  , 1400  , 1500  , 1700  , 1900  , 2000  , 2200  ,
  2400  , 2600  , 2700  , 2900  , 3100  , 3200  , 3400  ,
  3600  , 3800  , 3900  , 4100  , 4300  , 4400  , 4600  ,
  4800  , 5000  , 5100  , 5300  , 5500  , 5600  , 5800  ,
  6000  , 6200  , 6300  , 6500  , 6700  , 6800  , 7000  ,
  7200  , 7400  , 7500  , 7700  , 7900  , 8000  , 8200  ,
  8400  , 8600  , 8700  , 8900  , 9100  , 9200  , 9400  ,
  9600  , 9800  , 9900  , 10100 , 10300 , 10400 , 10600 ,
  10800 , 11000 , 11100 , 11300 , 11500 , 11600 , 11800 ,
]

class App extends React.Component {
  constructor(props) {
    super(props)
    const { width, height } = this.props

    const field = []
    for (let y = 0; y < height; ++y) {
      const row = []
      for (let x = 0; x < width; ++x) {
        row.push(Math.random() < 0.5)
      }
      field.push(row)
    }

    this.timerId = null
    this.audioContext = new AudioContext()

    this.state = {
      svgWidth: 0,
      svgHeight: 0,
      bpm: 120,
      isPlaying: false,
      cursor: 0,

      field,
    }
  }

  componentWillMount() {
    this.fitToWindow()
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.fitToWindow())
  }

  fitToWindow() {
    const { innerWidth, innerHeight } = window

    this.setState({
      svgWidth: innerWidth,
      svgHeight: innerHeight,
    })
  }

  handlebpmChange(ev) {
    this.setState({ bpm: Number(ev.target.value) })
  }

  handlePlayToggle() {
    this.setState(prevState => ({ isPlaying: !prevState.isPlaying }))

    if (!this.state.isPlaying) {
      this.timerId = window.setTimeout(() => this.beat(), 1000 * 60 / this.state.bpm)
    } else if (this.timerId !== null) {
      window.clearTimeout(this.timerId)
      this.timerId = null
    }
  }

  beat() {
    const cursor = (this.state.cursor + 1) % this.props.width
    let field = this.state.field
    if (cursor === 0) {
      const { width, height } = this.props
      const nextField = []
      for (let y = 0; y < height; ++y) {
        const nextRow = []
        for (let x = 0; x < width; ++x) {
          let neighbor = 0
          if (field[(y+height-1)%height][(x+width-1)%width]) ++neighbor
          if (field[(y+height-1)%height][(x        )      ]) ++neighbor
          if (field[(y+height-1)%height][(x+1      )%width]) ++neighbor
          if (field[(y         )       ][(x+width-1)%width]) ++neighbor
          if (field[(y         )       ][(x+1      )%width]) ++neighbor
          if (field[(y+1       )%height][(x+width-1)%width]) ++neighbor
          if (field[(y+1       )%height][(x        )      ]) ++neighbor
          if (field[(y+1       )%height][(x+1      )%width]) ++neighbor

          nextRow.push((field[y][x] && (neighbor === 2 || neighbor === 3)) || (!field[y][x] && neighbor === 3))
        }
        nextField.push(nextRow)
      }

      field = nextField
    }

    this.setState({ cursor, field })

    if (this.state.isPlaying) {
      this.timerId = window.setTimeout(() => this.beat(), 1000 * 60 / this.state.bpm)
    }

    for (let y = 0; y < this.props.height; ++y) {
      if (!field[y][cursor]) continue

      const oscillator = this.audioContext.createOscillator()
      oscillator.frequency.value = 440
      oscillator.detune.value = CENTS[y]
      oscillator.connect(this.audioContext.destination)
      oscillator.start()
      oscillator.stop(this.audioContext.currentTime + 60 / this.state.bpm)
    }
  }

  render() {
    const { width, height } = this.props
    const { svgWidth, svgHeight, bpm, isPlaying, cursor, field } = this.state

    return (
      <div>
        <svg width={ svgWidth } height={ svgHeight } viewBox={ `0 0 ${ width } ${ height }` } preserveAspectRatio="xMidYMid meet">
          { field.map((row, y) => row.map((cell, x) => <rect x={ x } y={ y } width={ 1 } height={ 1 } fill={ x === cursor ? (cell ? 'gray' : 'silver') : (cell ? 'black' : 'white') } />)) }
        </svg>

        <div id="controls">
          <button onClick={ () => this.handlePlayToggle() }>
            { isPlaying ? 'Pause' : 'Play' }
          </button>
          <label>
            BPM:
            <input type="number" value={ bpm } onChange={ ev => this.handlebpmChange(ev) } />
          </label>
        </div>
      </div>
    )
  }
}

export default App
// vim: set ts=2 sw=2 et:
