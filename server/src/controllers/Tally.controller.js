export async function PostTally(req, res) {
  const { tallyData } = req.body;
  const { _id } = req.user;

  try {
    console.log(tallyData);
    console.log(_id);
  } catch (error) {
    console.log(error);
  }
}
