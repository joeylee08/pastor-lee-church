import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");

    url.searchParams.set("part", "snippet");
    url.searchParams.set("playlistId", process.env.YOUTUBE_PLAYLIST_ID!);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", process.env.YOUTUBE_API_KEY!);

    const response = await fetch(url);

   if (!response.ok) {
		const details = await response.text();
		console.error("YouTube API error:", response.status, details);
		throw new Error(`YouTube API error: ${response.status}`);
	}

    const data = await response.json();

    const videos = (data.items ?? [])
      .filter((item: any) => item.snippet?.resourceId?.videoId)
      .map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails?.medium?.url
          ?? item.snippet.thumbnails?.default?.url
          ?? "",
      }));

    res.status(200).json(videos);
  } catch (error) {
    console.error("YouTube fetch failed:", error);
    res.status(502).json({ error: "Failed to fetch videos" });
  }
});

export default router;