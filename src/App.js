import React, { Component } from 'react';
import style from './App.module.css';
import Department from './components/Departments/Department';

class App extends Component {

  state = {
    data: [],
    degrees: []
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch( 'http://localhost:4000/degrees' )
      .then( ( response ) => response.json() )
      .then( ( data ) => this.setState( { data: data } ) )  // returns an array of objects
      .catch( ( error ) => console.log( error ) )
  }

  //filter out the department names to render select options to the user
  filterDapartments = () => {
    let departmentName = [];
    if ( this.state.data.length !== 0 ) {
      departmentName = [ ...new Set( this.state.data.map( x => x.departmentName ) ) ]
    }

    const department = this.state.data.length !== 0
      ? <Department
        department={ departmentName }
        filterDegrees={ this.filterDegrees }
        degrees={ this.state.degrees } />
      : <h1>...Loading</h1>

    return department;
  }

  //degrees are filtered out by the name value of the department selected by the user
  filterDegrees = ( event ) => {
    const degrees = this.state.data.filter( x => {
      return x.departmentName.includes( event.target.value );
    } );

    this.setState( { degrees: degrees } );
  }


  render() {
    const department = this.filterDapartments();

    return (
      <div className={ style.background }>
        <h1 className={ style.header }>Degree Builder</h1>
        <div>{ department }</div>
      </div>

    );
  }
}

export default App;
