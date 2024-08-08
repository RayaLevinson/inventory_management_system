export const config = {
  API_URL: import.meta.env.VITE_API_URL,
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  PAGE_SIZE: Number(import.meta.env.VITE_PAGE_SIZE) || 0,
  SHOW_DELETE_ALL_BUTTON: false,
}
