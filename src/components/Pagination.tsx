import React, { useState } from 'react';

interface PaginationProps<T> {
  data: T[];
  itemsPerPage: number;
  titleTables: string[];
  renderTitle: (item: string, index:number) => React.ReactNode;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function PaginationComponent<T>({ data, itemsPerPage, titleTables, renderTitle, renderItem }: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
        {currentItems && currentItems.length > 0 ? (
          <>
            <div className="overflow-x-auto w-full">
              <table className="table w-full table-pin-rows">
                <thead>
                    {titleTables.map((title, index) => 
                        renderTitle(title, index))}
                </thead>
                <tbody>
                  {currentItems.map((item, index) =>
                    renderItem(item, indexOfFirstItem + index)
                  )}
                </tbody>
                </table>
            </div>
          </>  
        ): <p className="text-lg text-slate-700 text-center font-semibold">
        Data tidak ditemukan
      </p>
      }
      {currentItems && currentItems.length > 0 && (
        <div className="flex mt-2 float-end">
          <div className='flex flex-col gap-2'>
            <div className="join">
              <button
                className="join-item btn"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                «
              </button>
              <button className="join-item btn">Halaman {currentPage}</button>
              <button
                className="join-item btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
            <p>Total Data: {data.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
