export default function App() {
	return (
		<div className="flex flex-col items-center justify-center w-auto h-full">
			<h1 className="text-3xl font-bold">Bem vindo a pixel-critic-api</h1>
			<h2 className="text-xl font-medium">Navegue por uma das nossas rotas de api</h2>

			<ul className="flex flex-col items-start w-full mt-5">
				<li>/auth/login</li>
				<li>/auth/signup</li>
				<li>/avatar/upload</li>
				<li>/followers</li>
				<li>/profile/update</li>
				<li>/reviews</li>
				<li>/topfour</li>
				<li>/user</li>
			</ul>
		</div>
	);
}
