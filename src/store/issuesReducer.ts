import { AnyAction } from 'redux';
import { IssuesAction } from './actionTypes';

interface IInitialStateIssues {
  issuesList: string[];
}

const initialState: IInitialStateIssues = {
  issuesList: [],
};

export const issuesReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case IssuesAction.ADD_ISSUE:
      return { ...state, issuesList: [...state.issuesList, action.payload] };

    case IssuesAction.REMOVE_ISSUE:
      return { ...state, issuesList: state.issuesList.filter((issue) => issue !== action.payload) };

    case IssuesAction.EDIT_ISSUE: {
      const index = state.issuesList.findIndex((issue) => issue === action.payload.oldIssue);
      const newIssuesArray = [...state.issuesList];
      newIssuesArray[index] = action.payload.newIssue;
      return { ...state, issuesList: newIssuesArray };
    }

    case IssuesAction.CHANGE_ISSUES:
      return { ...state, issuesList: action.payload };

    default:
      return state;
  }
};

interface IIssuesActionsString {
  type: IssuesAction;
  payload: string;
}

interface INewIssue {
  oldIssue: string;
  newIssue: string;
}

interface IIssuesActionsEdit {
  type: IssuesAction;
  payload: INewIssue;
}

interface IIssuesActionsArrayStrings {
  type: IssuesAction;
  payload: string[];
}

export const addIssue = (payload: string): IIssuesActionsString => ({
  type: IssuesAction.ADD_ISSUE,
  payload,
});

export const removeIssue = (payload: string): IIssuesActionsString => ({
  type: IssuesAction.REMOVE_ISSUE,
  payload,
});

export const editIssue = (payload: INewIssue): IIssuesActionsEdit => ({
  type: IssuesAction.EDIT_ISSUE,
  payload,
});

export const changeIssue = (payload: string[]): IIssuesActionsArrayStrings => ({
  type: IssuesAction.CHANGE_ISSUES,
  payload,
});
