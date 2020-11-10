import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_BOOKMARK } from "../queries/deleteBookmark";
import { useBookmarkListQuery } from "../types/generated";
import {makeStyles,Box,Typography,Button, IconButton,} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Cardloader from "../utlils/cardloader";
import dayjs from "dayjs";
import { bookmarkList } from "../queries/bookmarkList";
import { bookmarkType } from "../types/bookmarkType";

const useStyle = makeStyles((theme) => ({
  cardWrapper: {
    background: "#f3f3f3",
    padding: "40px",
    maxWidth: "600px",
    margin: "10px auto 0 auto ",
    borderRadius: "8px",
    position: "relative",

  },
  title: {
    textTransform: "capitalize",
    fontSize: "30px",
    fontWeight: 550,
    fontFamily: '"Comic Sans MS", cursive, sans-serif',

  },
  date: {
    marginTop: "-3px",
    fontFamily: '"Comic Sans MS", cursive, sans-serif',

  },
  description: {
    color: "#718096",
    fontFamily: '"Comic Sans MS", cursive, sans-serif',

  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: "15px",
    color: '#666362'

  },
  urlBtn: {
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    fontSize: '16px',
    fontWeight: 'bolder',
    color: 'white',
    backgroundColor: '#85807f'

  }
}));

interface props {
  bookmarksList: bookmarkType[] | undefined;
  setBookmarkList: React.Dispatch<
    React.SetStateAction<bookmarkType[] | undefined>
  >;
}

const BookmarkCard: React.FC<props> = ({ setBookmarkList, bookmarksList }) => {
  const classes = useStyle();
  const [delete_bookmark] = useMutation(DELETE_BOOKMARK);

  const { loading, error, data } = useBookmarkListQuery();

  if (error) {
    return <h1>error</h1>;
  }
  const sortedByCreatedAt = data?.bookmarks?.slice().sort((a, b) => {
    return dayjs(b?.createdAt).isAfter(dayjs(a?.createdAt)) ? 1 : -1;
  });

  React.useEffect(() => {
    setBookmarkList(sortedByCreatedAt as bookmarkType[]);
  }, [data]);

  const handleDelete = (id) => {
    setBookmarkList(undefined);
    delete_bookmark({
      variables: {
        id,
      },
      refetchQueries: [{ query: bookmarkList }],
    });
  };

  return (
    <div>
      <div className={`Maincontainer`}>
        {!bookmarksList ? (
          <Box py={10}>
            <Cardloader />
          </Box>
        ) : (
          <Box py={10}>
            {!!bookmarksList &&
              bookmarksList.map((bookmark: bookmarkType) => (
                <div key={bookmark.id} className={classes.cardWrapper}>
                  <Box pb={2}>
                    <Typography className={`textPrimary ${classes.title}`}>
                      {bookmark?.title}
                    </Typography>
                    <Typography
                      color="secondary"
                      variant="subtitle2"
                      className={classes.date}
                    >
                      Created At:{" "}
                      {dayjs(bookmark.createdAt).format("DD/MM/YYYY")}
                    </Typography>
                  </Box>
                  <Typography className={classes.description}>
                    {bookmark.description}
                  </Typography>
                  <Box pt={2}>
                    <a href={bookmark?.url} target="_blank">
                      <Button
                        variant="contained"
                        disableElevation
                        // color="secondary"
                        className={classes.urlBtn}
                      >
                        Read More
                      </Button>
                    </a>
                  </Box>
                  <div className={classes.deleteButton}>
                    <IconButton
                      onClick={() => handleDelete(bookmark.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              ))}
          </Box>
        )}
      </div>
    </div>
  );
};

export default BookmarkCard;
