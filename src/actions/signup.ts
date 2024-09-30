export default async function SignUp(
  username: string,
  email: string,
  password: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
    {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
