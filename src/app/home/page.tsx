'use client';
import Header from "../components/header/log-header"; // é pra ir pro log-header qnd ta logado
import Carrossel from "../components/carousel/carousel";
import GameList from "../components/cards/getCards";

function App() {
	return (
		<section
			style={{
				backgroundColor: "black",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Header />
			<Carrossel />
			
			<div style={{ display: "flex", gap: 4 }}>
				<GameList />
			</div>
		</section>
	);
}

export default App;
