import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { API } from '../Configs/Configs';
import axios from 'axios';
import Swal from 'sweetalert2'

import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";

import useSocket from "../useSocket";

import { getCurrentTimeInUTC7, formatDateTime } from '../Model/Function';
import { ApiCall } from "@/util/api";
import { bankLabelImage, bankColor, BankName } from "@/util/util";
import { formatCurrency, formatCurrencyFloat } from "@/util/format";

function App() {
  const parseFormattedData = (formattedString) => {
    const [id, phonenumber, name, userId] = formattedString.split(" : ");
    return { id, phonenumber, name, userId };
  };

  const [isLoading, setIsloading] = useState(true)
  const [bankdepositwithdrawData, setbankdepositwithdraw] = useState([])
  const [bankdepositwithdrawFullData, setbankdepositwithdrawFull] = useState([])

  const [bankdepositwithdrawwaitData, setbankdepositwithdrawwait] = useState([])

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [checkLoading, setcheckLoading] = useState(false)

  const navigate = useNavigate();

  const [accessToken, setaccessToken] = useState("")
  const loggedInUser = localStorage.getItem('loggedInUser');
  useEffect(() => {
    if (loggedInUser) {
      setaccessToken(JSON.parse(loggedInUser).accessToken)
      setIsloading(false)
    } else {
      navigate("/");
    }
  }, []);

  const [bankservice, setbankservice] = useState([]);
  const fetchdatabankservice = async () => {
    let res = await ApiCall("GET", "/bankservice", {});
    console.log("[fetchdatabankservice]");
    setbankservice(res.data);
    console.log("fetchdatabankservice: ", res.data);
  };

  const getbankdepositwithdraw = async (page) => {
    setLoading(true);
    try {
      console.log("[getbankdepositwithdraw]");
      const response = await axios.get(`${API}/v2/bankdeposit?q&limit=20&page=${page}`, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
        }
      });
      // setbankdepositwithdraw(prevData => [...prevData, ...response.data.data]);
      setPagination(response.data.pagination)
      setbankdepositwithdraw(response.data.data);
      setHasMore(response.data.data.length > 0);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
    setLoading(false);
  };

  const [pagination, setPagination] = useState([])
  const [currentPage, setCurrentPage] = useState(pagination.currentPage);


  useEffect(() => {
    setCurrentPage(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= pagination.totalPages) {
      setCurrentPage(page);
      getbankdepositwithdraw(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const total = pagination.totalPages;
    const current = pagination.currentPage;
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
  };


  const observer = useRef();
  const lastDataElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // const getbankdepositwithdraw = async (page) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${API}/v2/bankdeposit?q&itemsPerPage=20&page=${page}`, {
  //       headers: {
  //         "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
  //       }
  //     });
  //     // setbankdepositwithdraw(prevData => [...prevData, ...response.data.data]);
  //               setPagination(response.data.pagination)
  //     setbankdepositwithdraw(response.data.data);
  //     setHasMore(response.data.data.length > 0);
  //   } catch (error) {
  //     console.error('Failed to fetch data', error);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    getbankdepositwithdraw(page);
  }, [page]);

  const [highlightedOption, setHighlightedOption] = useState("");

  const [options, setOption] = useState([]);
  const [optionsdata, setOptiondata] = useState([]);

  // onSelect={(option) => setSelectedOption(option)} onChangeComboBoxDeposit
  // onSelect={setSelectedOptionHandle}

  const setSelectedOptionHandle = (e) => {
    //console.log(e)
    setSelectedOption(e)
    setOptiondata(e)
  }

  const onChangeComboBoxDeposit = (e) => {
    //console.log(e.target.value)
    //console.log((e.target.value).length)
    // 
    if ((e.target.value).length > 3) {
      axios.post(`${API}/searchuserbanktel`, {
        data: e.target.value
      }, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      })
        .then(response => {
          //console.log("ค้นหา user :", response.data.data)

          const formattedData = response.data.data.map(item =>
            `${item.id} : ${item.phonenumber} : ${item.name} : ${item.userId}`
          );
          setOption(formattedData)
          //console.log("ค้นหา user formattedData :", formattedData)
        })
        .catch(error => {
        });
    }
  }



  const getbankdepositwithdrawwait = () => {
    axios.get(`${API}/v2/bankdepositwithdrawwait?q=&limit=30&page=1`, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
      }
    })
      .then(response => {
        // //console.log("response bankdepositwithdrawwait :", response.data)
        // //console.log("response bankdepositwithdrawwait data :", response.data.data)
        setbankdepositwithdrawwait(response.data.data)
      })
      .catch(error => {
      });
  }

  // const getbankdepositwithdraw = () => {
  //   axios.get(`${API}/v2/bankdeposit?q&itemsPerPage=10&page=1`, {
  //     headers: {
  //       "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
  //     }
  //   })
  //     .then(response => {
  //       // //console.log("response bankdeposit :", response.data)
  //       // //console.log("response bankdeposit data :", response.data.data)
  //       setbankdepositwithdraw(response.data.data)
  //       setbankdepositwithdrawFull(response.data)
  //     })
  //     .catch(error => {
  //     });
  // }


  const [selectBankservicedeposit, setSelectBankserviceDeposit] = useState({})
  const [optionsbankservice, setOptionbankservice] = useState([]);
  const getBankservice = () => {
    axios.get(`${API}/bankservice`, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
      }
    })
      .then(response => {
        //console.log("response bankservice :", response.data.data)

        const formattedData = response.data.data.map(item => ({
          value: item.id,
          text: `${item.id} : ${item.bankName} : ${item.accountNo} : ${item.accountName}`
        }));
        setSelectBankserviceDeposit(response.data.data[0].id)
        setOptionbankservice(formattedData)
        //console.log("ดึงบัญชีเว็บ :", formattedData)
      })
      .catch(error => {
      });
  }

  useEffect(() => {
    if (loggedInUser && !isLoading) {
      // //console.log("loggedInUser:", accessToken)
      console.log('[isLoading, page]')
      getbankdepositwithdrawwait();
      getbankdepositwithdraw(page);
      // getBankservice();
      fetchdatabankservice();
    }
  }, [isLoading, page]);


  useEffect(() => {
    const interval = setInterval(() => {
      if (loggedInUser && !isLoading) {
        console.log('setInterval 10')
        getbankdepositwithdrawwait();
        getbankdepositwithdraw(page)
        // getBankservice();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [accessToken, loggedInUser, isLoading, page]);

  // Socket.io
  const { messages, sendMessage } = useSocket("defaultRoom");
  // useEffect(() => {
  //   console.log("messages:", messages)
  //   console.log("messages length:", messages.length)
  //   if (loggedInUser && !isLoading) {
  //     try {
  //       if (typeof (messages) !== 'undefined') {
  //         if (messages.data.command === "transactionsJob") {
  //           console.log("transactionsJob")
  //           getbankdepositwithdrawwait();
  //           getbankdepositwithdraw(page)
  //         }
  //       }
  //     } catch (e) {

  //     }


  //   }
  // }, [messages]);



  const [dropdownProfile, setdropdownProfile] = useState(false)
  const handleDropdownProfile = () => {
    setdropdownProfile(!dropdownProfile)
  }


  function calculateTimeDifference(dateTime1, dateTime2) {
    // แปลงวันที่และเวลาเป็น milliseconds
    const milliseconds1 = dateTime1.getTime();
    const milliseconds2 = dateTime2.getTime();

    // คำนวณระยะเวลาที่ผ่านไป
    const totalMilliseconds = Math.abs(milliseconds1 - milliseconds2);
    const totalSeconds = totalMilliseconds / 1000;

    // คำนวณวัน ชั่วโมง และนาที
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // สร้างข้อความผลลัพธ์
    let resultText = '';
    if (days >= 1) {
      resultText += `${days} วัน `;
    }
    if (hours >= 1) {
      resultText += `${hours} ชั่วโมง `;
    }
    if (minutes >= 1) {
      resultText += `${minutes} นาที `;
    }
    resultText += `${seconds} วินาที`;

    return resultText;
  }


  function formatTimeDifference(targetDateTime) {
    // console.log("targetDateTime:", targetDateTime);
    // คำนวณวันที่และเวลาปัจจุบันใน UTC+7
    const currentDateTime = new Date();
    const currentMillisecondsUTC7 = currentDateTime.getTime();

    // แปลง targetDateTime ไปเป็น UTC+7
    const targetDate = new Date(targetDateTime);
    const targetMillisecondsUTC7 = targetDate.getTime() + (targetDate.getTimezoneOffset() * 60000) + (14 * 60 * 60000);

    // คำนวณระยะเวลาที่ผ่านไป
    const totalMilliseconds = currentMillisecondsUTC7 - targetMillisecondsUTC7;
    let totalSeconds = totalMilliseconds / 1000;

    // ตรวจสอบว่าหาก totalSeconds น้อยกว่า 0 ให้เป็น 0
    if (totalSeconds < 0) {
      totalSeconds = 0;
    }

    // คำนวณวัน ชั่วโมง และนาที
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    // สร้างข้อความผลลัพธ์
    let resultText = '';
    if (days >= 1) {
      resultText = `${days} วัน ${hours} ชั่วโมง`;
    } else if (hours >= 1) {
      resultText = `${hours} ชั่วโมง ${minutes} นาที`;
    } else if (minutes >= 1) {
      resultText = `${minutes} นาที`;
    } else {
      resultText = `${Math.floor(totalSeconds)} วินาที`;
    }

    return resultText;
  }


  // function formatTimeDifference(targetDateTime) {
  //   console.log("targetDateTime:",targetDateTime)
  //   // คำนวณวันที่และเวลาปัจจุบันใน UTC+7
  //   const currentDateTime = new Date();
  //   // const currentMillisecondsUTC7 = currentDateTime.getTime() + (currentDateTime.getTimezoneOffset() * 60000) + (7 * 60 * 60000);

  //   const currentMillisecondsUTC7 = currentDateTime.getTime();
  //   // แปลง targetDateTime ไปเป็น UTC+7
  //   const targetDate = new Date(targetDateTime);
  //   const targetMillisecondsUTC7 = targetDate.getTime() + (targetDate.getTimezoneOffset() * 60000) + (14 * 60 * 60000);

  //   // คำนวณระยะเวลาที่ผ่านไป
  //   const totalMilliseconds = currentMillisecondsUTC7 - targetMillisecondsUTC7;
  //   const totalSeconds = totalMilliseconds / 1000;

  //   // คำนวณวัน ชั่วโมง และนาที
  //   const days = Math.floor(totalSeconds / (24 * 3600));
  //   const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);

  //   // สร้างข้อความผลลัพธ์
  //   let resultText = '';
  //   if (days >= 1) {
  //     resultText = `${days} วัน ${hours} ชั่วโมง`;
  //   } else if (hours >= 1) {
  //     resultText = `${hours} ชั่วโมง ${minutes} นาที`;
  //   } else if (minutes >= 1) {
  //     resultText = `${minutes} นาที`;
  //   } else {
  //     resultText = `${Math.floor(totalSeconds)} วินาที`;
  //   }

  //   return resultText;
  // }

  // hide
  // manual
  // approve
  // cancel



  const adminCheckDepositManualAPI = (id) => {
    axios.patch(`${API}/v2/bankdepositwithdrawwait/admin-check/${id}`, {
      status: 2
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
      .then(response => {
        //console.log('response:', response)
        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: "สำเร็จ",
        //   showConfirmButton: false,
        //   timer: 1500
        // });

        getbankdepositwithdrawwait();
        getbankdepositwithdraw(page)
      })
      .catch(error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "ผิดพลาด",
          showConfirmButton: false,
          timer: 1500
        });
        getbankdepositwithdrawwait();
        getbankdepositwithdraw(page)
      });
  }

  const [modalDepositSelectUser, setModalDepositSelectUser] = useState(false)
  const [modalDeposit, setModalDeposit] = useState(false)
  const [modalWithdraw, setModalWithdraw] = useState(false)

  const [autoUser, setAutoUser] = useState(0)



  const [depositModalShow, setDepositMadalShow] = useState("hide")
  const [dataForDeposit, setDataForDeposit] = useState()

  const adminCheckDepositManual = (data) => {
    //console.log('adminCheckDepositManual:', data)
    adminCheckDepositManualAPI(data.depositWithdrawId)
  }

  const adminApproveManualDeposit = (data, auto = 0) => {
    if (data.depositWithdrawapproveBy === JSON.parse(loggedInUser).userData.id) {
      console.log("admin ถูกต้อง")
      setDepositMadalShow("manual")
      setDataForDeposit(data)
      setAutoUser(auto)
    } else {
      console.log("admin ไม่ถูกต้อง")

      Swal.fire({
        position: "center",
        icon: "error",
        title: "ผิดพลาด",
        text: "บัญชี Admin ไม่ตรงกับที่เช็ค",
        showConfirmButton: false,
        timer: 1500
      });
    }
    //console.log('adminApproveManualDeposit:', data)
  }

  const adminApproveDeposit = (data, auto = 0) => {
    console.log("data 1:", data)
    console.log("data admin:", JSON.parse(loggedInUser).userData)

    if (data.depositWithdrawapproveBy === JSON.parse(loggedInUser).userData.id) {
      console.log("admin ถูกต้อง")
      setDepositMadalShow("approve")
      setDataForDeposit(data)
      setAutoUser(auto)
    } else {
      console.log("admin ไม่ถูกต้อง")

      Swal.fire({
        position: "center",
        icon: "error",
        title: "ผิดพลาด",
        text: "บัญชี Admin ไม่ตรงกับที่เช็ค",
        showConfirmButton: false,
        timer: 1500
      });
    }


    //console.log('adminApproveDeposit:', data)
  }
  const adminCancelDeposit = (data, auto = 0) => {
    setDepositMadalShow("cancel")
    setDataForDeposit(data)
    setAutoUser(auto)
    //console.log('adminCancelDeposit:', data)
  }

  const adminCancelBitDeposit = (data, auto = 0) => {
    console.log('adminCancelBitDeposit:', data)
    setDepositMadalShow("cancel-eject")
    setDataForDeposit(data)
    setAutoUser(auto)
  }

  const modalHide = () => {
    setDepositMadalShow("hide")
    //console.log('modalHide')
  }

  const [dataAddDeposit, setDataAddDeposit] = useState()
  const [dataAddWithdraw, setDataAddWithdraw] = useState()


  const submitModal = (e) => {
    e.preventDefault();

    console.log("dataForDeposit:", dataForDeposit)
    //console.log("submitModal")
    //console.log("depositModalShow:", depositModalShow)

    modalHide();
    if (dataForDeposit.depositWithdrawtype === "deposit" && dataForDeposit.depositWithdrawId !== 0) {
      // ฝาก
      switch (depositModalShow) {
        case 'manual':
          axios.patch(`${API}/v2/bankdepositwithdrawwait/admin-deposit-manual/${dataForDeposit.depositWithdrawId}`, {
            remark: dataForDeposit.depositWithdrawremark
          }, {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          })
            .then(response => {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "รายการสำเร็จ"
              });

              getbankdepositwithdrawwait();
              getbankdepositwithdraw(page)
            })
            .catch(error => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "ผิดพลาด",
                text: error.response.data.error,
                showConfirmButton: false,
                timer: 1500
              });
              getbankdepositwithdrawwait();
              getbankdepositwithdraw(page)
            });


          return;

        case 'approve':
          axios.patch(`${API}/v2/bankdepositwithdrawwait/admin-deposit-approve/${dataForDeposit.depositWithdrawId}`, {
            remark: ""
          }, {
            headers: {
              "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
            }
          })
            .then(response => {
              //console.log('response:', response)
              // Swal.fire({
              //   position: "center",
              //   icon: "success",
              //   title: "สำเร็จ",
              //   showConfirmButton: false,
              //   timer: 1500
              // });


              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "รายการสำเร็จ"
              });

              getbankdepositwithdrawwait();
              getbankdepositwithdraw(page)
            })
            .catch(error => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "ผิดพลาด",
                text: error.response.data.error,
                showConfirmButton: false,
                timer: 1500
              });
              getbankdepositwithdrawwait();
              getbankdepositwithdraw(page)
            });

          return;
        case 'cancel':
          axios.patch(`${API}/v2/bankdepositwithdrawwait/admin-cancel/${dataForDeposit.depositWithdrawId}`, {
            remark: dataForDeposit.depositWithdrawremark
          }, {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          })
            .then(response => {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "รายการสำเร็จ"
              });

              getbankdepositwithdrawwait();
              getbankdepositwithdraw(page)
            })
            .catch(error => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "ผิดพลาด",
                showConfirmButton: false,
                timer: 1500
              });
              getbankdepositwithdrawwait();
              getbankdepositwithdraw(page)
            });
          return;
        default:
          Swal.fire({
            position: "center",
            icon: "error",
            title: "ผิดพลาด",
            showConfirmButton: false,
            timer: 1500
          });
          return;

      }
    } else {
      // ถอน
      switch (depositModalShow) {

        // depositModalShow === "cancel-eject"
        case 'cancel-eject':
          axios.patch(`${API}/v2/bankdepositwithdrawwait/auto-admin-withdraw-eject/${dataForDeposit.depositWithdrawId}`, {
            withdrawRefCode: dataForDeposit.withdrawRefCode,
            remark: dataForDeposit.depositWithdrawremark
          }, {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          })
            .then(response => {

              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "รายการสำเร็จ"
              });

              getbankdepositwithdrawwait();
              getbankdepositwithdraw(page)
            })
            .catch(error => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "ผิดพลาด",
                text: error.response.data.error,
                showConfirmButton: false,
                timer: 1500
              });
              getbankdepositwithdrawwait();
              getbankdepositwithdraw(page)
            });
          return;
        case 'manual':
          if (autoUser === 0) {
            axios.patch(`${API}/v2/bankdepositwithdrawwait/admin-withdraw-manual/${dataForDeposit.depositWithdrawId}`, {
              remark: dataForDeposit.depositWithdrawremark
            }, {
              headers: {
                "Authorization": `Bearer ${accessToken}`
              }
            })
              .then(response => {
                //console.log('response:', response)
                // Swal.fire({
                //   position: "center",
                //   icon: "success",
                //   title: "สำเร็จ",
                //   showConfirmButton: false,
                //   timer: 1500
                // });


                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "รายการสำเร็จ"
                });

                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              })
              .catch(error => {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "ผิดพลาด",
                  text: error.response.data.error,
                  showConfirmButton: false,
                  timer: 1500
                });
                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              });
          } else {
            axios.patch(`${API}/v2/bankdepositwithdrawwait/auto-admin-withdraw-manual/${dataForDeposit.depositWithdrawId}`, {
              withdrawRefCode: dataForDeposit.withdrawRefCode,
              remark: dataForDeposit.depositWithdrawremark
            }, {
              headers: {
                "Authorization": `Bearer ${accessToken}`
              }
            })
              .then(response => {
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "รายการสำเร็จ"
                });

                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              })
              .catch(error => {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "ผิดพลาด",
                  text: error.response.data.error,
                  showConfirmButton: false,
                  timer: 1500
                });
                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              });

          }

          return;

        case 'approve':
          if (autoUser === 0) {
            axios.patch(`${API}/v2/bankdepositwithdrawwait/admin-withdraw-approve/${dataForDeposit.depositWithdrawId}`, {
              remark: ""
            }, {
              headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
              }
            })
              .then(response => {
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "รายการสำเร็จ"
                });

                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              })
              .catch(error => {
                console.error(error.response.data.error)
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "ผิดพลาด",
                  text: error.response.data.error,
                  showConfirmButton: false,
                  timer: 1500
                });
                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              });
          } else {
            axios.patch(`${API}/v2/bankdepositwithdrawwait/auto-admin-withdraw-approve/${dataForDeposit.depositWithdrawId}`, {
              withdrawRefCode: dataForDeposit.withdrawRefCode,
              remark: ""
            }, {
              headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
              }
            })
              .then(response => {
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "รายการสำเร็จ"
                });

                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              })
              .catch(error => {
                console.error(error.response.data.error)
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "ผิดพลาด",
                  text: error.response.data.error,
                  showConfirmButton: false,
                  timer: 1500
                });
                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              });
          }
          return;
        case 'cancel':
          if (autoUser === 0) {
            axios.patch(`${API}/v2/bankdepositwithdrawwait/admin-cancel/${dataForDeposit.depositWithdrawId}`, {
              remark: dataForDeposit.depositWithdrawremark
            }, {
              headers: {
                "Authorization": `Bearer ${accessToken}`
              }
            })
              .then(response => {
                //console.log('response:', response)
                // Swal.fire({
                //   position: "center",
                //   icon: "success",
                //   title: "สำเร็จ",
                //   showConfirmButton: false,
                //   timer: 1500
                // });


                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "รายการสำเร็จ"
                });

                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              })
              .catch(error => {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "ผิดพลาด",
                  showConfirmButton: false,
                  timer: 1500
                });
                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              });
          } else {
            axios.patch(`${API}/v2/bankdepositwithdrawwait/auto-admin-cancel/${dataForDeposit.depositWithdrawId}`, {
              withdrawRefCode: dataForDeposit.withdrawRefCode,
              remark: dataForDeposit.depositWithdrawremark
            }, {
              headers: {
                "Authorization": `Bearer ${accessToken}`
              }
            })
              .then(response => {
                //console.log('response:', response)
                // Swal.fire({
                //   position: "center",
                //   icon: "success",
                //   title: "สำเร็จ",
                //   showConfirmButton: false,
                //   timer: 1500
                // });


                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "รายการสำเร็จ"
                });

                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              })
              .catch(error => {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "ผิดพลาด",
                  showConfirmButton: false,
                  timer: 1500
                });
                getbankdepositwithdrawwait();
                getbankdepositwithdraw(page)
              });
          }

          return;
        default:
          Swal.fire({
            position: "center",
            icon: "error",
            title: "ผิดพลาด",
            showConfirmButton: false,
            timer: 1500
          });
          return;

      }
    }





  }

  const refreshData = () => {
    //console.log("refreshData")
    getbankdepositwithdrawwait();
    getbankdepositwithdraw(page)
  }

  const titleText = (type) => {
    switch (type) {
      case 'hide':
        return 'ซ่อนรายการ';
      case 'manual':
        return 'ปรับสถานะรายการ';
      case 'approve':
        return 'อนุมัติรายการ';
      case 'cancel':
        return 'ยกเลิกรายการ';
      default:
        return '';
    }
  }

  const [selectedOption, setSelectedOption] = useState();


  const [datetimePickerDeposit, setDatetimePickerDeposit] = useState("")
  const [depositAmount, setDepositAmount] = useState("")
  const [depositRemark, setDepositRemark] = useState("")
  const datetimePickerDepositHandle = (e) => {
    //console.log(`${e.target.value}`)
    setDatetimePickerDeposit(`${e.target.value}`)
  }

  useEffect(() => {
    //console.log(`depositAmount= ${depositAmount}`)
  }, [depositAmount])

  useEffect(() => {
    //console.log(`depositRemark= ${depositRemark}`)
  }, [depositRemark])


  const [selectBankDeposit, setSelectBankDeposit] = useState({})
  const [optionsBankDeposit, setOptionsBankDeposit] = useState([])


  useEffect(() => {
    if (options.length !== 0) { // ถ้ามีข้อมูล user แล้วให้ดึงข้อมูลธนาคารออกมา
      //console.log(`เลือก user= ${selectedOption.length}`)
      //console.log(`เลือก user= ${selectedOption}`)

      //console.log(`เลือก user= `, parseFormattedData(selectedOption))

      axios.get(`${API}/userbank?userid=${parseFormattedData(selectedOption).id}`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      })
        .then(response => {
          //console.log("ค้นหา บัญชี user :", response.data.data)

          const formattedData = response.data.data.map(item => ({
            value: item.id,
            text: `${item.id} : ${item.bankName} : ${item.accountNumber} : ${item.accountName}`
          }));
          setOptionsBankDeposit(formattedData)
          setSelectBankDeposit(response.data.data[0].id)
          //console.log("ค้นหา แปลง บัญชี user :", formattedData)
        })
        .catch(error => {
        });
    }

  }, [selectedOption])

  const adjustTimeZone = (datetime, offset) => {
    // Create a new Date object from the input datetime
    const date = new Date(datetime);

    // Adjust the time by the offset (in hours)
    date.setHours(date.getHours() + offset);

    // Convert back to ISO format without milliseconds
    return date.toISOString().split('.')[0];
  };

  const submitAddDeposit = (e) => {
    e.preventDefault();
    //console.log("submitAddDeposit:")

    // { id, phonenumber, name, userId };

    // //console.log("optiondata:", optionsdata)
    //console.log("type: deposit")
    //console.log("userBankId:", selectBankDeposit)
    //console.log("userId:", parseFormattedData(optionsdata).userId)
    //console.log("amount:", depositAmount)
    //console.log("remark:", depositRemark)
    //console.log("bankserviceId:", selectBankservicedeposit)
    //console.log("time:", datetimePickerDeposit)

    axios.post(`${API}/v2/bankdepositwithdrawwait`, {
      type: "deposit",
      userBankId: parseInt(selectBankDeposit),
      userId: parseFormattedData(optionsdata).userId,
      amount: parseInt(depositAmount),
      remark: depositRemark,
      bankserviceId: parseInt(selectBankservicedeposit),
      // time: `${datetimePickerDeposit}:00Z` // ISO-8601 DateTime
      time: `${adjustTimeZone(datetimePickerDeposit, 0)}Z` // Adjust to -7 hours
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
      .then(response => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "รายการสำเร็จ"
        });
        setModalDeposit(false)
        getbankdepositwithdrawwait();
        getbankdepositwithdraw(page)
        // getBankservice();
      })
      .catch(error => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "รายการไม่สำเร็จ"
        });
      });
  }


  const createDepositHandle = () => {

    getBankservice();
    setSelectedOption(null)
    setDataAddDeposit({});
    setDepositAmount(0);
    setDepositRemark("");
    setDatetimePickerDeposit("");
    setOption([])
    setOptiondata([])
    setOptionsBankDeposit("")
    setSelectBankDeposit({})
    setModalDeposit(true);
  }

  // ถอน


  const submitAddWithdraw = (e) => {
    e.preventDefault();
    //console.log("submitAddDeposit:")

    // { id, phonenumber, name, userId };

    // //console.log("optiondata:", optionsdata)
    //console.log("type: deposit")
    //console.log("userBankId:", selectBankDeposit)
    //console.log("userId:", parseFormattedData(optionsdata).userId)
    //console.log("amount:", depositAmount)
    //console.log("remark:", depositRemark)
    //console.log("bankserviceId:", selectBankservicedeposit)
    //console.log("time:", datetimePickerDeposit)

    axios.post(`${API}/v2/bankdepositwithdrawwait`, {
      type: "withdraw",
      userBankId: parseInt(selectBankDeposit),
      userId: parseFormattedData(optionsdata).userId,
      amount: parseInt(depositAmount),
      remark: depositRemark,
      bankserviceId: parseInt(selectBankservicedeposit),
      // time: `${datetimePickerDeposit}:00Z` // ISO-8601 DateTime
      time: `${adjustTimeZone(datetimePickerDeposit, 0)}Z` // Adjust to -7 hours
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
      .then(response => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "รายการสำเร็จ"
        });
        setModalWithdraw(false)
        getbankdepositwithdrawwait();
        getbankdepositwithdraw(page)
        // getBankservice();
      })
      .catch(error => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "รายการไม่สำเร็จ"
        });
      });
  }

  const createWithdrawHandle = () => {
    getBankservice();
    setSelectedOption(null)
    setDataAddDeposit({});
    setDepositAmount(0);
    setDepositRemark("");
    setDatetimePickerDeposit("");
    setOption([])
    setOptiondata([])
    setOptionsBankDeposit("")
    setSelectBankDeposit({})
    setModalWithdraw(true);
  }
  const [selectdepositDuplicate, setSelectDepositDuplicate] = useState([])
  const [selectdepositDuplicate2, setSelectDepositDuplicate2] = useState(null)

  const [depositDuplicateData, setdepositDuplicateData] = useState([]);
  const [dataData, setdataData] = useState([]);
  const [selectedOptionDuplicate, setSelectedOptionDuplicate] = useState('1');

  const handleOptionChangeDuplicate = (event) => {

    if (!depositDuplicateData) {
      if (event.target.value === '2') {
        setSelectedOptionDuplicate(event.target.value);
      }
    } else {
      setSelectedOptionDuplicate(event.target.value);
    }
  };

  const submitAddDepositDuplicate = (e) => {
    e.preventDefault();

    const depositWaitID = dataData.depositWithdrawId;
    if (selectedOptionDuplicate === '1') {
      if (depositDuplicateData) {
        if (selectedOptionDuplicate === '1') {
          console.log('selectdepositDuplicate2:', selectdepositDuplicate2)
          const dataselect = JSON.parse(selectdepositDuplicate2);
          console.log('dataselect:', dataselect)

          axios.patch(`${API}/v2/bankdepositwithdrawwait/setuser-admin-deposit/${depositWaitID}`, {
            userId: dataselect.userId,
            userBankId: dataselect.id
          }, {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          })
            .then(response => {

              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "รายการสำเร็จ"
              });

              setModalDepositSelectUser(false)
              getbankdepositwithdrawwait();
              getbankdepositwithdraw(page)
            })
            .catch(error => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "ผิดพลาด",
                showConfirmButton: false,
                timer: 1500
              });
            });
        }

      }
    } else {
      //   console.log("submitAddDepositDuplicate:", {
      //   type: "deposit",
      //   userBankId: parseInt(selectBankDeposit),
      //   userId: parseFormattedData(optionsdata).userId,
      //   amount: parseInt(depositAmount),
      //   remark: depositRemark,
      //   bankserviceId: parseInt(selectBankservicedeposit),
      //   time: `${datetimePickerDeposit}:00Z`, // ISO-8601 DateTime
      //   depositWaitID: dataData.depositWithdrawId
      // })

      const bodyapi = {
        depositWaitID: depositWaitID,
        userId: parseFormattedData(optionsdata).userId,
        userBankId: parseInt(selectBankDeposit)
      }
      // console.log('bodyapi:', bodyapi)

      axios.patch(`${API}/v2/bankdepositwithdrawwait/setuser-admin-deposit/${bodyapi.depositWaitID}`, {
        userId: parseFormattedData(optionsdata).userId,
        userBankId: parseInt(selectBankDeposit)
      }, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      })
        .then(response => {

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "รายการสำเร็จ"
          });

          setModalDepositSelectUser(false)
          getbankdepositwithdrawwait();
          getbankdepositwithdraw(page)
        })
        .catch(error => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "ผิดพลาด",
            showConfirmButton: false,
            timer: 1500
          });
        });
    }


    // const bodyapi = {
    //   depositWaitID: depositWaitID,
    //   userId: userData.userId,
    //   parseFormattedData(optionsdata).userId
    //   userBankId: userData.id
    // }


    // axios.patch(`${API}/v2/bankdepositwithdrawwait/setuser-admin-deposit/${bodyapi.depositWaitID}`, {
    //   userId: parseFormattedData(optionsdata).userId,
    //   userBankId: parseInt(selectBankDeposit)
    // }, {
    //   headers: {
    //     "Authorization": `Bearer ${accessToken}`
    //   }
    // })
    //   .then(response => {

    //     const Toast = Swal.mixin({
    //       toast: true,
    //       position: "top-end",
    //       showConfirmButton: false,
    //       timer: 1000,
    //       timerProgressBar: true,
    //       didOpen: (toast) => {
    //         toast.onmouseenter = Swal.stopTimer;
    //         toast.onmouseleave = Swal.resumeTimer;
    //       }
    //     });
    //     Toast.fire({
    //       icon: "success",
    //       title: "รายการสำเร็จ"
    //     });

    //     setModalDepositSelectUser(false)
    //     getbankdepositwithdrawwait();
    //     getbankdepositwithdraw(page)
    //   })
    //   .catch(error => {
    //     Swal.fire({
    //       position: "center",
    //       icon: "error",
    //       title: "ผิดพลาด",
    //       showConfirmButton: false,
    //       timer: 1500
    //     });
    //   });


  }

  const handleSelectUser = (depositDuplicate, data) => {

    if (!depositDuplicate) {
      setSelectedOptionDuplicate('2')
    } else {
      setSelectedOptionDuplicate('1')
    }
    setdepositDuplicateData(depositDuplicate);
    setdataData(data);
    // console.log(data)
    // depositDuplicate
    // data
    // แปลงข้อมูลเป็น JSON object
    /*
    {
    "depositWithdrawId": 4160,
    "depositWithdrawtype": "deposit",
    "depositWithdrawstatus": 8,
    "depositWithdrawrefCode": "",
    "depositduplicateDeposit": "[{\"userId\":\"api99xbetg6p0z3\",\"id\":2154,\"uuid\":2109,\"bankName\":\"scb\",\"accountName\":\"นางสาว สุนา ขุนทอง\",\"accountNumber\":\"6924163017\",\"status\":1},{\"userId\":\"api99xbet5846gw\",\"id\":2255,\"uuid\":2210,\"bankName\":\"scb\",\"accountName\":\"นาย ชัยยะฤทธิ์ เปี่ยมผล\",\"accountNumber\":\"1704143017\",\"status\":1}]",
    "depositWithdrawuserId": null,
    "depositWithdrawuserBankId": null,
    "depositWithdrawbankserviceId": 15,
    "depositWithdrawremark": "\"รับโอนจาก SCB x3017\"",
    "depositWithdrawapproveBy": null,
    "depositWithdrawwebRef": "",
    "depositWithdrawlogsAgent": null,
    "depositamount": 100,
    "depositWithdrawTime": "2024-09-24T07:21:46.000Z",
    "depositWithdrawstatusType": "auto",
    "withdrawRefCode": null,
    "afterBalance": 0,
    "beforeBalance": 0,
    "userid": null,
    "userbankAccountName": null,
    "userbankAccountNumber": null,
    "userbankBankName": null,
    "bankserviceAccountName": "นางสาว สุนันทา สระแก้ว",
    "bankserviceAccountNo": "6445007401",
    "bankserviceBankName": "scb",
    "staffId": null,
    "staffName": null,
    "depositcreatedAt": "2024-09-24 07:21:46",
    "depositupdatedAt": "2024-09-24 10:03:31"
}
    */
    try {

      const users = JSON.parse(depositDuplicate);
      const depositWaitID = data.depositWithdrawId;
      // สร้างตัวเลือกผู้ใช้
      const options = users.map((user, index) => {
        return {
          id: user.userId,
          text: `${user.accountName} (${user.bankName}) - ${user.accountNumber}`,
          value: JSON.stringify(user)
          // value:useruserId.
        };
      });

      setSelectDepositDuplicate(options);
      if (options.length > 0) {
        setSelectDepositDuplicate2(options[0].value); // Set the first value as default
      }
      setDepositAmount(data.depositamount)
      setModalDepositSelectUser(true)
      // แสดง SweetAlert ให้เลือกผู้ใช้
      // Swal.fire({
      //   title: 'เลือกผู้ใช้',
      //   input: 'select',
      //   inputOptions: options.reduce((obj, user) => {
      //     obj[user.value] = user.text;
      //     return obj;
      //   }, {}),
      //   inputPlaceholder: 'เลือกรายชื่อผู้ใช้',
      //   showCancelButton: true,
      //   inputValidator: (value) => {
      //     return new Promise((resolve) => {
      //       if (value) {
      //         // ถ้ามีการเลือก user ให้เชื่อมต่อ API ที่คุณต้องการ
      //         // connectToApi(value);
      //         const userData = JSON.parse(value);
      //         const bodyapi = {
      //           depositWaitID: depositWaitID,
      //           userId: userData.userId,
      //           userBankId: userData.id
      //         }
      //         // /v2/bankdepositwithdrawwait/setuser-admin-deposit/:id


      //         console.log("depositWaitID:", depositWaitID)
      //         console.log("value:", userData)
      //         console.log("bodyapi:", bodyapi)
      //         console.log("Bearer:", {
      //           "Authorization": `Bearer ${accessToken}`
      //         })


      //         axios.patch(`${API}/v2/bankdepositwithdrawwait/setuser-admin-deposit/${bodyapi.depositWaitID}`, {
      //           userId: userData.userId,
      //           userBankId: userData.id
      //         }, {
      //           headers: {
      //             "Authorization": `Bearer ${accessToken}`
      //           }
      //         })
      //           .then(response => {

      //             const Toast = Swal.mixin({
      //               toast: true,
      //               position: "top-end",
      //               showConfirmButton: false,
      //               timer: 1000,
      //               timerProgressBar: true,
      //               didOpen: (toast) => {
      //                 toast.onmouseenter = Swal.stopTimer;
      //                 toast.onmouseleave = Swal.resumeTimer;
      //               }
      //             });
      //             Toast.fire({
      //               icon: "success",
      //               title: "รายการสำเร็จ"
      //             });

      //             getbankdepositwithdrawwait();
      //             getbankdepositwithdraw(page)
      //           })
      //           .catch(error => {
      //             Swal.fire({
      //               position: "center",
      //               icon: "error",
      //               title: "ผิดพลาด",
      //               showConfirmButton: false,
      //               timer: 1500
      //             });
      //           });


      //         resolve();
      //       } else {
      //         resolve('กรุณาเลือกผู้ใช้!');
      //       }
      //     });
      //   }
      // });
    } catch (e) {
      setDepositAmount(data.depositamount)
      setModalDepositSelectUser(true)

      setSelectDepositDuplicate([]);

    }
  };

  if (!isLoading)
    return (
      <div >
        <div className="py-0">
          <div className="flex mt-[4.7rem] md:mt-0">
            <div className="content">
              <div className="grid grid-cols-12 gap-3 bg-white rounded p-5 mt-5">
                <div className="col-span-12 sm:col-span-6">
                  <button
                    className="btn btn-lg bg-green-600 text-white w-full shadow font-display uppercase font-bold p-12 text-xl"
                    type="button"
                    onClick={createDepositHandle}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="mr-2 mt-1 iconify iconify--vaadin"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="m8 16l-2-3h1v-2h2v2h1zm7-15v8H1V1zm1-1H0v10h16z"
                      />
                      <path
                        fill="currentColor"
                        d="M8 2a3 3 0 1 1 0 6h5V7h1V3h-1V2zM5 5a3 3 0 0 1-3-3H3v1H2v4h1v1h5a3 3 0 0 1-3-3"
                      />
                    </svg>{" "}
                    แจ้งฝากเงิน
                  </button>
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <button
                    className="btn btn-danger bg-red-500 w-full shadow font-display uppercase font-bold p-12 text-xl"
                    type="button"
                    onClick={() => createWithdrawHandle()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="mr-2 mb-1 iconify iconify--vaadin"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="m8 0l2 3H9v2H7V3H6zm7 7v8H1V7zm1-1H0v10h16z"
                      />
                      <path
                        fill="currentColor"
                        d="M8 8a3 3 0 1 1 0 6h5v-1h1V9h-1V8zm-3 3a3 3 0 0 1 3-3H3v1H2v4h1v1h5a3 3 0 0 1-3-3"
                      />
                    </svg>{" "}
                    แจ้งถอนเงิน
                  </button>
                </div>
              </div>

              <div className="bg-white rounded p-5 mt-5">
                <div className="pb-3 flex gap-3">
                  <a
                    href="/bank"
                    className="inline-flex align-middle items-center btn bg-gray-700 text-white p-4 px-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-settings pr-1 pr-1"
                    >
                      <circle cx={12} cy={12} r={3} />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    ตั้งค่าบัญชีธนาคาร
                  </a>
                  {/* <button
                    className="inline-flex align-middle items-center btn bg-yellow-400 text-gray-700 py-1 px-2 btn btn-md inline-flex align-middle items-center btn bg-yellow-400 text-gray-700 py-1 px-2"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="mr-1 iconify iconify--mdi"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M3 6h18v12H3zm9 3a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3M7 8a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2v-4a2 2 0 0 1-2-2z"
                      />
                    </svg>{" "}
                    ยอดเงินเอเย่นต์
                  </button> */}
                </div>
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12 sm:col-span-6">
                    <div>
                      <div className="font-semibold font-display text-lg border-b-2 pb-2 mb-4">
                        บัญชีฝากเงิน
                      </div>

                      {/* เริ่ม Card */}
                      {bankservice && bankservice.map((item, index) => {
                        if (item.accountType?.toUpperCase() === "BOTH" || item.accountType?.toUpperCase() === "DEPOSIT") {
                          return (
                            <div
                              key={index}
                              className={`relative border-l-8 mb-6 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${item.status === 1 ? 'border-green-500 bg-white' : 'border-gray-500 bg-gray-100'
                                }`}
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  {item.status === 1 ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20px"
                                      height="20px"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-play text-green-600"
                                    >
                                      <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                  ) : (
                                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                                  )}
                                  <div
                                    className="flex-shrink-0 flex justify-center items-center shadow-lg rounded-full w-10 h-10"
                                    style={{
                                      backgroundColor: bankColor[item.bankName?.toUpperCase()],
                                    }}
                                  >
                                    <img
                                      className="rounded w-6 object-contain"
                                      src={bankLabelImage[item.bankName?.toUpperCase()]}
                                      alt={item.bankName}
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    {item.bankName?.toUpperCase() === "GATEWAY" ? (
                                      <div>
                                        <span className="text-sm xl:text-base font-medium">
                                          Payment Gateway
                                        </span>
                                        <span className="text-xs text-gray-600">
                                          {item.accountName}
                                        </span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span className="text-sm xl:text-base font-medium">
                                          {item.accountNo}
                                        </span>
                                        <span className="text-xs text-gray-600">
                                          {item.accountName}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between pt-4">
                                <h3 className="text-xl font-bold number-display">
                                  {item.balance.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </h3>
                                <div className="flex items-center space-x-2">
                                  {item.status === 1 && (
                                    <span className="text-xs text-gray-500">
                                      อัพเดทเมื่อ: {new Date(new Date(item.updatedAt).getTime() - (7 * 60 * 60 * 1000)).toLocaleDateString('th-TH', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                      })} เวลา {new Date(new Date(item.updatedAt).getTime() - (7 * 60 * 60 * 1000)).toLocaleTimeString('th-TH', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })} น.
                                    </span>

                                  )}
                                  <a
                                    href="/bank"
                                    className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16px"
                                      height="16px"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-settings w-4 h-4"
                                    >
                                      <circle cx={12} cy={12} r={3} />
                                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                      {/* จบ Card */}
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-6">
                    <div>
                      <div className="font-semibold font-display text-lg border-b-2 pb-2 mb-4">
                        บัญชีถอนเงิน
                      </div>

                      {bankservice && bankservice.map((item, index) => {
                        if (item.accountType?.toUpperCase() === "BOTH" || item.accountType?.toUpperCase() === "WITHDRAW") {
                          return (
                            <div
                              key={index}
                              className={`relative border-l-8 mb-6 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${item.status === 1 ? 'border-green-500 bg-white' : 'border-gray-500 bg-gray-100'
                                }`}
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  {item.status === 1 ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20px"
                                      height="20px"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-play text-green-600"
                                    >
                                      <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                  ) : (
                                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                                  )}
                                  <div
                                    className="flex-shrink-0 flex justify-center items-center shadow-lg rounded-full w-10 h-10"
                                    style={{
                                      backgroundColor: bankColor[item.bankName?.toUpperCase()],
                                    }}
                                  >
                                    <img
                                      className="rounded w-6 object-contain"
                                      src={bankLabelImage[item.bankName?.toUpperCase()]}
                                      alt={item.bankName}
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    {item.bankName?.toUpperCase() === "GATEWAY" ? (
                                      <div>
                                        <span className="text-sm xl:text-base font-medium">
                                          Payment Gateway
                                        </span>
                                        <span className="text-xs text-gray-600">
                                          {item.accountName}
                                        </span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span className="text-sm xl:text-base font-medium">
                                          {item.accountNo}
                                        </span>
                                        <span className="text-xs text-gray-600">
                                          {item.accountName}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between pt-4">
                                <h3 className="text-xl font-bold number-display">
                                  {item.balance.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </h3>
                                <div className="flex items-center space-x-2">
                                  {item.status === 1 && (
                                    <span className="text-xs text-gray-500">
                                      อัพเดทเมื่อ: {new Date(new Date(item.updatedAt).getTime() - (7 * 60 * 60 * 1000)).toLocaleDateString('th-TH', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                      })} เวลา {new Date(new Date(item.updatedAt).getTime() - (7 * 60 * 60 * 1000)).toLocaleTimeString('th-TH', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })} น.
                                    </span>

                                  )}
                                  <a
                                    href="/bank"
                                    className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16px"
                                      height="16px"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-settings w-4 h-4"
                                    >
                                      <circle cx={12} cy={12} r={3} />
                                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>

              </div>
              <div className="grid grid-cols-12 mt-5">
                <div className="col-span-12 sm:col-span-12">
                  <div className="box px-5 pb-5">
                    <div className="flex flex-col sm:flex-row items-center pt-5 pb-3 mb-3 border-b-2 border-primary">
                      <h2 className="text-lg font-display mr-auto flex items-center text-neutral-600 uppercase font-bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16px"
                          height="16px"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-loader w-6 h-6 mr-3 text-blue-800 inline w-6 h-6 mr-3 text-blue-800 inline"
                        >
                          <line x1={12} y1={2} x2={12} y2={6} />
                          <line x1={12} y1={18} x2={12} y2={22} />
                          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                          <line x1={2} y1={12} x2={6} y2={12} />
                          <line x1={18} y1={12} x2={22} y2={12} />
                          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                        </svg>
                      </h2>
                      <h2 className="uppercase font-bold">รอดำเนินการ</h2>
                      <div className="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                        <button className="btn btn-primary w-8 h-8 rounded ml-2" onClick={() => refreshData()}>
                          <div className="relative flex flex-col items-center group cursor-pointer block text-gray-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16px"
                              height="16px"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-refresh-cw text-white px-0.5 text-white px-0.5"
                            >
                              <polyline points="23 4 23 10 17 10" />
                              <polyline points="1 20 1 14 7 14" />
                              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                            </svg>
                            <div className="bottom-0 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                              <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                รีเฟรช
                              </span>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <div className="grid grid-cols-12">
                        <div className="intro-y box col-span-12 sm:col-span-12">
                          <div className="overflow-x-auto">
                            <table className="text-xs w-full border">
                              <thead>
                                <tr className="bg-gray-700 dark:bg-dark-1 text-white px-half font-display text-sm font-semibold">
                                  <th className="py-1 p-2 whitespace-nowrap">#</th>
                                  <th className="py-1 p-2 whitespace-nowrap">
                                    ช่องทาง
                                  </th>
                                  <th className="py-1 p-2 whitespace-nowrap text-center">
                                    ประเภท
                                  </th>
                                  <th className="py-1 p-2 whitespace-nowrap text-right">
                                    จำนวนเงิน
                                  </th>
                                  <th className="py-1 p-2 whitespace-nowrap text-center">
                                    เวลารายการ
                                  </th>
                                  <th className="py-1 px-2 whitespace-nowrap text-left">
                                    ระยะเวลาดำเนินการ
                                  </th>
                                  <th className="py-1 p-2 whitespace-nowrap text-center">
                                    ตรวจสอบ
                                  </th>
                                  <th className="py-1 p-2 whitespace-nowrap text-center">
                                    จัดการ
                                  </th>
                                  <th className="py-1 p-2 whitespace-nowrap text-left">
                                    ยูสเซอร์
                                  </th>
                                  <th className="py-1 p-2 whitespace-nowrap text-left">
                                    ชื่อลูกค้า
                                  </th>
                                  <th className="py-1 p-2 whitespace-nowrap text-left">
                                    บัญชีเว็บ
                                  </th>
                                  <th className="py-1 p-2 whitespace-nowrap text-left">
                                    สถานะ
                                  </th>
                                  <th className="py-1 p-2 whitespace-nowrap text-left">
                                    หมายเหตุ
                                  </th>
                                </tr>
                              </thead>


                              <tbody>

                                {/* {bankdepositwithdrawwaitData.length !== 0 ? bankdepositwithdrawwaitData.map((data, key) => {
                                  //console.log('data:', data)
                                  return (
                                    <tr className={data.depositWithdrawtype === "deposit" ? "bg-green-50 p-2 hover:bg-yellow-100 px-half border-b border-gray-300" : "bg-red-50 p-2 hover:bg-yellow-100 px-half border-b border-gray-300"}>

                                      <td className="p-2 text-center w-10">
                                        {key + 1} <br /><span className="text-mobile text-gray-500">#{data.depositWithdrawId}</span>
                                      </td>
                                      <td className="p-2 text-center">
                                        <div className="w-28">
                                          <div className="flex items-center gap-1 ml-3 relative">
                                            <div className="w-4 h-4">
                                              <img
                                                src="data:image/png;base64,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"
                                                alt="Staff"
                                              />
                                            </div>
                                            <span className="flex items-center bg-gray-700 text-white px-1.5 py-0.5 text-xs rounded-md before:text-gray-700 before:absolute before:left-3.5">
                                              Staff
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-2 text-center w-20">
                                        <div className="w-20">
                                          <span className={data.depositWithdrawtype === "deposit" ? "bg-green-600 text-white rounded-full px-2.5 py-1 text-xs" : "bg-red-600 text-white rounded-full px-2.5 py-1 text-xs"}  >
                                            {data.depositWithdrawtype === "deposit" ? "ฝาก" : "ถอน"}
                                          </span>

                                        </div>
                                      </td>
                                      <td className="p-2 text-right number-display font-semibold">1</td>
                                      <td className="p-2 text-center number-display">
                                        <div className="w-24">
                                          <span className="block">
                                            {data.depositcreatedAt}
                                          </span>
                                          <span className="block text-xs font-light">({formatTimeDifference(new Date(data.depositcreatedAt))}ที่แล้ว)</span>
                                        </div>
                                      </td>
                                      <td className="p-2 text-center w-[50px]">{parseInt(data.depositWithdrawstatus) === 2 ? calculateTimeDifference(new Date(data.depositcreatedAt), new Date(data.depositupdatedAt)) : null}</td>
                                      <td className="p-2 text-right">
                                        <div className="flex justify-center">
                                          <div className="flex items-center">
                                            <span className="px-2 py-0.5 rounded text-green-600">
                                              <div className="text-center flex items-center">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16px"
                                                  height="16px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth={2}
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  className="feather feather-check-circle w-3 h-3 inline mr-1 w-3 h-3 inline mr-1"
                                                >
                                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                  <polyline points="22 4 12 14.01 9 11.01" />
                                                </svg>{" "}
                                                miler
                                              </div>
                                            </span>
                                          </div>

                                        </div>

                                      </td>
                                      <td className="p-2 text-right number-display">

                                        <div className="min-w-max">
                                          <div className="flex justify-around">
                                            <button
                                              className="text-blue-600 hover:bg-blue-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max btn btn-md text-blue-600 hover:bg-blue-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max"
                                              type="button"
                                            >
                                              <div className="flex">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16px"
                                                  height="16px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth={2}
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  className="feather feather-user-check w-3 w-3"
                                                  name="user-check"
                                                >
                                                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                  <circle cx="8.5" cy={7} r={4} />
                                                  <polyline points="17 11 19 13 23 9" />
                                                </svg>
                                                <div className="relative flex flex-col items-center group cursor-pointer">
                                                  <svg
                                                    className="w-4 h-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <div className="left-3 -top-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                    <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                      ปรับสถานะเป็นสำเร็จแต่จะไม่ถอนเงิน
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                              <span className="block text-xs font-semibold font-display">
                                                โอนมือ
                                              </span>

                                            </button>
                                            <button
                                              className="text-green-600 hover:bg-green-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md text-green-600 hover:bg-green-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1"
                                              type="button"
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16px"
                                                height="16px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-check w-3 w-3"
                                                name="check-line"
                                              >
                                                <polyline points="20 6 9 17 4 12" />
                                              </svg>
                                              <span className="block text-xs font-semibold font-display">
                                                อนุมัติ
                                              </span>

                                            </button>
                                            <button
                                              className="text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1"
                                              type="button"
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16px"
                                                height="16px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-x w-3 w-3"
                                              >
                                                <line x1={18} y1={6} x2={6} y2={18} />
                                                <line x1={6} y1={6} x2={18} y2={18} />
                                              </svg>
                                              <span className="text-xs font-semibold font-display">ปฏิเสธ</span>

                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-2">
                                        <span className="flex items-center relative group">
                                          <a
                                            href="/member/edit/1151448#general"
                                            className="text-blue-500 underline"
                                          >
                                            {data.depositWithdrawuserId}
                                          </a>

                                        </span>

                                      </td>
                                      <td className="p-2 text-center">

                                        <div>
                                          <div className="flex items-center text-left pl-1 w-48 relative">
                                            <div
                                              className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                              style={{ backgroundColor: `${bankColor[data.userbankBankName?.toUpperCase()]}` }}
                                            >
                                              <img
                                                className="rounded w-7 h-7 object-contain"
                                                src={bankLabelImage[data.userbankBankName?.toUpperCase()]}
                                                alt={data.userbankBankName?.toUpperCase()}
                                              />
                                            </div>
                                            <div className="pl-2">
                                              <div className="flex items-center">{data.userbankAccountNumber} </div>
                                              <div>{data.userbankAccountName}</div>
                                            </div>
                                          </div>

                                        </div>
                                      </td>
                                      <td className="p-2 text-center">
                                        <div className="flex items-center">
                                          <div className="w-6"></div>
                                          <div className="flex items-center text-left pl-1 w-48 relative">
                                            <div
                                              className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                              style={{ backgroundColor: `${bankColor[data.bankserviceBankName?.toUpperCase()]}` }}
                                            >
                                              <img
                                                className="rounded w-7 h-7 object-contain"
                                                src={bankLabelImage[data.bankserviceBankName?.toUpperCase()]}
                                                alt={data.bankserviceBankName?.toUpperCase()}
                                              />
                                            </div>
                                            <div className="pl-2">
                                              <div className="flex items-center">{data.bankserviceBankName} </div>
                                              <div>{data.bankserviceAccountName}</div>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-2 text-center">
                                        <div className="flex items-center">
                                          <span className="bg-slate-200 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center">
                                            รอดำเนินการ
                                          </span>
                                        </div>
                                      </td>
                                      <td className="p-2">
                                        <div className="flex">
                                          <div className="w-60 flex flex-col">

                                            <span className="text-xs text-gray-500">
                                              หมายเหตุ: {data.depositWithdrawremark}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                }) : null} */}

                                {/* ฝาก-ถอน */}
                                {bankdepositwithdrawwaitData.length !== 0 ? bankdepositwithdrawwaitData.map((data, key) => {
                                  // //console.log('data:', data)
                                  if (data.depositWithdrawtype === "deposit") {
                                    return (
                                      <tr className="bg-green-50 p-2 hover:bg-yellow-100 px-half border-b border-gray-300">
                                        <td className="p-2 text-center w-10">
                                          {key + 1}{" "}
                                          <span className="text-mobile text-gray-500">
                                            #{data.depositWithdrawId}
                                          </span>
                                        </td>
                                        <td className="p-2 text-center">
                                          <div className="w-28">
                                            <div className="flex items-center gap-1 ml-3 relative">
                                              <div className="w-4 h-4">
                                                <img
                                                  src="data:image/png;base64,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"
                                                  alt="Staff"
                                                />
                                              </div>
                                              <span className="flex items-center bg-gray-700 text-white px-1.5 py-0.5 text-xs rounded-md  before:text-gray-700 before:absolute before:left-3.5">
                                                {data.depositWithdrawstatusType === "auto" ? "Auto" : "Staff"}
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="p-2 text-center w-20">
                                          <div className="w-20">
                                            <span className="bg-green-600 text-white rounded-full px-2.5 py-1 text-xs">
                                              ฝาก
                                            </span>
                                          </div>
                                        </td>
                                        <td className="p-2 text-right number-display font-semibold">
                                          {formatCurrency(data.depositamount)}
                                        </td>
                                        <td className="p-2 text-center number-display">
                                          <div className="w-24">
                                            <span className="block">

                                              {/* {data.depositcreatedAt === null ? getCurrentTimeInUTC7(data.logcreditCreatedAt) : getCurrentTimeInUTC7(data.depositcreatedAt)} */}
                                              {/* {formatDateTime(data.depositWithdrawTime, data.depositWithdrawstatus !== 8 ? data.depositduplicateDeposit ? 7 : 0 : 7)} */}
                                              {formatDateTime(data.depositWithdrawTime, 7)}

                                              {/* {data.depositWithdrawTime} */}
                                              {/* {getCurrentTimeInUTC7(data.depositcreatedAt)} */}
                                              {/* {data.depositcreatedAt} */}
                                              {/* <span className="pl-1 items-center font-semibold">
                                                00:26
                                              </span> */}
                                            </span>
                                            <span className="block text-xs font-light">
                                              ({formatTimeDifference(new Date(data.depositcreatedAt))}ที่แล้ว)
                                            </span>
                                          </div>
                                        </td>
                                        <td className="p-2 text-center w-[50px]" >{parseInt(data.depositWithdrawstatus) === 2 ? calculateTimeDifference(new Date(data.depositcreatedAt), new Date(data.depositupdatedAt)) : null}</td>

                                        {data.depositWithdrawstatus === 2 ?
                                          <td className="p-2 text-right">
                                            <div className="flex justify-center">
                                              <div className="flex items-center">
                                                <span className="px-2 py-0.5 rounded text-green-600">
                                                  <div className="text-center flex items-center">
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="16px"
                                                      height="16px"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth={2}
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      className="feather feather-check-circle w-3 h-3 inline mr-1 w-3 h-3 inline mr-1"
                                                    >
                                                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                      <polyline points="22 4 12 14.01 9 11.01" />
                                                    </svg>{" "}
                                                    {data.staffName}
                                                  </div>
                                                </span>
                                              </div>
                                            </div>
                                          </td>
                                          :

                                          // ระบุยูส
                                          data.depositWithdrawstatus !== 8 ? (
                                            <td className="p-2 text-right">
                                              <div className="flex justify-center">
                                                <button
                                                  className="flex flex-col justify-center items-center py-1 btn btn-outline-pending btn btn-md flex flex-col justify-center items-center py-1 btn btn-outline-pending"
                                                  type="button"
                                                  onClick={() => adminCheckDepositManual(data)}
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-check-circle w-3 w-3"
                                                    name="check-line"
                                                  >
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                    <polyline points="22 4 12 14.01 9 11.01" />
                                                  </svg>
                                                  <span className="block text-xs text-center">
                                                    เช็ค
                                                  </span>

                                                </button>
                                              </div>
                                            </td>)
                                            : <td className="p-2 text-right">
                                              <div className="flex justify-center">
                                                -
                                              </div>
                                            </td>
                                        }
                                        {/* && data.depositWithdrawstatusType === "manual" */}
                                        {
                                          data.depositWithdrawstatusType === "manual" ? (
                                            data.depositWithdrawstatus === 2 ? (
                                              <td className="p-2 text-right number-display">
                                                <div className="min-w-max">
                                                  <div className="flex justify-around">
                                                    <button
                                                      className="text-blue-600 hover:bg-blue-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max btn btn-md"
                                                      type="button"
                                                      onClick={() => adminApproveManualDeposit(data)}
                                                    >
                                                      <div className="flex">
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="16px"
                                                          height="16px"
                                                          viewBox="0 0 24 24"
                                                          fill="none"
                                                          stroke="currentColor"
                                                          strokeWidth={2}
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          className="feather feather-user-check w-3 w-3"
                                                          name="user-check"
                                                        >
                                                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                          <circle cx="8.5" cy={7} r={4} />
                                                          <polyline points="17 11 19 13 23 9" />
                                                        </svg>
                                                        <div className="relative flex flex-col items-center group cursor-pointer">
                                                          <svg
                                                            className="w-4 h-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                          >
                                                            <path
                                                              fillRule="evenodd"
                                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                              clipRule="evenodd"
                                                            />
                                                          </svg>
                                                          <div className="left-3 -top-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                            <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                              ปรับสถานะเป็นสำเร็จแต่จะไม่ปรับเครดิต
                                                            </span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <span className="block text-xs font-semibold font-display">ฝากมือ</span>
                                                    </button>
                                                    <button
                                                      className="text-green-600 hover:bg-green-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md"
                                                      type="button"
                                                      onClick={() => adminApproveDeposit(data)}
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16px"
                                                        height="16px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-check w-3 w-3"
                                                        name="check-line"
                                                      >
                                                        <polyline points="20 6 9 17 4 12" />
                                                      </svg>
                                                      <span className="block text-xs font-semibold font-display">อนุมัติ</span>
                                                    </button>
                                                    <button
                                                      className="text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md"
                                                      type="button"
                                                      onClick={() => adminCancelDeposit(data)}
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16px"
                                                        height="16px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-x w-3 w-3"
                                                      >
                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                      </svg>
                                                      <span className="text-xs font-semibold font-display">ปฏิเสธ</span>
                                                    </button>
                                                  </div>
                                                </div>
                                              </td>
                                            ) : (
                                              <td className="p-2 text-right number-display">
                                                <div className="min-w-max">
                                                  <div className="flex justify-around">
                                                    <button
                                                      disabled
                                                      className="text-gray-600 flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max btn btn-md"
                                                      type="button"
                                                    >
                                                      <div className="flex">
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="16px"
                                                          height="16px"
                                                          viewBox="0 0 24 24"
                                                          fill="none"
                                                          stroke="currentColor"
                                                          strokeWidth={2}
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          className="feather feather-user-check w-3 w-3"
                                                          name="user-check"
                                                        >
                                                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                          <circle cx="8.5" cy={7} r={4} />
                                                          <polyline points="17 11 19 13 23 9" />
                                                        </svg>
                                                        <div className="relative flex flex-col items-center group cursor-pointer">
                                                          <svg
                                                            className="w-4 h-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                          >
                                                            <path
                                                              fillRule="evenodd"
                                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                              clipRule="evenodd"
                                                            />
                                                          </svg>
                                                          <div className="left-3 -top-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                            <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                              ปรับสถานะเป็นสำเร็จแต่จะไม่ปรับเครดิต
                                                            </span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <span className="block text-xs font-semibold font-display">ฝากมือ</span>
                                                    </button>
                                                    <button
                                                      disabled
                                                      className="text-gray-600 flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md"
                                                      type="button"
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16px"
                                                        height="16px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-check w-3 w-3"
                                                        name="check-line"
                                                      >
                                                        <polyline points="20 6 9 17 4 12" />
                                                      </svg>
                                                      <span className="block text-xs font-semibold font-display">อนุมัติ</span>
                                                    </button>
                                                    <button
                                                      className="text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md"
                                                      type="button"
                                                      onClick={() => adminCancelDeposit(data)}
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16px"
                                                        height="16px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-x w-3 w-3"
                                                      >
                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                      </svg>
                                                      <span className="text-xs font-semibold font-display">ปฏิเสธ</span>
                                                    </button>
                                                  </div>
                                                </div>
                                              </td>
                                            )
                                          )
                                            :
                                            // ระบุยูส
                                            data.depositWithdrawstatus !== 8 ? (
                                              <td className="p-2 text-center number-display">
                                                <div className="flex justify-around">
                                                  <button
                                                    className="text-blue-600 hover:bg-blue-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max btn btn-md"
                                                    type="button"
                                                    onClick={() => adminApproveManualDeposit(data)}
                                                  >
                                                    <div className="flex">
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16px"
                                                        height="16px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-user-check w-3 w-3"
                                                        name="user-check"
                                                      >
                                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                        <circle cx="8.5" cy={7} r={4} />
                                                        <polyline points="17 11 19 13 23 9" />
                                                      </svg>
                                                      <div className="relative flex flex-col items-center group cursor-pointer">
                                                        <svg
                                                          className="w-4 h-4"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 20 20"
                                                          fill="currentColor"
                                                        >
                                                          <path
                                                            fillRule="evenodd"
                                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                            clipRule="evenodd"
                                                          />
                                                        </svg>
                                                        <div className="left-3 -top-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                          <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                            ปรับสถานะเป็นสำเร็จแต่จะไม่ปรับเครดิต
                                                          </span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <span className="block text-xs font-semibold font-display">ฝากมือ</span>
                                                  </button>
                                                  <button
                                                    className="text-green-600 hover:bg-green-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md"
                                                    type="button"
                                                    onClick={() => adminApproveDeposit(data)}
                                                  >
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="16px"
                                                      height="16px"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth={2}
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      className="feather feather-check w-3 w-3"
                                                      name="check-line"
                                                    >
                                                      <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                    <span className="block text-xs font-semibold font-display">อนุมัติ</span>
                                                  </button>
                                                  <button
                                                    className="text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md"
                                                    type="button"
                                                    onClick={() => adminCancelDeposit(data)}
                                                  >
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="16px"
                                                      height="16px"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth={2}
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      className="feather feather-x w-3 w-3"
                                                    >
                                                      <line x1={18} y1={6} x2={6} y2={18} />
                                                      <line x1={6} y1={6} x2={18} y2={18} />
                                                    </svg>
                                                    <span className="text-xs font-semibold font-display">ปฏิเสธ</span>
                                                  </button>
                                                </div>
                                              </td>
                                            ) : (
                                              <td className="p-2 text-right number-display">
                                                <div className="min-w-max">
                                                  <div className="flex justify-around">
                                                    <button
                                                      disabled
                                                      className="text-gray-600 flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max btn btn-md"
                                                      type="button"
                                                    >
                                                      <div className="flex">
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="16px"
                                                          height="16px"
                                                          viewBox="0 0 24 24"
                                                          fill="none"
                                                          stroke="currentColor"
                                                          strokeWidth={2}
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          className="feather feather-user-check w-3 w-3"
                                                          name="user-check"
                                                        >
                                                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                          <circle cx="8.5" cy={7} r={4} />
                                                          <polyline points="17 11 19 13 23 9" />
                                                        </svg>
                                                        <div className="relative flex flex-col items-center group cursor-pointer">
                                                          <svg
                                                            className="w-4 h-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                          >
                                                            <path
                                                              fillRule="evenodd"
                                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                              clipRule="evenodd"
                                                            />
                                                          </svg>
                                                          <div className="left-3 -top-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                            <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                              ปรับสถานะเป็นสำเร็จแต่จะไม่ปรับเครดิต
                                                            </span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <span className="block text-xs font-semibold font-display">ฝากมือ</span>
                                                    </button>
                                                    <button
                                                      disabled
                                                      className="text-gray-600 flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md"
                                                      type="button"
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16px"
                                                        height="16px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-check w-3 w-3"
                                                        name="check-line"
                                                      >
                                                        <polyline points="20 6 9 17 4 12" />
                                                      </svg>
                                                      <span className="block text-xs font-semibold font-display">อนุมัติ</span>
                                                    </button>
                                                    <button
                                                      className="text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md"
                                                      type="button"
                                                      onClick={() => adminCancelDeposit(data)}
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16px"
                                                        height="16px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-x w-3 w-3"
                                                      >
                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                      </svg>
                                                      <span className="text-xs font-semibold font-display">ปฏิเสธ</span>
                                                    </button>
                                                  </div>
                                                </div>
                                              </td>
                                            )
                                        }
                                        {data.depositWithdrawstatus === 8 ? (
                                          <td className="p-2 text-center">
                                            <div className="flex justify-center">
                                              <button
                                                className="flex items-center space-x-2 py-1 px-3 btn btn-outline-pending"
                                                type="button"
                                                onClick={() => {
                                                  console.log("wait:", JSON.parse(data.depositduplicateDeposit));
                                                  console.log("wait:", data);
                                                  handleSelectUser(data.depositduplicateDeposit, data);
                                                }}
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16px"
                                                  height="16px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth={2}
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  className="feather feather-user-plus"
                                                >
                                                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                  <circle cx="8.5" cy="7" r="4" />
                                                  <line x1="20" y1="8" x2="20" y2="14" />
                                                  <line x1="23" y1="11" x2="17" y2="11" />
                                                </svg>
                                                <span className="block text-xs text-center">ระบุยูส</span>
                                              </button>

                                            </div>
                                          </td>
                                        ) : (
                                          <td className="p-2">
                                            <span className="flex items-center relative group">
                                              <a
                                                href={`/member/edit/${data.userid}#general`}
                                                className="text-blue-500 underline"
                                              >
                                                {data.depositWithdrawuserId}
                                              </a>

                                            </span>

                                          </td>)}


                                        {data.depositWithdrawstatus === 8 ? (
                                          <td className="p-2 text-center">
                                            <div className="flex items-center">
                                              <div className="w-6"></div>
                                              <div className="flex items-center text-left pl-1 w-48 relative">
                                                -
                                              </div>
                                            </div>
                                          </td>
                                        ) : (

                                          <td className="p-2 text-center">

                                            <div>
                                              <div className="flex items-center text-left pl-1 w-48 relative">
                                                <div
                                                  className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"

                                                  style={{ backgroundColor: `${bankColor[data?.userbankBankName?.toUpperCase()]}` }}
                                                >
                                                  <img
                                                    className="rounded w-7 h-7 object-contain"
                                                    src={bankLabelImage[data?.userbankBankName?.toUpperCase()]}
                                                    alt={data?.userbankBankName?.toUpperCase()}
                                                  />
                                                </div>
                                                <div className="pl-2">
                                                  <div className="flex items-center">
                                                    {data.userbankAccountNumber}
                                                  </div>
                                                  <div>{data.userbankAccountName}</div>
                                                </div>
                                              </div>

                                            </div>
                                          </td>
                                        )}

                                        {/* {data.depositWithdrawstatus === 8 ? (
                                          <td className="p-2 text-center">
                                            <div className="flex items-center">
                                              <div className="w-6"></div>
                                              <div className="flex items-center text-left pl-1 w-48 relative">
                                                -
                                              </div>
                                            </div>
                                          </td>
                                        ) : ( */}
                                        <td className="p-2 text-center">
                                          <div className="flex items-center">
                                            <div className="w-6"></div>
                                            <div className="flex items-center text-left pl-1 w-48 relative">
                                              <div
                                                className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                                style={{ backgroundColor: `${bankColor[data?.bankserviceBankName?.toUpperCase()]}` }}
                                              >
                                                <img
                                                  className="rounded w-7 h-7 object-contain"
                                                  src={bankLabelImage[data?.bankserviceBankName?.toUpperCase()]}
                                                  alt={data?.bankserviceBankName?.toUpperCase()}
                                                />
                                              </div>
                                              <div className="pl-2">
                                                <div className="flex items-center">
                                                  {data.bankserviceAccountNo}
                                                </div>
                                                <div>{data.bankserviceAccountName}</div>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        {/*)} */}

                                        {/* <td className="p-2 text-center">

                                          <div>
                                            <div className="flex items-center text-left pl-1 w-48 relative">
                                              <div
                                                className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"

                                                style={{ backgroundColor: `${bankColor[data?.userbankBankName?.toUpperCase()]}` }}
                                              >
                                                <img
                                                  className="rounded w-7 h-7 object-contain"
                                                  src={bankLabelImage[data?.userbankBankName?.toUpperCase()]}
                                                  alt={data?.userbankBankName?.toUpperCase()}
                                                />
                                              </div>
                                              <div className="pl-2">
                                                <div className="flex items-center">
                                                  {data.userbankAccountNumber}
                                                </div>
                                                <div>{data.userbankAccountName}</div>
                                              </div>
                                            </div>

                                          </div>
                                        </td> */}
                                        {/* <td className="p-2 text-center">
                                          <div className="flex items-center">
                                            <div className="w-6"></div>
                                            <div className="flex items-center text-left pl-1 w-48 relative">
                                              <div
                                                className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                                style={{ backgroundColor: `${bankColor[data?.bankserviceBankName?.toUpperCase()]}` }}
                                              >
                                                <img
                                                  className="rounded w-7 h-7 object-contain"
                                                  src={bankLabelImage[data?.bankserviceBankName?.toUpperCase()]}
                                                  alt={data?.bankserviceBankName?.toUpperCase()}
                                                />
                                              </div>
                                              <div className="pl-2">
                                                <div className="flex items-center">
                                                  {data.bankserviceAccountNo}
                                                </div>
                                                <div>{data.bankserviceAccountName}</div>
                                              </div>
                                            </div>
                                          </div>
                                        </td> */}
                                        <td className="p-2 text-center">
                                          <div className="flex items-center">
                                            <span className="bg-slate-200 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center">
                                              รอดำเนินการ
                                            </span>
                                          </div>
                                        </td>

                                        <td className="p-2">
                                          <div className="flex">
                                            <div className="w-60 flex flex-col">

                                              <span className="text-xs text-gray-500">
                                                หมายเหตุ: {data.depositWithdrawremark}
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )
                                  } else {
                                    return (<tr className="bg-red-50 p-2 hover:bg-yellow-100 px-half border-b border-gray-300" >
                                      <td className="p-2 text-center w-10">
                                        {key + 1} <span className="text-mobile text-gray-500">#{data.depositWithdrawId}</span>
                                      </td>
                                      <td className="p-2 text-center">
                                        <div className="w-28">
                                          <div className="flex items-center gap-1 ml-3 relative">
                                            <div className="w-4 h-4">
                                              <img
                                                src="data:image/png;base64,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"
                                                alt="Staff"
                                              />
                                            </div>
                                            <span className="flex items-center bg-gray-700 text-white px-1.5 py-0.5 text-xs rounded-md before:text-gray-700 before:absolute before:left-3.5">
                                              Staff
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-2 text-center w-20">
                                        <div className="w-20">
                                          <span className="bg-red-600 text-white rounded-full px-2.5 py-1 text-xs">
                                            ถอน
                                          </span>

                                        </div>
                                      </td>
                                      <td className="p-2 text-right number-display font-semibold">{data.depositamount}</td>
                                      <td className="p-2 text-center number-display">
                                        <div className="w-24">
                                          <span className="block">
                                            {getCurrentTimeInUTC7(data.depositcreatedAt, 14)}
                                            {/* {data.depositcreatedAt} */}
                                            {/* 03/05/24{" "}
                                            <span className="pl-1 items-center font-semibold">22:38</span> */}
                                          </span>
                                          <span className="block text-xs font-light">
                                            ({formatTimeDifference(new Date(data.depositcreatedAt))}ที่แล้ว)</span>
                                        </div>
                                      </td>
                                      <td className="p-2 text-center w-[50px]">{parseInt(data.depositWithdrawstatus) === 2 ? calculateTimeDifference(new Date(data.depositcreatedAt), new Date(data.depositupdatedAt)) : null}</td>
                                      {data.depositWithdrawstatus === 2 || data.depositWithdrawstatus === 6 ?
                                        <td className="p-2 text-right">
                                          <div className="flex justify-center">
                                            <div className="flex items-center">
                                              <span className="px-2 py-0.5 rounded text-green-600">
                                                <div className="text-center flex items-center">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-check-circle w-3 h-3 inline mr-1 w-3 h-3 inline mr-1"
                                                  >
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                    <polyline points="22 4 12 14.01 9 11.01" />
                                                  </svg>{" "}


                                                  {data.staffName}
                                                </div>
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        :

                                        // ลูกค้าแจ้งถอน
                                        data.depositWithdrawstatusType === "withdrawgg" ?

                                          <td className="p-2 text-right">
                                            <div className="flex justify-center">
                                              <button
                                                className="flex flex-col justify-center items-center py-1 btn btn-outline-pending btn btn-md flex flex-col justify-center items-center py-1 btn btn-outline-pending"
                                                type="button"
                                                onClick={() => adminCheckDepositManual(data)}
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16px"
                                                  height="16px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth={2}
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  className="feather feather-check-circle w-3 w-3"
                                                  name="check-line"
                                                >
                                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                  <polyline points="22 4 12 14.01 9 11.01" />
                                                </svg>
                                                <span className="block text-xs text-center">
                                                  เช็ค
                                                </span>
                                              </button>
                                            </div>
                                          </td> : <td className="p-2 text-right">
                                            <div className="flex justify-center">

                                              <button
                                                className="flex flex-col justify-center items-center py-1 btn btn-outline-pending btn btn-md flex flex-col justify-center items-center py-1 btn btn-outline-pending"
                                                type="button"
                                                onClick={() => adminCheckDepositManual(data)}
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16px"
                                                  height="16px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth={2}
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  className="feather feather-check-circle w-3 w-3"
                                                  name="check-line"
                                                >
                                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                  <polyline points="22 4 12 14.01 9 11.01" />
                                                </svg>
                                                <span className="block text-xs text-center">
                                                  เช็ค
                                                </span>
                                              </button>
                                            </div>
                                          </td>
                                      }

                                      {data.depositWithdrawstatus === 2 ?
                                        // ลูกค้าแจ้งถอน
                                        data.depositWithdrawstatusType === "withdrawgg" ?
                                          <td className="p-2 text-right number-display">

                                            <div className="min-w-max">
                                              <div className="flex justify-around">
                                                <button
                                                  className="text-blue-600 hover:bg-blue-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max btn btn-md text-blue-600 hover:bg-blue-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max"
                                                  type="button"
                                                  onClick={() => adminApproveManualDeposit(data, 9)}

                                                >
                                                  <div className="flex">
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="16px"
                                                      height="16px"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth={2}
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      className="feather feather-user-check w-3 w-3"
                                                      name="user-check"
                                                    >
                                                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                      <circle cx="8.5" cy={7} r={4} />
                                                      <polyline points="17 11 19 13 23 9" />
                                                    </svg>
                                                    <div className="relative flex flex-col items-center group cursor-pointer">
                                                      <svg
                                                        className="w-4 h-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                      >
                                                        <path
                                                          fillRule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                          clipRule="evenodd"
                                                        />
                                                      </svg>
                                                      <div className="left-3 -top-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                        <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                          ปรับสถานะเป็นสำเร็จแต่จะไม่ถอนเงิน
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <span className="block text-xs font-semibold font-display">
                                                    โอนมือ
                                                  </span>

                                                </button>
                                                <button
                                                  className="text-green-600 hover:bg-green-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md text-green-600 hover:bg-green-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1"
                                                  type="button"
                                                  onClick={() => adminApproveDeposit(data, 9)}

                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-check w-3 w-3"
                                                    name="check-line"
                                                  >
                                                    <polyline points="20 6 9 17 4 12" />
                                                  </svg>
                                                  <span className="block text-xs font-semibold font-display">
                                                    อนุมัติ
                                                  </span>

                                                </button>
                                                <button
                                                  className="text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1"
                                                  type="button"
                                                  onClick={() => adminCancelDeposit(data, 9)}
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-x w-3 w-3"
                                                  >
                                                    <line x1={18} y1={6} x2={6} y2={18} />
                                                    <line x1={6} y1={6} x2={18} y2={18} />
                                                  </svg>
                                                  <span className="text-xs font-semibold font-display">ปฏิเสธ</span>

                                                </button>
                                                <button
                                                  className="text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1"
                                                  type="button"
                                                  onClick={() => adminCancelBitDeposit(data, 9)}
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-trash-2 w-3 w-3"
                                                  >
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6l-1 14H6L5 6" />
                                                    <path d="M10 11v6" />
                                                    <path d="M14 11v6" />
                                                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                                  </svg>
                                                  <span className="text-xs font-semibold font-display">ทิ้ง</span>

                                                </button>
                                              </div>
                                            </div>
                                          </td>
                                          : <td className="p-2 text-right number-display">

                                            <div className="min-w-max">
                                              <div className="flex justify-around">
                                                <button
                                                  className="text-blue-600 hover:bg-blue-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max btn btn-md text-blue-600 hover:bg-blue-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max"
                                                  type="button"
                                                  onClick={() => adminApproveManualDeposit(data)}

                                                >
                                                  <div className="flex">
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="16px"
                                                      height="16px"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth={2}
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      className="feather feather-user-check w-3 w-3"
                                                      name="user-check"
                                                    >
                                                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                      <circle cx="8.5" cy={7} r={4} />
                                                      <polyline points="17 11 19 13 23 9" />
                                                    </svg>
                                                    <div className="relative flex flex-col items-center group cursor-pointer">
                                                      <svg
                                                        className="w-4 h-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                      >
                                                        <path
                                                          fillRule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                          clipRule="evenodd"
                                                        />
                                                      </svg>
                                                      <div className="left-3 -top-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                        <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                          ปรับสถานะเป็นสำเร็จแต่จะไม่ถอนเงิน
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <span className="block text-xs font-semibold font-display">
                                                    โอนมือ
                                                  </span>

                                                </button>
                                                <button
                                                  className="text-green-600 hover:bg-green-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md text-green-600 hover:bg-green-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1"
                                                  type="button"
                                                  onClick={() => adminApproveDeposit(data)}

                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-check w-3 w-3"
                                                    name="check-line"
                                                  >
                                                    <polyline points="20 6 9 17 4 12" />
                                                  </svg>
                                                  <span className="block text-xs font-semibold font-display">
                                                    อนุมัติ
                                                  </span>

                                                </button>
                                                <button
                                                  className="text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1"
                                                  type="button"
                                                  onClick={() => adminCancelDeposit(data)}
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-x w-3 w-3"
                                                  >
                                                    <line x1={18} y1={6} x2={6} y2={18} />
                                                    <line x1={6} y1={6} x2={18} y2={18} />
                                                  </svg>
                                                  <span className="text-xs font-semibold font-display">ปฏิเสธ</span>

                                                </button>
                                              </div>
                                            </div>
                                          </td>
                                        :
                                        data.depositWithdrawstatus === 6 ?
                                          <td className="p-2 text-right number-display">
                                            <div className="min-w-max">
                                              <div className="flex justify-center items-center">
                                                <div role="status">
                                                  <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                  </svg>
                                                  <span className="sr-only">Loading...</span>
                                                </div>
                                                <span className="text-xs font-semibold font-display ml-2">รอโอน....</span>
                                              </div>
                                            </div>
                                            <button
                                              className="text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1"
                                              type="button"
                                              onClick={() => adminCancelDeposit(data)}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16px"
                                                height="16px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-x w-3 w-3"
                                              >
                                                <line x1={18} y1={6} x2={6} y2={18} />
                                                <line x1={6} y1={6} x2={18} y2={18} />
                                              </svg>
                                              <span className="text-xs font-semibold font-display">ปฏิเสธ</span>

                                            </button>
                                          </td> : <td className="p-2 text-right number-display">
                                            <div className="min-w-max">
                                              <div className="flex justify-around">
                                                <button
                                                  className="text-gray-600 flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max btn btn-md text-gray-600 flex flex-col justify-center items-center border-0 shadow-none py-1 min-w-max"
                                                  type="button"
                                                  disabled=""
                                                >
                                                  <div className="flex">
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="16px"
                                                      height="16px"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth={2}
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      className="feather feather-user-check w-3 w-3"
                                                      name="user-check"
                                                    >
                                                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                      <circle cx="8.5" cy={7} r={4} />
                                                      <polyline points="17 11 19 13 23 9" />
                                                    </svg>
                                                    <div className="relative flex flex-col items-center group cursor-pointer">
                                                      <svg
                                                        className="w-4 h-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                      >
                                                        <path
                                                          fillRule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                          clipRule="evenodd"
                                                        />
                                                      </svg>
                                                      <div className="left-3 -top-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                        <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                          ปรับสถานะเป็นสำเร็จแต่จะไม่ถอนเงิน
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <span className="block text-xs font-semibold font-display">โอนมือ</span>
                                                </button>

                                                <button
                                                  className="text-gray-600 flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md text-gray-600 flex flex-col justify-center items-center border-0 shadow-none py-1"
                                                  type="button"
                                                  disabled=""
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-check w-3 w-3"
                                                    name="check-line"
                                                  >
                                                    <polyline points="20 6 9 17 4 12" />
                                                  </svg>
                                                  <span className="block text-xs font-semibold font-display">อนุมัติ</span>
                                                </button>

                                                <button
                                                  className="text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1 btn btn-md text-red-600 hover:bg-red-600 hover:text-white flex flex-col justify-center items-center border-0 shadow-none py-1"
                                                  type="button"
                                                  onClick={() => adminCancelDeposit(data)}
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-x w-3 w-3"
                                                  >
                                                    <line x1={18} y1={6} x2={6} y2={18} />
                                                    <line x1={6} y1={6} x2={18} y2={18} />
                                                  </svg>
                                                  <span className="text-xs font-semibold font-display">ปฏิเสธ</span>

                                                </button>
                                              </div>
                                            </div>
                                          </td>

                                      }





                                      <td className="p-2">
                                        <span className="flex items-center relative group">
                                          <a
                                            // href=`/member/edit/${data.}#general`
                                            href={`/member/edit/${data.userid}#general`}
                                            className="text-blue-500 underline"
                                          >
                                            {data.depositWithdrawuserId}
                                          </a>

                                        </span>

                                        {/* <span className="flex items-center relative group">
                                          <div onClick={()=>console.log(data)}>sdsdsds</div>

                                        </span> */}

                                      </td>
                                      <td className="p-2 text-center">

                                        <div>
                                          <div className="flex items-center text-left pl-1 w-48 relative">
                                            <div
                                              className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                              style={{ backgroundColor: `${bankColor[data?.userbankBankName?.toUpperCase()]}` }}
                                            >
                                              <img
                                                className="rounded w-7 h-7 object-contain"
                                                src={bankLabelImage[data?.userbankBankName?.toUpperCase()]}
                                                alt={data?.userbankBankName?.toUpperCase()}
                                              />
                                            </div>
                                            <div className="pl-2">
                                              <div className="flex items-center">{data.userbankAccountNumber} </div>
                                              <div>{data.userbankAccountName}</div>
                                            </div>
                                          </div>


                                        </div>
                                      </td>

                                      <td className="p-2 text-center">
                                        <div className="flex items-center">
                                          <div className="w-6"></div>
                                          <div className="flex items-center text-left pl-1 w-48 relative">
                                            <div
                                              className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                              style={{ backgroundColor: `${bankColor[data?.bankserviceBankName?.toUpperCase()]}` }}
                                            >

                                              <img
                                                className="rounded w-7 h-7 object-contain"
                                                src={bankLabelImage[data?.bankserviceBankName?.toUpperCase()]}
                                                alt={data?.bankserviceBankName?.toUpperCase()}
                                              />
                                            </div>
                                            <div className="pl-2">
                                              <div className="flex items-center">{data.bankserviceAccountNo} </div>
                                              <div>{data.bankserviceAccountName}</div>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-2 text-center">
                                        <div className="flex items-center">
                                          <span className="bg-slate-200 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center">
                                            รอดำเนินการ
                                          </span>
                                        </div>
                                      </td>
                                      {/* <td className="p-2">
                                        <div className="flex">
                                          <div className="w-60 flex flex-col">

                                            <span className="text-xs text-gray-500">
                                              หมายเหตุ: {data.remarkLc}
                                            </span>
                                          </div>
                                        </div>
                                      </td> */}
                                      <td className="p-2">
                                        <div className="w-60 flex flex-col">
                                          หมายเหตุ: {data.remarkLc}
                                        </div>
                                        <div className="w-60 flex flex-col">
                                          เครดิตก่อน: {parseFloat(data.beforeBalance).toFixed(2)} เครดิตหลัง: {parseFloat(data.afterBalance).toFixed(2)}
                                        </div>

                                      </td>
                                    </tr>
                                    )
                                  }
                                }
                                )
                                  : null
                                }

                                {/* จบ ฝาก-ถอน */}












                                <tr
                                  className="bg-yellow-50 p-2 text-center"
                                  style={{ display: "none" }}
                                >
                                  <td colSpan={18}>ไม่มีข้อมูล</td>
                                </tr>
                                <tr className="p-2" style={{ display: "none" }}>
                                  <td colSpan={18} className="text-center">
                                    <span className="text-xs">
                                      <svg className="animate-spin h-4 w-4 inline mx-2 pb-2">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16px"
                                          height="16px"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="feather feather-loader w-8 h-8 block text-blue-500 w-8 h-8 block text-blue-500"
                                        >
                                          <line x1={12} y1={2} x2={12} y2={6} />
                                          <line x1={12} y1={18} x2={12} y2={22} />
                                          <line
                                            x1="4.93"
                                            y1="4.93"
                                            x2="7.76"
                                            y2="7.76"
                                          />
                                          <line
                                            x1="16.24"
                                            y1="16.24"
                                            x2="19.07"
                                            y2="19.07"
                                          />
                                          <line x1={2} y1={12} x2={6} y2={12} />
                                          <line x1={18} y1={12} x2={22} y2={12} />
                                          <line
                                            x1="4.93"
                                            y1="19.07"
                                            x2="7.76"
                                            y2="16.24"
                                          />
                                          <line
                                            x1="16.24"
                                            y1="7.76"
                                            x2="19.07"
                                            y2="4.93"
                                          />
                                        </svg>
                                      </svg>
                                      กำลังโหลดข้อมูล . . .
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 mt-5">
                <div className="col-span-12 sm:col-span-12">
                  <div className="box px-5 pb-5">
                    <div className="flex flex-col sm:flex-row items-center pt-5 pb-3 mb-3 border-b-2 border-primary">
                      <h2 className="text-lg font-display mr-auto flex items-center text-neutral-600 uppercase font-bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16px"
                          height="16px"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-align-justify w-6 h-6 mr-3 text-blue-800 inline w-6 h-6 mr-3 text-blue-800 inline"
                        >
                          <line x1={21} y1={10} x2={3} y2={10} />
                          <line x1={21} y1={6} x2={3} y2={6} />
                          <line x1={21} y1={14} x2={3} y2={14} />
                          <line x1={21} y1={18} x2={3} y2={18} />
                        </svg>
                      </h2>
                      <h2 className="uppercase font-bold">รายการล่าสุด</h2>
                      <div className="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                        <button className="btn btn-primary w-8 h-8 rounded" onClick={() => refreshData()}>
                          <div className="relative flex flex-col items-center group cursor-pointer block text-gray-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16px"
                              height="16px"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-refresh-cw text-white px-0.5 text-white px-0.5"
                            >
                              <polyline points="23 4 23 10 17 10" />
                              <polyline points="1 20 1 14 7 14" />
                              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                            </svg>
                            <div className="bottom-0 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                              <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                รีเฟรช
                              </span>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* ตาราง */}
                    <div className="overflow-x-auto">
                      <div className="grid grid-cols-12">
                        <div className="intro-y box col-span-12 sm:col-span-12">
                          <div className="overflow-x-auto job-done_max-height">
                            <table className="text-xs border w-full">
                              <thead className="sticky top-0 z-10">
                                <tr className="bg-gray-700 dark:bg-dark-1 text-white px-half font-display text-sm font-semibold">
                                  <th className="py-1 px-2 whitespace-nowrap">#</th>
                                  <th className="py-1 px-2 whitespace-nowrap">ช่องทาง</th>
                                  <th className="py-1 px-2 whitespace-nowrap text-center">ประเภท</th>
                                  <th className="py-1 px-2 whitespace-nowrap text-right">จำนวนเงิน</th>
                                  <th className="py-1 px-2 whitespace-nowrap text-center">เวลารายการ</th>
                                  <th className="py-1 px-2 whitespace-nowrap text-left">ระยะเวลาดำเนินการ</th>
                                  <th className="py-1 px-2 whitespace-nowrap text-left">ยุสเซอร์</th>
                                  <th className="py-1 px-2 whitespace-nowrap text-left">ชื่อลูกค้า</th>
                                  <th className="py-1 px-2 whitespace-nowrap text-left">บัญชีเว็บ</th>
                                  <th className="py-1 px-2 whitespace-nowrap text-left">สถานะ</th>
                                  <th className="py-1 px-2 whitespace-nowrap text-center">ทำรายการ</th>
                                  <th className="py-1 px-2 whitespace-nowrap text-left">หมายเหตุ</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bankdepositwithdrawData.length !== 0 ? (
                                  bankdepositwithdrawData.map((data, index) => (
                                    <tr
                                      key={index}
                                      className={
                                        data.type === "deposit"
                                          ? "bg-green-50 p-2 hover:bg-yellow-100 px-half border-b border-gray-300"
                                          : "bg-red-50 p-2 hover:bg-yellow-100 px-half border-b border-gray-300"
                                      }
                                    >
                                      <td className="p-2 text-center w-10">{data.logid}</td>
                                      <td className="p-2 text-center">
                                        <div className="w-28">
                                          <div
                                            className="flex items-center gap-1 ml-3 relative cursor-pointer"
                                            job-id={data.logid}
                                          >
                                            <div className="w-4 h-4">
                                              <img
                                                src="data:image/png;base64,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"
                                                alt="Api"
                                              />
                                            </div>
                                            <span className="flex items-center bg-gray-700 text-white px-1.5 py-0.5 text-xs rounded-md before:text-gray-700 before:absolute before:left-3.5">
                                              {data.typecheck == "freecredit" ? "Free Credit" : data.typecheck == "auto" ? "Auto" : data.typecheck == "gateway" ? "PG" : "Staff"}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-2 text-center w-20">
                                        <div className="w-20">
                                          <span className={data.type === "deposit" ? "bg-green-600 text-white rounded-full px-2.5 py-1 text-xs" : "bg-red-600 text-white rounded-full px-2.5 py-1 text-xs"}>
                                            {data.type === "deposit" ? "ฝาก" : "ถอน"}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="p-2 text-right number-display">{formatCurrency(data.amountLc)}</td>
                                      <td className="p-2 text-center number-display">
                                        <div className="w-24">
                                          <span className="block">
                                            {/* {data.depositcreatedAt === null ? getCurrentTimeInUTC7(data.depositWithdrawTime) : getCurrentTimeInUTC7(data.depositWithdrawTime)} */}
                                            {formatDateTime(data.depositWithdrawTime, 14)}
                                            {/* {data.approveBy === null ? formatDateTime(data.depositWithdrawTime, 14) : data.type === "withdraw" ? formatDateTime(data.depositcreatedAt, 14) : formatDateTime(data.depositWithdrawTime, 14)} */}



                                            {/* <div onClick={()=>console.log(data)}>xxx</div> */}
                                          </span>
                                          <span className="block text-xs font-light">
                                            ({data.approveBy === null ? formatTimeDifference(new Date(data.depositcreatedAt)) : formatTimeDifference(new Date(data.depositcreatedAt))} ที่แล้ว)
                                            {/* ({data.depositcreatedAt}) */}
                                            {/* {formatTimeDifference(new Date(data.depositcreatedAt,4))} */}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="p-2 text-center w-[50px]">{calculateTimeDifference(new Date(data.depositcreatedAt), new Date(data.depositupdatedAt))}</td>
                                      <td>
                                        <span className="flex items-center relative group">
                                          <a
                                            href={`/member/edit/${data.userId}#general`}
                                            className="text-blue-500 underline"
                                          >
                                            {data.user}
                                          </a>
                                        </span>
                                      </td>
                                      <td className="p-2 text-center">
                                        {data.bankName ? (
                                          <div className="flex items-center justify-between w-60">
                                            <div className="flex items-center text-left pl-1 w-48 relative">
                                              <div
                                                className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                                style={{
                                                  backgroundColor: `${bankColor[data.bankName?.toUpperCase()]}`
                                                }}
                                              >
                                                <img
                                                  className="rounded w-7 h-7 object-contain"
                                                  src={bankLabelImage[data.bankName?.toUpperCase()]}
                                                  alt={data.bankName}
                                                />
                                              </div>
                                              <div className="pl-2">
                                                <div className="flex items-center">
                                                  {data.accountNumber}
                                                </div>
                                                <div>{data.name}</div>
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="text-center"><p>-</p></div>
                                        )}
                                      </td>
                                      <td className="p-2 text-center">
                                        {data.typecheck == "gateway" ? (
                                          <div className="flex items-center text-left pl-1 w-48 relative">
                                            <div className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7">
                                              <img
                                                className="rounded w-7 h-7 object-contain"
                                                src="https://bizboo.com/logo.png?version=12"
                                                alt="paymentgateway"
                                              />
                                            </div>
                                            <div className="pl-2">
                                              <div className="flex items-center">
                                                Payment Gateway
                                              </div>
                                            </div>
                                          </div>
                                        ) : data.bankName ? (
                                          <div className="flex items-center text-left pl-1 w-48 relative">
                                            <div
                                              className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                              style={{
                                                backgroundColor: `${bankColor[data.bankserviceBankName?.toUpperCase()]}`
                                              }}
                                            >
                                              <img
                                                className="rounded w-7 h-7 object-contain"
                                                src={bankLabelImage[data.bankserviceBankName?.toUpperCase()]}
                                                alt={data.bankserviceBankName}
                                              />
                                            </div>
                                            <div className="pl-2">
                                              <div className="flex items-center">
                                                {data.bankserviceaccountNo}{" "}
                                                <div className="group rounded-full w-4 h-4 hover:bg-gray-100 flex items-center justify-center mr-1 cursor-pointer">
                                                  <div className="hidden group-hover:block absolute top-0 -right-1 bg-gray-700 text-white rounded px-1 before:text-gray-700 before:absolute before:-left-[0.3rem]">
                                                    รายละเอียด
                                                  </div>
                                                </div>
                                              </div>
                                              <div>{data.bankserviceaccountName}</div>
                                            </div>
                                          </div>
                                        ) : (
                                          <p>-</p>
                                        )}
                                      </td>
                                      <td className="p-2 text-center">
                                        <div className="flex items-center">
                                          <span className={data.statusLc === 3 ? "text-danger bg-red-100 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center" : "text-green-800 bg-lime-300 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center"}>
                                            {data.statusLc === 3 ? "ยกเลิก" : "สำเร็จ"}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="p-2 text-center">
                                        <div className="w-36">
                                          {data.approveBy === null ? (
                                            <div className="flex items-center gap-1 ml-3 relative">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                aria-hidden="true"
                                                role="img"
                                                width={20}
                                                height={20}
                                                viewBox="0 0 20 20"
                                                className="iconify iconify--fluent"
                                              >
                                                <path
                                                  fill="currentColor"
                                                  d="M12 5.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-5 1a1 1 0 1 1 2 0a1 1 0 0 1-2 0m3.5-4a.5.5 0 0 0-1 0V3h-3A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h6.294l.326-1H6.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v3.583a1.42 1.42 0 0 1 1 .016V4.5A1.5 1.5 0 0 0 13.5 3h-3zm-2 9h1.908a1.42 1.42 0 0 0-.408.997v.006H5.31a.81.81 0 0 0-.81.81v.437c0 .69.131 1.456.802 2.069C5.99 16.446 7.34 17 10 17c1.55 0 2.655-.188 3.444-.47a1.4 1.4 0 0 0 .678.419a1.3 1.3 0 0 0-.117.439c-.916.367-2.137.59-3.755.61V18h-.5v-.002c-2.616-.033-4.195-.595-5.122-1.44c-.875-.8-1.089-1.777-1.123-2.556H3.5v-.69c0-.999.81-1.809 1.81-1.809H8.5zm6.378-2.218l.348 1.071a2.2 2.2 0 0 0 1.399 1.397l1.071.348l.021.006a.423.423 0 0 1 0 .798l-1.071.348a2.2 2.2 0 0 0-1.399 1.397l-.348 1.07a.423.423 0 0 1-.798 0l-.349-1.07a2.2 2.2 0 0 0-.65-.977a2.2 2.2 0 0 0-.748-.426l-1.071-.348a.423.423 0 0 1 0-.798l1.071-.348a2.2 2.2 0 0 0 1.377-1.397l.348-1.07a.423.423 0 0 1 .799 0m4.905 7.931l-.766-.248a1.58 1.58 0 0 1-.998-.998l-.25-.765a.302.302 0 0 0-.57 0l-.248.765a1.58 1.58 0 0 1-.984.998l-.765.248a.303.303 0 0 0-.146.46c.036.05.087.09.146.11l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.302.302 0 0 0 0-.57zm-6.174-.527l.07.053Z"
                                                />
                                              </svg>
                                              <span className="bg-blue-500 text-white px-1.5 py-0.5 text-xs rounded-md before:text-blue-500 before:absolute before:left-[18px]">Auto</span>
                                            </div>
                                          ) : (
                                            <div className="w-36">
                                              <div className="flex items-center gap-1 ml-3 relative">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16px"
                                                  height="16px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth={2}
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  className="feather feather-user w-4 h-4 inline"
                                                >
                                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                  <circle cx={12} cy={7} r={4} />
                                                </svg>
                                                <span className="bg-gray-700 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-gray-700 before:absolute before:left-3.5">{data.staffName}</span>
                                              </div>
                                              <div
                                                className="flex items-center gap-1 ml-3 relative"
                                                style={{ display: "none" }}
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                                  aria-hidden="true"
                                                  role="img"
                                                  width={20}
                                                  height={20}
                                                  viewBox="0 0 20 20"
                                                  className="iconify iconify--fluent"
                                                >
                                                  <path
                                                    fill="currentColor"
                                                    d="M12 5.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-5 1a1 1 0 1 1 2 0a1 1 0 0 1-2 0m3.5-4a.5.5 0 0 0-1 0V3h-3A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h6.294l.326-1H6.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v3.583a1.42 1.42 0 0 1 1 .016V4.5A1.5 1.5 0 0 0 13.5 3h-3zm-2 9h1.908a1.42 1.42 0 0 0-.408.997v.006H5.31a.81.81 0 0 0-.81.81v.437c0 .69.131 1.456.802 2.069C5.99 16.446 7.34 17 10 17c1.55 0 2.655-.188 3.444-.47a1.4 1.4 0 0 0 .678.419a1.3 1.3 0 0 0-.117.439c-.916.367-2.137.59-3.755.61V18h-.5v-.002c-2.616-.033-4.195-.595-5.122-1.44c-.875-.8-1.089-1.777-1.123-2.556H3.5v-.69c0-.999.81-1.809 1.81-1.809H8.5zm6.378-2.218l.348 1.071a2.2 2.2 0 0 0 1.399 1.397l1.071.348l.021.006a.423.423 0 0 1 0 .798l-1.071.348a2.2 2.2 0 0 0-1.399 1.397l-.348 1.07a.423.423 0 0 1-.798 0l-.349-1.07a2.2 2.2 0 0 0-.65-.977a2.2 2.2 0 0 0-.748-.426l-1.071-.348a.423.423 0 0 1 0-.798l1.071-.348a2.2 2.2 0 0 0 1.377-1.397l.348-1.07a.423.423 0 0 1 .799 0m4.905 7.931l-.766-.248a1.58 1.58 0 0 1-.998-.998l-.25-.765a.302.302 0 0 0-.57 0l-.248.765a1.58 1.58 0 0 1-.984.998l-.765.248a.303.303 0 0 0-.146.46c.036.05.087.09.146.11l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.302.302 0 0 0 0-.57zm-6.174-.527l.07.053Z"
                                                  />
                                                </svg>
                                                <span className="bg-blue-500 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-blue-500 before:absolute before:left-[18px]">Auto</span>
                                              </div>
                                              <div className="flex items-center gap-1 ml-3 relative mt-1" style={{ display: data.statusLc === 5 || data.statusLc === 11 || data.statusLc === 6 ? "" : "none" }}>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16px"
                                                  height="16px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth={2}
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  className="feather feather-user-check w-4 h-4 inline"
                                                >
                                                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                  <circle cx="8.5" cy={7} r={4} />
                                                  <polyline points="17 11 19 13 23 9" />
                                                </svg>
                                                <span className="bg-green-600 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-green-600 before:absolute before:left-[14px] whitespace-nowrap">
                                                  {data.staffName}
                                                  ({data.statusLc === 5 ? "ฝากมือ" : data.statusLc === 11 ? "ทิ้ง" : "โอนมือ"})
                                                </span>
                                              </div>
                                              <div className="flex items-center gap-1 ml-3 relative mt-1" style={{ display: data.statusLc === 11 ? "" : "none" }}>

                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16px"
                                                  height="16px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth={2}
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  className="feather feather-trash-2 w-3 w-3"
                                                >
                                                  <polyline points="3 6 5 6 21 6" />
                                                  <path d="M19 6l-1 14H6L5 6" />
                                                  <path d="M10 11v6" />
                                                  <path d="M14 11v6" />
                                                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                                </svg>
                                                <span className="bg-red-600 text-white px-1.5 py-0.5 text-xs rounded-md before:text-red-600 before:absolute before:left-[14px] whitespace-nowrap">
                                                  ทิ้ง
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                          <div className="flex items-center gap-1 ml-3 relative mt-1" style={{ display: "none" }}>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16px"
                                              height="16px"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth={2}
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="feather feather-user-check w-4 h-4 inline"
                                            >
                                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                              <circle cx="8.5" cy={7} r={4} />
                                              <polyline points="17 11 19 13 23 9" />
                                            </svg>
                                            <span className="bg-green-600 text-white px-1.5 py-0.5 text-xs rounded-md before:text-green-600 before:absolute before:left-[14px] whitespace-nowrap">
                                              undefined (ฝากมือ)
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-2">
                                        <div className="w-60 flex flex-col">
                                          หมายเหตุ: {data.remarkLc}
                                        </div>
                                        {/* <div className="w-60 flex flex-col" onClick={()=>console.log(data)}>
                                          ก่อน: {data.beforeBalance | 0} หลัง: {data.afterBalance|0}
                                        </div> */}
                                        <div className="w-60 flex flex-col">
                                          เครดิตก่อน: {data.beforeBalance} เครดิตหลัง: {data.afterBalance}
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                ) : null}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* จบตาราง */}


                    <div className="flex justify-center pb-2 pt-4">
                      <ul className="Pagination" data-v-2a30deb0="">
                        <li className="PaginationControl" data-v-2a30deb0="" onClick={() => handlePageChange(1)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="Control Control-active"
                            data-v-2a30deb0=""
                          >
                            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41M6 6h2v12H6V6z" />
                          </svg>
                        </li>
                        <li className="PaginationControl" data-v-2a30deb0="" onClick={() => handlePageChange(currentPage - 1)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="Control Control-active"
                            data-v-2a30deb0=""
                          >
                            <path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" />
                          </svg>
                        </li>
                        {renderPageNumbers()}
                        <li className="PaginationControl" data-v-2a30deb0="" onClick={() => handlePageChange(currentPage + 1)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="Control Control-active"
                            data-v-2a30deb0=""
                          >
                            <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z" />
                          </svg>
                        </li>
                        <li className="PaginationControl" data-v-2a30deb0="" onClick={() => handlePageChange(pagination.totalPages)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="Control Control-active"
                            data-v-2a30deb0=""
                          >
                            <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41M16 6h2v12h-2V6z" />
                          </svg>
                        </li>
                      </ul>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {
          dropdownProfile && <div
            className="dropdown-menu !w-48 show"
            id="_nfgw9au9l"
            style={{
              width: 192,
              position: "absolute",
              inset: "0px 0px auto auto",
              margin: 0,
              transform: "translate(-52px, 70.6667px)"
            }}
            data-popper-placement="bottom-end"
          >
            <ul className="dropdown-content bg-primary dark:bg-dark-6 text-white">
              <div className="p-4 border-b border-white/[0.08] dark:border-dark-3">
                <div className="font-medium">miler@99XBET</div>
                <div className="text-xs text-slate-200 mt-0.5 dark:text-gray-600">
                  พาร์ทเนอร์: 99XBET
                </div>
              </div>
              <div className="p-2">
                <li>
                  <div className="dropdown-item cursor-pointer hover:bg-primary dark:hover:bg-dark-3">
                    <a
                      href="/profile"
                      className="flex items-center transition duration-300 ease-in-out hover:bg-primary dark:hover:bg-dark-3 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        height="16px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-user w-4 h-4 mr-2 w-4 h-4 mr-2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                      </svg>{" "}
                      โปรไฟล์
                    </a>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item cursor-pointer flex items-center p-2 transition duration-300 ease-in-out hover:bg-primary dark:hover:bg-dark-3 rounded-md cursor-pointer capitalize">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-lock w-4 h-4 mr-2 w-4 h-4 mr-2"
                    >
                      <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>{" "}
                    เปลี่ยนรหัสผ่าน
                  </div>
                </li>

              </div>
              <div className="p-2 border-t border-white/[0.08] dark:border-dark-3">
                <button
                  className="flex items-center p-2 transition duration-300 ease-in-out hover:bg-primarydark:hover:bg-dark-3 rounded-md w-full focus:outline-none"
                  onClick={() => {
                    localStorage.setItem('loggedInUser', "");
                    navigate("/")
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-toggle-right w-4 h-4 mr-2 w-4 h-4 mr-2"
                  >
                    <rect x={1} y={5} width={22} height={14} rx={7} ry={7} />
                    <circle cx={16} cy={12} r={3} />
                  </svg>{" "}
                  ออกจากระบบ
                </button>
              </div>
            </ul>
          </div>
        }





        {/* ทำรายการฝาก */}

        {/* // hide depositModalShow
  // manual
  // approve
  // cancel */}
        <div
          data-backdrop="static"
          className="modal overflow-y-auto show z-[52] m-0 p-0"
          style={{ display: depositModalShow === "hide" ? "none" : "" }}
        // style={{ display: depositModalShow === "hide" ? "none" : "" }}
        >
          <div className="modal-dialog mx-auto my-3 flex justify-center items-center">
            <div className="modal-content bg-primary">
              <div className="modal-header flex justify-end sticky top-0 rounded-t-md border-0 pb-0" onClick={() => setDepositMadalShow("hide")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x cursor-pointer text-white cursor-pointer text-white"
                >
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </div>
              <div className="text-center">
                <h1 className="font-medium font-display mr-auto text-2xl mb-5 text-white">
                  {titleText(depositModalShow)}
                </h1>
                <div className="bg-white rounded-lg p-5 m-5">
                  <form onSubmit={submitModal}>
                    <div className="text-sm">
                      {depositModalShow === "manual" ?
                        <>
                          <div className="bg-orange-100 p-2 rounded">
                            ปรับสถานะเป็นสำเร็จแต่จะไม่ปรับเครดิต
                          </div>
                        </> : null}
                      {depositModalShow === "cancel-eject" ?
                        <>
                          <div className="bg-orange-100 p-2 rounded">
                            ทิ้ง
                          </div>
                        </> : null}

                      <div className="flex items-center py-1">
                        <div className="w-24 text-right mr-3">Id:</div>
                        <div>#{dataForDeposit && dataForDeposit.depositWithdrawId}</div>
                      </div>
                      <div className="flex items-center py-1">
                        <div className="w-24 text-right mr-3">ประเภท:</div>
                        <div>
                          {dataForDeposit && dataForDeposit.depositWithdrawtype === "deposit" ?
                            <span className="bg-green-600 text-white rounded-full px-2.5 py-1 text-xs">
                              ฝาก
                            </span> :
                            <span className="bg-red-600 text-white rounded-full px-2.5 py-1 text-xs">
                              ถอน
                            </span>}

                        </div>
                      </div>
                      <div className="flex items-center py-1">
                        <div className="w-24 text-right mr-3">จำนวนเงิน:</div>
                        <div>{dataForDeposit && formatCurrency(dataForDeposit.depositamount)} THB</div>
                      </div>
                      <div className="flex items-center py-1">
                        <div className="w-24 text-right mr-3">ยูสเซอร์:</div>
                        <div>{dataForDeposit && dataForDeposit.depositWithdrawuserId}</div>
                      </div>

                      {dataForDeposit?.depositWithdrawstatus !== 8 ? (<div className="flex items-center py-1">
                        <div className="w-24 text-right mr-3">ชื่อลูกค้า:</div>
                        <div>
                          <div className="flex items-center text-left pl-1 w-48 relative">
                            <div
                              className="p-0.5 flex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                              style={dataForDeposit ? { backgroundColor: bankColor[dataForDeposit.userbankBankName?.toUpperCase()] } : null}
                            >
                              <img
                                className="rounded w-7 h-7 object-contain"
                                src={dataForDeposit ? bankLabelImage[dataForDeposit.userbankBankName?.toUpperCase()] : null}
                                alt={dataForDeposit ? dataForDeposit.userbankBankName : null}
                              />
                            </div>
                            <div className="pl-2">
                              <div className="flex items-center">{dataForDeposit && dataForDeposit.userbankAccountNumber} </div>
                              <div>{dataForDeposit && dataForDeposit.userbankAccountName}</div>
                            </div>
                          </div>
                        </div>
                      </div>) : (<div className="flex items-center py-1">
                        <div className="w-24 text-right mr-3">ชื่อลูกค้า:</div>
                        <div>
                          <div className="flex items-center text-left pl-1 w-48 relative">
                            -
                          </div>
                        </div>
                      </div>)}

                      <div className="flex items-center py-1">
                        <div className="w-24 text-right mr-3">บัญชีเว็บ:</div>
                        <div className="flex items-center text-left pl-1 w-48 relative">
                          <div
                            className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                            style={dataForDeposit ? { backgroundColor: bankColor[dataForDeposit.bankserviceBankName?.toUpperCase()] } : null}
                          >
                            <img
                              className="rounded w-7 h-7 object-contain"
                              src={dataForDeposit ? bankLabelImage[dataForDeposit.bankserviceBankName?.toUpperCase()] : null}
                              alt={dataForDeposit ? dataForDeposit.bankserviceBankName : null}
                            />
                          </div>
                          <div className="pl-2">
                            <div className="flex items-center">{dataForDeposit && dataForDeposit.bankserviceAccountNo}</div>
                            <div>{dataForDeposit && dataForDeposit.bankserviceAccountName}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center py-1">
                        <div className="w-24 text-right mr-3">สถานะ:</div>
                        <div>
                          <div className="flex items-center">
                            <span className="bg-slate-200 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center">
                              รอดำเนินการ
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center pt-1">
                        <div className="w-24 text-right mr-3">ข้อมูลเพิ่มเติม:</div>
                        <div className="flex text-left">
                          <div className="w-full flex flex-col">
                            <span>-</span>
                          </div>
                        </div>
                      </div>


                      {depositModalShow !== "approve" && (
                        <>
                          <label className="form-label flex items-center capitalize">
                            <span>
                              <i className="text-danger">*</i> หมายเหตุ
                            </span>
                          </label>
                          <div className="input-group">
                            <textarea
                              className="w-full rounded border-gray-300"
                              name="notes"
                              placeholder="หมายเหตุ"
                              defaultValue={""}
                              style={{ padding: 10 }}
                              value={dataForDeposit && dataForDeposit.depositWithdrawremark}
                              onChange={(e) => setDataForDeposit(prevState => ({ ...prevState, depositWithdrawremark: e.target.value }))}
                            />
                          </div>
                        </>
                      )}



                    </div>
                    <div className="flex justify-center gap-3 mt-5">
                      <button
                        type="submit"
                        className="btn btn-primary w-24 btn btn-md btn btn-primary w-24"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16px"
                          height="16px"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-check mr-2 mr-2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>{" "}
                        ยืนยัน
                      </button>
                      <button
                        className="btn btn-outline-dark w-16 btn btn-md btn btn-outline-dark w-16"
                        type="button"
                        onClick={() => setDepositMadalShow("hide")}
                      >
                        ปิด
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div >

        {/* ระบุยูส */}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${modalDepositSelectUser ? '' : 'hidden'}`}
        >
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-3xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-5 flex justify-between items-center">
              <h2 className="text-xl font-bold">สร้างรายการระบุยูส</h2>
              <button
                className="focus:outline-none"
                onClick={() => setModalDepositSelectUser(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form className="p-8 bg-gray-50 space-y-6" onSubmit={submitAddDepositDuplicate}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div className="flex flex-col">
                  <label
                    htmlFor="customer-bank-account"
                    className="text-sm font-semibold text-gray-700"
                  >
                    เลือกประเภทการระบุยูส
                  </label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="1"
                        checked={selectedOptionDuplicate === '1'}
                        onChange={handleOptionChangeDuplicate}
                      />
                      {" "}เลือกสมาชิก
                    </label>
                  </div>

                  <div>
                    <label>
                      <input
                        type="radio"
                        value="2"
                        checked={selectedOptionDuplicate === '2'}
                        onChange={handleOptionChangeDuplicate}
                      />
                      {" "}กำหนดเอง
                    </label>
                  </div>
                </div>

                {/* Member Search */}
                <div className="flex flex-col col-span-1 sm:col-span-2">
                  <label
                    htmlFor="search-member"
                    className="text-sm font-semibold text-gray-700"
                  >
                    สมาชิก{" "}
                    <span className="text-xs text-gray-500">
                      (3 อักษรขึ้นไป, ยูส, เบอร์โทร หรือ ชื่อ)
                    </span>
                  </label>
                  <div className="mt-2 w-full">
                    <ComboBox
                      options={options}
                      placeholder="ค้นหาสมาชิก"
                      optionsListMaxHeight={300}
                      focusColor="#20C374"
                      renderOptions={(option) => (
                        <div className="comboBoxOption">{option}</div>
                      )}
                      value={selectedOption}
                      onSelect={setSelectedOptionHandle}
                      onChange={onChangeComboBoxDeposit}
                      enableAutocomplete
                      onOptionsChange={(option) => setHighlightedOption(option)}
                      // required
                      disabled={selectedOptionDuplicate === '1'}
                      className="w-full" // Ensure the ComboBox takes full width
                    />
                  </div>
                </div>

                {/* Customer Bank Account */}
                <div className="flex flex-col">
                  <label
                    htmlFor="customer-bank-account"
                    className="text-sm font-semibold text-gray-700"
                  >
                    บัญชีธนาคารลูกค้า<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="customer-bank-account"
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setSelectBankDeposit(e.target.value)}
                    value={selectBankDeposit.value}
                    // required

                    disabled={selectedOptionDuplicate === '1'}
                  >
                    {optionsBankDeposit &&
                      optionsBankDeposit.map((data) => (
                        <option key={data.value} value={data.value}>
                          {data.text}
                        </option>
                      ))}
                  </select>
                </div>


                {/* Customer Bank Account */}
                <div className="flex flex-col">
                  <label
                    htmlFor="customer-bank-account"
                    className="text-sm font-semibold text-gray-700"
                  >
                    เลือกสมาชิก<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="customer-bank-account"
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setSelectDepositDuplicate2(e.target.value)}
                    // value={selectBankservicedeposit2.value}
                    // required
                    disabled={selectedOptionDuplicate === '2'}
                  >
                    {selectdepositDuplicate &&
                      selectdepositDuplicate.map((data) => (
                        <option key={data.value} value={data.value}>
                          {data.text}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Amount */}
                <div className="flex flex-col">
                  <label
                    htmlFor="amount"
                    className="text-sm font-semibold text-gray-700"
                  >
                    จำนวนเงิน<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="amount"
                    type="number"
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    value={depositAmount}
                    // onChange={(e) => setDepositAmount(e.target.value)}
                    disabled
                  />
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-9H9V6a1 1 0 10-2 0v3H6a1 1 0 000 2h1v3a1 1 0 002 0v-3h4a1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  สร้างรายการ
                </button>
                <button
                  type="button"
                  className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setModalDepositSelectUser(false)}
                >
                  ปิด
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* สร้างรายการฝาก */}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${modalDeposit ? '' : 'hidden'}`}
        >
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-3xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-5 flex justify-between items-center">
              <h2 className="text-xl font-bold">สร้างรายการฝาก</h2>
              <button
                className="focus:outline-none"
                onClick={() => setModalDeposit(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form className="p-8 bg-gray-50 space-y-6" onSubmit={submitAddDeposit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Bank Selection */}
                <div className="flex flex-col">
                  <label
                    htmlFor="bank-account"
                    className="text-sm font-semibold text-gray-700"
                  >
                    โอนไปที่บัญชีธนาคาร<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="bank-account"
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setSelectBankserviceDeposit(e.target.value)}
                    value={selectBankservicedeposit.value}
                    required
                  >
                    {optionsbankservice &&
                      optionsbankservice.map((data) => (
                        <option key={data.value} value={data.value}>
                          {data.text}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Member Search */}
                <div className="flex flex-col col-span-1 sm:col-span-2">
                  <label
                    htmlFor="search-member"
                    className="text-sm font-semibold text-gray-700"
                  >
                    สมาชิก{" "}
                    <span className="text-xs text-gray-500">
                      (3 อักษรขึ้นไป, ยูส, เบอร์โทร หรือ ชื่อ)
                    </span>
                  </label>
                  <div className="mt-2 w-full">
                    <ComboBox
                      options={options}
                      placeholder="ค้นหาพนักงาน"
                      optionsListMaxHeight={300}
                      focusColor="#20C374"
                      renderOptions={(option) => (
                        <div className="comboBoxOption">{option}</div>
                      )}
                      value={selectedOption}
                      onSelect={setSelectedOptionHandle}
                      onChange={onChangeComboBoxDeposit}
                      enableAutocomplete
                      onOptionsChange={(option) => setHighlightedOption(option)}
                      required
                      className="w-full" // Ensures the ComboBox takes the full width
                    />
                  </div>
                </div>

                {/* Customer Bank Account */}
                <div className="flex flex-col">
                  <label
                    htmlFor="customer-bank-account"
                    className="text-sm font-semibold text-gray-700"
                  >
                    บัญชีธนาคารลูกค้า<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="customer-bank-account"
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setSelectBankDeposit(e.target.value)}
                    value={selectBankDeposit.value}
                    required
                  >
                    {optionsBankDeposit &&
                      optionsBankDeposit.map((data) => (
                        <option key={data.value} value={data.value}>
                          {data.text}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Transfer DateTime */}
                <div className="flex flex-col">
                  <label
                    htmlFor="transfer-datetime"
                    className="text-sm font-semibold text-gray-700"
                  >
                    วัน/เวลาโอน<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="transfer-datetime"
                    type="datetime-local"
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={datetimePickerDepositHandle}
                    value={datetimePickerDeposit}
                    required
                  />
                </div>

                {/* Amount */}
                <div className="flex flex-col">
                  <label
                    htmlFor="amount"
                    className="text-sm font-semibold text-gray-700"
                  >
                    จำนวนเงิน<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="amount"
                    type="number"
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                </div>

                {/* Remark */}
                <div className="flex flex-col col-span-1 sm:col-span-2">
                  <label
                    htmlFor="remark"
                    className="text-sm font-semibold text-gray-700"
                  >
                    หมายเหตุ
                  </label>
                  <input
                    id="remark"
                    type="text"
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="หมายเหตุ"
                    value={depositRemark}
                    onChange={(e) => setDepositRemark(e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-9H9V6a1 1 0 10-2 0v3H6a1 1 0 000 2h1v3a1 1 0 002 0v-3h4a1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  สร้างรายการ
                </button>
                <button
                  type="button"
                  className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setModalDeposit(false)}
                >
                  ปิด
                </button>
              </div>
            </form>
          </div>
        </div>



        {/* สร้างรายการถอน */}
        <div
          data-backdrop="static"
          className="modal overflow-y-auto show z-[60] m-0 p-0"
          style={{ display: modalWithdraw ? "" : "none" }}
        >
          <div className="w-11/12 lg:w-6/12 xl:w-3/12 modal-dialog mx-auto my-3 flex justify-center items-center">
            <div className="modal-content">
              <div className="bg-secondary modal-header flex justify-between sticky top-0 rounded-t-md z-50">
                <h2 className="font-medium font-display mr-auto text-lg">
                  สร้างรายการถอน
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x cursor-pointer cursor-pointer"
                  onClick={() => setModalWithdraw(false)}
                >
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </div>
              <div className="intro-y box">
                <form noValidate="" className="p-5" onSubmit={submitAddWithdraw}>

                  <div className="grid grid-cols-12">

                    <div className="col-span-12 pt-4" style={{ display: "none" }}>
                      <div className="swiper swiper-initialized swiper-horizontal swiper-pointer-events h-[66px]">
                        <div
                          className="swiper-wrapper"
                          style={{ transitionDuration: "0ms" }}
                        />
                        <div className="swiper-button-prev" />
                        <div className="swiper-button-next" />

                        <div className="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal" />
                      </div>

                    </div>


                    <div className="col-span-12">
                      <div className="py-1" placeholder="วัน/เวลาโอน">
                        <div className="flex justify-between">
                          <label htmlFor="input-state-3" className="form-label">
                            <span id="input-state-3" className="text-red-600">
                              *{" "}
                            </span>{" "}
                            โอนจากบัญชี
                          </label>
                        </div>
                        <div
                          className="dp__main dp__theme_light text-xs"
                          mode="dateTime"
                          is24hr=""
                          type="datetime"
                        >
                          <div
                            aria-label="Datepicker input"
                            role="textbox"
                            aria-multiline="false"
                            aria-disabled="false"
                            aria-readonly="false"
                          >
                            <div className="dp__input_wrap">
                              <div className="input-group" style={{ height: 40 }}>
                                <select
                                  className="z-0 text-sm px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 text-sm"
                                  onChange={(e) => setSelectBankserviceDeposit(e.target.value)}
                                  value={selectBankservicedeposit.value}
                                  required
                                >
                                  {optionsbankservice && optionsbankservice.map((data) => {
                                    return (
                                      <option key={data.value} value={data.value}>
                                        {data.text}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="mb-5 relative- text-red-600"></div>
                            </div>

                          </div>

                        </div>
                      </div>
                    </div>



                    <div className="col-span-12">
                      <div>
                        <div className="relative">
                          <label htmlFor="search-member" className="form-label">
                            สมาชิก{" "}
                            <span className="text-red-600 text-xs">
                              (3 อักษรขึ้นไป, ยูส, เบอร์โทร หรือ ชื่อ)
                            </span>
                          </label>
                          <div
                            className="px-0 form-control rounded border-gray-300 block focus:outline-none z-0">
                            <ComboBox
                              options={options}
                              placeholder="ค้นหาพนักงาน"
                              optionsListMaxHeight={300}
                              style={{
                                width: "auto",
                                marginBottom: "14px"
                              }}
                              focusColor="#20C374"
                              renderOptions={(option) => (
                                <div className="comboBoxOption">{option}</div>
                              )}
                              value={selectedOption}
                              onSelect={setSelectedOptionHandle}
                              onChange={onChangeComboBoxDeposit}
                              enableAutocomplete
                              onOptionsChange={(option) => setHighlightedOption(option)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="col-span-12">
                      <div className="py-1" placeholder="วัน/เวลาโอน">
                        <div className="flex justify-between">
                          <label htmlFor="input-state-3" className="form-label">
                            <span id="input-state-3" className="text-red-600">
                              *{" "}
                            </span>{" "}
                            บัญชีธนาคารลูกค้า
                          </label>
                        </div>
                        <div
                          className="dp__main dp__theme_light text-xs"
                          mode="dateTime"
                          is24hr=""
                          type="datetime"
                        >
                          <div
                            aria-label="Datepicker input"
                            role="textbox"
                            aria-multiline="false"
                            aria-disabled="false"
                            aria-readonly="false"
                          >
                            <div className="dp__input_wrap">
                              <div className="input-group" style={{ height: 40 }}>
                                <select
                                  className="z-0 text-sm px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 text-sm"
                                  onChange={(e) => setSelectBankDeposit(e.target.value)}
                                  value={selectBankDeposit.value}
                                  required
                                >
                                  {optionsBankDeposit && optionsBankDeposit.map((data) => {
                                    return (<option value={data.value}>
                                      <div>
                                        {data.text}
                                      </div>
                                    </option>)
                                  })
                                  }
                                </select>

                              </div>
                              <div className="mb-5 relative- text-red-600"></div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>



                    <div className="col-span-12">
                      <div className="py-1" placeholder="วัน/เวลาโอน">
                        <div className="flex justify-between">
                          <label htmlFor="input-state-3" className="form-label">
                            <span id="input-state-3" className="text-red-600">
                              *{" "}
                            </span>{" "}
                            วัน/เวลาโอน
                          </label>
                        </div>
                        <div
                          className="dp__main dp__theme_light text-xs"
                          mode="dateTime"
                          is24hr=""
                          type="datetime"
                        >
                          <div
                            aria-label="Datepicker input"
                            role="textbox"
                            aria-multiline="false"
                            aria-disabled="false"
                            aria-readonly="false"
                          >
                            <div className="dp__input_wrap">
                              <div className="input-group">
                                <input
                                  className="z-0 text-sm px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 text-sm"
                                  name="transferAt"
                                  autoComplete="off"
                                  type="datetime-local"
                                  onChange={datetimePickerDepositHandle}
                                  value={datetimePickerDeposit}
                                  required
                                />
                              </div>
                              <div className="mb-5 relative- text-red-600"></div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <div className="py-1">
                        <div className="flex justify-between">
                          <label className="form-label flex items-center">
                            <span>
                              <i className="text-danger">* </i> จำนวนเงิน
                            </span>

                          </label>

                        </div>
                        <div className="input-group">
                          <input
                            type="number"
                            autoComplete="off"
                            className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
                            name="amount"
                            inputMode="decimal"
                            min="0"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-5 relative"></div>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <div className="py-1 w-full">
                        <div className="flex justify-between">
                          <label
                            htmlFor="input-state-3"
                            className="form-label flex items-center"
                          >
                            <span className="!pl-1">หมายเหตุ</span>
                          </label>

                        </div>
                        <div className="input-group">

                          <input
                            className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                            name="remark"
                            placeholder="หมายเหตุ"
                            type="text"
                            maxLength=""
                            autoComplete="off"
                            data-mask="G*"
                            data-mask-inited="true"
                            data-mask-raw-value=""

                            value={depositRemark}
                            onChange={(e) => setDepositRemark(e.target.value)}
                            required
                          />

                        </div>
                        <div className="mb-5 relative">


                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-outline-dark ml-3"
                    type="button"
                    onClick={() => console.log("selectBankservicedeposit:", selectBankservicedeposit)}>ทดสอบ</button>
                  <div className="mt-5 flex justify-end">
                    <button
                      className="btn btn-primary btn btn-md btn btn-primary"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        height="16px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus-circle"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <line x1={12} y1={8} x2={12} y2={16} />
                        <line x1={8} y1={12} x2={16} y2={12} />
                      </svg>
                      <span className="pl-1">สร้างรายการ</span>
                    </button>
                    <button className="btn btn-outline-dark ml-3"
                      type="button"
                      onClick={() => setModalWithdraw(false)}>ปิด</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div >

    )
}

export default App