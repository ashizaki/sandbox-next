export const pagesPath = {
  "presigned_url_upload": {
    $url: (url?: { hash?: string }) => ({ pathname: '/presigned-url-upload' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
