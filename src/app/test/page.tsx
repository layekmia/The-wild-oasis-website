import { getTestingData } from "@/lib/apiService";

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function page() {
  const posts: Posts[] = await getTestingData();

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
