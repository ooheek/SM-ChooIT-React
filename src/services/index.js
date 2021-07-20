import fetch from 'isomorphic-fetch'

import { API_URL, TEMP_TOKEN } from '../common/constant'

export async function fetchItem({ id }) {
  const response = await fetch(`/api/${id}`)
  const result = await response.json()

  return result
}

export async function Sign({ email, name }) {
  const response = await fetch(`/api/sign`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      name,
    }),
  })
  if (response.ok) {
    return response.json()
  } else {
    return null
  }
}

export async function ReviewPhotoUpload(file) {
  var formdata = new FormData()
  formdata.append('img_path', file, file.name)

  var myHeaders = new Headers()
  myHeaders.append('Authorization', `JWT ${TEMP_TOKEN}`)

  const response = await fetch(`${API_URL}/image/`, {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
  })

  const result = await response.json()

  return result
}

export async function ReviewUpload(body) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `JWT ${TEMP_TOKEN}`)
  myHeaders.append('Content-Type', 'application/json; charset=utf-8')

  const response = await fetch(`${API_URL}/review/post/`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
  })

  const result = await response.json()

  return result
}

export async function GetReview(prodNum) {
  const response = await fetch(`${API_URL}/review/?prod_no=${prodNum}`, {
    method: 'GET',
  })
  const result = await response.json()

  return result
}

export async function GetProduct(prodNum) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `JWT ${TEMP_TOKEN}`)

  const response = await fetch(`${API_URL}/${prodNum}/`, {
    method: 'GET',
    headers: myHeaders,
  })
  const result = await response.json()

  return result
}

export async function GetTagData() {
  const response = await fetch(`${API_URL}/tag/`)
  const result = await response.json()

  return result
}

export async function GetReviewDetail(reviewId) {
  const response = await fetch(`${API_URL}/review/${reviewId}/`)
  const result = await response.json()

  return result
}

export async function DeleteReview(reviewNum) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `JWT ${TEMP_TOKEN}`)

  const response = await fetch(`${API_URL}/review/${reviewNum}/`, {
    method: 'DELETE',
    headers: myHeaders,
  })
  const result = await response.json()

  return result
}

export async function SignInUserInfo(body) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `JWT ${TEMP_TOKEN}`)
  myHeaders.append('Content-Type', 'application/json; charset=utf-8')

  const response = await fetch(`${API_URL}/user/signup/`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
  })

  const result = await response.json()

  return result
}

export async function SignInUserTag(body) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `JWT ${TEMP_TOKEN}`)
  myHeaders.append('Content-Type', 'application/json; charset=utf-8')

  const response = await fetch(`${API_URL}/user/signup/tag/`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
  })

  const result = await response.json()

  return result
}

export async function SignInUserProduct(body) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `JWT ${TEMP_TOKEN}`)
  myHeaders.append('Content-Type', 'application/json; charset=utf-8')

  const response = await fetch(`${API_URL}/user/signup/product/`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
  })

  const result = await response.json()

  return result
}
