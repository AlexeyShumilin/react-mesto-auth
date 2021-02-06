const BASE_URL = 'https://auth.nomoreparties.co';

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(res => {
            if (res.status === 400) {
                throw new Error('One of the fields is missing ')
            } else if (res.status === 401) {
                throw new Error('Incorrect email or password ')
            } else
                return res.json()
        })
        .then(res => res);
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(response => {
            if (response.status === 400) throw new Error('One of the fields entered incorrectly')
            return response.json()
        })
        .then(res => res)
}
export const tokenCheck = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => {
            if (res.status === 400) {
                throw new Error('Token not transferred or in a different format ')
            } else if (res.status === 401) {
                throw new Error('Invalid token')
            } else
                return res.json()
        })
        .then(res => res)
}