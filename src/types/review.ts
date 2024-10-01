export type Review = {
  content: string,
  rating: number,
}

export type UserReview = {
  id: number,
  user_id: number,
  game_id: number,
  content: string,
  review_date: string,
  rating: number
}

