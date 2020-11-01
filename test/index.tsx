import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import useMarkdown from '../src/index'

const App = () => {
  const [text, setText] = useState('')
  const output = useMarkdown(text, {
    bold: (str, key) => <strong key={key}>{str}</strong>,
    italic: (str, key) => <i key={key}>{str}</i>,
    underlined: (str, key) => <u key={key}>{str}</u>,
    strikethough: (str, key) => <del key={key}>{str}</del>,
    link: (str, key) => (
      <a href={str} key={key}>
        {str}
      </a>
    ),
    codeblock: (str, key) => <code key={key}>{str}</code>
  })
  return (
    <div>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {output}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
