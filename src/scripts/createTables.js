const { db } = require('@vercel/postgres')

async function seedUsers(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        profile_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `
    console.log(`Created "users" table`)

    return {
      createTable
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function seedPosts(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        published BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `
    console.log(`Created "posts" table`)

    return {
      createTable
    }
  } catch (error) {
    console.error('Error seeding posts:', error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await seedUsers(client)
  await seedPosts(client)

  await client.end()
}

main().catch(err => {
  console.error('An error occurred while attempting to seed the database:', err)
})
