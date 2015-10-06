export function selectItem(model, item) {
  let meta = {};
  if ( model === 'slope' ) {
    meta = { transition: () => ({ path: '/play'}) };
  }
  return { type: 'SELECT_ITEM', model, item, meta };
}

export function deSelectItem(model) {
  return { type: 'DE_SELECT_ITEM', model };
}

export function filterItems(filterQuery) {
  return { type: 'FILTER_ITEMS', filterQuery };
}
