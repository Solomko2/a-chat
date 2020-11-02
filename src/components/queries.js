export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUrl
      status
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          chatRoom {
            id
            chatRoomUsers {
                items {
                    user {
                        id
                        name
                        imageUrl
                        status
                    }
                }
            }
            lastMessage {
                id
                body
                updatedAt
                user {
                    id
                    name
                }
            }
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;