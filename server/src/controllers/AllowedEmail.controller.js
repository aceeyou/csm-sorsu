import AllowedEmail from "../models/AllowedEmail.js";

export async function GetAllowedEmail(req, res) {
  try {
    // Get the list of allowed email
    const listOfEmails = await AllowedEmail.find().select("_id allowed email");
    return res.status(200).json({ emails: [...listOfEmails] });
  } catch (error) {
    console.log(error);
  }
}

export async function AddAllowedEmail(req, res) {
  const { email } = req.body;

  try {
    // Checks is the system sent the email address to be verified
    if (!email)
      return res.status(400).json({
        message: "Please provide a valid email to add onto the allowed list",
      });

    // Checks if the email already exists on the allowed email list and is active
    const emailExists = await AllowedEmail.findOne({ email });
    if (emailExists && !emailExists.allowed)
      return res.status(400).json({
        message:
          "Email is on the list but is inactive. Change the active state of the email to continue",
      });
    if (emailExists && emailExists.allowed)
      return res.status(400).json({ message: "Email is on the list already" });

    // Adds the email to the allowed list
    await AllowedEmail.create({ email, allowed: true });
    return res.status(201).json({ message: "Successfully added the email!" });
  } catch (error) {
    console.log(error);
  }
}

export async function ToggleEmailPrivelages(req, res) {
  const { email } = req.body;

  try {
    if (!email)
      return res
        .status(400)
        .json({ message: "Please provide the email address" });

    const allowedEmail = await AllowedEmail.findOne({ email });
    if (!allowedEmail)
      return res.status(400).json({
        message: "Email does not exist the on system. Please try again",
      });

    AllowedEmail.updateOne(
      { _id: allowedEmail._id },
      { ...allowedEmail, allowed: !allowedEmail.allowed },
    );
    return res
      .statue(201)
      .json({ message: `Successfully updated the privelages of ${email}` });
  } catch (error) {
    console.log(error);
  }
}
