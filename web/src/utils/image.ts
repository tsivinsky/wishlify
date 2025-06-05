export const getApiImageUrl = (imageId: string) => {
  return process.env.NEXT_PUBLIC_API_URL + `/images/${imageId}`;
};
