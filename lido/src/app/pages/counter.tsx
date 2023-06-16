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

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const employeeForm = (
	<div>
		<TextField label="Name" type="text" />
		<TextField label="Time" type="number" />
	</div>
);
export default function Counter() {
	const [items, setItems] = useState([employeeForm]);

	const addItem = function () {
		setItems([...items, employeeForm]);
	};
	return (
		<>
			<h1>MOIN</h1>
			<Stack spacing={2}>
				{items.map((item, i) => item)}
				<Button onClick={addItem} variant="outlined">
					ADD
				</Button>
			</Stack>
		</>
	);
}
