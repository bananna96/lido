import { Fragment } from "react"; // TODO: notwenig?
import { Card, Toolbar, AppBar, Typography } from "@mui/material";
import styles from "../page.module.css";

export default function Nav(props: any) {
	return (
		<Fragment>
			<AppBar className={styles.appBar}>
				<Toolbar className={styles.toolBar}>
					<Typography variant="h6" component="div">
						Counter
					</Typography>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
}
