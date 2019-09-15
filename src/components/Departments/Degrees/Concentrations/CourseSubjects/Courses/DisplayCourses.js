import React, { Component } from 'react';
import style from './DisplayCourses.module.css';
import Aux from '../../../../../../Auxiliary';
import { Button } from 'semantic-ui-react'

class DisplayCourses extends Component {

    state = {
        course: [],
        concentration: this.props.concentration,
    }

    getCheckboxValue = ( event ) => {
        const stateCourses = [ ...this.state.course ];


        // //if a course is already in the state. Don't add it or do anything
        //     this.state.course.forEach( course => {
        //         if ( course.courseId.includes( event.target.value ) ) {
        //             return;
        //         }
        //         return;
        //     } );


        //removes a course when it's unchecked 
        if ( event.target.checked === false ) {
            const index = stateCourses.findIndex( course => {
                return course.courseId === event.target.value;
            } );
            stateCourses.splice( index, 1 );
        }

        //if course is never unchecked it will mean checked === true even after the select changes
        this.props.courses.forEach( course => {
            if ( course.courseId === event.target.value && event.target.checked ) {
                stateCourses.push( course );
                return;
            }
        } );

        this.setState( { course: stateCourses } );
        console.log( stateCourses )
    }

    saveCourses = () => {
        let state = JSON.stringify( this.state )
        fetch( `http://localhost:4000/insert?course=${ state }` )
            .then( response => response.json() )
            //sets the state to an empty array so the selected courses don't remain 
            //prevents old data from intertwining with new data 
            .then( data => this.setState( { course: data.resetState } ) )
            .catch( error => console.log( error ) );
    }
    //button is only enabled when courses are selected
    disabledButtonHadler = ( length ) => {
        if ( length > 0 ) {
            return false;
        }
        return true;
    }


    render() {
        let disabled = this.disabledButtonHadler( this.state.course.length );

        return (
            <Aux>
                <div className={ style.coursesContainer }>
                    {
                        this.props.courses.map( course => {
                            return (
                                <div key={ course.courseId }  >

                                    <input type='checkbox'
                                        value={ course.courseId }
                                        onClick={ this.getCheckboxValue } />

                                    <label htmlFor={ course.courseId }>{ course.courseId } ({ course.creditHours })</label>

                                </div>
                            )
                        } )
                    }

                </div>
                <Button
                    color='green'
                    fluid
                    onClick={ this.saveCourses }
                    disabled={ disabled } >
                    Save Courses
                </Button >
            </Aux>
        )
    }
}

export default DisplayCourses;

