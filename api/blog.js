export default async function handler(req, res) {
  const apiKey = process.env.BLOGGER_API_KEY; // το μυστικό σου API key από το Vercel
  const blogId = '443892277432523371'; 

  try {
    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`);
    if (!response.ok) throw new Error('Failed to fetch from Blogger API');

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
