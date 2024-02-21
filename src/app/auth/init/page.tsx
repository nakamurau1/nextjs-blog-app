'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createUser } from '@/app/lib/actions'

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      aria-disabled={pending}
      disabled={pending}
      type="submit"
    >
      登録する
    </button>
  )
}

export default function Page() {
  const initialState = { message: '', errors: {} }
  const [state, dispatch] = useFormState(createUser, initialState)

  return (
    <div className="flex flex-col items-center justify-center p-6 mx-20">
      <div className="w-full">
        <form
          action={dispatch}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>
          {/* ユーザーID */}
          <div className="mb-4">
            <div className="mb-2">
              <label className="text-gray-700 text-sm font-bold mr-2">
                ユーザー名
              </label>
              <span className="text-gray-500 text-xs">
                後から変更できません
              </span>
            </div>
            <div className="">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="id"
                name="id"
                type="text"
                placeholder="ユーザー名(半角英数字)を入力"
              />
            </div>
            <div aria-live="polite" aria-atomic="true">
              {state.errors?.id &&
                state.errors.id.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* 表示名 */}
          <div className="mb-6">
            <div className="mb-2">
              <label className="text-gray-700 text-sm font-bold mr-2">
                表示名
              </label>
              <span className="text-gray-500 text-xs">
                いつでも変更できます
              </span>
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="表示名を入力"
            />
            <div aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}
