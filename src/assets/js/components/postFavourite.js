import getLanguage from '../utils/language.js';

const getAllFavouriteRestaurants = async () => {
  try {
    const userId = localStorage.getItem('id');
    const checkResponse = await fetch(`https://10.120.32.69/web-page/api/v1/favourites/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (checkResponse.status === 404) {
      console.log('No favorites found for user');
      return null;
    }

    const responseObject = await checkResponse.json();
    let favourites = [];

    if (responseObject) {
      responseObject.forEach((favourite) => {
        favourites.push(favourite.restaurantid);
      });
      return favourites;
    }

    return null;
  } catch (error) {
    console.log('Error checking favourites:', error.message);
    return;
  }
};

const checkIfFavourite = async (restaurantId) => {
  try {
    const userId = localStorage.getItem('id');
    const checkResponse = await fetch(`https://10.120.32.69/web-page/api/v1/favourites/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (checkResponse.status === 404) {
      console.log('No favorites found for user');
      return false;
    }

    if (!checkResponse.ok) {
      throw new Error('Failed to check favourites');
    }

    const favourites = await checkResponse.json();
    return favourites.some((fav) => fav.restaurantid === restaurantId);
  } catch (error) {
    console.error('Error checking favourites:', error.message);
    return false;
  }
};

const postFavouriteRestaurant = async (restaurantId) => {
  try {
    const userId = localStorage.getItem('id');

    if (!userId || !restaurantId) {
      throw new Error('Missing user_id or restaurantid');
    }

    const response = await fetch(`https://10.120.32.69/web-page/api/v1/favourites`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        restaurantid: restaurantId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add favourite');
    }

    // eslint-disable-next-line no-unused-vars
    const result = await response.json();

    alert(
      getLanguage() === 'fi'
        ? 'Ravintola lisätty suosikkeihin'
        : 'Restaurant has been added to favourites'
    );
  } catch (error) {
    console.error('Error adding favourite:', error.message);
    alert('Error adding favourite: ' + error.message);
  }
};

const deleteFavouriteRestaurant = async (restaurantId) => {
  try {
    const userId = localStorage.getItem('id');

    if (!userId || !restaurantId) {
      throw new Error('Missing user_id or restaurantid');
    }

    const response = await fetch(`https://10.120.32.69/web-page/api/v1/favourites/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        restaurantid: restaurantId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete favourite');
    }

    // eslint-disable-next-line no-unused-vars
    const result = await response.json();

    alert(
      getLanguage() === 'fi'
        ? 'Ravintola poistettu suosikeista'
        : 'Restaurant removed from favourites'
    );
  } catch (error) {
    console.error('Error removing favourite:', error.message);
    alert('Error removing favourite: ' + error.message);
  }
};

export {
  getAllFavouriteRestaurants,
  checkIfFavourite,
  postFavouriteRestaurant,
  deleteFavouriteRestaurant,
};
