// import * as React from 'react';
import Header from "../components/header"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, Button, } from "@mui/material";
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import "./game.css";
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../App";
import RiseLoader from "react-spinners/RiseLoader";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Slide from '@mui/material/Slide';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[600],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
const Game = () => {
  const { selectedOne, setSelectedOne } = useContext(UserContext)
  const { selectedTwo, setSelectedTwo } = useContext(UserContext)
  const [computerRuns, setComputerRuns] = useState(0);
  const [runsThisBall, setRunsThisBall] = useState(0);
  const [userTotalRuns, setUserTotalRuns] = useState(0);
  const [target, setTarget] = useState();
  const [computerTotalRuns, setComputerTotalRuns] = useState(0);
  const [loading, setLoading] = useState(false);
  const [innings, setInnings] = useState("First");
  const [userImage, setUserImage] = useState("");
  const [computerImage, setComputerImage] = useState("");
  // const [open, setOpen] = React.useState(false);

  // Define the images based on whether the user is batting or bowling
  useEffect(() => {
    if (selectedOne) {
      const userImages =
        selectedOne === "Batting"
          ? "https://cdn-icons-png.flaticon.com/128/6219/6219926.png" // Batting image
          : "https://cdn-icons-png.flaticon.com/128/7037/7037815.png"; // Bowling image

      const computerImages =
        selectedOne === "Batting"
          ? "https://cdn-icons-png.flaticon.com/128/7037/7037815.png" // Bowling image
          : "https://cdn-icons-png.flaticon.com/128/6219/6219926.png"; // Batting image
      setComputerImage(computerImages);
      setUserImage(userImages);
    } else if (selectedTwo) {

      const computerImages =
        selectedTwo === "Batting"
          ? "https://cdn-icons-png.flaticon.com/128/6219/6219926.png" // Batting image
          : "https://cdn-icons-png.flaticon.com/128/7037/7037815.png"; // Bowling image

      const userImages =
        selectedTwo === "Batting"
          ? "https://cdn-icons-png.flaticon.com/128/7037/7037815.png" // Bowling image
          : "https://cdn-icons-png.flaticon.com/128/6219/6219926.png"; // Batting image
      setComputerImage(computerImages);
      setUserImage(userImages);
    }
  }, []);


  const handleScoreRuns = (runs) => {
    setLoading(true); // Set loading to true when the button is clicked
    setTimeout(() => {
      setLoading(false); // Set loading to false after the computation is done
      setRunsThisBall(runs);
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      setComputerRuns(randomNumber);

      if ((selectedOne === "Batting" || selectedTwo === "Bowling") && runs === randomNumber) {
        // Display alert message when runs scored by the user is the same as computer's runs
        alert("Wicket Both sides scored " + runs + " runs in this ball.");

        if ((selectedOne === "Batting" || selectedTwo === "Bowling") && userTotalRuns + runs >= target) {
          alert("Congratulations! You won the game.");
          // Reset the game or redirect to another page
        }
        else if ((selectedOne === "Batting" || selectedTwo === "Bowling") && userTotalRuns + runs < target && runs === randomNumber) {
          alert("You lost the game.");
        }
        else if ((selectedOne === "Batting" || selectedTwo === "Bowling") && computerTotalRuns + randomNumber >= target) {
          alert("Computer won the game. Better luck next time!");
        }
        else if ((selectedOne === "Batting" || selectedTwo === "Bowling") && computerTotalRuns + randomNumber < target && runs === randomNumber) {
          alert("Congratulations! You won the game");
        }
  

        if (selectedOne === "Batting" || selectedTwo === "Bowling") {
          setTarget(userTotalRuns + 1);

        } else if (selectedTwo === "Batting" || selectedOne === "Bowling") {
          setTarget(computerTotalRuns + 1);

        }

        // Reset runs
        setRunsThisBall(0);
        setComputerRuns(0);
        handleInningsChange();
      }

      else if ((selectedTwo === "Batting" || selectedOne === "Bowling") && runs === randomNumber) {
        // Display alert message when runs scored by the computer is the same as user's runs
        alert("Wicket Both sides scored " + randomNumber + " runs in this ball.");

        if ((selectedTwo === "Batting" || selectedOne === "Bowling") && userTotalRuns + runs >= target) {
          alert("Congratulations! You won the game.");
          // Reset the game or redirect to another page
        }
        else if ((selectedTwo === "Batting" || selectedOne === "Bowling") && userTotalRuns + runs < target && runs === randomNumber) {
          alert("You lost the game.");
        }
        else if ((selectedTwo === "Batting" || selectedOne === "Bowling") && computerTotalRuns + randomNumber >= target) {
          alert("Computer won the game. Better luck next time!");
        }
        else if ((selectedTwo === "Batting" || selectedOne === "Bowling") && computerTotalRuns + randomNumber < target && runs === randomNumber) {
          alert("Congratulations! You won the game");
        }

        if (selectedOne === "Batting" || selectedTwo === "Bowling") {
          setTarget(userTotalRuns + 1);

        } else if (selectedTwo === "Batting" || selectedOne === "Bowling") {
          setTarget(computerTotalRuns + 1);

        }

        // Reset runs
        setRunsThisBall(0);
        setComputerRuns(0);
        handleInningsChange();
      }

      else {
        if (selectedOne === "Batting" || selectedTwo === "Bowling") {
          setUserTotalRuns(userTotalRuns + runs);
      // --------
     

        } 
        
        else if (selectedTwo === "Batting" || selectedOne === "Bowling") {
          setComputerTotalRuns(computerTotalRuns + randomNumber);
          // -----------
       
        }


      }
    }, 1000); // Adjust the timeout as needed
  };

  const handleInningsChange = () => {

    if (innings === "First") {
      setInnings("Second");
      setSelectedOne(selectedTwo);
      setSelectedTwo(selectedOne);
      setComputerImage(userImage);
      setUserImage(computerImage);
    }
    else {
      // Reset target after second innings
      setTarget(null);
    }
  };
  return (
    <>
      {/* <h1>{`Toss result: ${selectedOne}`}</h1>
      <h1>{`opponentToss result: ${selectedTwo}`}</h1> */}
      <Header />
      <h1>Game</h1>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card sx={{ width: 240, height: 220, marginRight: 15, marginX: 20, marginBottom: 4 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14, textAlign: 'center', fontWeight: 'bold', marginBottom: 2 }} color="text.secondary" gutterBottom>
              USER
            </Typography>
            <Typography sx={{ mb: 1.0, textAlign: 'center', marginBottom: 3 }} color="text.secondary">
              Runs: {selectedOne === "Batting" || selectedTwo === "Bowling" ? userTotalRuns : 0}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardMedia
                sx={{ height: 75, width: 75 }}

                image={userImage}
                title="User"
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ width: 400, height: 170, marginBottom: 4, marginY: 4 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14, textAlign: 'center', fontWeight: 'bold', marginBottom: 2 }} color="text.secondary" gutterBottom>
              {innings === "First" ? "First Innings" : "Second Innings"}
            </Typography>
            <Typography sx={{ mb: 1.0, textAlign: 'center' }} color="text.secondary">
              This Ball:
            </Typography>
            <Typography sx={{ mb: 1.0, textAlign: 'center' }} color="text.secondary">

              {runsThisBall} : {computerRuns}
            </Typography>
            {innings === "Second" && target && (
              <Typography sx={{ mb: 1.0, textAlign: 'center' }} color="text.secondary">
                {/* {selectedOne === "Batting" || selectedTwo === "Bowling" ? `Target: ${userTotalRuns}` : `Total Runs: ${computerTotalRuns}`} */}
                Target: {target}
              </Typography>
            )}
          </CardContent>
        </Card>

        <Card sx={{ width: 240, height: 220, marginLeft: 15, marginX: 20, marginBottom: 4 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14, textAlign: 'center', fontWeight: 'bold', marginBottom: 2 }} color="text.secondary" gutterBottom>
              COMPUTER
            </Typography>
            <Typography sx={{ mb: 1.0, textAlign: 'center', marginBottom: 3 }} color="text.secondary">
              Runs: {selectedTwo === "Batting" || selectedOne === "Bowling" ? computerTotalRuns : 0}
              {/* Runs: {computerTotalRuns} */}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardMedia
                sx={{ height: 65, width: 70 }}
                image={computerImage}
                title="Computer"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Stack spacing={2} direction="row" justifyContent={'center'}>
        <ColorButton variant="contained" onClick={() => handleScoreRuns(1)}>1</ColorButton >
        <ColorButton variant="contained" onClick={() => handleScoreRuns(2)}>2</ColorButton >
        <ColorButton variant="contained" onClick={() => handleScoreRuns(3)}>3</ColorButton >
        <ColorButton variant="contained" onClick={() => handleScoreRuns(4)}>4</ColorButton >
        <ColorButton variant="contained" onClick={() => handleScoreRuns(5)}>5</ColorButton >
        <ColorButton variant="contained" onClick={() => handleScoreRuns(9)}>6</ColorButton>
      </Stack>

      {/* <Button variant="contained" onClick={generateRandomNumber}>Generate Runs</Button> */}

      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <RiseLoader
          color={'#600080'}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {/* <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      </Dialog> */}
      </div>
    </>
  )
}

export default Game;
