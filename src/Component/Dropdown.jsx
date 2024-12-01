import { useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment, forwardRef } from "react";
import { Api } from "@/util/api";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DropDown = forwardRef((props, ref) => {
  const [selectMenu, isetSelectMenu] = useState({
    key:props?.key ?? 0,
    title:props?.text
  });

  const setSelectMenu = (item) => {
    isetSelectMenu(item)
    props?.callback(item);

  }

  const [Lidstdata, setListdata] = useState(props?.data || []);

  return (
    <Menu as="div" className={`relative block text-left w-full`}>
      <div>
        <MenuButton
          className={`dropdown-toggle h-10 overflow-hidden image-fit flex items-center justify-start hover:bg-primary hover:text-white border border-primary p-2 rounded font-medium text-sm shadow-md ${props?.className} `}
        >
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400 mr-1"
            aria-hidden="true"
          />
          {selectMenu?.title}
        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm  "
          data-popper-placement="bottom-end"
          style={{
            position: "absolute",
            inset: "0px 0px auto auto",
            margin: 0,
            transform: "translate3d(0px, 32px, 0px)",
          }}
        >
          <div className="p-2 border-b border-gray-200 dark:border-dark-3">
            <div className="font-bold text-sm ">{props.subtext}</div>
          </div>
          <div className="py-1">
            {Lidstdata.map((item, index) => {
              return (
                <MenuItem
                  onClick={(value) => setSelectMenu(item)}
                  key={`dropsdownList_${index}`}
                >
                  {({ focus }) => (
                    <button
                      type="button"
                      className={classNames(
                        focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      {item?.title}
                    </button>
                  )}
                </MenuItem>
              );
            })}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
});

export default DropDown;
