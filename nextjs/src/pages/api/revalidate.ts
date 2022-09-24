import { NextApiHandler } from "next";
import { getConfig } from "../../config/config";

const handler: NextApiHandler = async (req, res) => {
  const config = await getConfig();

  // Check for secret to confirm this is a valid request
  if (req.query.secret !== config.server.revalidate.secret) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(req.query.path as string);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
};

export default handler;
