// THIS IS THE OTHER WAY TO WRITE HIGER ORDER COMPONENTS.  KEEP IN MIND THE MAMING CONVENTION.  USE A LOWERCASE FIRST LETTER.


import React, { Component } from 'react';

// THIS FUNCTION TAKES IN A CONFIGUREATION.  NOT PROPS. THIS TAKES SEVERAL ARGUMENTS.

// THIS FUNCTION IS NOT A FUNCTIONAL COMPONENT.  IT'S A NORMAL JS FUNCTION THAT EXPECTS TWO ARGUMENTS. WHICH THEN RETURNS A FUNCITON THAT QUALIFIES AS A FUNCTIONAL COMPONENT.
// DON'T manipulatE THE <WrappedComponent DIV.  JUST USE IT AS IS..
//by using {...props}, which is the spread operator we just pass componments.  Since we are using the HOC file in mulitple files, each of those files have their own different props.  the spread operator, on the props onject ot break it up into key/value pairs and just passes them to the exisiting props.

// const withClass = (WrappedComponent, className) => {
//   return (props) => (
//     <div className={className}>
//       <WrappedComponent {...props}/>
//     </div>
//   )
// }

// THIS HOC DOESNT HAVE TO REUTRN A FUNCTION AS ABOUT. IT DEPENDS ON WHAT YOU WILL USE IT FOR. IF YU NEED ACCESS TO LIFECYCLE HOOKS AND REACH OUT TO THE WEB AND FETCH AN AUTHENTICALED USER. AND DO SOMETHING WITH THAT YOU NEED A STATEFUL COMPONENT.
// this is an anonymous component. there is no name after the calss keyword.  we have a function that returns a class on demand and the class name doesnt matter.  what matters is the render component returns a div with classname, wrapper and props.

const withClass = (WrappedComponent, className) => {
  return class extends Component {
    render() {
      return (
      <div className={className}>
        <WrappedComponent {...this.props}/>
      </div>
      )
    }
  }
}
export default withClass;
