import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: "#FFFFFF",
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  listItem: {
    padding: '10px 0',
  },
}));

export default function ProfileDetail({ profiles }) {
  const classes = useStyles();

  return (
    <>
      <div style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderBottom: 'solid 1px #dddddd',
        paddingBottom: '20px',
      }}>
        <Avatar alt={profiles?.businessName} src={profiles?.logo} className={classes.large} />
      </div>
      <List className={classes.root}>
        <ListItem className={classes.listItem}>
          <BusinessCenterIcon style={{ marginRight: '20px', color: 'gray' }} />
          <ListItemText 
            primary={profiles?.businessName || "Business Name not available"} 
          />
        </ListItem>

        <ListItem className={classes.listItem}>
          <LocationOnIcon style={{ marginRight: '20px', color: 'gray' }} />
          <ListItemText 
            primary={profiles?.contactAddress || "Contact Address not available"} 
          />
        </ListItem>

        <ListItem className={classes.listItem}>
          <PhoneInTalkIcon style={{ marginRight: '20px', color: 'gray' }} />
          <ListItemText 
            primary={profiles?.phoneNumber || "Phone Number not available"} 
          />
        </ListItem>

        <ListItem className={classes.listItem}>
          <AlternateEmailIcon style={{ marginRight: '20px', color: 'gray' }} />
          <ListItemText 
            primary={profiles?.email || "Email not available"} 
          />
        </ListItem>

        <ListItem className={classes.listItem}>
          <AccountBalanceWalletRoundedIcon style={{ marginRight: '20px', color: 'gray' }} />
          <ListItemText 
            primary={profiles?.paymentDetails || "Payment Details not available"} 
          />
        </ListItem>
      </List>
    </>
  );
}
