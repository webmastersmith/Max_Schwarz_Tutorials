// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type Data = {
  [key: string]: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // const { email, feedback } = JSON.parse(req.body)
    const filePath = path.join(process.cwd(), 'data', 'db.json')
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    data.push(JSON.parse(req.body))
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({ name: 'Great! Thank you.' })
  } else {
    const filePath = path.join(process.cwd(), 'data', 'db.json')
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    res.status(200).json(data)
  }
}
