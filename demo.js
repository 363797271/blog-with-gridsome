const axios = require('axios')

async function init() {
  const { data } = await axios.get('https://cnodejs.org/api/v1/topics')
  const posts = data.data

  const { data: auth } = await axios({
    method: 'POST',
    url: `${this.GRIDSOME_API_URL}/auth/local`,
    data: {
      identifier: 'admin',
      password: '123456'
    }
  })
  const token = auth.jwt

  posts.forEach(({ title, content }) => {
    axios({
      method: 'POST',
      url: `${this.GRIDSOME_API_URL}/posts`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        title,
        content,
        is_publish: true,
        cover: '',
        created_by: {
          id: 1,
          firstname: 'z',
          lastname: 'yd',
          username: null
        }
      }
    }).catch(console.log)
  })
}

// init()
