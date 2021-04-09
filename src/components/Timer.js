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
import { useState, useEffect, useRef } from 'react';
import { Duration } from 'luxon';
import useInterval from '../hooks/useInterval';
import sound from '../mixkit-alarm-digital-clock-beep-989.wav';

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  length: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '400px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
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
}));

export default function Timer() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [inSession, setInSession] = useState(false);
  const [mode, setMode] = useState('session');
  const [time, setTime] = useState(sessionLength * 60 * 1000);

  const classes = useStyles();
  const beep = useRef();

  useInterval(() => setTime(time - 1000), inSession ? 1000 : null);

  const timeLeft = (duration) =>
    Duration.fromMillis(duration).toFormat('mm:ss');
  // Lines 63 through 83 are not mine.
  useEffect(() => {
    if (time === 0 && mode === 'session') {
      beep.current.play();
      setMode('break');
      setTime(breakLength * 60 * 1000);
    } else if (time === 0 && mode === 'break') {
      beep.current.play();
      setMode('session');
      setTime(sessionLength * 60 * 1000);
    }
  }, [time, breakLength, sessionLength, mode]);

  const handleReset = () => {
    beep.current.pause();
    beep.current.currentTime = 0;
    setInSession(false);
    setMode('session');
    setBreakLength(5);
    setSessionLength(25);
    setTime(25 * 60 * 1000);
  };

  const incrementSession = () => {
    // eslint-disable-next-line no-unused-expressions
    sessionLength > 58
      ? setSessionLength(60)
      : setSessionLength(sessionLength + 1);
  };

  const decrementSession = () => {
    // eslint-disable-next-line no-unused-expressions
    sessionLength === 1
      ? setSessionLength(1)
      : setSessionLength(sessionLength - 1);
  };

  useEffect(() => {
    setTime(sessionLength * 60 * 1000);
  }, [sessionLength]);

  const decrementBreak = () => {
    // eslint-disable-next-line no-unused-expressions
    breakLength === 1 ? setBreakLength(1) : setBreakLength(breakLength - 1);
  };

  const incrementBreak = () => {
    // eslint-disable-next-line no-unused-expressions
    breakLength > 58 ? setBreakLength(60) : setBreakLength(breakLength + 1);
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
              {mode === 'session' ? 'Session' : 'Break'}
            </Typography>
            <Typography id="time-left" align="center" variant="h3">
              {timeLeft(time)}
            </Typography>
          </Container>
        </Box>
        <Container align="center">
          <IconButton id="start_stop" onClick={() => setInSession(!inSession)}>
            <PlayCircleOutlineIcon />
            <PauseCircleOutlineIcon />
          </IconButton>
          <IconButton id="reset" onClick={handleReset}>
            <AutorenewIcon />
          </IconButton>
        </Container>
      </Paper>
      <audio id="beep" src={sound} ref={beep}>
        <track default kind="captions" />
      </audio>
    </Container>
  );
}
