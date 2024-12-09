import { openFormSuccessMessage, openFormErrorMessage } from './alerts.js';
import { setUserFormSubmit } from './downloadNewPost.js';
import { setDataFromServer } from './data-receiver.js';

setUserFormSubmit(openFormSuccessMessage, openFormErrorMessage);
setDataFromServer();
