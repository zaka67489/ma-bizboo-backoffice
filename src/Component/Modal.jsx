import { useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment, useRef, useCallback } from "react";
import { Api } from "@/util/api";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import axios from "axios";
import Swal from "sweetalert2";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getCurrentTimeInUTC7 } from "@/Model/Function";
import Minput from "@/Component/Minput";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const useOutsideClick = (callback) => {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (
        event?.target?.className !== undefined &&
        event?.target?.className !== null
      ) {
        try {
          if (
            event?.target?.className?.indexOf(
              "modal overflow-y-auto show z-[60] m-0 p-0"
            ) !== -1
          ) {
            callback();
          }
        } catch (e) {}
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return ref;
};

export default function Modal(props = {}) {
  const [modalDailog, setModal] = useState(props.show ?? false);

  useEffect(() => {
    setModal(props.show);
  }, [props.show]);

  const blackdrops = (e) => {
    setModal(false);
    props.res(false);
  };

  const closepage = () => {
    setModal(false);
    props.res(false);
  };

  const ref = useOutsideClick(closepage);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      console.log("ESC");
      closepage();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const submitAddWithdraw = (e) => {
    e.preventDefault();
  };

  const cacallback = (e) => {
    props.update();
  };

  return (
    <>
      <div
        className={`fade modal-backdrop`}
        style={{ display: modalDailog ? "" : "none" }}
        onClick={blackdrops}
      />
      <div
        data-backdrop="static"
        className="modal overflow-y-auto show z-[60] m-0 p-0"
        style={{ display: modalDailog ? "" : "none" }}
      >
        <div
          className={
            "w-11/12 lg:w-6/12 xl:w-3/12 modal-dialog mx-auto my-3 flex justify-center items-center " +
            props?.config?.size
          }
          ref={ref}
        >
          <div className="modal-content">
            <div className="bg-secondary modal-header flex justify-between sticky top-0 rounded-t-md z-50">
              <h2 className="font-medium font-display mr-auto text-lg">
                {props?.config?.title ?? "Modal"}
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
                onClick={() => blackdrops(false)}
              >
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
            <div className="intro-y box">
              <form noValidate="" className="p-5" onSubmit={submitAddWithdraw}>
                {props?.child}
                {props?.config?.showbtn !== false ? (
                  <div className="mt-5 flex justify-end">
                    {props?.config?.type === "create" ? (
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
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary btn btn-md btn btn-save"
                        onClick={() => cacallback()}
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
                          className="feather feather-save"
                        >
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                          <polyline points="17 21 17 13 7 13 7 21" />
                          <polyline points="7 3 7 8 15 8" />
                        </svg>
                        <span className="pl-1">บันทึก</span>
                      </button>
                    )}

                    <button
                      className="btn btn-outline-dark ml-3"
                      type="button"
                      onClick={() => blackdrops(false)}
                    >
                      ปิด
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
