import {
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Stack,
	Paper,
	Button,
	TextField,
} from "@mui/material";
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
			changedItem.time = event.target.value;
		}
		itemsSpeicher[id] = changedItem;
		setItems(itemsSpeicher);
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
			</Stack>
		</>
	);
}
