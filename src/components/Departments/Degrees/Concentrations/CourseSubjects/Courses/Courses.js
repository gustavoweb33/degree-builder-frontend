import React, { Component } from 'react';
import DisplayCourses from './DisplayCourses';

class CoursesClass extends Component {
    state = {
        courses: [],
        resetCourses: []
    }

    //updates everytime the select option changes in CourseSubject
    componentDidUpdate( prevProps ) {
        //the option with the text 'subject' has a value/subjectId of 0
        //no such subject exits in the database so nothig is returned
        if ( this.props.subjectId === 0 ) { return; }

        if ( this.props.subjectId !== prevProps.subjectId ) {
            fetch( `http://localhost:4000/courses?id=${ this.props.subjectId }` )
                .then( results => results.json() )
                .then( courses => this.setState( { courses: courses } ) )
                .catch( error => console.log( error ) );
        }
    }

    render() {
        const showCourses = this.state.courses.length === 0
            ? null
            : <DisplayCourses
                courses={ this.state.courses }
                concentration={ this.props.concentration } />

        return (
            <div>
                { showCourses }
            </div>
        )
    }
}

export default CoursesClass;