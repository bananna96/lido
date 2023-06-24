import {
	Stack,
	Paper,
	Button,
	TextField,
	InputAdornment,
	CircularProgress,
	Box,
} from "@mui/material";
import styles from "../page.module.css";
import { styled } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import ResultDisplay from "../components/resultDisplay";
// import employeeForm from "../components/employeeForm";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

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
				all: allesVonEinzeln,
				rest: totals.totalEuro - allesVonEinzeln,
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
					<h1>MOIN</h1>
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
						<div>Total hours: {`${totals.totalHours}`}</div>
						<div>
							Total Money splitted:{" "}
							{`${allMoneyGivenAndRest.all}`}
						</div>
						<div>Rest: {`${allMoneyGivenAndRest.rest}`}</div>
					</div>
					<>
						{counted ? (
							items.map(item => {
								return (
									<div>
										<ResultDisplay
											name={item.name}
											amount={item.money}
										/>
									</div>
								);
							})
						) : (
							<div>NOTHING</div>
						)}
					</>
				</div>
			)}
		</>
	);
}
