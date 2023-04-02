import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import FormField from "../components/FormField";
import Card from "../components/Card";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card id={post._id} {...post} />);
  }else{
  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  )};
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if(response.ok){
            const result = await response.json();
            setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className=" max-w-7xl mx-auto ">
      <div>
        <h1 className=" font-extrabold text-[#222328] text-[32px] ">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[700px]">
          Browse through the collection of imaginative and visually stunning
          images created using AI
        </p>
      </div>
      <div className="mt-16">
        <FormField />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center ">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-md mb-3 ">
                Showing Results for:{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={[]} title="No Search Results Found" />
              ) : (
                <RenderCards data={allPosts} title="No Results Found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
