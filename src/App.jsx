//import React, { useEffect, useState } from "react";
/*import { Box, Grid, Stack } from "@mui/material";*/
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer"
//import { TopMenu } from "./components/TopMenu";
//import { AppRouter } from "./AppRouter";
//import { getCurrentWeather } from "./services/WeatherService";
//import { WeatherIndicator } from "./components/WeatherIndicator";

export function App() {
  //const [weatherData, setWeatherData] = useState();

  //useEffect(() => {
  //  const fetchWeatherData = async () => {
  //    const obtainedData = await getCurrentWeather('Buenos Aires');
  //    setWeatherData(obtainedData);
  //  }
  //  fetchWeatherData();
  //}, []);

  return (
<<<<<<< HEAD
      <BrowserRouter>
        <Footer />
      {/*<Stack direction='column'>*/}
      {/*  <Grid container direction='row'>*/}
      {/*    <Grid item xs={12} md={8}>*/}
      {/*      <TopMenu />*/}
      {/*    </Grid>*/}
      {/*    <Grid item xs={12} md={4}>*/}
      {/*      <WeatherIndicator weatherData={weatherData} />*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}
      {/*  <Box sx={{mx: { xs: 1, md: 4 }, my: 4}}>*/}
      {/*    <AppRouter />*/}
      {/*  </Box>*/}
      {/*</Stack>*/}
=======
    <BrowserRouter>
        <Header/>
>>>>>>> d015975439734833a2477da80e78de7906cfdc9b
    </BrowserRouter>
  )
}
