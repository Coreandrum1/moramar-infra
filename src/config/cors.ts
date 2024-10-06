const allowedOriginsArray = process.env.ALLOWED_ORIGINS?.split(",") ?? [];

export const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    console.log("Incoming origin:", origin);
    console.log("Allowed origins:", allowedOriginsArray);

    if (!origin || allowedOriginsArray.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable sending cookies if needed
};
