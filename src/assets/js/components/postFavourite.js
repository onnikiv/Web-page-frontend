const postFavouriteRestaurant = async (restaurantId) => {
  try {
    const userId = localStorage.getItem('id');

    console.log(userId, ' userid');
    console.log(restaurantId, ' restaurantId');

    if (!userId || !restaurantId) {
      throw new Error('Missing user_id or restaurantid');
    }

    const response = await fetch(`http://localhost:3000/api/v1/favourites`, {
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

    console.log(response, ' response');

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData, 'errordata');
      throw new Error(errorData.error || 'Failed to add favourite');
    }

    // eslint-disable-next-line no-unused-vars
    const result = await response.json();

    alert('Restaurant added as a favourite');
  } catch (error) {
    console.error('Error adding favourite:', error.message);
    alert('Error adding favourite: ' + error.message);
  }
};

export {postFavouriteRestaurant};
