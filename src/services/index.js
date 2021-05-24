import fetch from "isomorphic-fetch";

export async function fetchItem({id}) {
    const response = await fetch(`/api/${id}`)
    const result = await response.json()

    return result
}

export async function Sign({email, name}) {
    const response = await fetch(`/api/sign`, {method: 'POST', body: JSON.stringify({
        email,
        name,
    })})
    if (response.ok) {
        return response.json()
    } else {
        return null
    }
}