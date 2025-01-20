//user login route ->user enter email,pswd and the route looks for the user in the Db
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  //1- validate the input fields
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "All fields are required for LoggingIn." });

  //2-authenticate the user
  const loggedUser = await User.findOne({ email, password });

  if (!loggedUser) {
    console.error("Failed to fetch the user from the DB");
    res.status(400).json({ message: "User does nt exsist in the DB" });
  }

  console.log(loggedUser);

  //3- create Session for the user ( session id and expiry token)
  const sessionToken = Math.random().toString(36).substring(2);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const newSession = new UserSession({
    userId: loggedUser._id,
    sessionToken: sessionToken,
    expiresAt: expiresAt,
  });

  //4- save the session in the DB
  const isCreatedSession = await newSession.save();
  console.log("USer session created successfully", isCreatedSession);

  if (!isCreatedSession)
    res.status(400).json({ message: "Cannot create the session for the user" });

  //5- set the cookie to local storage
  res.cookie("sessionToken", sessionToken, {
    httpOnly: true, // Prevents client-side access to the cookie
    expires: expiresAt, // Set cookie expiry time
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "Strict", // Prevents CSRF attacks
  });

  //6- send the response to the user
  res.status(200).json({
    message: "USer session created successfully",
    sessionCreated: isCreatedSession,
    loggedUser: loggedUser,
  });
});

async function authenticateSession(req, res, next) {
  const sessionToken = req.cookies.sessionToken;
  console.log("Session token is:", sessionToken);

  if (!sessionToken)
    res
      .status(400)
      .json({ message: "No active session token found, login again" });

  //find the active user session in the DB by session token
  try {
    const user_session = await UserSession.findOne({ sessionToken });

    if (!user_session) {
      return res.status(401).json({ message: "Invalid session token" });
    }

    //Session expire check
    if (Date.now() > user_session.expiresAt) {
      // delete the expired session from the DB here
      await UserSession.deleteOne({ sessionToken });

      return res.status(401).json({ message: "Session expired" });
    }

    req.user = user_session;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
} //authenticate the session middleware
