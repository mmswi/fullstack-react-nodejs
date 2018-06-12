import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// importing the styles
import '../assets/scss/styles.scss'

import store from './stores/store'
// import Conversion from './containers/conversion.js';



class MainComponent extends React.Component {
  render() {
    return (
      <div>
        THIS WILL BE A CONTAINER !
      </div>
    )
  }
}


ReactDOM.render(<Provider store={store}><MainComponent /></Provider>, document.getElementById('container'));
