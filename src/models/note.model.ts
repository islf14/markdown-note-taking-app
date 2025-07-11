import { ObjectId } from 'mongodb'
import { connection } from './connection'

async function connect() {
  try {
    const client = connection()
    await client.connect()
    const database = client.db('markdown-notes')
    return { client: client, db: database.collection('notes') }
  } catch (e: unknown) {
    let message
    if (e instanceof Error) message = e.message
    throw new Error('Database connection failed: ' + message)
  }
}

interface Note {
  name: string
  content: string
}

export class NoteModel {
  //
  static async saveNote({ name, content }: Note): Promise<object> {
    const { client, db } = await connect()
    const noteData = {
      name,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    try {
      const { insertedId } = await db.insertOne(noteData)
      client.close()
      return insertedId
    } catch (e: unknown) {
      client.close()
      let message
      if (e instanceof Error) message = e.message
      throw new Error('Error saving note: ' + message)
    }
  }

  static async gellAll() {
    const { client, db } = await connect()
    const allNotes = await db.find().toArray()
    client.close()
    return allNotes
  }

  static async viewNote({ id }: { id: string }) {
    const { client, db } = await connect()
    const note = await db.findOne({ _id: new ObjectId(id) })
    client.close()
    return note
  }
}
