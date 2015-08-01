import keyMirror from 'react/lib/keyMirror';

export default keyMirror({
  REMOVE_LOADING_SCREEN: Symbol('REMOVE_LOADING_SCREEN'),
  
  GET_BUILDER_CONFIGURATION: Symbol('GET_BUILDER_CONFIGURATION'),
  RECEIVE_BUILDER_CONFIGURATION: Symbol('RECEIVE_BUILDER_CONFIGURATION'),
  PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION: Symbol('PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION'),
  
  GET_LOCALIZATION: Symbol('GET_LOCALIZATION'),

  CHECK_IF_TEMPLATE_IS_SELECTED: Symbol('CHECK_IF_TEMPLATE_IS_SELECTED'),
  PROCESS_TEMPLATE_SELECTION: Symbol('PROCESS_TEMPLATE_SELECTION'),

  START_NEW_PAGE: Symbol('START_NEW_PAGE'),
  LOAD_PREVIOUS_PAGE: Symbol('LOAD_PREVIOUS_PAGE'),
  CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE: Symbol('CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE'),

  OPEN_TAB: Symbol('OPEN_TAB'),
  CLOSE_TAB: Symbol('CLOSE_TAB'),
  
  OPEN_PREVIEW: Symbol('OPEN_PREVIEW'),
  CLOSE_PREVIEW: Symbol('CLOSE_PREVIEW')
});