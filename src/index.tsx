import React, { useMemo, ReactNodeArray } from 'react'
import reactStringReplace from 'react-string-replace'

type Replacer = (match: string, index: number) => React.ReactNode

const pipe = <T extends any>(input: T, ...functions: ((input: T) => T)[]) =>
  functions.reduce((prev, func) => func(prev), input)

const replace =
  (regex: RegExp, replacement: Replacer) => (text: ReactNodeArray) =>
    reactStringReplace(text, regex, replacement)

interface ParserOptions {
  bold: Replacer
  italic: Replacer
  underlined: Replacer
  strikethough: Replacer
  link: Replacer
  codeblock: Replacer
  custom: [RegExp, Replacer][]
}

type Input = string | ReactNodeArray

export const parseMarkdown = (text: Input, options: ParserOptions) =>
  pipe<ReactNodeArray>(
    [text],
    replace(/(https?:\/\/[^\s$.?#].[^\s]+)/gim, options.link),
    replace(/\*\*(.+?)\*\*/gim, options.bold),
    replace(/\*(.+?)\*/gim, options.italic),
    replace(/__(.+?)__/gim, options.underlined),
    replace(/_(.+?)_/gim, options.italic),
    replace(/~~(.+?)~~/gim, options.strikethough),
    replace(/```([^]+?)```/gim, options.codeblock),
    ...options.custom.map((custom) => replace(custom[0], custom[1]))
  )

const useMarkdown = (text: Input, options: ParserOptions) => {
  return useMemo(() => parseMarkdown(text, options), [text, options])
}

export default useMarkdown
