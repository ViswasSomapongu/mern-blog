import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "./../components/CommentSection";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [toc, setToc] = useState([]);
  const [tocVisible, setTocVisible] = useState(true);

  // console.log(recentPosts);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    const codeBlocks = document.querySelectorAll("code, kbd, samp, pre");
    codeBlocks.forEach((block) => {
      block.classList.add("code-block");
      const button = document.createElement("button");
      button.innerText = "Copy";
      button.classList.add("copy-button");
      button.addEventListener("click", () => {
        navigator.clipboard
          .writeText(block.innerText)
          .then(() => {
            button.innerText = "Copied";
            setTimeout(() => {
              button.innerText = "Copy code";
            }, 2000);
          })
          .catch((err) => {
            console.error("Could not copy code: ", err);
          });
      });
      block.appendChild(button);
    });
  }, [post]);

  useEffect(() => {
    if (post) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, "text/html");
      const headings = Array.from(doc.querySelectorAll("h1, h2"));
      const tocItems = headings.map((heading) => ({
        text: heading.innerText,
        id: heading.id,
        level: parseInt(heading.tagName.replace("H", "")),
      }));
      setToc(tocItems);
    }
  }, [post]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search/category=${post && post.category}`}
        className="self-center mt05"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      {currentUser && currentUser.isAdmin && (
        <Link to={`/update-post/${post._id}`} className="self-center mt05">
          <Button className="my-2" color="gray" pill size="xs">
            <h2>Edit this post</h2>
          </Button>
        </Link>
      )}

      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 border-4 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-center mt-5">
        <Button onClick={() => setTocVisible(!tocVisible)} color="gray">
          {tocVisible ? "Hide Table of Contents" : "Table of Contents"}
        </Button>
      </div>
      {tocVisible && (
        <div className="py-6 max-w-5xl mx-auto w-full post-content">
          <ul>
            {toc.map((item) => (
              <li  key={item.id} className={`ml-${item.level * 2}`}>
                <a
                  href="#pt"
                  className="text-blue-700 text-left text-2xl hover:underline"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-5xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className="p-3 max-w-5xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
};

export default PostPage;
