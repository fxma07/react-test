import React from "react";
import "./avatar.css";

import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { makeStyles } from "@material-ui/core/styles";
import RenderCropper from "../cropper/cropper";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	paper: {
		marginRight: theme.spacing(2),
	},
	cameraIcon: {
		height: "4rem",
		width: "4rem",
		position: "absolute",
		bottom: "-20px",
		left: "120px",
		backgroundColor: "white",

		"&:hover": {
			backgroundColor: "white",
		},
	},
}));

export default function RenderAvatar() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const [avatar, setAvatar] = React.useState("");

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}

	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const [showCropper, setShowCropper] = React.useState(false);
	const handleCropper = () => setShowCropper((prevValue) => !prevValue);

	return (
		<>
			<div className="avatar-container">
				<div className="avatar">
					<img src={avatar} alt="avatar" className="avatar-img" />
				</div>
				<IconButton
					ref={anchorRef}
					aria-controls={open ? "menu-list-grow" : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
					className={classes.cameraIcon}
				>
					<AddAPhotoIcon fontSize="small" />
				</IconButton>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					transition
					disablePortal
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === "bottom" ? "center top" : "center bottom",
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										autoFocusItem={open}
										id="menu-list-grow"
										onKeyDown={handleListKeyDown}
									>
										<MenuItem onClick={handleClose}>View</MenuItem>
										<MenuItem
											onClick={(event) => {
												handleCropper();
												handleClose(event);
											}}
										>
											Change
										</MenuItem>
										<MenuItem>Remove</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>

			{showCropper && (
				<RenderCropper handleCropper={handleCropper} setAvatar={setAvatar} />
			)}
		</>
	);
}
