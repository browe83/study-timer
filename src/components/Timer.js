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
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [minutes, setMinutes] = useState(25);
  // const [seconds, setSeconds] = useState(0);
  // const [timer, setTimer] = useState(`25:00`);
  const classes = useStyles();

  const incrementSession = (e) => {
    console.log('increment session Length:', e);
    // eslint-disable-next-line no-unused-expressions
    sessionLength >= 59
      ? setSessionLength(60)
      : setSessionLength((prev) => prev + 1);
  };

  const decrementSession = () => {
    console.log('decrement');
    // eslint-disable-next-line no-unused-expressions
    sessionLength === 1
      ? setSessionLength(1)
      : setSessionLength((prev) => prev - 1);
  };

  const decrementBreak = () => {
    console.log('decrement');
    // eslint-disable-next-line no-unused-expressions
    breakLength === 1 ? setBreakLength(1) : setBreakLength((prev) => prev - 1);
  };

  const incrementBreak = (e) => {
    console.log('increment break Length:', e);
    // eslint-disable-next-line no-unused-expressions
    breakLength >= 59 ? setBreakLength(60) : setBreakLength((prev) => prev + 1);
  };

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
              <IconButton id="break-decrement" onClick={decrementBreak}>
                <ArrowDownwardIcon />
              </IconButton>
              <Typography id="break-length">{breakLength}</Typography>
              <IconButton id="break-increment" onClick={incrementBreak}>
                <ArrowUpwardIcon />
              </IconButton>
            </Box>
          </Box>
          <Box className={classes.subLength}>
            <Typography id="session-label" variant="h5">
              Session Length
            </Typography>
            <Box className={classes.arrows}>
              <IconButton id="session-decrement" onClick={decrementSession}>
                <ArrowDownwardIcon />
              </IconButton>
              <Typography id="session-length">{sessionLength}</Typography>
              <IconButton id="session-increment" onClick={incrementSession}>
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
              Setting Up PR for Staic Count Down
            </Typography>
          </Container>
        </Box>
        <Container align="center">
          <IconButton id="start_stop">
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
