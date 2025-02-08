'use client'
import TablePage from "@/components/app.table";
import React from "react";
import useSWR from "swr";

const BlogsPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-3">
      <TablePage blogs={data?.sort((a: any, b: any) => b.id - a.id) ?? []} />
    </div>
  );
};

export default BlogsPage;
