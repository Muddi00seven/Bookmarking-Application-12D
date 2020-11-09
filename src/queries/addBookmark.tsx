import { gql } from "@apollo/client";

export const ADD_BOOKMARK = gql`
  mutation add_bookmar($title: String!, $description: String!, $url: String!) {
    add_bookmark(title: $title, description: $description, url: $url) {
      title
    }
  }
`;
