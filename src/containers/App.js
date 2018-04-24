import React, { PureComponent } from 'react';
import classes from './App.css';
// Radium is a third party package that allows you to use sudo-selectors and media queries.
// npm install it in your project folder and import it here...
// StyleRoot allows you to use mediaqueries
// import Radium, {StyleRoot} from 'radium';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
// import it with a lowercase 'w' becuase this doesnt QUALIFy as a component.it doesnt return jsx. it reatuns another function.
import withClass from '../hoc/withClass';

// CONTEXT API INTRODUCED IN REACT 16.  THIS PASSES THE GLOBAL STATE AROUND YOUR APP.  The default value is optional.
// const AuthContext = React.createContext(false);


class App extends PureComponent {
  // SETTING UP LIFE-CYCLE HOOKS
  constructor(props) {
    super(props); //must do it this way..add props in constructor and call it in super
    console.log('[App.js] inside constructor', props);

    // STATE IN A CONSRUCTOR IS USED IN OLDER VERSSION OF REACT OR AN OLDER PROJECT. BUT IT STILL WORKS.
    this.state = {
      persons: [
        {id: 0, name: "One", age: 50},
        {id: 1, name: "Two", age: 40},
        {id: 2, name: "Three", age: 30}
      ],
      showPersons: false,
      toggleClicked: 0
    }
  }

componentWillMount() {
  console.log('[App.js] inside componentWillMount');
}

componentDidMount() {
    console.log('[App.js] inside componentDidMount');
}

// shouldComponentUpdate(nextProps, nextState) {
//   console.log('update App.js inside shouldComponentUpdate', nextProps, nextState);
//   return nextState.persons !== this.state.persons ||
//     nextState.showPersons !== this.state.showPersons;
// }

componentWillUpdate(nextProps, nextState) {
  console.log('update App.js inside componentWillUpdate',  nextProps, nextState);
}

componentDidUpdate() {
  console.log('update App.js inside componentDidUpdate');
}

// this is for creating flexible lists.  we need the event that gets the value users put it.  we also need the id that's associated with that value. then we pass it to our changed property in our map method.
nameChangedHandler = (event, id) => {
  // with the completed function, we need to find the person that will be changed.
  // findIndex finds and reaturns the index of the id.  It takes a function just like map() does and it executes the function on every element in the array.
  const personIndex = this.state.persons.findIndex(p => {
    return p.id === id;
  });
// get the person by accessing the element at the personIndex. BUT.....DONT MUTATE THE STATE DIRECTLY.
//
// THIS MUTATES THE STATE DIRECTLY.  THERE'S A BETTER APPROACH....
  // const person = this.state.persons[personIndex];
    const person = {
      // USE the spread operator is also available for objects.  It will disribute all the properties of the object feteched and placed in the new object.
      ...this.state.persons[personIndex]
    }
// updated person name from the copy above
    person.name = event.target.value;

// update the array at the personIndex position. making a copy of original state.
    const persons = [...this.state.persons];

// update person at one position
    persons[personIndex] = person; //this is the updated person that the user inputted.

// set this to the updated persons array, where we update one element with the updated person where we adjusted the name.
  this.setState({ persons: persons })
}

deletePersonHandler = (personindex) => {
  // const persons = this.state.persons.slice(); //using the slice method without arguments simply copies the full array.  The best practice is to create a copy of the array before manipulating it
  const persons = [...this.state.persons]; //I LIKE THIS BETTER. USE THE SPREAD OPERATOR. we create a copy of the original array. this is using it in an immutable way.
  persons.splice(personindex, 1); //create a new version of that array. this removes one element from the array.  WE ARE NOW MUTATING THIS COPY OF THE ARRAY.
  this.setState({persons: persons}); // set the state of the persons to the updated, spliced persons. WE ASSIGNED THE CHAGNGED COPY TO THE NEW STATE.

}
// SETSTATE IS A METHOD EXECUTED ASYNCHRONOUSLY by React.  You can't rely on calling "this.state" being called inside of setState to really reflect the latest version of the state. if you call setState in another part of the appplication at around the same time, the other setState might finish before this one. so this state might not be correct.
// THERE'S BETTER SYNTAX FOR WHEN CALLING THIS.STATE INSIDE SETSTATE. this is best approach to mutatate the state and if you have the danger of interfering with other state versions.  The 'prevState' is the last state it has at this point in time.  prevState cant' be mutated at all in any other areas of the App.
togglePersonsHandler = () => {
  const doesShow = this.state.showPersons;
  this.setState((prevState, props) => {
    return {
      showPersons: !doesShow,
      toggleClicked: prevState.toggleClicked + 1
      }
  });
}

  render() {
    console.log("App.js inside render"); //PART OF LIFE-CYLCE HOOKS
    // this is how to write inline styles...this is scoped to the Component. but the drawback is that you dont have the full power of CSS.
    // const style = {
    //     backgroundColor: 'green',
    //     color: "white",
    //     font: 'inhereit',
    //     border: '1px solid blue',
    //     padding: '8px',
    //     cursor: 'pointer',
    //     // when using psuedo selectors wrap them in qoutation marks because since they start with a colon, they are not valid js property names.
    //     // ':hover': {
    //     //   backgroundColor: 'lightgreen',
    //     //   color: 'purple'
    //     // }
    //
    // };

    // handing dynamic content "the JS way". this is most efficient way to do it as app grows
    let persons = null; //this is the default
// the map function is vanilla JS that converts some form of data into another form.  in this case it's taking the array of objects and it's converting them into valid JSX


// CSS MODULES: THE CLASSES OBJECT HERE WHICH WE IMPORT FROM THE APP.CSS FILE, IS A JS OBJECT THAT GIVES YOU ACCESS TO A STRING VERSION OF YOUR CSS STYLES. OF YOUR CSS CLASSES THAT ARE UNIQUE. YOUR CLASSE BECOMES FOR EXAMPLE: .PERSON {} INTO .PERSON__SOME UNIQUE HASH.  THIS MAKES SURE IT'S UNIQUE TO THAT THE CSS RULES APPLY TO THAT SPECIFIC COMPONEMT.



    if(this.state.showPersons) {
      persons =
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />;

        // {this.state.persons.map((person, index) => {
        //   return <Person
        //   click={() => this.deletePersonHandler(index)} //"this" doesn't know which person it's talking about.  so we need to add a second argument to the map function to specify the index of the element.
        //     name={person.name}
        //     age={person.age}
        //     key={person.id}
        //     // here we are passing data.  we get the event object that was changed. and we pass the event object to the name changed handler alond with the person id. the person.id is avail becuase it's inside the map mthod.
        //     // once this function is complete we need to find the person that will be affected by the change.  GO BACK UP TO THE nameChangedHandler METHOD.
        //     changed={(event) => this.nameChangedHandler(event, person.id)} />
        // })}

      // adding dynamic styles to the button...
      // style.backgroundColor = 'red';
      // this is radium.  when adding to the style.  you must add [] becuase it's in quotations.
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'purple'
      // }

      // style.color = 'black';
    }

    // setting class names dynamically.  the array contains the class names that were created the the App.css document.  rememeber that this document is global in scope. Adding "join" combines them and makes them dynamic.
    // const assignedclasses = [];
    // if(this.state.persons.length <=2) {
    //   // we now push classes.red and classes.bold we get the properties on the classes object we import
    //   assignedclasses.push(classes.red); // this pushes "red" to the classes array. => classes = ['red']
    // }
    // if(this.state.persons.length <=1) {
    //   assignedclasses.push(classes.bold); //this pushes "red" to the classes array. => classes = ['red', 'bold']
    // }
// the classes array will be differnt depending on the length of the users.  when we pass a string with our classes array in jsx.  when adding join to classes in jsx, you're putting the elements of the classes array into a string. assigning a string with the join method

// you wrap the whole component in StyleRoot so that media queries can work
// replace "app" with the classes object we imported and add App as an extention.  it's the property associated with the App class in the App.css module.

  // YOU HAVE ACCESS TO PROPS. IT HAS TO BE THIS.PROPS.NAME BECUASE YOU'RE IN A CLASS AND NOT RECIEVING POROPS LIKE YOU ARE IN A FUNCTION.
  // THE BUTTON ABOVE THE COCKPIT IS DEMONSTRATING WHY YOU SHOULD USE THE "shouldComponentUpdate" METHOD.
// <withClass> rplaces the <div> and we assign the css calss to it and pass classes.app as a prop.


// AuthContext or context in general works with providers and consumers. -- we have parts in our app where we provide the context and others where we consume it.

// This is where we provide it because we manage the authentication status. "Provider" is a sub component created by react.


    return (
        <Aux>
          <button onClick={() => {this.setState({showPersons: true})} }>Show Persons</button>
          <Cockpit
            mytitle={this.props.title}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            click={this.togglePersonsHandler} />
            <AuthContext.Provider>
          {persons}
          </AuthContext.Provider>
        </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, "does this work now?"))
  }
}

// wrapping your app in the radium function is called a higher order component. it's a component wrapping a componemt injecting extra functionality
export default withClass(App, classes.App);
// export default Radium(App);
