import React, { Component } from 'react';
import globalStyle from '../../../../Global.module.css';
import CourseSubjects from './CourseSubjects/CourseSubjects';
import SavedCourses from './SavedCourses';
import style from './Concentrations.module.css';
import { Button } from 'semantic-ui-react'
import Aux from '../../../../Auxiliary';


class Concentration extends Component {

    state = {
        concentrationId: 0,
        data: [],
        display: false
    }

    getClasses = () => {
        //courses are fetch from the database with the matching concentration id
        //then dispalyed to the user
        fetch( `http://localhost:4000/saved?name=${ this.state.concentrationId }` )
            .then( response => response.json() )
            .then( data => this.setState( { data: data } ) )
            .catch( error => console.log( error ) );

        this.setState( { display: true } );
    }


    render() {
        let showSaveCourses = null;
        let courseSubjects = null;
        let showButtons = null;

        //checks if display is true to render the appropriate content
        //clicking button sets it to true
        //will only show the courses already saved otherwise it shows a message
        if ( this.state.display ) {
            showSaveCourses = <SavedCourses
                savedCourses={ this.state.data }
                concentrationId={ this.state.concentrationId }
                concentrations={ this.props.concentrations }
                getClasses={ this.getClasses } />;
        }
        if ( this.state.concentrationId !== 0 ) {
            courseSubjects = <CourseSubjects concentration={ this.state.concentrationId } />
        }

        showButtons =
            <div>
                <Button
                    color='blue'
                    attached='left'
                    onClick={ this.getClasses }>
                    Show saved courses
                </Button>
                <Button
                    color='black'
                    attached='right'
                    onClick={ () => this.setState( { display: false } ) }>
                    Hide Courses
                </Button>
            </div>


        return (
            <Aux className={ globalStyle.space }>
                <select onChange={ ( event ) =>
                    this.setState( { concentrationId: event.target.value, disabled: false } ) }>
                    <option value={ 0 }>CONCENTRATION</option>
                    {
                        this.props.concentrations.map( concentration =>
                            <option
                                key={ concentration.concentrationId }
                                value={ concentration.concentrationId }>
                                { concentration.concentrationDescription }
                            </option>
                        )
                    }
                </select>

                { showButtons }

                <div className={ style.grid }>
                    { showSaveCourses }
                    { courseSubjects }
                </div>

            </Aux>
        )
    }


}

export default Concentration;