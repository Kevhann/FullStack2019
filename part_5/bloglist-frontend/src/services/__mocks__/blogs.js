const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML on helppoa',
    author: 'blogaaja',
    url: 'www.blog.com',
    likes: 55,
    user: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'ediz',
      name: 'Erkka'
    }
  },
  {
    id: '09823hu923j0pwve9upwp9r5',
    title: 'huippublogi',
    author: 'hipsteri',
    url: 'www.suomisoffa.com',
    likes: 0,
    user: {
      id: '209348ty0g39285j09238jf0',
      username: 'tzt',
      name: 'Tiera'
    }
  },
  {
    id: 'o82437gnp98wen82309523rd',
    title: 'helppoa ja hauskaa',
    author: 'hauskanpitäjä',
    url: 'www.yeet.com',
    likes: 55,
    user: {
      id: '3p498gj2498gjg234589jc23',
      username: 'ediz',
      name: 'Erkka'
    }
  }
]

const getAll = () => {
  console.log('get blogs')
  return Promise.resolve(blogs)
}
const setToken = token => {
  console.log(token)
}

export default { getAll, setToken }
