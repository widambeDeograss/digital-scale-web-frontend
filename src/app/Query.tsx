import { useQuery, gql } from "@apollo/client";

export const Register = gql`
mutation register(
    $email: String!
    $password1: String!
    $password2: String!
    $fullName: String!
    $phoneNumber:String!
    $role: String!
    $username:String!
  )  {
    register(
      email: $email
      password1: $password1
      password2:  $password2
      phoneNumber: $phoneNumber
      fullName:$fullName
      role:$role
      username:$username
    ) {
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
      success
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
      token
      user {
        id
        email
        firstName
        role
        fullName
        username
        phoneNumber
      }
    }
  }
`
export const corporates = gql`
query {
    corporateSocieties{
     id
      name
     admin{
       id
     }
     createdAt
     region
     district
     farmersSet{
      id
      farmer{
        id
        fullName
        email
        phoneNumber
        dateJoined
        username
        createdAt
      }
    }
     
   }
 }

`

export const allFarmers = gql
`
query{
  farmers{
    id,
    farmer{
      username
      email
      fullName
      createdAt
      lastLogin
      phoneNumber
    }
    corporateSociety{
      name
      admin{
        id
        
      }
    }
  }
}

`


export const AddFarmer = gql
`
mutation addFarmerToSociety($farmerPhone: String!, $society: String!) {
  addFarmerToSociety(farmerPhone:$farmerPhone, society:$society)
  {
    errors,
    success
  }
}

`

export const allUsers = gql
`
query {
  users{
    id
    fullName
    email
    phoneNumber
    role
    username
    password
  }
}

`