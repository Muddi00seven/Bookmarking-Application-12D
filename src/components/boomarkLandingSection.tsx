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
              <AddBookmark
                setBookmarkList={setBookmarkList}
                bookmarksList={bookmarksList}
              />
      </div>
  );
};

export default BoomarkLandingSection;
