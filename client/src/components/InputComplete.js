import React from 'react'
import * as Icone from 'react-bootstrap-icons';
//  SearchBar

class SearchInput extends React.Component {

  constructor(props) {
    super(props)
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value)
  }

  render() {
    const { filterText } = this.props
    const EMPTY_TEXT = '';
    return (

      <div className="input-box">
        {filterText.trim() === EMPTY_TEXT ? <Icone.GeoAlt color="#05172F" className="icone" /> : <Icone.Search color="#05172F" className="icone" />}
        <input type="text" placeholde='Rechercher'
          value={filterText}
          onChange={this.handleFilterTextChange}
        />
      </div>
    )
  }
}

class LocationTable extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelectedLocation = this.handleSelectedLocation.bind(this)
    // this.onClicke = this.onClicke.bind(this)
  }

  handleSelectedLocation(lieu) {
    this.props.onLocationSelected(lieu)
  }

  // componentDidMount() {
  //   document.addEventListener("mousedown", this.onClicke);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.onClicke );
  // }

  // onClicke = (event) => {
  //   // event.stopPropagation()
  //   const concernedElement = document.querySelector(".auto-complete-container");
  //   if (!concernedElement.contains(event.target)) {
  //     this.props.onHideLocation()
  //   }
  //   else{
  //     console.log(concernedElement)
  //   }
  // }

  render() {
    const { locations } = this.props
    let rows = []
    let MAX_RESULT = 10;
    // let m_2 = 'me-2'
    if (this.props.filterText.trim().length >= 1) {
      if (locations.length > 0) {
        locations.filter(
          (element) => element.lieu.toLocaleLowerCase().includes(this.props.filterText.toLocaleLowerCase())).map(
            (element, index) => (
              (rows.length < MAX_RESULT) ? rows.push(<div className='auto-complete-item' key={index} onClick={
                (e) => {
                  this.handleSelectedLocation(element.lieu)
                  rows = []
                }
              }> <Icone.GeoAlt color="#05172F" className="icone" /> &nbsp; &nbsp; &nbsp;{element.lieu}</div>
              ) : null
            ))
      }
    }
    return <div className='auto-complete-container'>{this.props.hideLocation === false ? rows : null}</div>
  }
}

class AutocompleteInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      filterText: '',
      hideLocation: false
    }

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleSelectedLocation = this.handleSelectedLocation.bind(this)
    this.handleHideLocation = this.handleHideLocation.bind(this)
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText,
      hideLocation: false
    })

    this.props.setValue(filterText)
  }

  handleSelectedLocation = (filterText) => {
    this.setState({
      filterText,
      hideLocation: true
    })
    this.props.setValue(filterText)
  }

  handleHideLocation = (e) => {
    this.setState({
      hideLocation: true
    })
  }

  render() {
    const { locations } = this.props
    return <div className='auto-comptet-input' onMouseLeave={this.handleHideLocation.bind(this)}>
      <SearchInput
        filterText={this.state.filterText}
        onFilterTextChange={this.handleFilterTextChange}
      // onHideLocation={this.handleHideLocation}
      />
      <LocationTable
        locations={locations}
        filterText={this.state.filterText}
        hideLocation={this.state.hideLocation}
        onLocationSelected={this.handleSelectedLocation}
        onHideLocation={this.handleHideLocation}
      />
    </div>
  }
}

export default AutocompleteInput 
