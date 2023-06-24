import { Stack, Paper, Button, TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
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
	const [items, setItems] = useState([{ id: 0, name: "", time: 0 }]);

	const addItem = function () {
		setItems([...items, { id: items.length, name: "", time: 0 }]);
	};
	const updateEmpState = (id: number, field: string, event: any) => {
		// TODO: shorter / less code?
		let itemsSpeicher = [...items];
		let changedItem = { ...items[id] };
		if (field === "name") {
			changedItem.name = event.target.value;
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
			<div key={id}>
				<TextField
					label="Name"
					type="text"
					onChange={e => {
						updateEmpState(id, "name", e);
					}}
				/>
				<TextField
					label="Time"
					type="number"
					onChange={e => {
						updateEmpState(id, "time", e);
					}}
				/>
			</div>
		);
	};
	return (
		<>
			<h1>MOIN</h1>
			<div>
				<TextField
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
					}}
				/>
			</div>
			<Stack spacing={2}>
				{items.map((formItem, index) => {
					return (
						<div key={index}>
							{getEmployeeForm(formItem.id)}
						</div>
					);
				})}
				<Button onClick={addItem} variant="outlined">
					ADD
				</Button>
				<Button onClick={addItem} variant="outlined">
					Count
				</Button>
				<div>Total hours: {`${totals.totalHours}`}</div>
			</Stack>
		</>
	);
}
