import axios from 'axios';

interface FetchDataParams {
  token: string;
  userId: string;
  collectionName: string;
  onSuccess: Function;
  onError: Function
}



export const fetchDataApi = async ({ token, userId, collectionName, onSuccess, onError }: FetchDataParams) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.post('/api/userApi', {
      id: userId,
      collectionName: collectionName,
      action: 'get',
      data: ''
    }, config);

    const { status, actionResponse } = response.data;
    if (status === 'success' && onSuccess) {
      onSuccess(actionResponse);
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

