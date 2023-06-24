import { TextField } from "@mui/material";
import { Fragment } from "react";

export default function employeeForm() {
	return (
		<Fragment>
			<TextField label="Name" type="text" />
			<TextField label="Time" type="number" />
		</Fragment>
	);
}
