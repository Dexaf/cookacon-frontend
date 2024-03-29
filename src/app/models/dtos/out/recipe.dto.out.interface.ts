//NOTE - this dto is used for incoming steps 
//or old one, so we may already have a pictureUrl or 
//we may need a field for the image base64 encode
//NOTE - we use _id instead of id because it helps us avoid 
//the mapping from id -> _id when we load steps from
//server
export interface stepDtoOut {
  _id?: string
  title: string
  description: string
  imageBase64?: string | ArrayBuffer,
  pictureUrl?: string
}

//NOTE - this dto is used for incoming ingredients 
//or old one, so we may already have a pictureUrl or 
//we may need a field for the image base64 encode
//NOTE - we use _id instead of id because it helps us avoid 
//the mapping from id -> _id when we load ingredients from
//server
export interface ingredientDtoOut {
  _id?: string
  name: string
  qta: string
  imageBase64?: string | ArrayBuffer,
  pictureUrl?: string
}