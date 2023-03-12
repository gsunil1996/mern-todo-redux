import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from "react-router-dom";
import Box from '@material-ui/core/Box';

const drawerWidth = 240;

const MuiListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "#00203FFF",
            margin: '0px 5px 0px 5px',
            borderRadius: '2px',
            border: '0.3px solid #ddd',
            color: "#ADEFD1FF !important",
            fontWeight: "700 !important",
            "& .MuiListItemIcon-root": {
                color: "#ADEFD1FF",
            },
            "&& .MuiListItemText-primary":
            {
                fontWeight: 600,
            }
        },
        "&$selected:hover": {
            backgroundColor: "#101820FF",
            color: "#FEE715FF !important",
            "& .MuiListItemIcon-root": {
                color: "#FEE715FF",
            }
        },
        "&:hover": {
            backgroundColor: "#606060FF",
            color: "#D6ED17FF",
            "& .MuiListItemIcon-root": {
                color: "#D6ED17FF",
            }
        }
    },
    selected: {}
})(ListItem);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
    },
}));

const ExternalDrawer = () => {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState('');
    const [pageTitle, setPageTitle] = useState('');

    const itemsList = [
        {
            text: "Users",
            icon: <MailIcon />,
            indexes: 0,
        },
        {
            text: "Products",
            icon: <InboxIcon />,
            indexes: 1,
        },
    ];

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if (index === 0) {
            history.push('/');
        }
        else if (index === 1) {
            history.push('/products');
        }
    };

    React.useEffect(() => {
        let total_url = window.location.pathname.split('/')
        let url = total_url[1];
        if (url === "") {
            setSelectedIndex(0)
        }
        else if (url === "products") {
            setSelectedIndex(1)
        }
    }, []);

    let pageTitlePath = history.location && history.location.pathname.split('/')
    useEffect(() => {
        let str = pageTitlePath && pageTitlePath[1].replace("-", " ")
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        if (splitStr == "") {
            setPageTitle("Users")
        } else {
            setPageTitle(splitStr.join(' '))
        }
    }, [pageTitlePath])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {pageTitle.toLocaleUpperCase()}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {itemsList.map((item, index) => {
                        const { text, icon, indexes } = item;
                        return (
                            <MuiListItem button key={index} selected={selectedIndex === indexes}
                                onClick={(event) => handleListItemClick(event, indexes)}
                            >
                                {icon && <ListItemIcon>
                                    {icon}
                                </ListItemIcon>}
                                <ListItemText primary={text} />

                            </MuiListItem>
                        );
                    })}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
            </main>
        </div>
    );
}

export default ExternalDrawer