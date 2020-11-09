import React from "react";
import AddBookmark from "./addBookmark";
import { makeStyles, Grid, Hidden, Box, Typography } from "@material-ui/core";
import { bookmarkType } from "../types/bookmarkType";

const useStyle = makeStyles((theme) => ({
  root: {
    // background: theme.palette.secondary.main,
  },
  title: {
    color: "white",
    fontSize: "30px",
    fontWeight: 550,
  },
  desc: {
    color: "#f7fafc",
    fontSize: "20px",
  },
}));

interface props {
  bookmarksList: bookmarkType[] | undefined;
  setBookmarkList: React.Dispatch<
    React.SetStateAction<bookmarkType[] | undefined>
  >;
}

const BoomarkLandingSection: React.FC<props> = ({
  setBookmarkList,
  bookmarksList,
}) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      {/* <div className={`Maincontainer`}>
        <Box py={10}>
          <Grid container spacing={2}>
            <Hidden xsDown>
              <Grid
                item
                container
                justify="flex-end"
                alignContent="center"
                sm={6}
              >
                <div>
                  <Typography className={classes.title}>
                    Bookmarking Application
                  </Typography>
                  <Typography className={classes.desc}>
                    This App will let you save your bookmarks here for free
                  </Typography>
                </div>
              </Grid>
            </Hidden>
            <Grid item sm={6} xs={12} container justify="center">
              <AddBookmark
                setBookmarkList={setBookmarkList}
                bookmarksList={bookmarksList}
              />
            </Grid>
          </Grid>
        </Box>
      </div> */}
        {/* <Grid item sm={6} xs={12} container justify="center"> */}
              <AddBookmark
                setBookmarkList={setBookmarkList}
                bookmarksList={bookmarksList}
              />
            {/* </Grid> */}
    </div>
  );
};

export default BoomarkLandingSection;
