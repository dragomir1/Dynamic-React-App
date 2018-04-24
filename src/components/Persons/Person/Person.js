import React, { Component } from 'react';
import classes from './Person.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
// this third party package checks the types of incoming properties to make sure they are being used correctly.
import PropTypes from 'prop-types';

// import WithClass from '../../../hoc/WithClass';
// import Radium from 'radium';


class Person extends Component {
  constructor(props) {
    super(props); //must do it this way..add props in constructor and call it in super
    console.log('[Person.js] inside constructor', props);
  }

componentWillMount() {
  console.log('[Person.js] inside componentWillMount');
}

componentDidMount() {
    console.log('[Person.js] inside componentDidMount');
}

  render () {
        console.log('Person.js inside render');
    return (
        <Aux>
        <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old. </p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name}  />
      </Aux>
    )
  }
}

// THIS ABOVE CODE CHANGES THE COMPONEMT TO A STATEFUL COMPONEMT
// const person = (props) => {
//   // const style = {
//   //   '@media (min-width: 500px)': {
//   //       width: '450px'
//   //
//   //   }
//   // };
//   // when adding a style property to component, it will override the class property
//                               //style={style}>
//   // add the classes object and then the Person property attached to it. this is a property that refers to the Person class in you Person.css file
//   return (
//     <div className={classes.Person}>
//       <p onClick={props.click}>I am {props.name} and I am {props.age} years old. </p>
//       <p>{props.children}</p>
//       <input type="text" onChange={props.changed} value={props.name}  />
//     </div>
// )
// };

//Proptypes is a JS object where you can have key/value pairs.  where your keys or PROPERTIES  are the names of the props and the values are the rules or conditions.
// PropTypes doesnt work in funtional components
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};




// THIS IS THE SECOND WAY TO CREATE A HGHER ORDER COMPONEMT. YOU WRAP THE PERSON FUNCTION WITH THE withClass FUCTION AND PASS A SECOND AGRUNEMT OF THE PERSON CSS STYLE.  "PERSON" IS THE WRAPPED COMPPNENT AND THE SECOND ARGUMENT IS THE CSS CLASS.
 export default withClass(Person, classes.Person);
// export default Radium(person);
