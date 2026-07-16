import AllowedEmail from "../models/AllowedEmail.js";
import User from "../models/User.js";

export async function GetAllowedEmail(req, res) {
  try {
    // Get the list of allowed email
    const listOfEmails = await AllowedEmail.find().select(
      "_id email authorized role",
    );
    return res.status(200).json({ emails: [...listOfEmails] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "An error occurred while fetching the list of allowed emails. Please try again.",
    });
  }
}

export async function UpdateUserRole(req, res) {
  const { id, role } = req.body;
  try {
    if (!id || role === undefined)
      return res.status(400).json({
        message: "Please provide the email address and the new role",
      });

    const allowedEmail = await AllowedEmail.findOne({ _id: id });
    if (!allowedEmail)
      return res.status(400).json({
        message: "Email does not exist the on system. Please try again",
      });

    const userInfo = await User.findOne({ email: allowedEmail.email });
    if (userInfo) {
      await User.updateOne(
        { email: allowedEmail.email },
        {
          $set: {
            role: role,
          },
        },
      );
    }

    await AllowedEmail.updateOne(
      { _id: allowedEmail._id },
      { $set: { role: role } },
    );

    return res.status(201).json({
      message: `Successfully updated the role of ${allowedEmail.email} to ${role}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating the role. Please try again.",
    });
  }
}

export async function AddAllowedEmail(req, res) {
  const { email, role } = req.body;

  try {
    // Checks is the system sent the email address to be verified
    if (!email)
      return res.status(400).json({
        message:
          "Please provide a valid email address to add to the allowlist.",
      });

    // Checks if the email already exists on the allowed email list and is active
    const emailExists = await AllowedEmail.findOne({ email });
    if (emailExists && !emailExists.authorized)
      return res.status(400).json({
        message:
          "The email is on the list but currently is not allowed to access the system. Change the permission of the email to continue",
      });
    if (emailExists && emailExists.authorized)
      return res
        .status(400)
        .json({ message: "This email is already on the allowed list." });

    // Adds the email to the allowed list
    const newAllowedEmail = await AllowedEmail.create({
      email,
      authorized: true,
      role: role || "member",
    });
    // console.log("new allowed email: ", newAllowedEmail);
    return res.status(201).json({
      id: newAllowedEmail._id,
      email: newAllowedEmail.email,
      authorized: newAllowedEmail.authorized,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while adding the email. Please try again.",
    });
  }
}

export async function ToggleEmailPrivelages(req, res) {
  const { id, email } = req.body;

  try {
    if (email === req.user.email) {
      return res.status(400).json({
        message:
          "You cannot change your own email privileges. Please contact another admin to change your email privileges",
      });
    }

    if (!id)
      return res
        .status(400)
        .json({ message: "Please provide the email address" });

    const allowedEmail = await AllowedEmail.findOne({ _id: id });
    if (!allowedEmail)
      return res.status(400).json({
        message: "Email does not exist the on system. Please try again",
      });

    const currentPrivelages = allowedEmail.authorized ? true : false;

    await AllowedEmail.updateOne(
      { _id: allowedEmail._id },
      { $set: { authorized: !currentPrivelages } },
    );

    // Once the allowed status is updated, the role of the user associated with the email address is also updated.
    // If the email is updated to be not allowed, then the role of
    // the user will lose the "admin" privilage and become a "member"
    // userInfo.active = !currentPrivelages;
    // userInfo.save();

    return res.status(201).json({
      message: `Successfully updated the privelages of ${allowedEmail.email}`,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "An error occurred while toggling email privileges. Please try again.",
    });
  }
}

export async function UpdateEmailAddress(req, res) {
  const { id, newEmail } = req.body;

  try {
    if (!id || !newEmail)
      return res.status(400).json({
        message: "Please provide the email address and the new email address",
      });

    const allowedEmail = await AllowedEmail.findOne({ _id: id });
    if (!allowedEmail)
      return res.status(400).json({
        message: "Email does not exist the on system. Please try again",
      });
    const oldEmail = allowedEmail.email;
    await AllowedEmail.updateOne(
      { _id: allowedEmail._id },
      { $set: { email: newEmail } },
    );

    // updates the email address of the user associated with the allowed email address if the account exists
    const userInfo = await User.findOne({ email: allowedEmail.email });
    if (userInfo) {
      await User.updateOne(
        { email: allowedEmail.email },
        {
          $set: {
            email: newEmail,
          },
        },
      );
    }

    return res.status(201).json({
      message: `Successfully updated the email address of ${oldEmail} to ${newEmail}`,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "An error occurred while updating the email address. Please try again.",
    });
  }
}

export async function EmailAvailability(req, res) {
  const { email } = req.body;

  try {
    if (!email)
      return res.status(400).json({
        message: "Please provide the email address to check its availability",
      });

    const isAvailable = await AllowedEmail.findOne({ email });
    return res.status(200).json({ available: !isAvailable });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
}
