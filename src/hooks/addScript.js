

export const addScript = async(url)=> {
  let script = document.createElement('script');
  script.type = 'application/javascript';

  script.src = url;
  document.body.appendChild(script);
  return true
}
