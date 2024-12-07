import { useNavigate } from "react-router-dom";
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DateRangePicker } from 'react-date-range';
import { startOfMonth } from 'date-fns';
import { API, AGENTAPI } from '../../../../Configs/Configs';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { formatCurrency } from "@/util/format";

function formatDateToYYYYMMDD(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11, so add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function add1day(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return formatDateToYYYYMMDD(date);
}

function formatDateToGMT7(date) {
  const offset = date.getTimezoneOffset() / 60; // Get timezone offset in hours
  const sign = offset <= 0 ? '+' : '-';
  const hours = Math.abs(offset).toString().padStart(2, '0');
  const formattedTime = date.toISOString().slice(0, 19).replace('T', ' ');
  return `${formattedTime} GMT${sign}${hours}:00`;
}
function convertToGMT8(date) {
  // Clone the date object
  const newDate = new Date(date.getTime());

  // Add one hour to the date
  newDate.setHours(newDate.getHours() + 1);

  const offset = newDate.getTimezoneOffset() / 60; // Get timezone offset in hours
  const sign = offset <= 0 ? '+' : '-';
  const hours = (Math.abs(offset) + 8).toString().padStart(2, '0'); // Adjust for GMT +8
  const formattedTime = newDate.toISOString().slice(0, 19).replace('T', ' ');
  return `${formattedTime} GMT${sign}${hours}:00`;
}
function addOneDay(date) {
  const newDate = new Date(date); // Clone the date object
  newDate.setDate(newDate.getDate() + 1); // Add one day
  return newDate;
}

const MemberList = forwardRef((props, ref) => {
  const { userId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");

  const [state, setState] = useState([
    {
      startDate: startOfMonth(new Date()),
      endDate: new Date(),
      // endDate: addOneDay(new Date()),
      key: 'selection'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [transferHistory, setTransferHistory] = useState([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      getTransferHistory(currentPage);
    }
  }, [currentPage, userId]);

  const getTransferHistory = (page = 1) => {
    if (!userId) return;

    const datefrom = formatDateToYYYYMMDD(state[0].startDate);
    const dateto = formatDateToYYYYMMDD(state[0].endDate);

    axios.get(`${AGENTAPI}/transferhistory/${userId}`, {
      params: {
        datefrom: datefrom,
        dateto: add1day(dateto),
        itemsperpage: 20,
        currentpage: page
      },
      headers: {
        apikey: 'developercoconut'
      }
    })
      .then(response => {
        setTransferHistory(response.data.ItemList || []);
        setTotalPages(response.data.TotalPages || 1);
        setIsLoading(false);
      })
      .catch(error => {
        Swal.fire('Error', 'Failed to fetch transfer history', 'error');
      });
  }

  useImperativeHandle(ref, () => ({
    fetchData() {
      if (userId) {
        getTransferHistory(currentPage);
      }
    }
  }));

  const openDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  }

  const handleDateChange = (item) => {
    setState([item.selection]);
  }

  const handleOkClick = () => {
    setIsDatePickerOpen(false);
    getTransferHistory(1);
  }

  const formatDate = (date) => {
    const d = new Date(date);
    return d.getFullYear() + '/' + (d.getMonth() + 1).toString().padStart(2, '0') + '/' + d.getDate().toString().padStart(2, '0');
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const total = totalPages;
    const current = currentPage;
    const delta = 2;

    const range = {
      start: Math.max(2, current - delta),
      end: Math.min(total - 1, current + delta)
    };

    if (total === 1) {
      pageNumbers.push(1);
    } else {
      if (range.start > 2) {
        pageNumbers.push(1, '...');
      } else {
        pageNumbers.push(1);
      }

      for (let i = range.start; i <= range.end; i++) {
        pageNumbers.push(i);
      }

      if (range.end < total - 1) {
        pageNumbers.push('...', total);
      } else {
        pageNumbers.push(total);
      }
    }

    return pageNumbers.map((number, index) => (
      <li key={index} data-v-060ca318="" data-v-2a30deb0="">
        {number === '...' ? (
          <span className="DotsHolder" data-v-060ca318="">
            <svg
              viewBox="0 0 8 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="Dots"
              data-v-060ca318=""
            >
              <path
                d="M2.24 1c0 .556-.445 1-1 1-.556 0-1-.444-1-1s.444-1 1-1c.555 0 1 .444 1 1zm5.333 0c0 .556-.444 1-1 1-.555 0-1-.444-1-1s.445-1 1-1c.556 0 1 .444 1 1z"
                fill="#BBB"
              />
            </svg>
          </span>
        ) : (
          <button
            className={`Page ${currentPage === number ? 'Page-active' : ''}`}
            type="button"
            aria-label={`Go to page ${number}`}
            data-v-060ca318=""
            style={{ backgroundColor: currentPage === number ? 'rgb(220, 237, 255)' : 'transparent' }}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        )}
      </li>
    ));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="content" className="tab-pane p-5 active" role="tabpanel" aria-labelledby="content-tab">
      <div className="grid grid-cols-3 gap-3 items-center">
        <div className="relative">
          <label htmlFor="filter-date-event" className="form-label mb-1">วันที่</label>
          <div className="w-64">
            <div className="dp__main dp__theme_light">
              <div aria-label="Datepicker input" role="textbox" aria-multiline="false" aria-disabled="false" aria-readonly="false">
                <div className="dp__input_wrap">
                  <input
                    name="date"
                    className="dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg"
                    inputMode="none"
                    placeholder=""
                    autoComplete="off"
                    value={`${formatDate(state[0].startDate)} - ${formatDate(state[0].endDate)}`}
                    onClick={openDatePicker}
                  />
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    className="dp__icon dp__input_icon dp__input_icons"
                  >
                    <path d="M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z" />
                    <path d="M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" />
                    <path d="M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" />
                    <path d="M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {isDatePickerOpen && (
            <div className="absolute z-50 mt-2 bg-white p-4 shadow-lg border">
              <DateRangePicker
                onChange={handleDateChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
              />
              <button onClick={handleOkClick} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                OK
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="intro-y col-span-12 sm:col-span-12">
          <div className="overflow-x-auto mt-3">
            <table className="text-xs text-left w-full">
              <thead>
                <tr className="bg-gray-700 dark:bg-dark-1 text-white px-half font-display">
                  <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">#</th>
                  <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-left">ประเภท</th>
                  <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">วันที่จ่ายเงิน</th>
                  <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-right">จำนวนเงิน</th>
                  <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {transferHistory && transferHistory.length > 0 ? (
                  transferHistory.map((item, index) => item.Status !== "Rejected" && (

                    <tr key={index} className="hover:bg-yellow-100 px-half even:bg-blue-50">
                      <td className="py-1 px-2 border text-center p-0 w-16 number-display">{index + 1}</td>
                      <td className="py-1 px-2 border text-left">{item.TransactionType}</td>
                      {/* <td className="py-1 px-2 border text-center w-36">{item.DateTime}</td> */}
                      {/* <td className="py-1 px-2 border text-center w-36">
                        {new Date(new Date(item.DateTime).getTime() - 60 * 60 * 1000).toLocaleString()}
                      </td> */}
                      <td className="py-1 px-2 border text-center w-36">
                        {new Date(new Date(item.DateTime).getTime() - 60 * 60 * 1000).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false
                        }).replace(',', '')}
                      </td>
                      <td className="py-1 px-2 border text-right number-display">{formatCurrency(item.Amount)}</td>
                      <td className="py-1 px-2 border text-center number-display">{item.Status}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="px-2 bg-yellow-50 py-2 text-center">
                    <td colSpan={4}>ไม่มีข้อมูล</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex justify-center pb-2 pt-4">
              <ul className="Pagination">
                <li className="PaginationControl" onClick={() => handlePageChange(1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="Control Control-active">
                    <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41M6 6h2v12H6V6z" />
                  </svg>
                </li>
                <li className="PaginationControl" onClick={() => handlePageChange(currentPage - 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="Control Control-active">
                    <path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" />
                  </svg>
                </li>
                {renderPageNumbers()}
                <li className="PaginationControl" onClick={() => handlePageChange(currentPage + 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="Control Control-active">
                    <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z" />
                  </svg>
                </li>
                <li className="PaginationControl" onClick={() => handlePageChange(totalPages)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="Control Control-active">
                    <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41M16 6h2v12h-2V6z" />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})

export default MemberList;
