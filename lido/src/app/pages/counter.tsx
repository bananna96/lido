import {
	Paper,
	Button,
	TextField,
	InputAdornment,
	CircularProgress,
	Box,
	Card,
	CardContent,
	Typography,
} from "@mui/material";
import styles from "../page.module.css";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

export default function Counter() {
	const [totals, setTotals] = useState({ totalEuro: 0, totalHours: 0 });
	const [items, setItems] = useState([
		{ id: 0, name: "", time: 0, money: 0 },
	]);
	const [allMoneyGivenAndRest, setAllMoneyGivenAndRest] = useState({
		all: 0,
		rest: 0,
	});

	const [loaded, setLoaded] = useState(false);
	const [counted, setCounted] = useState(false);

	// This will run one time after the component mounts
	useEffect(() => {
		const onPageLoad = () => {
			setLoaded(true);
		};

		// Check if the page has already loaded
		if (document.readyState === "complete") {
			onPageLoad();
		} else {
			window.addEventListener("load", onPageLoad);
			// Remove the event listener when component unmounts
			return () => window.removeEventListener("load", onPageLoad);
		}
	}, []);

	const addItem = function () {
		setItems([
			...items,
			{ id: items.length, name: "", time: 0, money: 0 },
		]);
	};
	const updateEmpState = (id: number, field: string, event: any) => {
		// TODO: shorter / less code?
		let itemsSpeicher = [...items];
		if (field === "name") {
			itemsSpeicher[id].name = event.target.value;
		} else if (field === "time") {
			itemsSpeicher[id].time = +event.target.value;
			let t = 0;
			itemsSpeicher.forEach(i => {
				t = +t + +i.time;
			});
			setTotals({ totalEuro: totals.totalEuro, totalHours: t });
		}
		setItems(itemsSpeicher);
	};

	const updateTotals = (field: string, event: any) => {
		setCounted(false);
		if (field === "money") {
			setTotals({
				totalEuro: event.target.value,
				totalHours: totals.totalHours,
			});
		} else if (field === "hours") {
			setTotals({
				totalEuro: totals.totalEuro,
				totalHours: event.target.value,
			});
		}
	};

	const getEmployeeForm = (id: number) => {
		return (
			<div key={id} className={styles.margin5}>
				<TextField
					label="Name"
					type="text"
					onChange={e => {
						updateEmpState(id, "name", e);
					}}
				/>
				<TextField
					required
					label="Time"
					type="number"
					onChange={e => {
						updateEmpState(id, "time", e);
					}}
					InputProps={{
						inputProps: {
							max: 100,
							min: 0,
						},
					}}
				/>
			</div>
		);
	};

	const count = (totalE: any, totalH: any) => {
		let itemsSpeicher = [...items];
		const moneyPerHour = totalE / totalH;
		const rounded = Number(moneyPerHour.toFixed(1));
		itemsSpeicher.forEach(item => {
			item.money = Number((rounded * item.time).toFixed(1));
		});

		let allesVonEinzeln = 0;
		itemsSpeicher.forEach(
			it => (allesVonEinzeln = allesVonEinzeln + it.money)
		);
		if (allesVonEinzeln > totals.totalEuro) {
			count(totalE - (allesVonEinzeln % totalE), totalH);
		} else {
			setItems(itemsSpeicher);
			setAllMoneyGivenAndRest({
				all: Number(allesVonEinzeln.toFixed(2)),
				rest: Number(
					(totals.totalEuro - allesVonEinzeln).toFixed(2)
				),
			});
			setCounted(true);
		}
	};

	return (
		<>
			{!loaded ? (
				<Box sx={{ display: "flex" }}>
					<CircularProgress />
				</Box>
			) : (
				<div className={styles.mainContainer}>
					<TextField
						required
						label="Total €"
						type="number"
						onChange={e => {
							updateTotals("money", e);
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									€
								</InputAdornment>
							),
							inputProps: {
								max: 3000,
								min: 0,
							},
						}}
					/>
					<div className={styles.container}>
						{items.map((formItem, index) => {
							return (
								<div
									key={index}
									className={styles.inputContainer}>
									{getEmployeeForm(formItem.id)}
								</div>
							);
						})}
						<div className={styles.buttonContainer}>
							<Button
								className={styles.margin5}
								onClick={addItem}
								variant="outlined">
								ADD
							</Button>
							<Button
								className={styles.margin5}
								onClick={() =>
									count(
										totals.totalEuro,
										totals.totalHours
									)
								}
								variant="outlined">
								Count
							</Button>
						</div>
						<div className={styles.infoTableContainer}>
							<table>
								<tr>
									<td>Total hours:</td>
									<td> </td>
									<td>{`${totals.totalHours}`}</td>
								</tr>
								<tr>
									<td>Total Money splitted:</td>
									<td> </td>
									<td>
										{`${allMoneyGivenAndRest.all} `}
										€
									</td>
								</tr>
								<tr>
									<td>Rest:</td>
									<td> </td>
									<td>
										{`${allMoneyGivenAndRest.rest} `}
										€
									</td>
								</tr>
							</table>
						</div>
					</div>
					<>
						{counted ? (
							<Card
								raised
								className={styles.card}
								variant="outlined">
								<CardContent>
									{items.map(item => {
										return (
											<div
												key={item.id}
												className={
													styles.typoContainer
												}>
												<Typography
													variant="h6"
													component="div">
													{item.name}
												</Typography>
												<p> </p>
												<Typography
													variant="h6"
													component="div">
													{item.money}€
												</Typography>
											</div>
										);
									})}
								</CardContent>
							</Card>
						) : (
							<div>. . .</div>
						)}
					</>
				</div>
			)}
		</>
	);
}
