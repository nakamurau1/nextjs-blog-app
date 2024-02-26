import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 過去の日時からの経過時間を日本語で返す
// ただし、1年以上前の場合は「yyyy/mm/dd」の形式で返す
export function timeAgo(date: Date | null) {
  if (!date) {
    return ''
  }

  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) {
    return 'たった今'
  }
  if (minutes < 60) {
    return `${minutes}分前`
  }
  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours}時間前`
  }
  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days}日前`
  }
  const weeks = Math.floor(days / 7)
  if (weeks < 4) {
    return `${weeks}週間前`
  }
  const months = Math.floor(weeks / 4)
  if (months < 12) {
    return `${months}ヶ月前`
  }
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

// nullまたはundefinedまたは空文字列の場合にtrueを返す
export function isEmpty(value: any) {
  return value === null || value === undefined || value === ''
}
