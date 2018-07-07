export function getFile (url, isBlob = false) {
    return new Promise((resolve, reject) => {
      const client = new XMLHttpRequest()
      client.responseType = isBlob ? 'blob' : ''
      client.onreadystatechange = () => {
        if (client.readyState !== 4) {
          return
        }
        if (client.status === 200) {
          const urlArr = client.responseURL.split('/')
          resolve({
            data: client.response,
            url: urlArr[urlArr.length - 1],
            fullurl: client.responseURL
          })
        } else {
          reject(new Error(client.statusText))
        }
      }
      client.open('GET', url)
      client.send()
    })
}
export function getStyleTemplate (data) {
    // console.log(data)
    const colorMap = {
      '#1682E6': 'shade-1',
      '#1890ff': 'primary',
      '#2F9BFF': 'light-1',
      '#46A6FF': 'light-2',
      '#5DB1FF': 'light-3',
      '#74BCFF': 'light-4',
      '#8CC8FF': 'light-5',
      '#A3D3FF': 'light-6',
      '#BADEFF': 'light-7',
      '#D1E9FF': 'light-8',
      '#E8F4FF': 'light-9',
      '#40a9ff': 'light-half',
      '#096dd9': 'light-active'
    }
    Object.keys(colorMap).forEach(key => {
      const value = colorMap[key]
      data = data.replace(new RegExp(key, 'ig'), value)
    })
    return data
}