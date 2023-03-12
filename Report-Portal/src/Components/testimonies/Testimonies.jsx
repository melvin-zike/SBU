import React from "react";

const Testimonies = () => {
  return (
    <div>
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Testimonies </h4>
        </div>
        <div class="comment-widgets scrollable" style={{ maxHeight: "330px" }}>
          {/* <!-- Comment Row --> */}
          <div class="d-flex flex-row comment-row mt-0">
            <div class="comment-text w-100">
              <h6 class="font-medium">Super Admin</h6>
              <span class="mb-3 d-block">
                Everyday in the Lord is a Testimony. Give God praise, Halleluia
              </span>
              <div class="comment-footer">
                <span class="text-muted float-end">April 14, 2021</span>
                <button type="button" class="btn btn-danger btn-sm text-white">
                  0 Like
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Comment Row --> */}

          {/* <!-- Comment Row --> */}
        </div>
      </div>
    </div>
  );
};

export default Testimonies;
