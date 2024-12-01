
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import TableTransaction from '../../../../Component/TableTransaction'
import { getCurrentTimeInUTC7, formatTimeDifference } from '../../../../Model/Function';

import { DateRangePicker } from 'react-date-range';
import { startOfMonth } from 'date-fns';
import { API, AGENTAPI } from '../../../../Configs/Configs';
import { formatCurrency } from "@/util/format";


import Select from 'react-select'

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

const MemberList = forwardRef((props, ref) => {
  // function MemberList() {
  const [isLoading, setIsloading] = useState(true)
  const [accessToken, setaccessToken] = useState("")
  const loggedInUser = localStorage.getItem('loggedInUser');

  const formatDate = (date) => {
    const d = new Date(date);
    return d.getFullYear() + '/' + (d.getMonth() + 1).toString().padStart(2, '0') + '/' + d.getDate().toString().padStart(2, '0');
  }

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [state, setState] = useState([
    {
      startDate: startOfMonth(new Date()),
      endDate: new Date(),
      // endDate: addOneDay(new Date()),
      key: 'selection'
    }
  ]);

  const openDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  }

  const handleDateChange = (item) => {
    setState([item.selection]);
  }
  const handleOkClick = () => {

    setIsDatePickerOpen(false);
    getData();

    const datefrom = formatDateToYYYYMMDD(state[0].startDate);
    const dateto = formatDateToYYYYMMDD(state[0].endDate);
    console.log('datefrom:', datefrom)
    console.log('dateto:', dateto)

  }


  useEffect(() => {
    if (loggedInUser) {
      setaccessToken(JSON.parse(loggedInUser).accessToken)
      setIsloading(false)
    } else {
      navigate("/");
    }
  }, []);

  const [credittransactionResult, setCredittransactionResult] = useState([])
  const [summary, setSummaryResult] = useState({
    "deposit": 0,
    "withdraw": 0,
    "manualdeposit": 0,
    "manualwithdraw": 0,
    "freecredit": 0,
    "addcredit": 0,
    "decredit": 0,
    "cancelwithdraw": 0
  })

  const { userid } = useParams();
  const location = useLocation();
  console.log("location.pathname:", location.pathname);
  const hash = location.hash.replace('#', '');
  console.log("hash:", hash);
  console.log("userid:", userid);


  const options = [
    { value: "all", label: "ทั้งหมด" },
    { value: "deposit", label: "ฝาก" },
    { value: "withdraw", label: "ถอน" },
    { value: "manualdeposit", label: "โอนมือฝาก" },
    { value: "manualwithdraw", label: "โอนมือถอน" },
    { value: "freecredit", label: "ฟรีเครดิต" },
    { value: "addcredit", label: "เพิ่มเครดิต" },
    { value: "decredit", label: "ลดเครดิต" },
    { value: "cancelwithdraw", label: "ยกเลิกถอน" }
  ]

  const [selectAddUser, setselectAddUser] = useState(options[0].value)


  useEffect(() => {
    console.log('selectAddUser:', selectAddUser)
    getData()
  }, [selectAddUser])


  const getData = () => {
    console.log("getData usertransaction");

    const datefrom = formatDateToYYYYMMDD(state[0].startDate);
    const dateto = formatDateToYYYYMMDD(state[0].endDate);
    // console.log('datefrom:', datefrom)
    // console.log('dateto:', dateto)

    axios.get(`${API}/user/credit-transaction/${userid}?type=${selectAddUser}&datefrom=${datefrom}&dateto=${add1day(dateto)}`, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
      }
    })
      .then(response => {
        console.log("response getData usertransaction :", response.data)
        if (response.data.status === "success") {
          setCredittransactionResult(response.data.data)
          setSummaryResult(response.data.summary)
        }

      })
      .catch(error => {
        console.error("getData errorr :", error)
      });
  };

  useEffect(() => {
    if (loggedInUser && !isLoading) {
      getData();
    }
  }, [isLoading]);


  useImperativeHandle(ref, () => ({
    fetchData() {
      // console.log("Save data function called");
      getData();
    }
  }));

  function typeCredit(data) {

    {/* <td className="py-1 px-2 border text-center number-display w-44">
  <div className="flex justify-center">
    <span className="px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-rose-600 text-white">
      ลดเครดิต
    </span>
  </div>
</td>
<td className="py-1 px-2 border text-center number-display w-44">
  <div className="flex justify-center">
    <span className="px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-emerald-500 text-white">
      เพิ่มเครดิต
    </span>
  </div>
</td> */}
    let className = '';
    let textValue = '';

    if (data.typecheck === "manual") {
      if (data.type === "deposit") {
        className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-green-600 text-white`;
        textValue = 'ฝาก';
      } else if (data.statusLc === 3) {
        className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-rose-800 text-white`;
        textValue = 'ยกเลิกถอน';
      } else {
        className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-rose-600 text-white`;
        textValue = 'ถอน';
      }
    } else if (data.typecheck === "auto") {
      if (data.type === "deposit") {
        className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-green-600 text-white`;
        textValue = 'ฝาก';
      } else if (data.statusLc === 3) {
        className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-rose-800 text-white`;
        textValue = 'ยกเลิกถอน';
      } else {
        className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-rose-600 text-white`;
        textValue = 'ถอน';
      }
    } else if (data.typecheck === "addcredit") {
      className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-emerald-600 text-white`;
      textValue = 'เพิ่มเครดิต';
    } else if (data.typecheck === "decredit") {
      className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-rose-600 text-white`;
      textValue = 'ลดเครดิต';
    } else if (data.typecheck === "gateway") {
      if (data.type === "deposit") {
        className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-green-600 text-white`;
        textValue = 'ฝาก';
      } else {
        className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-rose-600 text-white`;
        textValue = 'ถอน';
      }
    } else if (data.typecheck === "freecredit") {
      className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-emerald-900 text-white`;
      textValue = 'เครดิตฟรี';
    } else if (data.typecheck === "withdrawgg") {
      className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-rose-500 text-white`;
      textValue = `โอนมือถอน`;

    } else if (data.typecheck === "withdraw" && data.statusLc === 11) {
      className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-rose-800 text-white`;
      textValue = `ถอน (ทิ้ง)`;
    }

    else {
      className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-gray-400 text-white`;
      textValue = `ไม่ระบุ ${data.typecheck}`;

    }
    return (<td className="py-1 px-2 border text-center number-display w-44">
      <div className="flex justify-center">
        <span className={className}>
          {textValue}
        </span>
      </div>
    </td>)
  }


  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    })
  };
  return (
    <form noValidate="">

      <div className="post__content tab-content">
        <div
          id="content"
          className="tab-pane p-5 active"
          role="tabpanel"
          aria-labelledby="content-tab"
        >



          <div className="flex items-center flex-wrap">
            {/* <div className="sm:mr-3.5 w-96 mb-3">
        <label htmlFor="filter-date-event" className="form-label">
          ช่วงเวลา <span>(เดือนนี้)</span>
        </label>
        <div
          className="dp__main dp__theme_light w-full"
          label="ช่วงเวลา"
          id="filter-date-event"
        >
          <div
            aria-label="Datepicker input"
            role="textbox"
            aria-multiline="false"
            aria-disabled="false"
            aria-readonly="false"
          >
            
            <div className="dp__input_wrap">
              
              <input
                className="dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg"
                inputMode="none"
                placeholder=""
                autoComplete="off"
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
              
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 32 32"
                className="dp__icon dp__clear_icon dp__input_icons"
              >
                <path d="M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z" />
                <path d="M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z" />
              </svg>
            </div>
          </div>
          
        </div>
      </div> */}
            {/* <div className="w-full sm:w-60 mb-3">
        <div className="py-1">
          <div className="flex justify-between">
            <label htmlFor="input-state-3" className="form-label">
              <span className="text-danger">* </span>ประเภท
            </label>
            
          </div>
          <div className="errorMessage">
            <select
              className="tom-select non-searchable"
              id=""
              name="bank"
              field="[object Object]"
              hidden="true"
            >
              <option disabled="" value="">
                เลือกประเภท
              </option>
              <option value={0}>ทั้งหมด</option>
              <option value={1}>ฝาก</option>
              <option value={2}>ถอน</option>
              <option value={3}>โอนมือฝาก</option>
              <option value={4}>โอนมือถอน</option>
              <option value={5}>คอมมิชชั่น</option>
              <option value={6}>คืนยอดเสีย</option>
              <option value={7}>ฟรีเครดิต</option>
              <option value={8}>เพิ่มเครดิต</option>
              <option value={9}>ลดเครดิต</option>
              <option value={10}>ยกเลิกถอน</option>
              <option value={11}>ย้ายเข้ากระเป๋าหลัก</option>
              <option value={12}>ย้ายออกจากกระเป๋าหลัก</option>
              <option value={13}>คืนเครดิคเข้าเอเยนต์</option>
            </select>
            <select
              className="tom-select non-searchable tomselected"
              id="tomselect-43"
              name="bank"
              field="[object Object]"
              tabIndex={-1}
              hidden="hidden"
            >
              <option value={0} selected="true">
                ทั้งหมด
              </option>
              <option disabled="" value="">
                เลือกประเภท
              </option>
              <option value={1}>ฝาก</option>
              <option value={2}>ถอน</option>
              <option value={3}>โอนมือฝาก</option>
              <option value={4}>โอนมือถอน</option>
              <option value={5}>คอมมิชชั่น</option>
              <option value={6}>คืนยอดเสีย</option>
              <option value={7}>ฟรีเครดิต</option>
              <option value={8}>เพิ่มเครดิต</option>
              <option value={9}>ลดเครดิต</option>
              <option value={10}>ยกเลิกถอน</option>
              <option value={11}>ย้ายเข้ากระเป๋าหลัก</option>
              <option value={12}>ย้ายออกจากกระเป๋าหลัก</option>
              <option value={13}>คืนเครดิคเข้าเอเยนต์</option>
            </select>
            <div className="ts-control tom-select non-searchable single input-hidden">
              <div className="items ts-input full has-items">
                <div data-value={0} className="item">
                  ทั้งหมด
                </div>
                <input
                  type="select-one"
                  autoComplete="off"
                  size={1}
                  tabIndex={0}
                  role="combobox"
                  haspopup="listbox"
                  aria-expanded="false"
                  aria-controls="tomselect-43-ts-dropdown"
                  id="tomselect-43-tomselected"
                />
              </div>
              <div
                className="ts-dropdown single tom-select non-searchable"
                style={{ display: "none" }}
              >
                <div
                  role="listbox"
                  id="tomselect-43-ts-dropdown"
                  tabIndex={-1}
                  className="ts-dropdown-content"
                />
              </div>
            </div>
          </div>
          <div className="relative"></div>
        </div>
      </div> */}


            <div className="grid grid-cols-3 gap-3 items-center mb-4">
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
              <div className="relative ms-4">
                <label htmlFor="filter-date-event" className="form-label mb-1">ประเภท</label>
                <div className="w-64">
                  <div className="dp__main dp__theme_light">
                    <div aria-label="Datepicker input" role="textbox" aria-multiline="false" aria-disabled="false" aria-readonly="false">
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={options[0]}
                        // value={selectAddUser}
                        onChange={(e) => setselectAddUser(e.value)}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={false}
                        name="credit"
                        options={options}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>








            <button
              className="hidden btn btn-primary w-full sm:w-auto mb-3 sm:mb-0 capitalize btn btn-md hidden btn btn-primary w-full sm:w-auto mb-3 sm:mb-0 capitalize"
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
                className="feather feather-search"
              >
                <circle cx={11} cy={11} r={8} />
                <line x1={21} y1={21} x2="16.65" y2="16.65" />
              </svg>
              <span className="pl-1">ค้นหา</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-6 gap-3">
            <div className="border-l-4 flex flex-col pl-3 border-green-600">
              <span>ฝาก</span>
              <div className="flex items-center h-10">
                <span className="text-2xl font-semibold">{summary.deposit}</span>
              </div>
            </div>
            <div className="border-l-4 flex flex-col pl-3 border-red-500">
              <span>ถอน</span>
              <div className="flex items-center h-10">
                <span className="text-2xl font-semibold">{summary.withdraw}</span>
              </div>
            </div>
            <div className="border-l-4 flex flex-col pl-3 border-green-400">
              <span>โอนมือฝาก</span>
              <div className="flex items-center h-10">
                <span className="text-2xl font-semibold">{summary.manualdeposit}</span>
              </div>
            </div>
            <div className="border-l-4 flex flex-col pl-3 border-red-500">
              <span>โอนมือถอน</span>
              <div className="flex items-center h-10">
                <span className="text-2xl font-semibold">{summary.manualwithdraw}</span>
              </div>
            </div>
            {/* <div className="border-l-4 flex flex-col pl-3 border-violet-800">
        <span>คอมมิชชั่น</span>
        <div className="flex items-center h-10">
          <span className="text-2xl font-semibold">0</span>
        </div>
      </div>
      <div className="border-l-4 flex flex-col pl-3 border-orange-500">
        <span>คืนยอดเสีย</span>
        <div className="flex items-center h-10">
          <span className="text-2xl font-semibold">0</span>
        </div>
      </div> */}
            <div className="border-l-4 flex flex-col pl-3 border-amber-500">
              <span>ฟรีเครดิต</span>
              <div className="flex items-center h-10">
                <span className="text-2xl font-semibold">{summary.freecredit}</span>
              </div>
            </div>
            <div className="border-l-4 flex flex-col pl-3 border-emerald-500">
              <span>เพิ่มเครดิต</span>
              <div className="flex items-center h-10">
                <span className="text-2xl font-semibold">{summary.addcredit}</span>
              </div>
            </div>
            <div className="border-l-4 flex flex-col pl-3 border-rose-600">
              <span>ลดเครดิต</span>
              <div className="flex items-center h-10">
                <span className="text-2xl font-semibold">{summary.decredit}</span>
              </div>
            </div>
            <div className="border-l-4 flex flex-col pl-3 border-gray-600">
              <span>ยกเลิกถอน</span>
              <div className="flex items-center h-10">
                <span className="text-2xl font-semibold">{summary.cancelwithdraw}</span>
              </div>
            </div>
            {/* <div className="border-l-4 flex flex-col pl-3 border-yellow-500">
        <span>ย้ายเข้ากระเป๋าหลัก</span>
        <div className="flex items-center h-10">
          <span className="text-2xl font-semibold">0</span>
        </div>
      </div>
      <div className="border-l-4 flex flex-col pl-3 border-lime-600">
        <span>ย้ายออกจากกระเป๋าหลัก</span>
        <div className="flex items-center h-10">
          <span className="text-2xl font-semibold">0</span>
        </div>
      </div>
      <div className="border-l-4 flex flex-col pl-3 border-purple-500">
        <span>คืนเครดิคเข้าเอเยนต์</span>
        <div className="flex items-center h-10">
          <span className="text-2xl font-semibold">0</span>
        </div>
      </div> */}
          </div>
          <div className="grid grid-cols-12">
            <div className="intro-y box col-span-12 sm:col-span-12">
              <div className="overflow-x-auto">
                <table className="text-xs w-full border">
                  <thead>
                    <tr className="bg-gray-700 dark:bg-dark-1 text-white px-half font-display text-sm">
                      <th className="py-1 px-2 whitespace-nowrap text-center font-medium">
                        #
                      </th>
                      <th className="py-1 px-2 whitespace-nowrap text-left font-medium">
                        ยูสเซอร์เนม
                      </th>
                      <th className="py-1 px-2 whitespace-nowrap text-center font-medium">
                        ประเภท
                      </th>
                      <th className="py-1 px-2 whitespace-nowrap text-center font-medium">
                        เวลา
                      </th>
                      <th className="py-1 px-2 whitespace-nowrap text-right font-medium">
                        จำนวนเครดิต
                      </th>
                      <th className="py-1 px-2 whitespace-nowrap text-right font-medium">
                        เครดิตก่อน
                      </th>
                      <th className="py-1 px-2 whitespace-nowrap text-right font-medium">
                        เครดิตหลัง
                      </th>
                      <th className="py-1 px-2 whitespace-nowrap text-left font-medium">
                        ทำรายการโดย
                      </th>
                      <th className="py-1 px-2 whitespace-nowrap text-left font-medium">
                        หมายเหตุ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {/* {
    "logid": 63633,
    "type": "deposit",
    "statusLc": 1,
    "amountLc": 36,
    "listlc": 63633,
    "remarkLc": "bot",
    "depositWithdrawApprove": 0,
    "depositWithdrawManual": 0,
    "typecheck": "auto",
    "approveBy": null,
    "user": "api99xbetdae7y3",
    "staffName": null,
    "staffLastName": null,
    "staffMobilephone": null,
    "staffType": null,
    "userBankId": 9256,
    "bankserviceId": 22,
    "depositWithdrawTime": "2024-10-24T02:40:00.000Z",
    "depositcreatedAt": "2024-10-24 02:40:00",
    "depositupdatedAt": "2024-10-24 02:40:51",
    "logcreditCreatedAt": "2024-10-24 02:40:51",
    "userId": 9198,
    "name": "นาย สมชาย แซ่ท้าว",
    "phonenumber": "0932100127",
    "bankName": "scb",
    "accountNumber": "4140451157",
    "accountName": "นาย สมชาย แซ่ท้าว",
    "bankserviceBankName": "scb",
    "bankserviceaccountName": "นาย ตฤณภพ พิมพา ",
    "bankserviceaccountNo": "4122127245"
} */}
                    {credittransactionResult && credittransactionResult.map((data, index) => {
                      // if (data.remarkLc !== 'bot-withdraw with api gg system')
                      return (<tr className="hover:bg-yellow-100 px-half even:bg-blue-50">
                        <td className="py-1 px-2 border-b number-display text-center w-10" onClick={() => console.log(data)}>
                          {index + 1} <span className="text-mobile text-gray-500">#{data.logid}</span>
                        </td>
                        <td className="py-1 px-2 border text-left number-display w-96">
                          <span>{data.user}</span>
                        </td>

                        {/* ประเภทเครดิต */}
                        {typeCredit(data)}

                        <td className="py-1 px-2 border text-center number-display w-40">
                          <div className="flex justify-center">
                            <div className="w-24">
                              <span className="block">
                              
                                {getCurrentTimeInUTC7(data.depositWithdrawTime,7)}
                                {/* {getCurrentTimeInUTC7(data.logcreditCreatedAt,14)} */}
                              </span>
                              <span className="block text-xs font-light">
                                {formatTimeDifference(new Date(data.depositWithdrawTime),7)}
                                {/* {formatTimeDifference(new Date(data.logcreditCreatedAt),14)} */}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-1 px-2 border text-right number-display w-96 font-bold">
                          {formatCurrency(data.amountLc)}
                        </td>
                        <td className="py-1 px-2 border text-right number-display w-96">
                          {formatCurrency(data.beforeBalance)}
                        </td>
                        <td className="py-1 px-2 border text-right number-display w-96">
                          {formatCurrency(data.afterBalance)}
                        </td>
                        <td className="py-1 px-2 border text-left number-display min-h-max">
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
                              className="feather feather-user w-4 h-4 inline w-4 h-4 inline"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx={12} cy={7} r={4} />
                            </svg>
                            <span className={`bg-${data.staffName === null ? "blue-500" : "gray-700"} text-white px-1.5 py-0.5 text-xs rounded-md before:text-gray-700 before:absolute before:left-3.5`}>
                              {data.staffName === null ? "Auto" : data.staffName}
                              {/* (data.typecheck === "withdraw" && data.statusLc === 11) {
      className = `px-2 py-1 rounded-lg min-w-[96px] font-semibold block bg-rose-800 text-white`;
      textValue = `ถอน (ทิ้ง)`;
    } */}
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-1 ml-3 relative mt-1"
                            style={{ display: data.statusLc === 11 ? "":"none" }}
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
                              className="feather feather-user-check w-4 h-4 inline w-4 h-4 inline"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="8.5" cy={7} r={4} />
                              <polyline points="17 11 19 13 23 9" />
                            </svg>
                            <span className="bg-red-600 text-white px-1.5 py-0.5 text-xs rounded-md before:text-green-600 before:absolute before:left-[14px] whitespace-nowrap">
                              {"ทิ้ง"}
                            </span>
                          </div>
                        </td>
                        <td className="py-1 px-2 border text-left">
                          <div className="min-w-max max-w-[256px]" >
                            {data.remarkLc}
                          </div>
                        </td>
                      </tr>)
                    })}



                    <tr className="bg-yellow-50 py-2 text-center" style={{ display: credittransactionResult.length !== 0 ? "none" : "" }}>
                      <td colSpan={18} className="py-1">
                        ไม่มีข้อมูล
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td colSpan={18} className="text-center py-1">
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
                              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                              <line x1={2} y1={12} x2={6} y2={12} />
                              <line x1={18} y1={12} x2={22} y2={12} />
                              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                            </svg>
                          </svg>
                          กำลังโหลดข้อมูล . . .
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-slate-300 py-1 px-2 font-bold">
                      <td colSpan={4} className="py-1 px-2 font-display">
                        รวม
                      </td>
                      <td className="text-right py-1 px-2 border">0</td>
                      <td className="text-right py-1 px-2 border">0</td>
                      <td className="text-right py-1 px-2 border">0</td>
                      <td colSpan={2} className="text-center py-1" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>






        </div>
      </div>


    </form>

  )
})

export default MemberList
