export function selectItem(model, item) {
  return { type: 'SELECT_ITEM', model, item };
}

export function deSelectItem(model) {
  return { type: 'DE_SELECT_ITEM', model };
}

export function filterItems(filterQuery) {
  return { type: 'FILTER_ITEMS', filterQuery };
}
