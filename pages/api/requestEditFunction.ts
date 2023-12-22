import axios from 'axios';

interface EditDataParams {
  token: string,
  collection: string,
  toRequestId: string,
  dataToInsert: {},
  onSuccess: Function,
  onError: Function
}



export const requestEditFunction = async ({ token, collection, toRequestId, dataToInsert, onSuccess, onError }: EditDataParams) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.post('/api/userDataApi', {
      id: toRequestId,
      collectionName: collection,
      action: 'edit-request',
      data: dataToInsert
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