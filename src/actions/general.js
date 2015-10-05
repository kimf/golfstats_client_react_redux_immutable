export function selectItem(model, item) {
  if ( model === 'slope' ) {
    return {
      type: 'SELECT_ITEM',
      meta: {
        transition: () => ({
          path: '/play/0'
        })
      },
      model,
      item
    };
  }
  return { type: 'SELECT_ITEM', model, item };
}

export function deSelectItem(model) {
  return { type: 'DE_SELECT_ITEM', model };
}

export function filterItems(filterQuery) {
  return { type: 'FILTER_ITEMS', filterQuery };
}
