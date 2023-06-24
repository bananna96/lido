import { Fragment } from "react"; // TODO: notwenig?
import { Card, CardContent, CardActions, Typography } from "@mui/material";

export default function ResultDisplay(props: any) {
	return (
		<Fragment>
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h5" component="div">
						{props.name} = {props.amount}€
					</Typography>
				</CardContent>
			</Card>
		</Fragment>
	);
}
