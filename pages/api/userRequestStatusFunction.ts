import axios from 'axios';

interface StatusRequestParams {
  token: string,
  userId: string,
  collectionName: string,
  action: string,
  statusRequest: string,
  onSuccess: Function,
  onError: Function
}



export const userRequestStatusFunction = async ({ token, userId, collectionName, action, statusRequest, onSuccess, onError }: StatusRequestParams) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.post('/api/userDataApi', {
      id: userId,
      collectionName,
      action,
      data: action === 'get' ? '' : statusRequest
    }, config);

    const { status, actionResponse } = response.data;
    if (status === 'success' && onSuccess) {
      const statusRequest = actionResponse[0].status;
      onSuccess(statusRequest);
      console.log('StatusRequest: ', statusRequest)
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

