async function getApi(page) {
  try {
    const responsive = await instance.get("movies", { params: { page } });
    return responsive.data.data;
  } catch (e) {
    console.log(e);
  }
}
export default getApi;
