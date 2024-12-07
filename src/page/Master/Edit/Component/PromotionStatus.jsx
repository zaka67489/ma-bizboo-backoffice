
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

function MemberList() {
    return (
        <form noValidate="">

<div className="post__content tab-content">
  <div
    id="content"
    className="tab-pane p-5 active"
    role="tabpanel"
    aria-labelledby="content-tab"
  >
    
    
    
    
    
    
    
    
    
    
    <div className="w-full">
      <div>
        <h2 className="text-lg font-semibold font-display border-b-2 border-yellow-500 pb-2 mb-4">
          การปลดล็อดโปรโมชั่น
        </h2>
        
        <div className="bg-gray-100 text-center rounded-lg p-4">
          ไม่มีข้อมูล
        </div>
        
      </div>
    </div>
  </div>
</div>

            
        </form>

    )
}

export default MemberList
