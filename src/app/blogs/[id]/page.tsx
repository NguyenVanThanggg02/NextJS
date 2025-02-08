"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useSWR, { Fetcher } from "swr";
const ViewDetailBlog = ({ params }: { params: { id: string } }) => {
  const useRoute = useRouter();
  const fetcher: Fetcher<IBlog, string> = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const handleBack = () => {
    useRoute.push("/blogs");
  };
  return (
    <Card style={{textAlign:'center'}}>
      <Card.Header>Detail Blog</Card.Header>
      <Card.Body>
        <Card.Title>{data?.title}</Card.Title>
        <Card.Text>{data?.content}</Card.Text>
      </Card.Body>
      <Card.Footer>{data?.author}</Card.Footer>
      <Button variant="primary" onClick={handleBack}>
        Go back
      </Button>
    </Card>
  );
};

export default ViewDetailBlog;
