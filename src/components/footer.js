import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    container: {
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
    }
}))

export default function Footer() {
    const classes = useStyles();
    return (
        // Obligatory made with ❤️ footer
        <footer className="footer">
            <Container maxWidth="sm" className={classes.container}>
                <Divider variant="inset" />
                <Typography variant="body2" color="textSecondary" align="center" className={classes.margin}>
                    {'Made with ['}<img src="/mongodb.png" height="18px" style={{ verticalAlign: "sub" }} />{',  '}<img src="/express.png" height="18px" style={{ verticalAlign: "sub" }} />{',  '}<img src="/react.png" height="18px" style={{ verticalAlign: "sub" }} />{',  '}<img src="/nodejs.png" height="18px" style={{ verticalAlign: "sub" }} /> ].reduce() = ❤️
                    </Typography>
            </Container>
        </footer>
    );
}