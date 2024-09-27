import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function Carrossel() {
	return (
		<div
			id="carouselExampleControls"
			className="carousel slide"
			data-bs-ride="carousel"
			style={{width: 800, padding: 10}}
		>
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img
						src="src\assets\img\league-of-legends.png"
						className="d-block w-100"
						alt="..."
					/>
				</div>
				<div class="carousel-item">
					<img
						src="src\assets\img\league-of-legends.png"
						className="d-block w-100"
						alt="..."
					/>
				</div>
				<div class="carousel-item">
					<img
						src="src\assets\img\league-of-legends.png"
						className="d-block w-100"
						alt="..."
					/>
				</div>
			</div>
			<button
				className="carousel-control-prev"
				type="button"
				data-bs-target="#carouselExampleControls"
				data-bs-slide="prev"
			>
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button
				className="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleControls"
				data-bs-slide="next"
			>
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
}
export default Carrossel;