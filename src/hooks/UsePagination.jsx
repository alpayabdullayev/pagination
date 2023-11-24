import { useState, useEffect, useMemo } from "react";
import UseFetch from "./UseFetch";

const UsePagination = (url, curPage, perPage) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [search, setSearch] = useState("");
  const [sortConfig, setsortConfig] = useState({ key: "id", direction: "descending" });
  const [currentPage, setCurrentPage] = useState(curPage);
  const [pagePerdata] = useState(perPage);
  
  const Callback = (data) => {
    if (!status) {
      console.log(data);
      setData(data);
      setStatus(true);
    }
  };

  UseFetch(url, Callback);

  const PageNumbers = [];

  for (let i = 1; i <= Math.ceil(data.length / pagePerdata); i++) {
    PageNumbers.push(i);
  }

  const lastElementIndex = currentPage * pagePerdata;
  const firstElementIndex = lastElementIndex - pagePerdata;

  const handleClick = (num) => {
    setCurrentPage(num);
  };

  const handleSort = (key) => {
    let direction = sortConfig.direction
    direction === "ascending" ? direction="descending"  :  direction ="ascending"
    setsortConfig({ key, direction });
  };

  const sortData = useMemo(() => {
    let sortableDatas = [...data];
    if (sortConfig.direction === "ascending") {
        sortableDatas.sort((a,b) => (a[sortConfig.key] > b[sortConfig.key]) ? 1 : ((b[sortConfig.key] > a[sortConfig.key]) ? -1 : 0))
    }
    else{
        sortableDatas.sort((a,b) => (a[sortConfig.key] < b[sortConfig.key]) ? 1 : ((b[sortConfig.key] < a[sortConfig.key]) ? -1 : 0))
    }
    return sortableDatas;
  }, [data, sortConfig]);

  const filterData = sortData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const pageDatas = filterData.slice(firstElementIndex, lastElementIndex);

  return [handleClick, PageNumbers, pageDatas, handleSort, search, setSearch];
};

export default UsePagination;

//#region

// import { useMemo } from "react";

// const UsePagination = (data, currentPage, pagePer) => {
//   const totalPages = Math.ceil(data.length / pagePer);

//   const lastElementIndex = currentPage * pagePer;
//   const firstElementIndex = lastElementIndex - pagePer;

//   const currentPageData = useMemo(() => {
//     return data.slice(firstElementIndex, lastElementIndex);
//   }, [data, currentPage]);
//   const handleClick =(num)=>{
//     setPagesNum
//   }

//   return [currentPageData, totalPages, PageNumbers];
// };

// export default UsePagination;
//#endregion
