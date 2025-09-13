import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  try {
    //check valid request, userId sent in url
    if (!request.query.userId) {
      response.status(400).json({message: 'userId not found'})
      return;
    }

  } catch (e) {
    console.error(e);
    response.status(500).json({message: 'error loading tasks'})
    return;
  }
}