import axios from 'axios';

interface StatusRequestParams {
  token: string,
  userId: string,
  collection: string,
  action: string,
  statusRequest: string,
  onSuccess: Function,
  onError: Function
}



export const userRequestStatusFunction = async ({ token, userId, collection, action, statusRequest, onSuccess, onError }: StatusRequestParams) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.post('/api/userDataApi', {
      id: userId,
      action: action,
      nameCollection: collection,
      data: statusRequest
    }, config);

    const { status, responseData } = response.data;
    if (status === 'success' && onSuccess) {
      const statusRequest = responseData;
      onSuccess(statusRequest);
    }
    else if (onError) {
      onError(new Error('Failed to fetch data'));
    }
  }
  catch (error) {
    console.error('An error occurred while fetching data:', error);
    if (onError) {
      onError(error);
    }
  }
};

