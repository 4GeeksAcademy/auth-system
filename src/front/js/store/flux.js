const API_URL = process.env.BACKEND_URL + '/api'

async function makeRequest(url, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }

  const response = await fetch(API_URL + url, {
    method,
    headers,
    body: body && JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    const message = data.message || data.msg || 'Something went wrong'
    const newError = new Error(message)
    newError.httpStatus = response.status
    throw newError
  }
  return data
}

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: 'FIRST',
          background: 'white',
          initial: 'white',
        },
        {
          title: 'SECOND',
          background: 'white',
          initial: 'white',
        },
      ],
      user: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, 'green')
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + '/api/hello')
          const data = await resp.json()
          setStore({ message: data.message })
          // don't forget to return something, that is how the async resolves
          return data
        } catch (error) {
          console.log('Error loading message from backend', error)
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore()

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color
          return elm
        })

        //reset the global store
        setStore({ demo: demo })
      },
      signup: async (email, password) => {
        const res = await makeRequest('/signup', 'POST', {
          email,
          password,
        })

        return res
      },
      login: async (email, password) => {
        const res = await makeRequest('/login', 'POST', {
          email,
          password,
        })

        setStore({ user: res.user })

        sessionStorage.setItem('token', res.token)

        return res
      },
      logout: () => {
        setStore({ user: null })
        sessionStorage.removeItem('token')
      },
      loadUser: async () => {
        const token = sessionStorage.getItem('token')

        const res = await makeRequest('/me', 'GET', null, token)

        setStore({ user: res })

        return res
      },
    },
  }
}

export default getState
