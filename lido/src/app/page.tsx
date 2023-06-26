"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Counter from "./pages/counter";
import Nav from "./components/nav";

export default function Home() {
	return (
		<>
			<Nav />
			<main className={styles.main}>
				<Counter />
			</main>
		</>
	);
}
