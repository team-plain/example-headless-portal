"use client";
import { PageInfoPartsFragment } from "@team-plain/typescript-sdk";
import { usePathname, useRouter } from "next/navigation";
import styles from "./paginationControls.module.css";

export function PaginationControls({
  pageInfo,
}: {
  pageInfo: PageInfoPartsFragment;
}) {
  console.log({ pageInfo });
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className={styles.pageWrapper}>
      <button
        onClick={() => {
          if (pageInfo.startCursor) {
            router.push(`${pathname}?before=${pageInfo.startCursor}`);
          }
        }}
        disabled={!pageInfo.hasPreviousPage}
      >
        Previous page
      </button>
      <button
        onClick={() => {
          if (pageInfo.endCursor) {
            router.push(`${pathname}?after=${pageInfo.endCursor}`);
          }
        }}
        disabled={!pageInfo.hasNextPage}
      >
        Next page
      </button>
    </div>
  );
}
