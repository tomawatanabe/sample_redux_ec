import React, { FC } from "react";
import { Button } from "@mui/material";

type pagingList = {
  dataTotal: number;
  handlePage: (page: number) => void;
  limit: number;
  page: number;
};

const PagingList: FC<pagingList> = ({ dataTotal, handlePage, limit, page }) => {
  // ページ番号の生成
  const range = (start: number, end: number) => {
    return [...Array<number>(end - start + 1)].map((_, i) => start + i);
  };

  return (
    <>
      <ul>
        {range(1, Math.ceil(dataTotal / limit)).map(
          (num: number, index: number) => (
            <li key={index}>
              <Button
                onClick={() => {
                  handlePage(page);
                }}
                disabled={page === num}
              >
                {num}
              </Button>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default PagingList;
