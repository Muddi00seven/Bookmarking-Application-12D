import React from "react";
import { Skeleton } from "@material-ui/lab";
import { makeStyles, Box } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  loaderWrapper: {
    background: "#f3f3f3",
    maxWidth: "600px",

    margin: "0 auto",
  },
  titleLoader: {
    width: "120px",
    borderRadius: "5px",
    marginBottom: "5px",
  },
  dateLoader: {
    width: "90px",
    borderRadius: "5px",
  },
  buttonLoder: {
    width: "80px",
    borderRadius: "5px",
    marginBottom: "5px",
  },
}));

const Cardloader = () => {
  const classes = useStyle();

  return (
    <div>
      <div className={classes.loaderWrapper}>
        <Box p={4}>
          <Skeleton
            variant="rect"
            component="h2"
            className={classes.titleLoader}
          ></Skeleton>
          <Skeleton
            variant="rect"
            component="h6"
            className={classes.dateLoader}
          ></Skeleton>
          <Box pt={2}>
            <Skeleton variant="rect" component="h6"></Skeleton>
          </Box>
          <Box pt={1}>
            <Skeleton variant="rect" component="h6"></Skeleton>
          </Box>
          <Box pt={1}>
            <Skeleton variant="rect" component="h6"></Skeleton>
          </Box>
          <Box pt={2}>
            <Skeleton
              variant="rect"
              component="h2"
              className={classes.buttonLoder}
            ></Skeleton>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Cardloader;
