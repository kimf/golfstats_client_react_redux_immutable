import Listing from 'views/Listing'

// import { fetchClubsIfNeeded } from 'actions/clubs';

export default class ClubList extends Listing {
  itemType = 'club'
  title = 'Where are you playing today?'
  filterField = true
}
