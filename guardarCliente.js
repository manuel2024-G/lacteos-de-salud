import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const clientes = JSON.parse(fileData);
    clientes.push(req.body);
    await fs.writeFile(filePath, JSON.stringify(clientes, null, 2));
    res.status(200).json({ message: 'Cliente guardado correctamente' });
  } else {
    res.status(405).end();
  }
}
