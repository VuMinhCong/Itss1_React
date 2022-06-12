import { configureStore, createSelector, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { validateCode, validateUrl } from './utils';
import { createUrl, updateUrl } from './utils/api';

const storedUrls = JSON.parse(localStorage.getItem('urls')) || [];

const urlSlice = createSlice({
  name: 'urls',
  initialState: storedUrls,
  reducers: {
    addUrl: (urls, action) => {
      const [url, code] = action.payload;

      if (!validateUrl(url)) {
        throw `url ${url} is invalid`;
      }

      if (!validateCode(code)) {
        throw `code ${code} is invalid`;
      }

      const newUrls = [...urls, { url, code }];

      const idx = urls.findIndex((u) => u.code === code);
      if (idx >= 0) {
        throw `code ${code} existed`;
      }

      localStorage.setItem('urls', JSON.stringify(newUrls));
      return newUrls;
    },

    deleteUrl: (urls, action) => {
      const [code] = action.payload;
      const deletedUrls = urls.filter((u) => u.code !== code);
      localStorage.setItem('urls', JSON.stringify(deletedUrls));
      return deletedUrls;
    },

    updateUrl: (urls, action) => {
      const [oldCode, { url, code }] = action.payload;

      if (!validateUrl(url)) {
        throw `url ${url} is invalid`;
      }

      if (!validateCode(code)) {
        throw `code ${code} is invalid`;
      }

      const idx = urls.findIndex((u) => u.code === oldCode);

      if (idx < 0) {
        throw `code ${oldCode} not found`;
      }

      const newUrls = [
        ...urls.slice(0, idx),
        { url, code },
        ...urls.slice(idx + 1),
      ];

      localStorage.setItem('urls', JSON.stringify(newUrls));
      return newUrls;
    },

    deleteAllUrls: () => {
      localStorage.removeItem('urls');
      return [];
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: null,
  reducers: {
    filterDelete: (_filter, _action) => {
      return null;
    },
    filterByUrl: (_filter, action) => {
      const [url] = action.payload;
      return { url };
    },
    filterByCode: (_filter, action) => {
      const [code] = action.payload;
      return { code };
    },
    filterByBoth: (_filter, action) => {
      const [both] = action.payload;
      return { both };
    },
    filterSortCode: (filter, action) => {
      const [asc = true] = action.payload;
      return { ...filter, sort: 'code', asc };
    },
    filterSortUrl: (filter, action) => {
      const [asc = true] = action.payload;
      return { ...filter, sort: 'url', asc };
    },
  },
});

const store = configureStore({
  reducer: {
    urls: urlSlice.reducer,
    filter: filterSlice.reducer,
  },
});

const selectFilteredUrls = createSelector(
  (state) => state.urls,
  (state) => state.filter,
  (urls, filter) => {
    if (filter === null) return urls;

    let filteredUrls = urls;
    if (filter.url) {
      filteredUrls = urls.filter((u) =>
        u.url.toLowerCase().includes(filter.url.toLowerCase())
      );
    } else if (filter.code) {
      filteredUrls = urls.filter((u) =>
        u.code.toLowerCase().includes(filter.code.toLowerCase())
      );
    } else if (filter.both) {
      filteredUrls = urls.filter(
        (u) =>
          u.url.toLowerCase().includes(filter.url.toLowerCase()) ||
          u.code.toLowerCase().includes(filter.code.toLowerCase())
      );
    }

    if (filter.sort) {
      const sign = filter.asc ? 1 : -1;
      const copyArr = [...filteredUrls];
      filteredUrls = copyArr.sort((a, b) => {
        return a[filter.sort] > b[filter.sort] ? sign : -sign;
      });
    }

    return filteredUrls;
  }
);

export const useStore = () => {
  const actions = {};
  for (let action in urlSlice.actions) {
    actions[action] = (...payload) =>
      store.dispatch(urlSlice.actions[action](payload));
  }
  for (let action in filterSlice.actions) {
    actions[action] = (...payload) =>
      store.dispatch(filterSlice.actions[action](payload));
  }

  const states = useSelector((state) => state);
  const filteredUrls = useSelector(selectFilteredUrls);

  const oldAddUrl = actions['addUrl'];

  actions['addUrl'] = async (url, code) => {
    const res = await createUrl(code, url);
    return oldAddUrl(res.url, res.code);
  };

  const oldUpdateUrl = actions['updateUrl'];

  actions['updateUrl'] = async (oldCode, { code, url }) => {
    const res = await updateUrl(oldCode, { code, url });
    return oldUpdateUrl(oldCode, { url: res.url, code: res.code });
  };

  return { ...states, filteredUrls, ...actions };
};

export default store;
