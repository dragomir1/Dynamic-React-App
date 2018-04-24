// import React from 'react';
import Person from './Person/Person';
// when changing from a statless to stateful, you need to imported
// PureComponent is an object that is the same as component but has the 'shouldComponentUpdate' method build it.
import React, { PureComponent } from 'react';


// this is the default es6 one line notation.
// if you only have one line with parathensis, this automaticaly get returned you can omit the 'return' statement.

// since this is function and not a class component, you need to switch "this" with "props".  YOU ALSO NEED TO Change the method name from "deletePersonHandler" to the property name that holds it..."clicked"


// CHANGING FROM STATELESS TO STATFUL Component
class Persons extends PureComponent {
  constructor(props) {
    super(props); //must do it this way..add props in constructor and call it in super
    console.log('[Persons.js] inside constructor', props);
  }

componentWillMount() {
  console.log('[Persons.js] inside componentWillMount');
}

componentDidMount() {
    console.log('[Persons.js] inside componentDidMount');
}

// COMPONEMT UPDATING LIFECYCLE IN ACTION...
// REASON WHY NOT USING THE ARROW FUNCITON.  THESE METHODS ARE NOT CALLED THROUGH DOM EVENTS. AND WONT HAVE 'THIS' KEYWORD ISSUE...WE USE THIS SYNTAX.
componentWillReceiveProps(nextProps) {
  console.log('update persons.js  Inside componentWillMount', nextProps);
}
// THIS CHECKS IF THE SINGLE PROP THAT IS IMPORTANT, DID CHANGE OR NOT AND IGNORED ALL THE OTHER ONES. YOU USE THIS METHOD IN A STATEFUL COMPONENT THAT USES ALOT OF PROPS
// IF ANY OF THE RELEVANT PROPS CHANGE, WE CONTINUE WITH THE UPATING. BUT IF NO PROPERTIES CHANGE, WE DON'T GO THERE.
// **THERE IS A COMPONENT THAT NEEDS TO BE IMPORTED CALLED PURECOMPONENT.  IT BASICALLY HAS A BUILT IN 'shouldComponentUpdate' METHOD.  SO THE BOTTOME CODE ISNT' NECESSARY WHEN USING THIS IMPORTED Component

// shouldComponentUpdate(nextProps, nextState) {
//   console.log('update persons.js inside shouldComponentUpdate', nextProps, nextState);
//   return nextProps.persons !== this.props.persons ||
//   nextProps.changed !== this.props.changed ||
//   nextProps.click !== this.props.click
  // return true;
// }

componentWillUpdate(nextProps, nextState) {
  console.log('update persons.js inside componentWillUpdate',  nextProps, nextState);
}

componentDidUpdate() {
  console.log('update persons.js inside componentDidUpdate');
}

  render () {
    console.log('Persons.js inside render');
     return this.props.persons.map((person, index) => {
        return <Person
        click={() => this.props.clicked(index)} //"this" doesn't know which person it's talking about.  so we need to add a second argument to the map function to specify the index of the element.
          name={person.name}
          age={person.age}
          key={person.id}
          // here we are passing data.  we get the event object that was changed. and we pass the event object to the name changed handler alond with the person id. the person.id is avail becuase it's inside the map mthod.
          // once this function is complete we need to find the person that will be affected by the change.  GO BACK UP TO THE nameChangedHandler METHOD.
          changed={(event) => this.props.changed(event, person.id)} />
    });
  }
}

// THIS WAS A STATELESS COMPONEMT.  THE ABOVE CODE IS A STATEFUL COMPONEMT.
// const persons = (props) => props.persons.map((person, index) => {
//     return <Person
//     click={() => props.clicked(index)} //"this" doesn't know which person it's talking about.  so we need to add a second argument to the map function to specify the index of the element.
//       name={person.name}
//       age={person.age}
//       key={person.id}
//       // here we are passing data.  we get the event object that was changed. and we pass the event object to the name changed handler alond with the person id. the person.id is avail becuase it's inside the map mthod.
//       // once this function is complete we need to find the person that will be affected by the change.  GO BACK UP TO THE nameChangedHandler METHOD.
//       changed={(event) => props.changed(event, person.id)} />
//   });

export default Persons;
