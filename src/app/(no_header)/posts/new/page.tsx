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
import { FaPenFancy, FaPlay } from 'react-icons/fa6'
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
              <>
                <div
                  className="znc flex-1 w-full min-h-[800px] rounded-lg border-none outline-0 resize-none p-5 bg-white relative
            before:absolute before:top-0 before:right-0 before:inline-block before:p-2 before:text-xs before:font-bold
           before:text-white before:content-['Preview'] before:bg-gray-400 before:rounded-md"
                  dangerouslySetInnerHTML={{
                    __html: html
                  }}
                />
                {/* プレビューモードでも保存できるようにする */}
                <input type="hidden" {...register('markdown')} />
              </>
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
        type="button"
      >
        <FaPenFancy width={21} height={21} />
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
        type="button"
      >
        <FaPlay width={10} height={10} />
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
          mode="primary"
          aria-disabled={pending}
          disabled={pending}
        >
          下書き保存
        </Button>
      </div>
    </header>
  )
}
