import { Avatar, Button, Dropdown, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "./../components/CommentSection";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

const PostPage = () => {
  const { postSlug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [toc, setToc] = useState([]);
  const [tocVisible, setTocVisible] = useState(false);

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
      const tocItems = headings.map((heading) => {
        if (!heading.id) {
          heading.id = heading.innerText.replace(/\s+/g, "-").toLowerCase();
        }
        return {
          text: heading.innerText,
          id: heading.id,
          level: parseInt(heading.tagName.replace("H", "")),
        };
      });
      setToc(tocItems);

      // Update post content with IDs
      setPost((prevPost) => ({
        ...prevPost,
        content: doc.body.innerHTML,
      }));
    }
  }, [post]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="flex flex-col lg:flex-row max-w-6xl mx-auto min-h-screen">
      {/* Left sidebar for large screens */}
      <div className="w-full lg:w-1/4 p-5 mt-20 hidden lg:block">
        <div className="sticky top-0">
          <div className="mb-6">
            {currentUser.isAdmin && (
              <div className="flex flex-row gap-2 pt-10">
                <Avatar alt="Admin" img={currentUser.profilePicture} rounded />
                <div>
                  <span className="block text-sm mt-2">
                    {currentUser.name ? currentUser.name : "Admin"}
                  </span>

                  <Link
                    className="pointer text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                    to="https://www.linkedin.com/in/viswas-somapongu/"
                  >
                    Linkedin
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="mb-6">
            <Button
              className="mb-2"
              onClick={() => setTocVisible(!tocVisible)}
              color="gray"
            >
              {tocVisible ? "Hide Table of Contents" : "Table of Contents"}
            </Button>
            {tocVisible && (
              <ul className="mt-3 space-y-2">
                {toc.map(
                  (item) =>
                    item.text && (
                      <div className="flex flex-row" key={item.id}>
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 12H5m14 0-4 4m4-4-4-4"
                          />
                        </svg>
                        <li className={`ml-${item.level * 2}`}>
                          <a
                            href={`#${item.id}`}
                            className="text-xl text-blue-400 hover:underline"
                          >
                            {item.text}
                          </a>
                        </li>
                      </div>
                    )
                )}
              </ul>
            )}
          </div>
          {recentPosts && (
            <div className="mb-6">
              <h3 className="text-lg  font-semibold">Recent Article</h3>
              <Link to={`/post/${recentPosts[0].slug}`}>
                <h4 className="text-blue-400 hover:underline">
                  {recentPosts[0].title}
                </h4>
              </Link>
            </div>
          )}
          <div className="mb-1">
            <Button onClick={() => navigate("/search")} color="gray">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
              Back to the blog
            </Button>
          </div>
        </div>
      </div>

      <div className="md:w-full flex-1 p-3 justify-center items-center">
        <h1 className="text-3xl mt-5 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post && post.title}
        </h1>
        <div className="flex flex-col items-center">
          <Link
            to={`/search/category=${post && post.category}`}
            className="mt-2"
          >
            <Button className="self-end" color="gray" pill size="xs">
              {post && post.category}
            </Button>
          </Link>
          {currentUser && currentUser.isAdmin && (
            <Link to={`/update-post/${post._id}`} className="mt-2">
              <Button className="my-2" color="gray" pill size="xs">
                <h2>Edit this post</h2>
              </Button>
            </Link>
          )}
        </div>
        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-5 p-3 border-4 max-h-[600px] w-full object-cover"
        />
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-5xl text-xs">
          <span>
            {post &&
              new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </span>
          <span className="italic">
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>

        {/* Hidden section for small and medium screens */}
        <div className="block items-center lg:hidden pt-5">
          <div className="mb-2 flex flex-col justify-center">
            <Button
              className="mb-2"
              onClick={() => setTocVisible(!tocVisible)}
              color="gray"
            >
              {tocVisible ? "Hide Table of Contents" : "Table of Contents"}
            </Button>
            {tocVisible && (
              <ul className="mt-3 items-center justify-center space-y-2">
                {toc.map(
                  (item) =>
                    item.text && (
                      <div className="flex flex-row" key={item.id}>
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 12H5m14 0-4 4m4-4-4-4"
                          />
                        </svg>
                        <li className={`ml-${item.level * 2}`}>
                          <a
                            href={`#${item.id}`}
                            className="text-xl hover:underline"
                          >
                            {item.text}
                          </a>
                        </li>
                      </div>
                    )
                )}
              </ul>
            )}
          </div>
        </div>

        <div
          className="p-3 max-w-5xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
        {/* <div className="max-w-4xl mx-auto w-full">
          <CallToAction />
        </div> */}
        <CommentSection postId={post._id} />
        <div className="flex flex-col justify-center items-center mb-5">
          <h1 className="text-xl mt-5">Recent articles</h1>
          <div className="flex flex-wrap gap-5 mt-5 justify-center">
            {recentPosts &&
              recentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostPage;
