import React, { Component } from 'react';
import Concentrations from './Concentrations/Concentrations';
import style from '../../../Global.module.css';
import Aux from '../../../Auxiliary';

class degree extends Component {

    state = {
        concentrations: []
    }

    getDegreeValue = ( event ) => {
        const concentration = [];

        // eslint-disable-next-line
        for ( let key in this.props.degrees ) {
            //only get the partial degree data that matches the degree name/user's choice
            //this will include only the concetrations that belong to a particular degree
            if ( this.props.degrees[ key ].degreeName === event.target.value ) {
                concentration.push( this.props.degrees[ key ] );
            }
        }
        this.setState( { concentrations: concentration } );
    }

    render() {
        const uniqueDegrees = [];

        //the same degree can have multiple concentrations
        //this pushes unique names to avoid degree duplications
        for ( let i = 0; i < this.props.degrees.length; i++ ) {
            if ( !( uniqueDegrees.includes( this.props.degrees[ i ].degreeName ) ) ) {
                uniqueDegrees.push( this.props.degrees[ i ].degreeName );
            }
        }
        const concentration = this.state.concentrations.length !== 0
            ? <Concentrations concentrations={ this.state.concentrations } />
            : null;


        return (

            <Aux className={ style.space }>
                <select onChange={ this.getDegreeValue }>
                    <option value={ '' }>CHOOSE A DEGREE</option>
                    {
                        uniqueDegrees.map( degree =>
                            <option
                                key={ degree }
                                value={ degree }>
                                { degree }
                            </option>
                        )
                    }
                </select>
                { concentration }
            </Aux>
        )
    }




}

export default degree;