import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import TableTransaction from '../../../../Component/TableTransaction'

import { API, AGENTAPI } from '../../../../Configs/Configs';

function MemberList() {

  const [isLoading, setIsloading] = useState(true)
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

  const [transactionResult, settransactionResult] = useState([])
  const { userid } = useParams();
  const location = useLocation();
  console.log("location.pathname:", location.pathname);
  const hash = location.hash.replace('#', '');
  console.log("hash:", hash);
  console.log("userid:", userid);

  const getData = () => {
    console.log("getData usertransaction");
    axios.get(`${API}/user/transaction/${userid}`, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
      }
    })
      .then(response => {
        console.log("response getData usertransaction :", response.data)
        settransactionResult(response.data.data)
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

  return (
    <form noValidate="">

      <div className="post__content tab-content">
        <div
          id="content"
          className="tab-pane p-5 active"
          role="tabpanel"
          aria-labelledby="content-tab"
        >


          {/* <div className="flex items-center">
      <div className="sm:mr-3.5 w-96 mb-4">
         <label htmlFor="filter-date-event" className="form-label">
          ช่วงเวลา(){" "}
        </label>
        <div
          className="dp__main dp__theme_light w-full text-xs"
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
      </div> 
      <button
        type="submit"
        className="btn btn-primary mt-3 btn btn-md btn btn-primary mt-3"
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
    </div> */}
          <TableTransaction transaction={transactionResult} />

        </div>
      </div>


    </form>

  )
}

export default MemberList
