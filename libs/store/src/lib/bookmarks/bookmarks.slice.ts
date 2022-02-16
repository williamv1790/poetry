import { Poem } from '@nx-expo-poetry/models';
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  Dictionary,
  EntityState,
} from '@reduxjs/toolkit';

import { RootState } from '../root/root-state.interface';

export const BOOKMARKS_FEATURE_KEY = 'bookmarks';

export interface BookmarksEntity {
  id: number;
  poem: Poem;
}

export interface BookmarksState extends EntityState<BookmarksEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string;
}

export const bookmarksAdapter = createEntityAdapter<BookmarksEntity>();

export const initialBookmarksState: BookmarksState =
  bookmarksAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: undefined,
  });

export const bookmarksSlice = createSlice({
  name: BOOKMARKS_FEATURE_KEY,
  initialState: initialBookmarksState,
  reducers: {
    add: bookmarksAdapter.addOne,
    remove: bookmarksAdapter.removeOne,
  },
});

/*
 * Export reducer for store configuration.
 */
export const bookmarksReducer = bookmarksSlice.reducer;

export const bookmarksActions = bookmarksSlice.actions;

const { selectAll, selectEntities } = bookmarksAdapter.getSelectors();

const getBookmarksState = (rootState: RootState): BookmarksState =>
  rootState[BOOKMARKS_FEATURE_KEY];

const selectAllBookmarks = createSelector(getBookmarksState, selectAll);

const selectBookmarksEntities = createSelector(
  getBookmarksState,
  selectEntities
);

const selectBookmarksPoems = createSelector(
  selectBookmarksEntities,
  (entities: Dictionary<BookmarksEntity>) => {
    return Object.values(entities).map(entity => entity?.poem);
  }
);

export const bookmarksSelectors = { selectBookmarksPoems };
