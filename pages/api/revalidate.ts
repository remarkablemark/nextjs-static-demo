import type { NextApiRequest, NextApiResponse } from 'next'

const isProduction = process.env.NODE_ENV === 'production'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (
    isProduction &&
    request.query.secret !== process.env.REVALIDATE_SECRET_TOKEN
  ) {
    return response.status(401).json({ message: 'Invalid token' })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await response.revalidate('/static')
    response.json({ revalidated: true })
  } catch (error) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(error)
    response.status(500).send('Error revalidating')
  }
}
