export function setSuggestions(payload) {
  return { type: 'setSuggestions', payload }
}
  
export function setSuggestionsAsync() {
  const url = 'http://localhost:3000/suggestion'
  
  return (dispatch) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        dispatch(setSuggestions(data))
      })
      .catch(err => console.log(err))
  }
}