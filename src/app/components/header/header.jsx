import React from "react";

import styles from "./header.module.css";

function Header() {
	return (
		<header className={styles.header}>
			<h1>Pixel Critic</h1>
			<ul>
				<li>
					<a href="auth\login">Entrar</a>
				</li>
				<li>
					<a href="auth\signup">Criar conta</a>
				</li>{" "}
			</ul>
		</header>
	);
}

export default Header;