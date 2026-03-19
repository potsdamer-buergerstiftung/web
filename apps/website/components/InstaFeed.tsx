"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import InstagramCard from "./InstagramCard";

type InstagramPost = {
    id: string;
    caption: string;
    media_url: string;
    media_type: string;
    timestamp: string;
    permalink: string;
};

type InstagramPaging = {
    cursors: {
        before: string;
        after: string;
    };
};

type InstagramFeed = {
    data: InstagramPost[];
    paging?: InstagramPaging;
};

export default function InstaFeed() {
    const [instagramFeed, setInstagramFeed] = useState<InstagramFeed | null>(
        null
    );
    const [after, setAfter] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchFeed = async (after: string | null = null) => {
        try {
            let url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`;
            if (after) {
                url += `&after=${after}`;
            }
            const data = await fetch(url);

            if (!data.ok) {
                console.log(await data.text());
                throw new Error("Failed to fetch Instagram feed");
            }

            const feed = await data.json();
            // Limit to 4 posts
            feed.data = feed.data.slice(0, 4);
            console.log(feed);

            setInstagramFeed(feed);

            setAfter(feed.paging?.cursors.after);
        } catch (err: any) {
            console.error("Error fetching Instagram feed:", err.message);
            setError(err.message);
        }
    };

    const loadMore = () => {
        fetchFeed(after);
    };

    // Fetch the initial feed
    useEffect(() => {
        fetchFeed();
    }, []);

    function truncate(str: string, n: number) {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}

            {instagramFeed && instagramFeed.data.map((post: InstagramPost) => (
                <div
                    className="col-span-6 min-h-max lg:col-span-3 xl:col-span-2"
                    key={post.id}
                >
                    <InstagramCard key={post.id} title={truncate(post.caption, 50)} imageUrl={post.media_url} date={new Date(post.timestamp)} link={post.permalink} />
                </div>

            ))}
        </>
    );
}