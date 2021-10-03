export enum IssueActions {
  ADD_TASK = 'ADD_TASK',
  ADD_TASKS = 'ADD_TASKS',
  REMOVE_TASK = 'REMOVE_TASK',
  EDIT_TASK = 'EDIT_TASK',
  ADD_GRADES = 'ADD_GRADES',
  REMOVE_GRADES = 'REMOVE_GRADES',
  EDIT_GRADES = 'EDIT_GRADES',
  SET_ACTIVE = 'SET_ACTIVE',
  CHANGE_ISSUES = 'CHANGE_ISSUES',
}

export enum SettingsActions {
  CHANGE_SETTINGS = 'CHANGE_SETTINGS',
  ADD_CARD = 'ADD_CARD',
  REMOVE_CARD = 'REMOVE_CARD',
  EDIT_CARD = 'EDIT_CARD',
  SET_CARDS = 'SET_CARDS',
  SET_ACTIVE_CARD = 'SET_ACTIVE_CARD',
  VISIBLE_CHAT = 'VISIBLE_CHAT',
  DISABLE_ACTIVE = 'DISABLE_ACTIVE',
}

export enum UserActions {
  SET_DATA = 'SET_DATA',
  SET_ID = 'SET_ID',
  SET_NAME = 'SET_NAME',
  SET_LASTNAME = 'SET_LASTNAME',
  SET_JOB_STATUS = 'SET_JOB_STATUS',
  SET_ROLE = 'SET_ROLE',
  SET_AVATAR = 'SET_AVATAR',
}

export enum RoomDataActions {
  ADD_USERS = 'ADD_USERS',
  LEAVE_USER = 'LEAVE_USER',
  GET_ALL_MESSAGES = 'GET_ALL_MESSAGES',
  ADD_MESSAGE = 'ADD_MESSAGE',
  SET_ROOM_ID = 'SET_ROOM_ID',
  ADD_ADMIN = 'ADD_ADMIN',
  IS_DEALER = 'IS_DEALER',
  IS_OBSERVER = 'IS_OBSERVER',
  SET_GAME_ROOM = 'SET_GAME_ROOM',
  CLEAR_ROOM_DATA = 'CLEAR_ROOM_DATA',
}

export enum VotingActions {
  SET_DELETED_USER = 'SET_DELETED_USER',
  SET_MODAL_VISIBLE = 'SET_MODAL_VISIBLE',
}

export enum RequestActions {
  ADD_USER_ID = 'ADD_USER_ID',
  DELETE_USER_ID = 'DELETE_USER_ID',
}

export enum UserTypingActions {
  SET_SHOW_WRITER = 'SET_SHOW_WRITER',
  SET_WRITER = 'SET_WRITER',
  WRITE_MESSAGE = 'WRITE_MESSAGE',
  SET_USER_NAME = 'SET_USER_NAME',
  CLEAR_USER_TYPING_DATA = 'CLEAR_USER_TYPING_DATA',
}

export enum TimerActions {
  START_TIME = 'START_TIME',
  RESET_TIME = 'RESET_TIME',
}

export enum StatisticsActions {
  ADD_STATISTICS = 'ADD_STATISTICS',
  REMOVE_STATISTIC = 'REMOVE_STATISTIC',
  EDIT_STATISTIC_TOTAL = 'EDIT_STATISTIC_TOTAL',
  SET_STATISTICS = 'SET_STATISTICS',
}

export enum ProgressVoiting {
  OFF_PROGRESS = 'OFF_PROGRESS',
  ON_PROGRESS = 'ON_PROGRESS',
}
