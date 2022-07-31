import React from 'react'

const Testimonies = () => {
  return (
    <div>
        <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Testimonies section (<i>coming soon...</i>)</h4>
                </div>
                <div
                  class="comment-widgets scrollable"
                  style={{maxHeight: "330px"}}
                >
                  {/* <!-- Comment Row --> */}
                  <div class="d-flex flex-row comment-row mt-0">
                    <div class="p-2">
                      <img
                        src="../assets/images/users/1.jpg"
                        alt="user"
                        width="50"
                        class="rounded-circle"
                      />
                    </div>
                    <div class="comment-text w-100">
                      <h6 class="font-medium">James Anderson</h6>
                      <span class="mb-3 d-block"
                        >Lorem Ipsum is simply dummy text of the printing and
                        type setting industry.
                      </span>
                      <div class="comment-footer">
                        <span class="text-muted float-end">April 14, 2021</span>
                        <button
                          type="button"
                          class="btn btn-cyan btn-sm text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-success btn-sm text-white"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Comment Row --> */}
                  <div class="d-flex flex-row comment-row">
                    <div class="p-2">
                      <img
                        src="../assets/images/users/4.jpg"
                        alt="user"
                        width="50"
                        class="rounded-circle"
                      />
                    </div>
                   
                  </div>
                </div>
              </div>
             
    </div>
  )
}

export default Testimonies