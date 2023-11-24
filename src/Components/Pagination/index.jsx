import React, { useEffect, useMemo, useState } from 'react';
import UsePagination from '../../hooks/UsePagination';

function Pagination() {
  const [data, setData] = useState([]);


  const baseUrl = 'https://northwind.vercel.app/api/products'
  const page1 = 1
  const page2 = 10
   const [handleClick, PageNumbers , pageDatas,handleSort,search,setSearch] =UsePagination(baseUrl, page1,page2)


  

 //#region 
  // const [data, setData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pagePerdata] = useState(5);

  // useEffect(() => {
  //   fetch("https://northwind.vercel.app/api/categories")
  //     .then((response) => response.json())
  //     .then((items) => setData(items));
  // }, []);

  // const PageNumbers = [];

  // for (let i = 1; i <= Math.ceil(data.length / pagePerdata); i++) {
  //   PageNumbers.push(i);
  // }

  // const lastElementIndex = currentPage * pagePerdata;
  // const firstElementIndex = lastElementIndex - pagePerdata;

  // const pageDatas = useMemo(() => {
  //   return data.slice(firstElementIndex, lastElementIndex);
  // }, [data, currentPage]);
 //#endregion

  return (
    <>

<input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <table border={"1px solid black"}>
        <thead>
          <tr>
            <th onClick={()=>handleSort('id')}>Id</th>
            <th onClick={()=>handleSort('name')}>Name</th>
            <th onClick={()=>handleSort('description')}>Description</th>
          </tr>
        </thead>
        <tbody>
          {pageDatas.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {
            PageNumbers.map((page)=>(
                <button key={page} onClick={()=>handleClick(page)}>{page}</button>
            ))
        }
      </div>
    </>
  );
}

export default Pagination;
