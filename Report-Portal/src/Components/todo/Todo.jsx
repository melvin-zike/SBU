import React from 'react'

const Todo = () => {
  return (
    <div>
        <div class="card">
                <div class="card-body">
                  <h4 class="card-title">To Do List/Goals</h4>
                  <div class="todo-widget scrollable" style={{height: "450px"}}>
                    <ul
                      class="list-task todo-list list-group mb-0"
                      data-role="tasklist"
                    >
                      <li class="list-group-item todo-item" data-role="task">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="customCheck"
                          />
                          <label
                            class="form-check-label w-100 mb-0 todo-label"
                            for="customCheck"
                          >
                            <span class="todo-desc fw-normal"
                              >Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.</span
                            >
                            <span class="badge rounded-pill bg-danger float-end"
                              >Today</span
                            >
                          </label>
                        </div>
                        <ul class="list-style-none assignedto">
                          <li class="assignee">
                            <img
                              class="rounded-circle"
                              width="40"
                              src="../assets/images/users/1.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Steave"
                            />
                          </li>
                          <li class="assignee">
                            <img
                              class="rounded-circle"
                              width="40"
                              src="../assets/images/users/2.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Jessica"
                            />
                          </li>
                          <li class="assignee">
                            <img
                              class="rounded-circle"
                              width="40"
                              src="../assets/images/users/3.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Priyanka"
                            />
                          </li>
                          <li class="assignee">
                            <img
                              class="rounded-circle"
                              width="40"
                              src="../assets/images/users/4.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Selina"
                            />
                          </li>
                        </ul>
                      </li>
                      <li class="list-group-item todo-item" data-role="task">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="customCheck1"
                          />
                          <label
                            class="form-check-label w-100 mb-0 todo-label"
                            for="customCheck1"
                          >
                            <span class="todo-desc fw-normal"
                              >Lorem Ipsum is simply dummy text of the
                              printing</span
                            ><span
                              class="badge rounded-pill bg-primary float-end"
                              >1 week
                            </span>
                          </label>
                        </div>
                        <div class="item-date">26 jun 2021</div>
                      </li>
                      <li class="list-group-item todo-item" data-role="task">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="customCheck2"
                          />
                          <label
                            class="form-check-label w-100 mb-0 todo-label"
                            for="customCheck2"
                          >
                            <span class="todo-desc fw-normal"
                              >Give Purchase report to</span
                            >
                            <span class="badge rounded-pill bg-info float-end"
                              >Yesterday</span
                            >
                          </label>
                        </div>
                        <ul class="list-style-none assignedto">
                          <li class="assignee">
                            <img
                              class="rounded-circle"
                              width="40"
                              src="../assets/images/users/3.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Priyanka"
                            />
                          </li>
                          <li class="assignee">
                            <img
                              class="rounded-circle"
                              width="40"
                              src="../assets/images/users/4.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Selina"
                            />
                          </li>
                        </ul>
                      </li>
                      <li class="list-group-item todo-item" data-role="task">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="customCheck3"
                          />
                          <label
                            class="form-check-label w-100 mb-0 todo-label"
                            for="customCheck3"
                          >
                            <span class="todo-desc fw-normal"
                              >Lorem Ipsum is simply dummy text of the printing
                            </span>
                            <span
                              class="badge rounded-pill bg-warning float-end"
                              >2 weeks</span
                            >
                          </label>
                        </div>
                        <div class="item-date">26 jun 2021</div>
                      </li>
                      <li class="list-group-item todo-item" data-role="task">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="customCheck4"
                          />
                          <label
                            class="form-check-label w-100 mb-0 todo-label"
                            for="customCheck4"
                          >
                            <span class="todo-desc fw-normal"
                              >Give Purchase report to</span
                            >
                            <span class="badge rounded-pill bg-info float-end"
                              >Yesterday</span
                            >
                          </label>
                        </div>
                        <ul class="list-style-none assignedto">
                          <li class="assignee">
                            <img
                              class="rounded-circle"
                              width="40"
                              src="../assets/images/users/3.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Priyanka"
                            />
                          </li>
                          <li class="assignee">
                            <img
                              class="rounded-circle"
                              width="40"
                              src="../assets/images/users/4.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Selina"
                            />
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default Todo