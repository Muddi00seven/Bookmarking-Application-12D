import { gql } from "@apollo/client";

export const DELETE_BOOKMARK = gql`
  mutation delete_bookmark($id: ID!) {
    delete_bookmark(id: $id) {
      title
    }
  }
`;
