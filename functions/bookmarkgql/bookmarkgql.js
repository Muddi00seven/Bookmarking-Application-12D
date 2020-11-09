const { gql, ApolloServer } = require("apollo-server-lambda");
const faunadb = require("faunadb"),
  q = faunadb.query;
const dayjs = require("dayjs");

require("dotenv").config();

const typeDefs = gql`
  type Query {
    bookmarks: [Bookmark]
  }
  type Mutation {
    add_bookmark(title: String!, description: String!, url: String!): Bookmark
    delete_bookmark(id: ID!): Bookmark
  }
  type Bookmark {
    id: ID!
    title: String!
    description: String!
    createdAt: String!
    url: String!
  }
`;

var adminClient = new faunadb.Client({
  secret: process.env.ADMIN_SECRET,
});
//genrating date of now
const now = dayjs().format();
const resolvers = {
  Query: {
    bookmarks: async (root, args, context) => {
      try {

        // const result = await adminClient.query(
        //   q.Map(
        //     q.Paginate(q.Match(q.Index("all_bookmarks"))),
        //     q.Lambda((x) => q.Get(x))
        //   )
        // );

        let result = await adminClient.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("bookmarks"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
        )
        return result.data.map((d) => {
          return {
            id: d.ref.id,
            title: d.data.title,
            description: d.data.description,
            url: d.data.url,
            createdAt: d.data.createdAt,
          };
        });
      } catch (err) {
        console.log(err);
        return err.toString();
      }
    },
  },
  Mutation: {
    add_bookmark: async (_, { title, description, url }) => {
      try {
        const result = await adminClient.query(
          q.Create(q.Collection("bookmarks"), {
            data: {
              title,
              description,
              url,
              createdAt: now,
            },
          })
        );

        return result.data;
      } catch (error) {
        return error.toString();
      }
    },
    delete_bookmark: async (_, { id }) => {
      try {
        const result = await adminClient.query(
          q.Delete(q.Ref(q.Collection("bookmarks"), id))
        );

        console.log(result);
        return result.data;
      } catch (error) {
        return error.toString();
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler();
