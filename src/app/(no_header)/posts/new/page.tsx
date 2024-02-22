'use client'

import markdownToHtml from 'zenn-markdown-html'
import 'zenn-content-css'
import { useState } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { GoArrowLeft } from 'react-icons/go'
import Link from 'next/link'
import { createPost } from '@/app/lib/actions'
import { Button } from '@/components/Button'
import { useFormState, useFormStatus } from 'react-dom'

// 編集またはプレビューモード
type Mode = 'edit' | 'preview'

export default function Page() {
  // htmlを保持する
  const [html, setHtml] = useState('')

  // モードを保持する
  const [mode, setMode] = useState('edit' as Mode)

  const { register, getValues } = useForm({
    defaultValues: {
      title: '',
      markdown: ''
    }
  })

  const handleModeChange = (mode: Mode) => {
    setMode(mode)

    if (mode === 'preview') {
      // markdownをhtmlに変換する
      const markdown = getValues('markdown')
      setHtml(markdownToHtml(markdown))
    }
  }

  const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // タイトルの改行を防ぐ
      e.preventDefault()
    }
  }

  const initialState = { message: '', errors: {} }
  const [state, dispatch] = useFormState(createPost, initialState)

  return (
    <form action={dispatch}>
      <Header />
      <main className="flex-auto w-full max-w-4xl px-4 py-2 mx-auto">
        <div className="flex flex-col items-center justify-center p-6">
          <div aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>
          <div className="w-full">
            <TextareaAutosize
              className="w-full text-3xl bg-transparent border-none outline-0 resize-none mb-5 h-9"
              placeholder="Title"
              spellCheck={false}
              maxLength={100}
              onKeyDown={handleTitleKeyPress}
              {...register('title')}
            />
            <div aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500 mb-5" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex w-full">
            {mode === 'edit' ? (
              // 編集モード
              <div className="flex-1">
                <TextareaAutosize
                  placeholder="Write in Markdown..."
                  className="w-full min-h-[500px] rounded-lg border-none outline-0 resize-none p-5"
                  spellCheck={false}
                  {...register('markdown')}
                />
                <div aria-live="polite" aria-atomic="true">
                  {state.errors?.markdown &&
                    state.errors.markdown.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500 mb-5" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            ) : (
              // プレビューモード
              <div
                className="znc flex-1 w-full min-h-[800px] rounded-lg border-none outline-0 resize-none p-5 bg-white relative
            before:absolute before:top-0 before:right-0 before:inline-block before:p-2 before:text-xs before:font-bold
           before:text-white before:content-['Preview'] before:bg-gray-400 before:rounded-md"
                dangerouslySetInnerHTML={{
                  __html: html
                }}
              />
            )}
            <div className="max-w-20 min-w-20 ml-5 relative">
              <EditModeButton mode={mode} handleModeChange={handleModeChange} />
            </div>
          </div>
        </div>
      </main>
    </form>
  )
}

// 編集モードボタンコンポーネント
const EditModeButton = ({
  mode,
  handleModeChange
}: {
  mode: Mode
  handleModeChange: (mode: Mode) => void
}) => {
  return (
    <div
      className={clsx(
        `inline-flex rounded-full bg-white shadow-md p-1 relative
        before:z-0 before:absolute before:w-9 before:rounded-full before:top-1 before:bottom-1  before:transition before:duration-200`,
        {
          'before:left-1 before:bg-gray-100': mode === 'edit',
          'before:bg-blue-500 before:translate-x-10': mode === 'preview'
        }
      )}
    >
      <button
        aria-label="編集モード"
        className="h-9 w-9  text-gray-400 p-2 flex items-center justify-center z-10"
        onClick={() => {
          handleModeChange('edit')
        }}
      >
        <svg viewBox="0 0 27 27" height="21" width="21">
          <path
            fill="currentColor"
            d="M23.46,6.35,21.37,4.27a2.57,2.57,0,0,0-3.66,0L5.08,16.9,4.6,21.19a1.76,1.76,0,0,0,1.94,1.93l4.28-.47L23.46,10A2.59,2.59,0,0,0,23.46,6.35ZM10,20.89l-3.54.39.4-3.54,9-9L19,11.86ZM22.16,8.71l-1.85,1.85L17.16,7.42,19,5.57a.74.74,0,0,1,1.06,0l2.09,2.08a.75.75,0,0,1,0,1.06Z"
          ></path>
        </svg>
      </button>
      <button
        aria-label="プレビュー"
        className={clsx(
          'h-9 w-9 text-gray-400 border rounded-full border-transparent p-2 flex items-center justify-center ml-1 z-10',
          {
            'text-white': mode === 'preview'
          }
        )}
        onClick={() => {
          handleModeChange('preview')
        }}
      >
        <svg viewBox="0 0 27 27" height="13" width="13">
          <path
            fill="currentColor"
            d="M7.75,26a3.17,3.17,0,0,1-1.6-.4,3.24,3.24,0,0,1-1.7-2.9V4.23a3.45,3.45,0,0,1,1.7-2.9,3.44,3.44,0,0,1,3.4.2l14.5,9.3a3.11,3.11,0,0,1,1.5,2.8,3.32,3.32,0,0,1-1.5,2.8l-14.5,9.1A2.9,2.9,0,0,1,7.75,26Zm0-22.1h-.1c-.1.1-.2.2-.2.3v18.5c0,.2.1.3.2.3A.19.19,0,0,0,8,23l14.5-9.3c.1-.1.1-.1.1-.2s0-.2-.1-.2L8,4C7.85,4,7.85,3.93,7.75,3.93Z"
          ></path>
        </svg>
      </button>
    </div>
  )
}

const Header = () => {
  const { pending } = useFormStatus()

  return (
    <header className="sticky top-0 border-b border-solid border-gray-100 z-50">
      <div className="flex items-center justify-between h-16 px-10">
        <Link href="/dashboard">
          <GoArrowLeft className=" text-gray-500 text-2xl" />
        </Link>
        <Button
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-full"
          aria-disabled={pending}
          disabled={pending}
        >
          下書き保存
        </Button>
      </div>
    </header>
  )
}
