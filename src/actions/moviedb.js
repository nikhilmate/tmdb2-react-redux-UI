export const addFavourites = (id, name, type, date) => ({
  type : 'ADD_FAVOURITES',
  favourites : {
   id,
   type,
   name,
   date 
  }
});



export const changeView = (id, type, name, year, genre, description) => ({
  type : 'CHANGE_VIEW',
  view : {
    id,
    type,
    name,
    year,
    genre,
    description
  }
});