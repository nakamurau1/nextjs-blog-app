import { DOMAIN } from '@/consts'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-xl">
      <div className="w-full">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <div className="mb-2">
              <label className="text-gray-700 text-sm font-bold mr-2">
                ユーザー名
              </label>
              <span className="text-gray-500 text-xs">
                後から変更できません
              </span>
            </div>

            <div className="flex items-center">
              <div>{DOMAIN}/</div>
              <input
                className="flex-1 min-w-0 mr-2 ml-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="ユーザー名を入力"
              />
            </div>
          </div>
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
              type="text"
              placeholder="表示名を入力"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              登録する
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
