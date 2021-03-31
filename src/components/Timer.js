import {
  Container,
  Paper,
  Typography,
  Box,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#d4eee2',
  },
  timer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    paddingTop: '10px',
  },
  length: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '400px',
  },
  subLength: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  arrows: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [inSession, setSession] = useState(false);
  const classes = useStyles();
  // preping new pull request

  const increment = () => {
    console.log('increment minutes');
    setMinutes(minutes + 1);
  };

  const decrement = () => {
    console.log('decrement');
    setMinutes(minutes - 1);
  };

  const countDown = () => {
    const currentState = inSession;
    setSession(!currentState);
    if (!inSession) {
      setInterval(() => {
        setMinutes((m) => m - 1);
        console.log('minutes:', minutes);
      }, 1000);
    } else {
      console.log('stop session');
      setMinutes(25);
    }
  };

  useEffect(() => {});

  return (
    <Container className={classes.container}>
      <Paper elevation={12} outlined className={classes.timer}>
        <Typography variant="h4" outlined>
          25 + 5 Clock
        </Typography>
        <Box className={classes.length}>
          <Box className={classes.subLength}>
            <Typography id="break-label" variant="h5">
              Break Length
            </Typography>
            <Box className={classes.arrows}>
              <IconButton id="break-decrement" onClick={decrement}>
                <ArrowDownwardIcon />
              </IconButton>
              <Typography id="break-length">5</Typography>
              <IconButton id="break-increment" onClick={increment}>
                <ArrowUpwardIcon />
              </IconButton>
            </Box>
          </Box>
          <Box className={classes.subLength}>
            <Typography id="session-label" variant="h5">
              Session Length
            </Typography>
            <Box className={classes.arrows}>
              <IconButton id="session-decrement" onClick={decrement}>
                <ArrowDownwardIcon />
              </IconButton>
              <Typography id="session-length">{minutes}</Typography>
              <IconButton id="session-increment" onClick={increment}>
                <ArrowUpwardIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box>
          <Container>
            <Typography id="timer-label" align="center" variant="h5">
              Session
            </Typography>
            <Typography id="time-left" align="center" variant="h3">
              {`${minutes}:0${seconds}`}
            </Typography>
          </Container>
        </Box>
        <Container align="center">
          <IconButton id="start_stop" onClick={countDown}>
            <PlayCircleOutlineIcon />
            <PauseCircleOutlineIcon />
          </IconButton>
          <IconButton id="reset">
            <AutorenewIcon />
          </IconButton>
        </Container>
      </Paper>
    </Container>
  );
}
