"use client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CreateModal from "./create.modal";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import UpdateModal from "./update.modal";
import Link from "next/link";
import { mutate } from "swr";
interface IProps {
  blogs: IBlog[];
}
const TablePage = (props: IProps) => {
  const { blogs } = props;
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [blog, setBlog] = useState<IBlog | null>(null);
  const handleDelete = (id: number) => {
    if (confirm(`Are you sure to delete this blog? ${id}`)) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success("Blog has been deleted");
            mutate("http://localhost:8000/blogs");
          } else {
            toast.error("Failed to delete blog");
          }
        });
    }
  };
  return (
    <>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2>Blog List</h2>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>
          Add New Blog
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>
                <Button>
                  <Link
                    href={`/blogs/${b.id}`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    View
                  </Link>
                </Button>
                <Button
                  variant="warning"
                  className="mx-3"
                  onClick={() => {
                    setBlog(b);
                    setShowModalCreate(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(b.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <UpdateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
};

export default TablePage;
