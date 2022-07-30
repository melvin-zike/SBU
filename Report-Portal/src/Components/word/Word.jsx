import React from 'react'

const Word = () => {
  return (
    <div>
        <div class="card mt-4">
                  <a
                    class="card-header link"
                    data-toggle="collapse"
                    data-parent="#accordian-4"
                    href="#Toggle-1"
                    aria-expanded="true"
                    aria-controls="Toggle-1"
                  >
                    <i
                      class="seticon mdi mdi-arrow-right-bold"
                      aria-hidden="true"
                    ></i>
                    <span>NEWSLETTER SECTION...</span>
                  </a>
                  <div id="Toggle-1" class="collapse show multi-collapse">
                    <div class="card-body widget-content">
                      Get Info about latest news and happenings...
                    </div>
                  </div>
                  
                  
                 
                </div>
    </div>
  )
}

export default Word