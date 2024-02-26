'use client'

import markdownToHtml from 'zenn-markdown-html'
import 'zenn-content-css'

const MarkdownView = ({ markdown }: { markdown: string }) => {
  // markdownをhtmlに変換する
  const html = markdownToHtml(markdown)

  return (
    <div
      className="znc flex-1 w-full min-h-[800px] rounded-lg border-none outline-0 resize-none p-5 bg-white relative"
      dangerouslySetInnerHTML={{
        __html: html
      }}
    />
  )
}

export default MarkdownView
