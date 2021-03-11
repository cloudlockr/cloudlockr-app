// TODO: Example code that needs to be removed in the future once real Axios API calls have been implemented

import api, { handleError } from '@/Services'

export default async (userId) => {
  if (!userId) {
    return handleError({ message: 'User ID is required' })
  }
  const response = await api.get(`users/${userId}`)
  return response.data
}
