import Inferno from 'inferno'
import Component from 'inferno-component'

class FuzzyGameOfLife extends Component {
  constructor(props) {
    super(props)

    const field = []
    for (let y = 0; y < props.height; ++y) {
      const row = []
      for (let x = 0; x < props.width; ++x) {
        row.push(Math.random())
      }
      field.push(row)
    }

    this.state = { field }
  }

  componentDidMount() {
    window.requestAnimationFrame(() => this.tick())
  }

  tick() {
    const { width, height } = this.props
    const { field } = this.state
    const nextField = []

    for (let y = 0; y < this.props.height; ++y) {
      const nextRow = []
      for (let x = 0; x < this.props.width; ++x) {
        const currentCell = field[y][x]
        let nextCell = 0

        const neighbors = field[(y+height-1)%height][(x+width-1)%width]
                        + field[(y+height-1)%height][x                ]
                        + field[(y+height-1)%height][(x+1)%width      ]
                        + field[y                  ][(x+width-1)%width]
                        + field[y                  ][(x+1)%width      ]
                        + field[(y+1)%height       ][(x+width-1)%width]
                        + field[(y+1)%height       ][x                ]
                        + field[(y+1)%height       ][(x+1)%width      ]

        if (neighbors <= 1) nextCell = 0
        else if (1 < neighbors && neighbors <= 2) nextCell = (neighbors - 1) * currentCell
        else if (2 < neighbors && neighbors <= 3) nextCell = currentCell + (neighbors - 2) * (1 - currentCell)
        else if (3 < neighbors && neighbors <= 4) nextCell = 4 - neighbors
        else if (4 < neighbors) nextCell = 0

        nextRow.push(nextCell)
      }
      nextField.push(nextRow)
    }

    this.setState({ field: nextField })
    window.requestAnimationFrame(() => this.tick())
  }

  render() {
    const { width, height, style } = this.props
    const { field } = this.state

    return (
      <svg viewBox={ `0 0 ${ width } ${ height }` } style={ style }>
        { this.state.field.map((row, y) => row.map((cell, x) => <rect x={ x } y={ y } width={ 1 } height={ 1 } fill={ `rgba(0,0,0,${ cell })` } />)) }
      </svg>
    )
  }
}

export default FuzzyGameOfLife
// vim: set ts=2 sw=2 et:
