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
       fullName
       phoneNumber
     }
     createdAt
     region
     district
     corporatecropsSet{
      id
        crop{
          id
          name
          priceperkg
          moisturePercentage
        }
      }
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

export const addCorporateCrops = gql
`
mutation addCorporateCrops($corporate: String!, $crop: String!){
  addCorporateCrops(corporate:$corporate, crop:$crop)
  {
    errors,
    success
  }
}
`

export const allCrops = gql
`
query{
  crops{
    id,
    priceperkg,
    moisturePercentage,
    name
  }
}
`

export const AllcorporateCrops = gql
`
query corporateCrops($corporate: String!){
  corporateCrops(corporate:$corporate){
    id,
    crop{
      name
      id
    },
    corporate{
      name
      id
    }
  }
}

`
export const farmerCropSales = gql
`
query farmersales($farmer: String!) {
  farmerCropSale(farmer:$farmer){
   id,
    quantityInKg,
    totalPay,
    saledate
    cropSold{
      crop{
        name
        priceperkg
        moisturePercentage
      },
      corporate{
        name
        region
        district
      },
       
      
    }
  }
}


`

export const createSociety = gql
`
mutation createSociety($admin: String!, $name: String!, $region: String!, $district: String! ){
  createSociety(admin:$admin, name:$name, region:$region, district:$district) { 
    errors	
   success
     corporateSociety{
      id
       name
      admin{
        username
      }
      createdAt
      region
      district
      
      
    }
  }
}
`
export const addCrops = gql `

mutation addCrops($name: String!, $priceperkg: Float!, $moisturePercentage: Float!){
  addCrops(name:$name, priceperkg:$priceperkg, moisturePercentage:$moisturePercentage){
    errors,
    success
  }
}

`

export const allCropSales = gql `
query{
  cropSalesList{
   id,
    cropSold{
      crop{
        name
      }
    },
    farmer{
    farmer{
      username
    },
      corporateSociety{
        name
      }
    },
    quantityInKg,
    totalPay
    
  }
}

`
export const meFarmer = gql
`
query mefarmer($farmer: String!){
  meFarmer(farmer:$farmer){
   id,
   farmer{
    fullName,
    email,
    phoneNumber,
    username
    role
  }
    corporateSociety{
      id
      name
      region
    }
  }
}

`

export const corporateSellsStats = gql
`
query corporateSells{
  corporateSells{
    name
    crop
    percentage
  }
}
`

export const  adminMonthlyStats = gql
`
query calculateMonthlyPercentage{
  calculateMonthlyPercentage(year: 2023) {
    month
  percentage
  }
  }
`

export const  meCorporate = gql
`
query mecorporate($id: String!){
  meCorporateCropSells(id:$id){
    name
    crop
    percentage
  }
}
`
