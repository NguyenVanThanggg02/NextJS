"use client";
import Link from "next/link";
import x from "@/styles/app.module.css";
import y from "@/styles/win.module.css";
import TablePage from "@/components/app.table";
import { useEffect } from "react";
import useSWR from "swr";
import { log } from "node:console";
import CreateModal from "@/components/create.modal";
export default function Home() {
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
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        <li className={x["red"]}>
          <Link href="/facebook">
            <span className={y["red"]}>Facebook</span>
          </Link>
        </li>
        <li style={{ margin: "20px 0" }}>
          <Link href="/youtube">Youtube</Link>
        </li>
        <li>
          <Link href="/tiktok">Tiktok</Link>
        </li>
      </ul>
      <TablePage blogs={data?.sort((a:any, b:any) => b.id - a.id)} />
    </div>
  );
}
