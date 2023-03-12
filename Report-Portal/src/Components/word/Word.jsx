import React from "react";

const Word = () => {
  return (
    <div>
      <div className="card ">
        <a
          className="card-header link"
          data-toggle="collapse"
          data-parent="#accordian-4"
          href="#Toggle-1"
          aria-expanded="true"
          aria-controls="Toggle-1"
        >
          <i
            className="seticon mdi mdi-arrow-right-bold"
            aria-hidden="true"
          ></i>
          <span>NEWSLETTER</span>
        </a>
        <div id="Toggle-1" class="collapse show multi-collapse">
          <div className="card-body widget-content">
            <img
              src="https://gospelminds.com/wp-content/uploads/2017/10/Reach-Out-Nigeria.jpg"
              style={{ width: "100%", height: "350px" }}
            />
          </div>
          <div className="card-body widget-content">
            Happening live on october 1st...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Word;

// import React from "react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
// import { Autoplay } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

// import { productRows } from "../../dummyData";

// const Word = () => {
//   return (
//     <div>
//       <div class="card ">
//         <a
//           class="card-header link"
//           data-toggle="collapse"
//           data-parent="#accordian-4"
//           href="#Toggle-1"
//           aria-expanded="true"
//           aria-controls="Toggle-1"
//         >
//           <i class="seticon mdi mdi-arrow-right-bold" aria-hidden="true"></i>
//           <span>NEWSLETTER</span>
//         </a>
//         <div id="Toggle-1" class="collapse show multi-collapse">
//           <Swiper
//             direction="vertical"
//             spaceBetween={0}
//             slidesPerView={1}
//             loop={true}
//             speed={2000}
//             modules={[Autoplay]}
//             autoplay={{ delay: 4000, disableOnInteraction: false }}
//           >
//             {productRows.map((roes, index) => (
//               <SwiperSlide
//                 key={index}
//                 style={{ overflow: "hidden", position: "relative" }}
//               >
//                 <img
//                   src={roes.img}
//                   style={{ width: "100%", height: "350px" }}
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//           {/* <div class="card-body widget-content">
//             <img
//               src="https://gospelminds.com/wp-content/uploads/2017/10/Reach-Out-Nigeria.jpg"
//               style={{ width: "100%", height: "350px" }}
//             />
//           </div> */}
//           <div class="card-body widget-content">
//             Happening live on october 1st...
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Word;
