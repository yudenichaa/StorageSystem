import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
    Grid, Typography, Card, Link
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    logo: {
        display: "flex",
        alignItems: "center",
        paddingLeft: "1.5rem",
        width: "18rem",
        height: "5rem",
        backgroundColor: "white",
        position: "relative",
        borderBottom: "0.05em solid rgba(219, 219, 219, 0.5)",
        "&::before": {
            content: '""',
            position: "absolute",
            bottom: 0,
            right: 0,
            borderTop: "7rem solid #2196f3",
            borderLeft: "5rem solid transparent",
            width: 0,
        },
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
    },
    title: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "5rem",
        backgroundColor: "#2196f3",
    },
    titleText: {
        fontSize: "2.2em",
        fontFamily: "ProximaNova",
        color: "white",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.8em"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.4em"
        },
    },
    cards: {
        margin: "0.5rem 0",
    },
    card: {
        maxWidth: '35rem'
    },
    cardContent: {
        padding: "0.7em 0",
    },
    cardContentTitle: {
        fontFamily: "ProximaNova"
    },
    cardLink: {
        color: "black",
        "&:hover": {
            textDecoration: "none",
        }
    },
    cardImage: {
        display: "block",
        width: "100%",
        height: "auto",
    },
    cardFooter: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "0.5em"
    }
}));

const tabsData = [
    { image: "static/science.png", title: 'Система хранения результатов научных трудов Военного инновационного технополиса "ЭРА"', link: "http://localhost:3000/" },
];

const HomePage = () => {
    const classes = useStyles();
    const cards = tabsData.map(tab => (
        <Grid container item justify="center" xs={12} md={6} lg={4}>
            <Card className={classes.card}>
                <Link href={`${tab.link}`}>
                    <img className={classes.cardImage} src={`${tab.image}`} />
                </Link>
                <div className={classes.cardContent}>
                    <Link color="text" className={classes.cardLink} href={`${tab.link}`}>
                        <Typography className={classes.cardContentTitle} align="center" variant="h6" component="h2">
                            {tab.title}
                        </Typography>
                    </Link>
                </div>
            </Card>
        </Grid>
    ));
    return (
        <>
            <CssBaseline />
            <Grid container>
                <Grid container>
                    <Grid item>
                        <div className={classes.logo}>
                            <img src="static/logo.png" />
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div className={classes.title}>
                            <Typography className={classes.titleText} component="span">
                                Военный инновационный технополис "ЭРА"
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <Grid className={classes.cards} container justify="flex-start" spacing={3}>
                    {cards}
                </Grid>
            </Grid>
        </>
    );
}

export default HomePage;