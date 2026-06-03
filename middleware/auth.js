try {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  console.log("TOKEN VERIFIED:", decoded);

  req.user = decoded;

  next();

} catch (error) {
  console.log("JWT ERROR:", error.message);

  return res.status(401).json({
    success: false,
    message: "Invalid token"
  });
}