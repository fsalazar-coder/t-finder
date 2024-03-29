import axios from 'axios';

interface UserDataParams {
  token: string
  userId: string
  action: string,
  collection: any,
  data: any,
  onSuccess: Function,
  onError: Function,
};



export const userDataHandlerFunction = async ({
  token,
  userId,
  action,
  collection,
  data,
  onSuccess,
  onError
}: UserDataParams) => {

  if (!token || !userId || !action || !collection) {
    console.error('Missing required parameters');
    onError && onError(new Error('Missing required parameters'));
    return;
  }

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.post('/api/userDataApi', {
      id: userId,
      nameCollection: collection,
      action: action,
      data: data
    }, config);

    const { status } = response.data;
    if (status === 'success' && onSuccess) {
      if (action === 'post') {
        onSuccess(status);
      }
      else {
        const { responseData } = response.data;
        onSuccess(responseData);
      }
    }
    else if (onError) {
      onError(new Error('Data handling failed'));
    }
    else {
      console.log('Data handling failed');
    }
  }
  catch (error) {
    if (onError) {
      onError(error);
    }
  }
};