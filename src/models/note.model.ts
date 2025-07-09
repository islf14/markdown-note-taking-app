import { connection } from './connection'

async function connect() {
  try {
    const client = connection()
    await client.connect()
    const database = client.db('markdown-notes')
    return database.collection('notes')
  } catch (e: any) {
    throw new Error('Database connection failed: ' + e.message)
  }
}

interface Note {
  name: string
  content: string
}

export class NoteModel {
  static async saveNote({ name, content }: Note): Promise<object> {
    const db = await connect()

    const noteData = {
      name,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    try {
      const { insertedId } = await db.insertOne(noteData)
      return insertedId
    } catch (e: any) {
      throw new Error('Error saving note: ' + e.message)
    }
  }

  static async gellAll() {
    const db = await connect()
    const allNotes = await db.find().toArray()
    return allNotes
  }
}
