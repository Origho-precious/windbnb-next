/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import SearchNav from "../components/Nav/Nav";
import data from "../data";

const Home = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState(data);
	const [stays, setStays] = useState(data.length);

	useEffect(() => {
		const processSearchResult = () => {
			if (search) {
				const filteredResult = data.filter((item) => {
					return (
						`${item.city}, ${item.country}` === search.location &&
						item.maxGuests > search.guests
					);
				});

				setResults(filteredResult);
				setStays(filteredResult.length);
			}
		};

		processSearchResult();
	}, [search]);

	const renderHouses = () => {
		return results.map((item) => {
			return (
				<div className={styles.gridItem} key={item.title}>
					<img src={item.photo} alt={item.title} />
					<div className={styles.texts}>
						{item.superHost ? (
							<span className={styles.superHost}>SUPERHOST</span>
						) : null}
						<span>
							{item.type} &nbsp; {item.beds ? `${item.beds} beds` : null}
						</span>
						<span>
							<i className="fas fa-star"></i> {item.rating}
						</span>
					</div>
					<p>{item.title}</p>
				</div>
			);
		});
	};

	return (
		<div className="App">
			<Head>
				<meta name="theme-color" content="#EF7B7B" />
				<meta
					name="description"
					content="Windbnb: Airbnb clone for stays in Finland"
				/>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
					integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
					crossOrigin="anonymous"
					referrerpolicy="no-referrer"
				/>
				<title>Windbnb - Airbnb Clone</title>
			</Head>
			<SearchNav getSearch={setSearch} />
			<main className={styles.Home}>
				<header>
					<h2>Stays in Finland</h2>
					<p>{stays ? `${stays} stay(s)` : "12+ stays"}</p>
				</header>
				<div className={styles.grid}>{renderHouses()}</div>
			</main>
		</div>
	);
};

export default Home;
