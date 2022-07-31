import React from 'react'

const Awards = () => {
  return (
    <div>
        <div class="card">
                {/* <!-- Nav tabs --> */}
               
                {/* <!-- Tab panes --> */}
                <ul class="nav nav-tabs" role="tablist">
                  
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-bs-toggle="tab"
                      href="#profile"
                      role="tab"
                      ><span class="hidden-sm-up"></span>
                      <span class="hidden-xs-down">Staff Of The Month</span></a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-bs-toggle="tab"
                      href="#messages"
                      role="tab"
                      ><span class="hidden-sm-up"></span>
                      <span class="hidden-xs-down">Staff of The Year</span></a
                    >
                  </li>
                </ul>
                <div class="tab-content tabcontent-border">
                  
                  <div class="tab-pane p-20" id="profile" role="tabpanel">
                    <div class="p-20">
                      <img
                        src="/assets/images/staffer.jpeg"
                        class="img-fluid"
                      />
                      <p class="mt-2">
                        Congrats to our esteemed sister..
                      </p>
                    </div>
                  </div>
                  <div class="tab-pane p-20" id="messages" role="tabpanel">
                    <div class="p-20">
                      <p>
                       Congrats..
                      </p>
                      <img
                        src="/assets/images/media.jpeg"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
          
    </div>
  )
}

export default Awards