import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import Popup from './Popup';

const secondary = $('#secondary');
const injected = document.createElement('div');
secondary.prepend(injected);
ReactDOM.render(<Popup />, injected);
