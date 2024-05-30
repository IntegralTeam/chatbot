export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export enum ApiEndpoint {
  start = '/start',
  ask = '/ask',
  updateName = '/update_name',
  updateTraits = '/update_traits',
  updateExpertise = '/update_expertise',
  updateUrl = '/update_url',
  getSummary = '/get_summary',
  delChat = '/del_chat',
}