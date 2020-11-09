import React, { useState } from "react";
//components
import BookmarkCard from "../components/bookmarkCard";
import BoomarkLandingSection from "../components/boomarkLandingSection";
//css
import "../assets/css/main.css";
//types
import { bookmarkType } from "../types/bookmarkType";

const index = () => {
  const [bookmarksList, setBookmarkList] = useState<bookmarkType[] | undefined>(
    []
  );
  return (
    <div>
      <BoomarkLandingSection
        bookmarksList={bookmarksList}
        setBookmarkList={setBookmarkList}
      />
      <BookmarkCard
        bookmarksList={bookmarksList}
        setBookmarkList={setBookmarkList}
      />
    </div>
  );
};

export default index;
