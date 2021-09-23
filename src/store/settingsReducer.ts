import { AnyAction } from 'redux';
import { IGameSettingsData, OptionSettings, cardSets, ICardData } from '../types/types';
import { SettingsActions } from './actionTypes';

interface IInitialStateSettings {
  settings: IGameSettingsData;
  cardSet: ICardData[];
  visibleChat: boolean;
}

const initialState: IInitialStateSettings = {
  settings: {
    isDealerActive: false,
    voteAfterRoundEnd: false,
    autoFlipCards: false,
    autoAdmitMembers: false,
    showTimer: false,
    scoreType: OptionSettings.Fibonacci,
    roundTime: 1,
  },
  cardSet: cardSets.arrayFibonacci,
  visibleChat: false,
};

export const settingsReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case SettingsActions.CHANGE_SETTINGS:
      switch (action.payload.scoreType) {
        case OptionSettings.Fibonacci:
          return { ...state, settings: action.payload, cardSet: cardSets.arrayFibonacci };
        case OptionSettings.ModifiedFibonacci:
          return { ...state, settings: action.payload, cardSet: cardSets.arrayModifiedFibonacci };
        case OptionSettings.PowerOfTwo:
          return { ...state, settings: action.payload, cardSet: cardSets.arrayPowerOfTwo };
        default:
          return { ...state, settings: action.payload, cardSet: cardSets.arrayCustomYour };
      }

    case SettingsActions.ADD_CARD:
      return { ...state, cardSet: [...state.cardSet, action.payload] };

    case SettingsActions.REMOVE_CARD:
      return { ...state, cardSet: state.cardSet.filter((card) => card.card !== action.payload) };

    case SettingsActions.EDIT_CARD:
      return {
        ...state,
        cardSet: state.cardSet.map((card) => ({
          ...card,
          card: card.card === action.payload.oldCard ? action.payload.newCard : card.card,
        })),
      };

    case SettingsActions.SET_CARDS:
      return { ...state, cardSet: action.payload };

    case SettingsActions.SET_ACTIVE_CARD:
      return {
        ...state,
        cardSet: state.cardSet.map((card) => ({
          ...card,
          isActive: card.card === action.payload && !card.isActive,
        })),
      };

    case SettingsActions.VISIBLE_CHAT:
      return { ...state, visibleChat: action.payload };

    default:
      return state;
  }
};

interface ISettingsActionsIGameSettings {
  type: SettingsActions;
  payload: IGameSettingsData;
}

interface ICardActionsString {
  type: SettingsActions;
  payload: string;
}

interface ICardActionsICardData {
  type: SettingsActions;
  payload: ICardData;
}

interface INewCard {
  oldCard: string;
  newCard: ICardData;
}

interface ICardActionsEdit {
  type: SettingsActions;
  payload: INewCard;
}

interface ICardActionsSet {
  type: SettingsActions;
  payload: ICardData[];
}

interface IVisibleChatActions {
  type: SettingsActions;
  payload: boolean;
}

export const changeSettings = (payload: IGameSettingsData): ISettingsActionsIGameSettings => ({
  type: SettingsActions.CHANGE_SETTINGS,
  payload,
});

export const addCard = (payload: ICardData): ICardActionsICardData => ({
  type: SettingsActions.ADD_CARD,
  payload,
});

export const removeCard = (payload: string): ICardActionsString => ({
  type: SettingsActions.REMOVE_CARD,
  payload,
});

export const editCard = (payload: INewCard): ICardActionsEdit => ({
  type: SettingsActions.EDIT_CARD,
  payload,
});

export const setCards = (payload: ICardData[]): ICardActionsSet => ({
  type: SettingsActions.SET_CARDS,
  payload,
});

export const setActiveCard = (payload: string): ICardActionsString => ({
  type: SettingsActions.SET_ACTIVE_CARD,
  payload,
});

export const setVisibleChat = (payload: boolean): IVisibleChatActions => ({
  type: SettingsActions.VISIBLE_CHAT,
  payload,
});
