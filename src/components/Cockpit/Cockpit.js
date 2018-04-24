import React from 'react';
import classes from './Cockpit.css';
import Aux from '../../hoc/Aux';

const cockpit = (props) => {

// ADDING LOGIC TO DISPLAY JSX CORRECTLY

  let btnClass = classes.Button; //this would be the default.
  if(props.showPersons) {
      btnClass = [classes.Button, classes.Red].join(' '); //THIS LINE WE ADD AN ARRAY THAT RETAINS THE BUTTON CLASS BUT ALSO ADDS THE RED CLASSES AS WELL. WE USE JOIN TO JOIN THE TWO ARRAY ELEMENTS.
  }

  const assignedclasses = [];
  if(props.persons.length <=2) {
    // we now push classes.red and classes.bold we get the properties on the classes object we import
    assignedclasses.push(classes.red); // this pushes "red" to the classes array. => classes = ['red']
  }
  if(props.persons.length <=1) {
    assignedclasses.push(classes.bold); //this pushes "red" to the classes array. => classes = ['red', 'bold']
  }

  // DISPLAYS JSX
// WE REMOVED THE WRAPPING <DIV CLASSNAME={CLASSES.COCKPIT}> BECAUSE IT HAS BECOME REDUNDANT. SINCE WE // ALTERED THE CSS FILE AND ADDED AN ARRAY LIST TO THE BUTTON CLASS. A SOLUTION IS TO RETURN AN ARRAY.  BUT THERE IS A BETTER WAY....HIGHER ORDFER COMPONENT.
// WE CAN CREATE A HIGER ORDER COMPONENT - THEY ARE NOT REPRESENTATIONAL.  BUT THEY WRAP OTHER COMPONENTS TO ADD A CERTAIN functionality.
// AFTER WE JUST CREATED OUR AUX COMPONENT, WE CAN USE IT TO WRAP THIS JSX.  THIS WELL REMOVE THE ERROR IN THE CONSOLE. USING THE AUX REMOVES THE UNNECCASSRY <DIV> STYLEING ELEMENT.
// WITH REACT 16.  you can use the BUILT IN AUX "COMPONENT".  YOU USE AN EMPTY JSX TAG INSTEAD OF THE <AUX> TAG.
  return (
    <Aux>
      <h1>{props.mytitle}</h1>
      <p className={assignedclasses.join(' ')}>setting class names dynamically</p>
      <button
      className={btnClass}
      onClick={props.click}>Toggle Name</button>
    </Aux>
  );
};

export default cockpit;
