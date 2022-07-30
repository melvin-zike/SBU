import React from 'react'

const GoalModal = () => {
  return (
    <div>
        {/* <!-- Modal --> */}
<div class="modal fade" id="goalsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Goal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      {/* REPORT FORM START---------------------------------------------------------------- */}
      <div class="card">
                {/* <!-- Nav tabs --> */}
               
                {/* <!-- Tab panes --> */}
                <ul class="nav nav-tabs" role="tablist">
                  
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-bs-toggle="tab"
                      href="#one"
                      role="tab"
                      ><span class="hidden-sm-up"></span>
                      <span class="hidden-xs-down">1</span></a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-bs-toggle="tab"
                      href="#two"
                      role="tab"
                      ><span class="hidden-sm-up"></span>
                      <span class="hidden-xs-down">2</span></a
                    >
                  </li>
                </ul>
                <div class="tab-content tabcontent-border">
                  
                  <div class="tab-pane p-20" id="one" role="tabpanel">
                    <div class="p-20">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        
                      <p class="mt-2">
                        And is full of waffle to It has multiple paragraphs and
                       
                      </p>
                    </div>
                  </div>
                  <div class="tab-pane p-20" id="two" role="tabpanel">
                    <div class="p-20">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                      <p>
                        And is full of waffle to It has multiple paragraphs and
                        
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>

        {/* REPORT FORM ENDS----------------------------------------------------------- */}
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default GoalModal