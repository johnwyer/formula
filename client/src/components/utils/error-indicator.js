import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
//import Button from '@material-ui/core/Button';
//import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import ReloadIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
//import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
	error: ErrorIcon
};

const styles1 = theme => ({
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing.unit,
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
});

function MySnackbarContent(props) {
	const { classes, className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={classNames(classes[variant], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Icon className={classNames(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					className={classes.close}
					onClick={onClose}
				>
					<ReloadIcon className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	);
};

MySnackbarContent.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
	margin: {
		margin: "40px auto"
	}
});

class ErrorIndicator extends Component {
	render() {
		const { classes, message, reloadHandler, componentClasses } = this.props;
		const componentClass = componentClasses === undefined ? classes.margin : `${classes.margin} ${componentClasses}`
		return (
			<MySnackbarContentWrapper
				variant="error"
				className={componentClass}
				message={message}
				onClose={reloadHandler}
			/>
		)
	}
};

ErrorIndicator.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(ErrorIndicator);